import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants";
interface SearchInputProps {
  title?: string;
  value?: string;
  keyboardType?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  return (
    <View
      className="border-2 border-black-200 focus:border-red-200 w-full h-16 px-4 bg-black-100
      rounded-2xl 
      items-center
      flex-row space-x-4
      "
    >
      <TextInput
        className="text-base mt-0.5 flex-1 font-pregular"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
      />
    
        <TouchableOpacity >
          <Image
            source={icons.search}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
   
    </View>
  );
};

export default SearchInput;
