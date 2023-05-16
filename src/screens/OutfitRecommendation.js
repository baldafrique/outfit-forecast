import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const OutfitRecommendation = () => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    // 랜덤한 날씨 생성
    const weathers = ["sunny", "cloudy", "rainy"];
    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
    setWeather(randomWeather);
  }, []);

  let top = "";
  let bottom = "";
  let shoes = "";
  let backgroundColor = "";
  let textColor = "";

  if (weather === "sunny") {
    top = "반팔 티셔츠";
    bottom = "반바지";
    shoes = "샌들";
    backgroundColor = "#FAD450";
    textColor = "#333333";
  } else if (weather === "cloudy") {
    top = "얇은 가디건";
    bottom = "청바지";
    shoes = "로퍼";
    backgroundColor = "#BDBDBD";
    textColor = "#333333";
  } else if (weather === "rainy") {
    top = "방수 재킷";
    bottom = "긴 바지";
    shoes = "장화";
    backgroundColor = "#5E85D2";
    textColor = "#FFFFFF";
  } else {
    top = "오늘은 특별한 날씨 정보가 없습니다.";
    bottom = "";
    shoes = "";
    backgroundColor = "#FFFFFF";
    textColor = "#333333";
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        오늘의 옷차림 추천
      </Text>
      <Text style={[styles.outfitItem, { color: textColor }]}>상의: {top}</Text>
      <Text style={[styles.outfitItem, { color: textColor }]}>
        하의: {bottom}
      </Text>
      <Text style={[styles.outfitItem, { color: textColor }]}>
        신발: {shoes}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 8,
  },
  outfitItem: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default OutfitRecommendation;
