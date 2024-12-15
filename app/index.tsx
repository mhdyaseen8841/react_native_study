import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Hi</Text>
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
