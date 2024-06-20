import { faUserTie } from "@fortawesome/free-solid-svg-icons/faUserTie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

const AddTeacher = ({
  showModalAdd,
}: {
  showModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [classID, setClassID] = useState(10);
  const addTeacher = () => {
    if (
      (username !== "" &&
        name !== "" &&
        password !== "" &&
        classID.toString() !== "" &&
        classID === 10) ||
      classID === 11 ||
      classID === 12
    ) {
      {
        window.chrome.webview.postMessage({
          type: "addTeacher",
          username,
          password,
          name,
          classID: classID.toString(),
        });
      }
    } else {
      toast.warning(`Vui lòng nhập đầy đủ thông tin`);
      return;
    }
  };
  return (
    <div
      className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-20"
      onClick={() => {
        showModalAdd(false);
      }}
    >
      <div
        className="flex w-1/3 flex-col items-center justify-center gap-1 rounded-lg bg-white p-2 shadow-2xl shadow-pink-600 drop-shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="mb-2 text-2xl font-bold">
          <FontAwesomeIcon icon={faUserTie} /> Thêm giáo viên
        </h1>
        <label htmlFor="name" className="w-full">
          <b>Họ và Tên:</b>
          <input
            type="text"
            id="name"
            className="rounded-lg border border-pink-600 p-1 px-2"
            placeholder="Tên giáo viên"
            aria-autocomplete="none"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </label>
        <label htmlFor="username" className="w-full">
          <b>Tên tài khoản:</b>
          <input
            type="text"
            id="username"
            className="rounded-lg border border-pink-600 p-1 px-2"
            placeholder="Tên đăng nhập"
            aria-autocomplete="none"
            onBlur={(e) => {
              if (e.currentTarget.value.length !== 6) {
                toast.warning("Tên tài khoản phải có 6 ký tự");
                e.currentTarget.focus();
              }
            }}
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </label>
        <label htmlFor="password" className="w-full">
          <b>Mật khẩu:</b>
          <input
            type="password"
            id="password"
            className="rounded-lg border border-pink-600 p-1 px-2"
            placeholder="Tạo mật khẩu"
            aria-autocomplete="none"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <label htmlFor="class" className="w-full">
          <b>Khối:</b>
          <input
            type="number"
            id="class"
            className="rounded-lg border border-pink-600 p-1 px-2 placeholder:font-bold placeholder:text-pink-300"
            placeholder="Khối 10, 11, 12"
            aria-autocomplete="none"
            onBlur={(e) => {
              if (
                e.currentTarget.value !== "10" &&
                e.currentTarget.value !== "11" &&
                e.currentTarget.value !== "12"
              ) {
                e.currentTarget.value = "";
              }
            }}
            value={classID}
            onChange={(e) => setClassID(parseInt(e.currentTarget.value))}
          />
        </label>
        <button
          className="mt-2 w-full rounded-lg bg-pink-600 p-2 py-1 font-bold text-white"
          onClick={addTeacher}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default AddTeacher;
