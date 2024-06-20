import { toast } from "react-toastify";
const handleAuth = () => {
  const usernameElement = document.getElementById(
    "username",
  ) as HTMLInputElement;
  const username = usernameElement?.value;
  const passwordElement = document.getElementById(
    "password",
  ) as HTMLInputElement;
  const password = passwordElement?.value;
  if (username === "") {
    toast.warning(`Vui lòng nhập tài khoản`);
    document.getElementById("username")?.focus();
  } else if (password === "") {
    toast.warning(`Vui lòng nhập mật khẩu`);
    document.getElementById("password")?.focus();
  } else {
    window.chrome.webview.postMessage({ type: "login", username, password });
  }
};

const handleSignUp = () => {
  const usernameElement = document.getElementById(
    "username",
  ) as HTMLInputElement;
  const username = usernameElement?.value;
  const passwordElement = document.getElementById(
    "password",
  ) as HTMLInputElement;
  const password = passwordElement?.value;
  const nameElement = document.getElementById("name") as HTMLInputElement;
  const name = nameElement?.value;
  const classIDElement = document.getElementById("grade") as HTMLInputElement;
  const classID = classIDElement?.value;
  if (username === "") {
    toast.warning(`Vui lòng nhập tài khoản`);
    document.getElementById("username")?.focus();
  } else if (username.length === 6) {
    toast.warning(`Tài khoản không hợp lệ `);
    document.getElementById("username")?.focus();
  } else if (password === "") {
    toast.warning(`Vui lòng nhập mật khẩu`);
    document.getElementById("password")?.focus();
  } else {
    window.chrome.webview.postMessage({
      type: "signup",
      username,
      password,
      name,
      classID,
    });
  }
};

const signUpSuccess = () => {
  toast.success(`Đăng ký thành công`);
  setTimeout(() => {
    window.location.href = "/login";
  }, 1500);
};

const AntiHack = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.currentTarget.value.includes(" ")) {
    return e.currentTarget.value.replace(" ", "");
  } else if (e.currentTarget.value.includes('"')) {
    return e.currentTarget.value.replace('"', "");
  } else if (e.currentTarget.value.includes("'")) {
    return e.currentTarget.value.replace("'", "");
  } else {
    return e.currentTarget.value;
  }
};

// addTeacher
export { AntiHack, handleAuth, handleSignUp, signUpSuccess };
