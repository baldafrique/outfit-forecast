import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

/* eslint-disable */
export default function CurrentWeather() {
  const apikey = "1eb1d18602c0e2dde562cdc2005a4495";

  //현재(current) 날씨 data에 관한 변수들
  //도시이름
  const [name, setname] = useState("none");
  //현재온도
  const [temperature, settemperature] = useState(0);

  function get() {
    return temperature;
  }
  //바람세기
  const [windspeed, setwindspeed] = useState(0);
  //날씨영어설명
  const [description, setdescription] = useState("none");
  //체감온도
  const [feels_like, setfeels_like] = useState(0);
  //최저기온
  const [temp_min, settemp_min] = useState(0);
  //최고기온
  const [temp_max, settemp_max] = useState(0);
  //습도
  const [humidity, sethumidity] = useState(0);
  //아이콘ID
  const [IconID, setIconID] = useState("none");

  //위도, 경도
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);

  //위도,경도를 구하는 method

  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    setlatitude(latitude);
    setlongitude(longitude);
  };

  useEffect(() => {
    ask();
  }, []);

  //도시의 날씨 data를 api를 통해 구하는 method

  const getJSON = function (url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
      const status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  };
  //현재 날씨 data를 가져오는 url
  getJSON(
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apikey +
      "&units=metric",
    function (err, data) {
      if (err !== null) {
        alert("예상치 못한 오류 발생1." + err);
      } else {
        loadCurrentWeather(data);
      }
    }
  );
  function loadCurrentWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, temp_min, temp_max, humidity } = data.main;
    const { speed } = data.wind;

    setname(name);
    settemperature(temp);
    setwindspeed(speed);
    setfeels_like(feels_like);
    settemp_min(temp_min);
    settemp_max(temp_max);
    sethumidity(humidity);
    setIconID(icon);
    setdescription(description);
  }
  const Uri = "http://openweathermap.org/img/wn/" + IconID + "@2x.png";

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Image
        style={styles.currentimg}
        source={{
          uri: Uri,
        }}
      />
      <Text>{description}</Text>
      <Text>{temperature}°C</Text>

      <Text></Text>
      <Text></Text>
      <Text></Text>

      <Text>날씨정보</Text>
      <Text></Text>
      <Text>체감온도: {feels_like}°C</Text>
      <Text>최저기온: {temp_min}°C</Text>
      <Text>최고기온: {temp_max}°C</Text>
      <Text>습도: {humidity}%</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    backgroundColor: "whilte",
    color: "green",
    paddingHorizontal: 50,
    paddingVertical: 30,
    fontSize: 20,
  },
  currentimg: {
    width: 150,
    height: 100,
  },
  forecastimg: {
    width: 50,
    height: 100,
    marginRight: 10,
  },
  forecastView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
