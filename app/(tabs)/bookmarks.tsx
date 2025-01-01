import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Bookmarks = () => {
  const { query } = useLocalSearchParams();
  let posts 
 



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
          <View className="my-6 px-4">
            <View>
            <Text className="text-2xl text-white font-psemibold">  Saved Videos</Text>

              
              
              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query as any} />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Saved videos found"
            description="Go to view a video and save it to view it here"
            buttonTitle="View Videos"
             buttonAction="/home"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmarks;
