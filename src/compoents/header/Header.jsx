import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin: 50px 0 20px 0;
`;
export const LogoutBtn = styled.button`
  background: url("/img/logout.png") no-repeat left / 20px;
  border: none;
  position: absolute;
  top: 20px;
  left: 20px;
  padding-left: 21px;
  cursor: pointer;
`;
export default function Header() {
  const { loginUser, setLoginUser } = useContext(UserContext);

  function logout() {
    if (window.confirm("정말 로그아웃 하겠습니까?")) {
      // localstorag에서 유저정보 삭제
      localStorage.removeItem("loginUser");
      // 유저 상태 초기화
      setLoginUser("");
    }
  }

  return (
    <>
      <Title>24 WeatherApp</Title>
      {loginUser&&<LogoutBtn onClick={logout}>로그아웃</LogoutBtn>}
    </>
  );
}
