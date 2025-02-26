import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { icons } from "@/constants";
import { useVideoPlayer, VideoView } from "expo-video";

interface Users {
  username: string;
  avatar: string;
}

interface VideoType {
  title: string;
  thumbnail: string;
  video: string;
  creator: Users;
}

interface VideoCardProps {
  video: VideoType;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const {
    title,
    thumbnail,
    video: videoUrl,
    creator: { username, avatar },
  } = video;

  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(videoUrl);

  useEffect(() => {
    if (play) {
      player.play();
    } else {
      player.pause();
    }
  }, [play, player]);

  return (
    <View className="flex-col items-center px-4 mb-14">
      {/* Header */}
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
      </View>

      {/* Video/Thumbnail */}
      {play ? (
        <View className="w-full h-60 rounded-xl mt">
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
