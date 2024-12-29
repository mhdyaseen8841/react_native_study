import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Profile = () => {
  const context = useGlobalContext();

  if (!context) {
    return null;
  }

  const { user,setUser,setIsLoggedIn } = context;
  const { query } = useLocalSearchParams();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = ()=>{
    console.log("logout")
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          //<Text className="text-3xl text-white">{item.title}</Text>
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
           <TouchableOpacity
           className="w-full items-end mb-10" onPress={logout}>
            <Image source={icons.logout}/>
           </TouchableOpacity>
           <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
           <Image source={{uri: user?.avatar}} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover"/>
           </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            description="No videos found for this users"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
