import React from "react";
import { ActivityIndicator, View } from "react-native";

// import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} className='bg-background' >
        <ActivityIndicator color={'#7C3AED'} />
    </View>
  );
};

export default Loading;
