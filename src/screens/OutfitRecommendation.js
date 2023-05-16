import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OutfitRecommendation = ({ weather }) => {
  // 날씨에 따른 옷 추천 로직
  let recommendation = "";
  if (weather === "sunny") {
    recommendation = "오늘은 햇살이 좋으니 가벼운 옷을 입어보세요.";
  } else if (weather === "cloudy") {
    recommendation = "하늘이 흐리니 자켓을 준비하는 것이 좋을 것 같아요.";
  } else if (weather === "rainy") {
    recommendation = "비가 오니 우산을 챙기고 방수 재킷을 입어주세요.";
  } else {
    recommendation = "오늘은 특별한 날씨 정보가 없습니다.";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{recommendation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OutfitRecommendation;
