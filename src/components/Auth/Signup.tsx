import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import CustomButton from "../UI/Button/CustomButton";
import axios from "axios";
import { Input } from "antd";
import { useAppDispatch } from "@/store/hooks/hooks";
import {
  setModal,
  setUserNumberStore,
  setUserToken,
} from "@/store/maryamSlice/maryamSlice";

const Signup: React.FC = () => {
  const [userNumber, setUserNumber] = useState("");
  const [userNumberValidate, setUserNumberValidate] = useState(false);
  const [varificationStep, setVarificationStep] = useState(false);
  const [sms, setSMS] = useState("");
  const ContactNumberMask = "{00} {000}-{00}-{00}";
  const dispatch = useAppDispatch();

  const getSMSCode = async () => {
    if (userNumber) {
      setUserNumberValidate(false);
      try {
        const response = await axios.post(
          `https://maryam.webclub.uz/api/login?phone=${userNumber.replace(
            /[\s-]/g,
            ""
          )}`
        );

        if (response.status === 200) setVarificationStep(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setUserNumberValidate(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://maryam.webclub.uz/api/verify?phone=${userNumber.replace(
          /[\s-]/g,
          ""
        )}&sms_code=${sms}`
      );

      if (response.status === 200) {
        dispatch(setUserToken(response.data.token));
        dispatch(setModal(false));
        dispatch(setUserNumberStore(userNumber));
        localStorage.setItem(
          "user",
          JSON.stringify({ token: response.data.token, phone: userNumber })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {varificationStep ? (
        <div className="auth-box varify signup">
          <form onSubmit={handleSubmit}>
            <h3 className="title">Регистрация</h3>
            <div className="desc">
              <p className="user-numbee">
                <span>+998 {userNumber}</span> СМС-код был отправлен на
              </p>
            </div>

            <Input.OTP length={5} onChange={(e) => setSMS(e)} />

            <button className="get-sms">Подтверждение</button>
          </form>
          <CustomButton cls="centered" type="regular">
            Вход в систему
          </CustomButton>
        </div>
      ) : (
        <div className="auth-box signup">
          <h3 className="title">Регистрация</h3>
          <div className="phone-input_box">
            <label htmlFor="phone-number">Номер телефона</label>
            <div
              className={userNumberValidate ? "input-box error" : "input-box"}
              style={userNumberValidate ? { border: "1px solid red" } : {}}
            >
              <span>+998</span>
              <IMaskInput
                className="form-inputMask"
                mask={ContactNumberMask}
                placeholder="90 000-00-00"
                onAccept={(e) => {
                  setUserNumber(e);
                  if (e.length > 1) {
                    setUserNumberValidate(false);
                  } else {
                    setUserNumberValidate(true);
                  }
                }}
                required
              />
            </div>
          </div>
          <button className="get-sms" onClick={getSMSCode}>
            Получить код
          </button>

          <button className="to-login">Вход в систему</button>
        </div>
      )}
    </>
  );
};

export default Signup;
