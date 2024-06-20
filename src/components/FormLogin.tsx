import { faFaceSmile } from "@fortawesome/free-solid-svg-icons/faFaceSmile";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons/faRightToBracket";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Poster from "../assets/Poster.png";
import { AntiHack, handleAuth } from "../scripts/Auth";
const FormLogin = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [goToSignUp, setGoToSignUp] = useState(false);

  const handleSignUp = () => {
    setGoToSignUp(true);
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  };

  useEffect(() => {
    document.cookie = "account=account";
    usernameRef.current?.focus();
    localStorage.clear();
  }, []);
  return (
    <div
      className={`flex ${goToSignUp && "animate-pulse duration-500"} items-center justify-center`}
    >
      <div className="flex w-2/3 gap-3 rounded-lg bg-gradient-to-r from-pink-300 via-pink-600 to-pink-600 p-4 shadow-2xl">
        <div className="w-1/2 rounded-lg">
          <img src={Poster} alt="" className="rounded-lg object-cover" />
        </div>
        <div className="flex w-1/2 flex-col p-2 text-white">
          <b className="mb-5 text-2xl">
            <FontAwesomeIcon icon={faFaceSmile} /> Đăng nhập
          </b>
          <label htmlFor="username">
            <b className="text-xl">
              <FontAwesomeIcon icon={faUser} /> Tài khoản
            </b>
            <input
              id="username"
              type="text"
              className="rounded-lg border border-white bg-transparent p-2"
              placeholder="Nhập tài khoản..."
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
              <FontAwesomeIcon icon={faLock} /> Mật khẩu
            </b>
            <input
              id="password"
              type="password"
              className="rounded-lg border border-white bg-transparent p-2"
              placeholder="Nhập mật khẩu..."
              onChange={(e) => {
                setPasswordValue(AntiHack(e));
              }}
              value={passwordValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAuth();
                }
              }}
              aria-autocomplete="none"
              autoComplete="off"
            />
          </label>
          <button
            className="cursor-copy self-end"
            onClick={() => {
              handleSignUp();
            }}
          >
            Chưa có tài khoản{" "}
            <b className="cursor-pointer hover:underline">Đăng kí ngay</b>
          </button>
          <button
            className="mt-2 rounded-lg border-2 border-white bg-gradient-to-r from-pink-400 via-pink-600 to-pink-600 p-2 font-bold text-white hover:from-pink-600 hover:via-pink-500 hover:to-pink-400"
            onClick={() => {
              handleAuth();
            }}
          >
            Đăng Nhập <FontAwesomeIcon icon={faRightToBracket} />
          </button>
          <span className="mt-auto self-center">
            2024 © Copyright. OvFTeam 💖
          </span>
        </div>
      </div>
    </div>
  );
};
export default FormLogin;
