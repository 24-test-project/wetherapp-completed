import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";

const Wrapper = styled.div`
  width: calc(100% - 60px);
  max-width: 400px;
  margin: 100px auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
  background-color: #e7ecf8;
`;
const SignupTitle = styled.h2`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;
const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const InputLabel = styled.label`
  display: block;
  text-align: left;
  font-size: 14px;
  align-self: flex-start;
  text-indent: 30px;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 280px;
  padding: 15px 20px;
  border: 2px solid #bdbdbd;
  margin-bottom: 20px;
`;
const SubmitBtn = styled.button`
  font-size: 20px;
  border-radius: 10px;
  padding: 10px 20px;
  width: 280px;
  // props로 disabled를 받음 disabled라면 배경색상을 #eee 아니라면 orange로 설정
  background-color: ${(props) => (props.disabled ? "#eee" : "orange")};
  // props로 disabled를 받음 disabled라면 색상을 #000 아니라면 #fff로 설정
  color: ${(props) => (props.disabled ? "#000" : "#fff")};
  font-weight: bold;
  margin-top: 20px;
  border: none;
  // props로 disabled를 받음 disabled라면 cursor  not-allowed로 아니라면 pointer로 설정
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const ErrMsg = styled.span`
  font-size: 12px;
  color: crimson;
  margin: -15px 0 15px 0;
`;
export default function Signup() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userDB, setUserDB } = useContext(UserContext);

  // 유효성 검사를 관리할 상태
  // errMessage : 에러가 발생할때 출력할 메세지
  // isValid 유효성 체크
  const [nicknameValidation, setNicknameValidation] = useState({
    errMessage: "",
    isValid: false,
  });
  const [emailValidation, setEmailValidation] = useState({
    errMessage: "",
    isValid: false,
  });
  const [passwordValidation, setPasswordValidation] = useState({
    errMessage: "",
    isValid: false,
  });
  // 폼의 validation 상태 관리(모든 input이 유효한지)
  // 모든 상태가 유효하다면 => 회원가입 버튼 색상 변경 및 비활성화
  const [isFormValid, setFormValid] = useState(false);

  // 유효성 검사 정규표현식
  const nicknameReg = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{3,10}$/; // 4~10자 한글,숫자,영문
  const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/; // 이메일 형식
  const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/; // 영어+문자+특수문자 조합으로 이루어진 8~16글자

  const navigation = useNavigate();
  // input들의 상태가 바뀔때마다 모든 input이 유효한지 검사
  // 모든 input이 유효하다면 formValid 상태를 true로 변경
  useEffect(() => {
    setFormValid(
      nicknameValidation.isValid &&
        emailValidation.isValid &&
        passwordValidation.isValid,
    );
  }, [nicknameValidation, emailValidation, passwordValidation]);

  function onChangeInput(e, setTarget) {
    setTarget(e.target.value);
  }

  // 유효성 검사 함수
  // 인자 event객체, reg(정규표현식), errMsg, setErrorMsg(상태를 바꿀 에러 메세지 함수)

  function validation(e, reg, errMessage, setErrorMsg) {
    // 만약에 값이 없는 경우는 에러 메세지를 표시 하지 않고, 유효성은 false로 상태변경
    if (!e.target.value) {
      setErrorMsg({ errMessage: "", isValid: false });
      return;
    }
    // 유효성 검사가 일치하지 않을 경우는 에러메세지를 넣어주고, 유효성은 false로 상태변경
    if (!reg.test(e.target.value)) {
      // 여기서 errMessage: errMessage를 안넣은 이유는 축약 문법을 사용한 것
      // 객체의 key 값과 value 값이 같다면 아래 처럼 값을 하나만 적어주면 key값과 value값이 적용됨
      setErrorMsg({ errMessage, isValid: false });
    } else {
      // 유효성 검사가 일치한다면 중복검사를 함
      checkDupliaction(e, setErrorMsg);
    }
  }

  // 닉네임, 이메일 중복검사 함수
  function checkDupliaction(e, setErrorMsg) {
    // target id 값에 따라 errMassage 분기 처리
    const errMessage =
      e.target.id === "input-nickname"
        ? "중복된 닉네임 입니다!"
        : "중복된 이메일 입니다!";
    // target의 id 값에 따라 다르게 처리
    const proerty = e.target.id === "input-nickname" ? "nickname" : "email";
    // userDB에서 중복된 값을 찾음
    const isDuplicaion = userDB.find((el) => el[proerty] === e.target.value);
    if (isDuplicaion) {
      setErrorMsg({ errMessage, isValid: false });
    } else {
      setErrorMsg({ errMessage: "", isValid: true });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      nickname: nickname,
      email: email,
      password: password,
    };
    // 기존 회원 데이터에서 새로 받은 유저데이터를 추가
    setUserDB((prev) => [...prev, userData]);
    alert("회원가입이 완료되었습니다!");
    navigation("/");
  }
  return (
    <Wrapper>
      <SignupTitle>회원가입</SignupTitle>
      <SignupForm onSubmit={(e) => handleSubmit(e)}>
        <InputLabel htmlFor="input-nickname">닉네임</InputLabel>
        <Input
          id="input-nickname"
          maxLength={10}
          required
          value={nickname}
          onChange={(e) => onChangeInput(e, setNickname)}
          onBlur={(e) =>
            validation(
              e,
              nicknameReg,
              "닉네임은 4-10자 영문,한글,숫자만 입력가능합니다!",
              setNicknameValidation,
            )
          }
        />
        {/* 에러 메세지가 있을 경우에만 에러 메세지를 표시 */}
        {nicknameValidation.errMessage && (
          <ErrMsg>{nicknameValidation.errMessage}</ErrMsg>
        )}

        <InputLabel htmlFor="input-email">이메일</InputLabel>
        <Input
          id="input-email"
          type="email"
          required
          value={email}
          onChange={(e) => onChangeInput(e, setEmail)}
          onBlur={(e) =>
            validation(
              e,
              emailReg,
              "이메일 형식을 확인해주세요!",
              setEmailValidation,
            )
          }
        />
        {emailValidation.errMessage && (
          <ErrMsg>{emailValidation.errMessage}</ErrMsg>
        )}

        <InputLabel htmlFor="input-password">비밀번호</InputLabel>
        <Input
          id="input-password"
          type="password"
          maxLength={16}
          required
          value={password}
          onChange={(e) => onChangeInput(e, setPassword)}
          onBlur={(e) =>
            validation(
              e,
              passwordReg,
              "비밀번호는 8~16자 영문+숫자+특수문자 조합입니다!",
              setPasswordValidation,
            )
          }
        />
        {passwordValidation.errMessage && (
          <ErrMsg>{passwordValidation.errMessage}</ErrMsg>
        )}
        {/*disabled를 isFormvVaild로 설정 =>  isFormvVaild로가 유효하면 disable가 false*/}
        {/* 이 값을 styled componets에서 props로 받아 submitBtn에 배경색상과 
        마우스 커서 변경 위에서 styledCompoent SubmitBtn 참고 */}
        <SubmitBtn type="submit" disabled={!isFormValid}>
          회원가입
        </SubmitBtn>
      </SignupForm>
    </Wrapper>
  );
}
