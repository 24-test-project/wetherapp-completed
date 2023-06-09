import React from "react";
// *은 현재 import된 파일에서 export된 모든 항목을 객체형태로 가져옵니다.
// as를 통해 이름을 styled로 바꾸어줍니다.
// styled.정의한 styledCompoent 로 접근하면됩니다.
import * as styled from "./WetherStyles"; 

export default function WeatherUI({
  weatherInfo,
  isSunset,
  handleReload,
  isLoading,
  logout,
  loginUser,
}) {
  return (
    <>
      <styled.MainTitle className="a11y-hidden">날씨 페이지</styled.MainTitle>
      <styled.UserName>{loginUser}님 환영합니다.</styled.UserName>
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
