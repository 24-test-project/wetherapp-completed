import styled from "styled-components";

// 코드가 길어져서 따로 분리해서 styles 컴포넌트를 export해서 사용합니다.

export const MainTitle = styled.h2``;
export const LogoutBtn = styled.button`
  background: url("/img/logout.png") no-repeat left / 20px;
  border: none;
  position: absolute;
  top: 20px;
  left: 20px;
  padding-left: 21px;
  cursor: pointer;
`;
export const UserName = styled.p`
  font-size: 20px;
  text-align: center;
`;
export const WeatherWrapper = styled.article`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 60px);
  max-width: 300px;
  padding: 15px;
  border-radius: 10px;
  background: ${(props) =>
    props.isSunset
      ? "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)"
      : "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"};
  color: ${(props) => (props.isSunset ? "#fff" : "#000")};
  font-size: 14px;
`;

export const WeatherTitle = styled.h3``;

export const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
`;
export const WeatherFigure = styled.figure``;
export const WeatherIcon = styled.img`
  width: 70px;
  height: 70px;
  vertical-align: middle;
`;
export const WeatherText = styled.span`
  display: block;
  font-size: 11px;
  text-align: center;
  margin-top: -10px;
  font-weight: bold;
`;
export const WeatherTemp = styled.span`
  font-weight: bold;
  font-size: 16px;
`;
export const WeatherHumidity = styled.span``;
export const WeatherLocation = styled.span`
  position: absolute;
  top: 8px;
  right: 10px;
  padding-left: 14px;
  background: url("/img/location.png") no-repeat left top 2px/ 12px;
  font-weight: bold;
`;
export const WeatherUpdate = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  font-size: 12px;
`;
export const ReloadBtn = styled.button`
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-right: 5px;
  background: ${(props) =>
    props.isSunset
      ? `url("/img/reload-sunset.png") no-repeat left / 15px`
      : `url("/img/reload-sunrise.png") no-repeat left / 15px`};
  border: none;
`;
export const WeatherTime = styled.span``;
export const WeatherLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: bold;
  border-radius: 10px;
`;
export const WeatherLoadingImg = styled.img`
  width: 40px;
  height: 40px;
`;
