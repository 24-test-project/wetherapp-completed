import React from "react";
import * as styled from "./WetherStyles";

export default function WeatherUI({
  weatherInfo,
  isSunset,
  handleReload,
  isLoading,
  logout,
}) {
  return (
    <>
      <styled.MainTitle className="a11y-hidden">날씨 페이지</styled.MainTitle>
      <styled.UserName>
        {localStorage.getItem("userNickname")}님 환영합니다.
      </styled.UserName>
      {weatherInfo ? (
        <styled.WeatherWrapper isSunset={isSunset}>
          <styled.WeatherTitle>현재 날씨</styled.WeatherTitle>
          <styled.WeatherInfo>
            <styled.WeatherFigure>
              <styled.WeatherIcon
                src={`http://openweathermap.org/img/w/${weatherInfo.icon}.png`}
                alt="날씨 아이콘"
              />
              <styled.WeatherText>{weatherInfo.weatherText}</styled.WeatherText>
            </styled.WeatherFigure>

            <styled.WeatherTemp>{weatherInfo.temp} &#8451;</styled.WeatherTemp>
            <styled.WeatherHumidity>
              습도 {weatherInfo.humidity}%
            </styled.WeatherHumidity>
          </styled.WeatherInfo>
          <styled.WeatherUpdate>
            <styled.ReloadBtn
              isSunset={isSunset}
              type="button"
              onClick={() => handleReload()}
            ></styled.ReloadBtn>
            <styled.WeatherTime>{weatherInfo.reloadTime}</styled.WeatherTime>
          </styled.WeatherUpdate>
          <styled.WeatherLocation>{weatherInfo.place}</styled.WeatherLocation>
          {isLoading && (
            <styled.WeatherLoading>
              <styled.WeatherLoadingImg src="/img/loading.gif" />
              Loading...
            </styled.WeatherLoading>
          )}
        </styled.WeatherWrapper>
      ) : null}
      <styled.LogoutBtn onClick={logout}>로그아웃</styled.LogoutBtn>
    </>
  );
}
