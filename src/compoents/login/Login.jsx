import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 110px);
`;
const LoginTitle = styled.h2``;
const LoginForm = styled.form`
  width: calc(100% - 60px);
  max-width: 400px;
  background-color: #f2f2f2;
  box-shadow: 0 8px 20px rgba(35, 0, 77, 0.2);
  border-radius: 20px;
  padding: 30px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
  animation: animateLogin 1s;
`;
const LoginFormTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0px;
  text-align: center;
`;
const InputLabel = styled.label``;
const Input = styled.input`
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  font-weight: bold;
`;
const SingupText = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
`;
const SingupLink = styled(Link)`
  color: #4ad395;
  cursor: pointer;
  text-decoration: none;
`;
const SubmitBtn = styled.button`
  background-color: #16e789;
  border: none;
  border-radius: 10px;
  padding: 18px 0px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0px;
  cursor: pointer;

  @keyframes animateLogin {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.1, 1.1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;

export default function Login({ userDB, setLoginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onChangeInput(e, setTarget) {
    setTarget(e.target.value.trim());
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      alert("이메일을 입력해주세요!");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요!");
      return;
    }
    // 회원정보에서 현재 로그인하려는 정보와 일치하는 회원정보가 있는 찾습니다.
    const findUser = userDB.find(
      (el) => el.email === email && el.password === password,
    );
    if (findUser) {
      // 회원정보DB에서 입력한 이메일과 일치하는 유저 닉네임을 가져옵니다.
      const user = userDB.find((el) => el.email === email).nickname;
      // 유저 닉네임을 로컬스토리지에 저장하고, loginUser의 상태도 변경해줍니다,.
      localStorage.setItem("loginUser", user);
      setLoginUser(user);
    } else {
      setEmail("");
      setPassword("");
      alert("일치하는 유저 정보가 없습니다.");
    }
  }

  return (
    <LoginWrapper>
      <LoginTitle className="a11y-hidden">로그인페이지</LoginTitle>
      <LoginForm>
        <LoginFormTitle>로그인</LoginFormTitle>

        <InputLabel className="a11y-hidden" htmlFor="input-email">
          이메일
        </InputLabel>
        <Input
          id="input-email"
          value={email}
          onChange={(e) => onChangeInput(e, setEmail)}
          type="email"
          placeholder="Email"
          required
        />

        <InputLabel className="a11y-hidden" htmlFor="input-paswsord">
          비밀번호
        </InputLabel>
        <Input
          id="input-paswsord"
          value={password}
          onChange={(e) => onChangeInput(e, setPassword)}
          type="password"
          placeholder="Password"
          required
        />
        <SubmitBtn onClick={(e) => handleSubmit(e)}>로그인</SubmitBtn>
        <SingupText>
          현재계정이 없으신가요? <SingupLink to="/signup">회원가입</SingupLink>
        </SingupText>
      </LoginForm>
    </LoginWrapper>
  );
}
