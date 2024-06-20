import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Image from "../assets/LogOutModal.png";

interface ModalLogOutProps {
  setShowModal: (isOpen: boolean) => void;
}
const ModalLogOut: React.FC<ModalLogOutProps> = ({ setShowModal }) => {
  const navigate = useNavigate();
  const LogOut = () => {
    document.cookie.split(";").forEach((cookie) => {
      const equalsPosition = cookie.indexOf("=");
      const name =
        equalsPosition > -1 ? cookie.substring(0, equalsPosition) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/home`;
    }
    toast.success("Đã đăng xuất");
    navigate("/login");
  };
  return (
    <div className="bg-cat fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 rounded-lg bg-white p-2">
        <div className="w-full rounded-t-lg bg-pink-600 p-2 text-center text-3xl font-bold text-white">
          Đăng xuất?
        </div>
        <div className="my-2 text-center text-4xl">
          <img src={Image} alt="" />
        </div>
        <div className="mt-2 flex w-full justify-between gap-2">
          <button
            className="w-1/2 rounded-lg bg-gray-300 p-2 font-bold"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Hủy
          </button>
          <button
            className="w-1/2 whitespace-nowrap rounded-lg bg-pink-600 p-2 py-0 font-bold text-white"
            onClick={() => {
              LogOut();
            }}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogOut;
