import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getValueOfCookie } from "../../scripts/Function";

const Setting = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const updateInfo = () => {
    if (name === "" || password === "") {
      document.getElementById("password")?.focus();
      toast.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    window.chrome.webview.postMessage({
      type: "updateStudentAccount",
      name,
      username,
      password,
    });
    document.cookie = `name=${name}; path=/`;
    toast.success("Cập nhật thông tin thành công!");
    navigate(0);
  };
  useEffect(() => {
    setName(getValueOfCookie("name"));
    setUsername(getValueOfCookie("username"));
  }, []);
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <b className="text-3xl text-pink-500">
        <FontAwesomeIcon icon={faGear} /> Cài đặt
      </b>
      <div className="mt-4 flex w-full flex-col gap-2 self-start rounded-lg bg-white p-4 text-xl text-pink-500 shadow-2xl">
        <label htmlFor="name">
          <b className="text-pink-500">Tên</b>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nhập tên đầy đủ..."
            className="rounded-lg border border-pink-500 px-4 py-2 font-bold"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateInfo();
            }}
            aria-autocomplete="none"
          />
        </label>
        <label htmlFor="username">
          <b className="text-pink-500">Tên người dùng</b>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Nhập tên người dùng..."
            className="select-none rounded-lg border border-pink-500 px-4 py-2 font-bold text-pink-200"
            value={username}
            readOnly
          />
        </label>
        <label htmlFor="password">
          <b className="text-pink-500">Mật khẩu</b>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Nhập mật khẩu..."
            className="rounded-lg border border-pink-500 px-4 py-2 font-bold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateInfo();
            }}
          />
        </label>
        <button
          className="mt-2 w-full rounded-lg border border-pink-500 bg-pink-600 p-2 font-bold text-white"
          onClick={() => {
            updateInfo();
          }}
        >
          Lưu lại
        </button>
      </div>
    </div>
  );
};

export default Setting;
