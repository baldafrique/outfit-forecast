import React from "react";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 40px;
`;

const Image = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container insets={insets}>
      <StyledImage source={require("../../assets/image.png")} />
    </Container>
  );
};

const StyledImage = styled.Image`
  width: 250px;
  height: 250px;
`;

export default Image;
