import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons/faFaceLaugh";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons/faRightToBracket";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "intro.js/introjs.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Poster from "../assets/Poster.png";
import { AntiHack, handleAuth } from "../scripts/Auth";
const FormSignUp = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [goToLogin, setGoToLogin] = useState(false);
  const handleClick = () => {
    setGoToLogin(true);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };
  // const steps = [
  //   {
  //     element: "#username",
  //     intro: "Nhập tài khoản mới vào đây.",
  //   },
  //   {
  //     element: "#password",
  //     intro: "Nhập mật khẩu.",
  //   },
  //   {
  //     element: "#submit",
  //     intro: "Nhấn vào đây để đăng kí.",
  //   },
  // ];

  return (
    <div
      className={`flex ${goToLogin && "animate-pulse duration-500"} items-center justify-center`}
    >
      {/* <Steps
        enabled={!goToLogin}
        steps={steps}
        initialStep={0}
        onExit={() => {
          console.clear();
        }}
        options={{
          prevLabel: "Quay lại",
          nextLabel: "Tiếp tục",
          doneLabel: "Hoàn tất",
        }}
      /> */}
      <div className="flex w-2/3 gap-3 rounded-lg bg-gradient-to-r from-pink-500 via-pink-600 to-pink-400 p-4 shadow-2xl shadow-pink-500 drop-shadow-2xl">
        <div className="w-1/2 rounded-lg">
          <img src={Poster} alt="" className="rounded-lg object-cover" />
        </div>
        <div className="flex w-1/2 flex-col p-2 text-white">
          <b className="mb-5 text-2xl">
            <FontAwesomeIcon icon={faFaceLaugh} /> Đăng kí tài khoản
          </b>
          <label htmlFor="username">
            <b className="text-xl">
              <FontAwesomeIcon icon={faUserPlus} /> Tài khoản mới
            </b>
            <input
              id="username"
              type="text"
              className="rounded-lg border border-white bg-transparent p-2"
              placeholder="Nhập tài khoản mới..."
              ref={usernameRef}
              onChange={(e) => {
                setUsernameValue(AntiHack(e));
              }}
              value={usernameValue}
              aria-autocomplete="none"
              autoComplete="off"
            />
          </label>
          <label htmlFor="password">
            <b className="mt-2 text-xl">
              <FontAwesomeIcon icon={faKey} /> Mật khẩu mới
            </b>
            <input
              id="password"
              type="password"
              className="rounded-lg border border-white bg-transparent p-2"
              placeholder="Nhập mật khẩu mới..."
              onChange={(e) => {
                setPasswordValue(AntiHack(e));
              }}
              value={passwordValue}
              aria-autocomplete="none"
              autoComplete="off"
            />
          </label>
          <button
            className="cursor-copy self-end"
            onClick={() => {
              handleClick();
            }}
          >
            Đã có tài khoản{" "}
            <b className="cursor-pointer hover:underline">Đăng nhập ngay</b>
          </button>
          <button
            id="submit"
            className="mt-2 rounded-lg border-2 border-white bg-gradient-to-r from-pink-300 via-pink-500 to-pink-500 p-2 font-bold text-white hover:from-pink-500 hover:via-pink-400 hover:to-pink-300"
            onClick={() => {
              handleAuth();
            }}
          >
            Đăng Kí <FontAwesomeIcon icon={faRightToBracket} />
          </button>
          <button className="mt-auto self-center">
            2024 © Copyright. OvFTeam 💖
          </button>
        </div>
      </div>
    </div>
  );
};
export default FormSignUp;
