import { StatusBar } from "expo-status-bar";
import { Text, View, Alert, Image } from "react-native";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useRef, forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CurrnetWeather from "./components/CurrentWeather.js";
import TodayWeather from "./components/TodayWeather.js";
import WeekelyWeather from "./components/WeeklyWeather.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // 아이콘 import

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Navigation />
    </>
  );
}
