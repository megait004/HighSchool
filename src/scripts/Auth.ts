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

export { AntiHack, handleAuth };
