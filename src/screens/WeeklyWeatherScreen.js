import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import * as Location from "expo-location";
import { Icon } from "react-native-elements";
import moment from "moment";

const screenWidth = Dimensions.get("window").width;

function WeeklyWeather({ weather }) {
  const iconNames = {
    "01d": "weather-sunny",
    "02d": "weather-partly-cloudy",
    "03d": "cloud",
    "04d": "weather-cloudy",
    "09d": "weather-rainy",
    "10d": "weather-pouring",
    "11d": "weather-lightning",
    "13d": "weather-snowy",
    "50d": "weather-fog",

    "01n": "weather-sunny",
    "02n": "weather-partly-cloudy",
    "03n": "cloud",
    "04n": "weather-cloudy",
    "09n": "weather-rainy",
    "10n": "weather-pouring",
    "11n": "weather-lightning",
    "13n": "weather-snowy",
    "50n": "weather-fog",
  };

  // WeeklyWeather 컴포넌트 내부
  const items = weather.filter((item, index) => {
    // 첫 번째 아이템은 현재 시간 이후의 정보이므로 제외합니다.
    if (index === 0) {
      return false;
    }
    // 24시간마다의 정보가 들어있으므로,
    // 오늘이 몇 일인지를 구한 후, 그 날짜의 오후 6시 정보를 가져옵니다.
    const today = moment().startOf("day");
    const date = moment(item.dt_txt);
    const diffDays = date.diff(today, "days");
    const diffHours = date.diff(today, "hours");
    return diffDays >= 0 && diffHours % 24 === 18;
  });

  // 주간 날씨 출력 부분, 가운데 정렬 된 상태, 3일과 2일 총 5일의 날씨를 반으로 나누어서 출력함
  // 각 요일별로 정보를 출력합니다.

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <View style={styles.halfContainer}>
        {items.slice(0, 3).map((item, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.date}>{moment(item.dt_txt).format("M/D")}</Text>
            <Icon
              name={iconNames[item.weather[0].icon]}
              type="material-community"
              size={30}
            />
            {/* Math의 round 함수를 이용해서 소수점 반올림 */}
            {/* temp는 온도, weather.main은 날씨, weather.description은 자세한 날씨 설명 */}
            <Text style={styles.temp}>{Math.round(item.main.temp)}°</Text>
            <Text style={styles.text}>{item.weather[0].main}</Text>
            <Text style={styles.description}>
              {item.weather[0].description}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.halfContainer}>
        {items.slice(3, 5).map((item, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.date}>{moment(item.dt_txt).format("M/D")}</Text>
            <Icon
              name={iconNames[item.weather[0].icon]}
              type="material-community"
              size={30}
            />
            <Text style={styles.temp}>{Math.round(item.main.temp)}°</Text>

            <Text style={styles.text}>{item.weather[0].main}</Text>
            <Text style={styles.description}>
              {item.weather[0].description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function WeeklyWeatherScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  const fetchWeatherData = async () => {
    if (!location) {
      return;
    }

    const { latitude, longitude } = location.coords;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f5cde2b6c0919c951809000b74d10ec8&units=metric`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  return (
    <View style={styles.container}>
      {weatherData ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Weekly Weather</Text>
            <Text style={styles.subtitle}>
              {weatherData.city.name}, {weatherData.city.country}
            </Text>
          </View>
          <WeeklyWeather weather={weatherData.list} />
        </>
      ) : (
        <View style={styles.header}>
          <Text style={styles.title}>Weekly Weather</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: "#4361ee",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#fff",
    marginTop: 5,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth / 5,
    paddingBottom: 20,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: "400",
    color: "#333",
  },
  temp: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  description: {
    fontSize: 13,
    fontWeight: "400",
    color: "#333",
  },
});
