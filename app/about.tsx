import React from "react";
import { StyleSheet, Text, View } from "react-native";

const About = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>About</Text>
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

export default About;
