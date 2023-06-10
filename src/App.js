import { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import Login from "./compoents/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Weather from "./compoents/weather/Weather_container";
import Signup from "./compoents/signup/Signup";
import Header from "./compoents/header/Header";
import { UserContext } from "./context/UserContext";
function App() {
  // 회원정보 상태 관리
  const [userDB, setUserDB] = useState(
    JSON.parse(localStorage.getItem("userDB")) || [],
  );
  // 현재 로그인한 유저 관리
  // 페이지 분기처리에 사용
  const [loginUser, setLoginUser] = useState(
    localStorage.getItem("loginUser") || "",
  );
    
  // useEffect를 통해 유저DB가 바뀌면(회원가입시) 로컬스토리지에 해당 정보저장
  useEffect(() => {
    localStorage.setItem("userDB", JSON.stringify(userDB));
  }, [userDB]);

  return (
    <UserContext.Provider
      value={{ loginUser, setLoginUser, userDB, setUserDB }}
    >
      <Header />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              loginUser ? (
                <Navigate to="/weather" />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/weather"
            element={
              loginUser ? (
                <Weather/>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
