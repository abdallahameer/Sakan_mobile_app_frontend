import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function VideoSplash({
  setLoading,
}: {
  setLoading: (value: boolean) => void;
}) {
  const player = useVideoPlayer(
    require("../../assets/videos/splash-animation.mp4"),
    (p) => {
      p.loop = false;
      p.muted = true;
      p.play();
    },
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="contain"
        nativeControls={false}
      />
    </View>
  );
}
