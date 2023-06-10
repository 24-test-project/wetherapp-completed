import React, { useContext, useEffect, useState } from "react";
import WeatherUI from "./Weather_presenter ";
import { UserContext } from "../../context/UserContext";

// 코드 길이가 너무 길어서져서 파일을 나누었습니다.
// weather 함수들이 들어있는 컴포넌트와 weather UI컴포넌트로 나누었습니다.
// 이런 패턴을 container presenter 패턴라고 합니다.
// 이렇게 하면 유지 보수가 좋아진다는 장점이 있지만 UI에 사용되는 props를 추가로 전달해주어야해서 props Drilling 문제가 있을 수 있습니다.
// styled compoents도 따로 js파일로 나누어서 import 해주었습니다.
// container presenter 패턴의 자세한 설명은 아래 링크를 참고해주세요.
// https://velog.io/@crab4862/Container-Presenter-%ED%8C%A8%ED%84%B4
export default function Weather() {
  // 날씨 정보 상태
  const [weatherInfo, setWeatherInfo] = useState(null);
  // 현재 일몰인지 아닌지 파악하는 상태
  const [isSunset, setIsSunset] = useState(false);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  
  function askForCoords() {
    // 위치를 받아오는 자바스크립트 API 자세한 설명은 아래 링크를 참고해주세요
    // https://computer-science-student.tistory.com/760
    // 첫번 째 콜백함수는 성공 시 실행 할 함수, 두번 째 콜백함수는 실패 시 실행 할 함수
    // 성공 시에는 좌표가 콜백함수의 인자로 넘어옴
    // 실패 시에는 에러가 콜백함수의 인자로 넘어옴
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordsObj = {
          latitude,
          longitude,
        };
        // 현재 위치정보를 localstorage에 저장
        saveCoords(coordsObj);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          console.error("사용자가 위치 정보 동의를 거부했습니다!");
        } else {
          console.error("날씨 정보를 가져올 수 없습니다!", error);
        }
        console.log(error);
      },
    );
  }

  // 현재 좌표를 로컬스토리지에 저장하는 함수
  // 로컬스토리지에 이미 좌표가 있다면 불필요한 요청을 막으려고 사용
  async function saveCoords(coordsObj) {
    localStorage.setItem("coords", JSON.stringify(coordsObj));
  }

  // 현재 시간을 정의한 날짜 형식으로 리턴하는 함수
  function formatTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = "0" + now.getMinutes();
    let ampm = now.getHours() < 12 ? "오전" : "오후";
    hours = "0" + (now.getHours() % 12) || 12;
    return `${ampm} ${hours.slice(-2)}:${minutes.slice(-2)}`;
  }

  // 날씨 정보를 받아오는 함수
  async function getWeather(lat, lon) {
    const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    try {
      // API 요청
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      );
      const json = await response.json();
      // console.log(json); => 주석을 해제해서 날씨 정보 데이터를 살펴보세요
      const temperature = parseFloat(json.main.temp - 273.15).toFixed(1);
      const place = json.name; // 사용자 위치
      const humidity = json.main.humidity;
      const icon = json.weather[0].icon;
      const sunrise = json.sys.sunrise * 1000;
      const sunset = json.sys.sunset * 1000;
      // 새로고침 시간를 formatTime 함수를 통해 현재 시간을 정의된 시간 형식에 맞게 변환해줍니다.
      const reloadTime = formatTime();

      // 날씨데이터에서 날씨 설명을 가져옵니다.
      let weatherText = json.weather[0].description;

      // 날씨 텍스트를 한글로 변환
      if (weatherText === "clear sky") {
        weatherText = "맑음";
      } else if (weatherText === "few clouds") {
        weatherText = "구름 조금";
      } else if (weatherText === "scattered clouds") {
        weatherText = "구름 낌";
      } else if (weatherText === "broken clouds" || "overcast clouds") {
        weatherText = "흐림";
      } else if (weatherText === "shower Rain") {
        weatherText = "소나기";
      } else if (weatherText === "rain") {
        weatherText = "비";
      } else if (weatherText === "thunderstorm") {
        weatherText = "천둥";
      } else if (weatherText === "snow") {
        weatherText = "눈";
      } else if (weatherText === "mist") {
        weatherText = "안개";
      }

      // 날씨 정보 저장 객체
      const weatherInfo = {
        temp: temperature,
        place,
        humidity,
        icon,
        reloadTime,
        sunrise,
        sunset,
        weatherText,
      };
      return weatherInfo;
    } catch (error) {
      console.log("Error fetching weather:", error);
    }
  }

  // 날씨 정보 새로고침 버튼 이벤트 함수
  function handleReload() {
    const fetchData = async () => {
      // 로딩 상태를 true로
      setIsLoading(true);
      // 현재 위치좌표를 localstorage에 저장
      const coords = JSON.parse(localStorage.getItem("coords"));
      if (coords) {
        // localstorage에 좌표 정보가 있는 경우에만 날씨 데이터를 가져옵니다.
        const { latitude, longitude } = coords;
        // 날씨 데이터를 가져옵니다.
        const weatherData = await getWeather(latitude, longitude);
        setWeatherInfo(weatherData);
      } else {
        // 좌표 정보가 없는 경우에는 위치 정보를 요청합니다.
        askForCoords();
      }
      // 로딩 상태를 false로
      setIsLoading(false);
    };
    fetchData();
  }


  useEffect(() => {
    // 비동기 처리 async 사용을 위해 함수를 정의
    const fetchData = async () => {
      const coords = JSON.parse(localStorage.getItem("coords"));
      // 현재 로컬스토리지에 좌표정보가 있다면 추가로 좌표를 불러오지 않습니다.
      if (coords) {
        const { latitude, longitude } = coords;
        // 날씨 정보를 불러옵니다.
        const weatherData = await getWeather(latitude, longitude);
        // 불러온 날씨 정보 데이터를 weatherInfo 상태에 업데이트 합니다.
        setWeatherInfo(weatherData);
        // 현재 시간보다 일몰 시간보다 더 크거나 현재 시간이 일출 시간 보다 작을때
        // isSunset 상태를 true로
        setIsSunset(
          new Date().getTime() >= weatherData.sunset ||
            new Date().getTime() < weatherData.sunrise,
        );
      } else {
        // 로컬스토리지에 좌표정보가 없을 경우 좌표를 불러옵니다.
        await askForCoords();
      }
    };
    fetchData();
  }, []);
  return (
    <WeatherUI
      weatherInfo={weatherInfo}
      isSunset={isSunset}
      handleReload={handleReload}
      isLoading={isLoading}
    />
  );
}
