import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {Link} from 'expo-router'
const Index = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Hi</Text>
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
