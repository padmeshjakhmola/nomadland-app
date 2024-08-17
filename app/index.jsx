import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../constants";
import { useRef, useState } from "react";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: images.person1,
    title: "Capture Moments, Share Journeys",
    description:
      "The Ultimate platform for wanderers and adventurers. Share your journey with stunning visuals, connect with like-minded travelers, and find inspiration for your next destination.",
  },
  {
    id: "2",
    image: images.person2,
    title: "Every picture is a piece of your story",
    description:
      "Upload your travel photos, engage with a vibrant community of nomads, and explore the world one post at a time.",
  },
  {
    id: "3",
    image: images.person3,
    title: "More than just a photo-sharing app",
    description:
      "—it's a community of explorers capturing the beauty of the world. Share your experiences, discover new places, and inspire others to wander.",
  },
];

const Slide = ({ item }) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={item.image}
        style={{ height: "65%", width }}
        resizeMode="contain"
      />
      <View style={{ maxWidth: width - 10, paddingHorizontal: 15 }}>
        <Text className="font-mbold text-xl text-start mt-10">
          {item.title}
        </Text>
        <Text className="font-mmedium text-base text-start mt-2">
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);
  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.1,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row justify-center mt-[20px]">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-[2.5px] w-[10px] bg-gray-700 mt-[3px] rounded-lg mx-1 ${
                currentSlideIndex == index ? "bg-black w-[25px]" : ""
              }`}
            />
          ))}
        </View>

        <View className="mb-[20px] flex-row justify-end">
          {currentSlideIndex != slides.length - 1 ? (
            <TouchableOpacity
              className="flex-row space-x-2 justify-center items-center rounded-lg mr-2 pl-5 pt-5"
              onPress={goNextSlide}
            >
              <Text className="font-mmedium">Next</Text>
              <Image
                source={icons.rightDoubleArrow}
                className="w-3 h-3"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex-row space-x-2 justify-center items-center rounded-lg mr-2 pl-5 pt-5"
              onPress={() => {
                router.replace("/sign-in");
              }}
            >
              <Text className="font-mmedium">Sign up or Sign in</Text>
              <Image
                source={icons.rightDoubleArrow}
                className="w-3 h-3"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };
  return (
    <SafeAreaView className="flex-1 h-full">
      <FlatList
        ref={ref}
        data={slides}
        contentContainerStyle={{ height: height * 0.8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
        pagingEnabled
        scrollEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
        bounces={false}
      />
      <Footer />
    </SafeAreaView>
  );
}
