import { toast } from "react-toastify";

const goToHome = async () => {
  const username = getValueOfCookie("username");
  await window.chrome.webview.postMessage({
    type: "getInfo",
    username: username,
  });
  if (getValueOfCookie("username") !== "admin") {
    window.location.href = "/home/student";
  } else {
    window.location.href = "/admin";
  }
};
const showErrorMessage = (message: string) => {
  toast.error(`${message}`);
};

const getValueOfCookie = (name: string) => {
  const cookie = document.cookie;
  const value = cookie.split("; ").find((row) => row.startsWith(name));
  return value ? value.split("=")[1] : "";
};

const getListStudent = (message: string) => {
  const nameList: string[] = [];
  const usernameList: string[] = [];
  message.split("|").forEach((student, index) => {
    if (index % 2 === 0) {
      usernameList.push(student);
    } else {
      nameList.push(student);
    }
  });
  localStorage.setItem("nameList", JSON.stringify(nameList));
  localStorage.setItem("usernameList", JSON.stringify(usernameList));
};
const getListTeacher = (message: string) => {
  const nameList: string[] = [];
  const usernameList: string[] = [];
  message.split("|").forEach((teacher, index) => {
    if (index % 2 === 0) {
      usernameList.push(teacher);
    } else {
      nameList.push(teacher);
    }
  });
  localStorage.setItem("nameList", JSON.stringify(nameList));
  localStorage.setItem("usernameList", JSON.stringify(usernameList));
};

export {
  getListStudent,
  getListTeacher,
  getValueOfCookie,
  goToHome,
  showErrorMessage,
};
