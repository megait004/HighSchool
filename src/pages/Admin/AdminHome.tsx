import { useEffect, useState } from "react";

const AdminHome = () => {
  const [token, setLocalStorage] = useState("");
  useEffect(() => {
    setLocalStorage(window.localStorage.getItem("token") || "");
  }, []);
  return (
    <>
      <h1>Admin Home</h1>
      <p>{token}</p>
    </>
  );
};

export default AdminHome;
