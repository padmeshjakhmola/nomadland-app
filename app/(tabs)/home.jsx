import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import PostCard from "../../components/PostCard";
import { dummyData } from "../../utils";
import { SignedOut } from "@clerk/clerk-expo";
import { SignOutButton, useAuth } from "@clerk/clerk-react";
import { router } from "expo-router";

const Home = () => {
  const [displayedData, setDisplayedData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadMoreItems();
  }, []);

  const loadMoreItems = () => {
    if (pageLoading) return;
    setPageLoading(true);

    // setTimeout(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const newItems = dummyData.slice(startIndex, endIndex);

    setDisplayedData([...displayedData, ...newItems]);
    setPage(page + 1);
    setPageLoading(false);
    // }, 4000);
  };

  const renderFooter = () => {
    if (!pageLoading) return null;
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  };

  const renderItem = ({ item }) => <PostCard data={item} />;

  const { signOut } = useAuth();

  return (
    <SafeAreaView className="mt-4 pb-16 h-screen">
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View className="px-6 flex-row justify-between items-center">
              <View className="flex-1">
                <Image
                  source={images.profile}
                  className="w-8 h-8 rounded-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1 items-center">
                <Image
                  source={icons.logo}
                  className="w-9 h-9 rounded-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1 items-end">
                <SignOutButton>
                  <TouchableOpacity
                    onPress={() => signOut(router.replace("/sign-in"))}
                  >
                    <View className="rounded-full p-2 border border-gray-300">
                      <Image
                        source={icons.logout}
                        className="w-6 h-6"
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                </SignOutButton>
              </View>
            </View>
            <View className="border-solid border border-gray-200 my-2" />
          </>
        )}
        showsVerticalScrollIndicator={false}
        data={displayedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
          // refreshing={refreshing}
          // onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
