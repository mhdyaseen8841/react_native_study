import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {Link} from 'expo-router'
import "../global.css"
const Index = () => {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-3xl">Hi</Text>
        <Link href="/about" style={{color: 'blue'}}>Go to About</Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

export default Index;
