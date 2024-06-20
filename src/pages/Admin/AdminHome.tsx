import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ModalLogOut from "../../components/ModalLogOut";
import AddTeacher from "./components/AddTeacher";
import ListTeacher from "./components/ListTeacher";

const AdminHome = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [count, setCount] = useState(0);
  const [classID, setClassID] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-start p-2 text-pink-600">
      <div className="flex w-full items-center justify-center">
        <h1 className="text-2xl font-bold">
          <FontAwesomeIcon icon={faList} /> Danh sách tài khoản giáo viên
        </h1>
        <button
          className="fixed right-2 top-2 rounded-lg bg-pink-600 p-2 font-bold text-white hover:scale-95"
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Đăng xuất
        </button>
      </div>
      <div
        className="mt-4 flex w-full justify-around gap-1 text-center font-bold"
        onClick={() => {
          setShowWelcome(false);
        }}
      >
        <div
          className="flex-grow cursor-pointer bg-pink-600 p-2 text-white"
          onClick={() => setClassID(10)}
        >
          Khối 10
        </div>
        <div
          className="flex-grow cursor-pointer bg-pink-600 p-2 text-white"
          onClick={() => setClassID(11)}
        >
          Khối 11
        </div>
        <div
          className="flex-grow cursor-pointer bg-pink-600 p-2 text-white"
          onClick={() => setClassID(12)}
        >
          Khối 12
        </div>
      </div>
      <div className="w-full">
        {showWelcome ? (
          <b className="text-center text-2xl">
            Chào mừng bạn đến với trang quản trị
          </b>
        ) : (
          <ListTeacher setCount={setCount} classID={classID} />
        )}
      </div>
      <div className="fixed bottom-0 left-0 flex w-full items-center justify-between p-2 shadow-2xl shadow-black drop-shadow-2xl">
        <div>
          Số lượng: <b>{count}</b>
        </div>
        <div
          className="cursor-pointer rounded-lg bg-pink-600 p-2 py-1 font-bold text-white hover:scale-95"
          onClick={() => setShowModalAdd(true)}
        >
          Thêm mới
        </div>
      </div>
      {showModal && <ModalLogOut setShowModal={setShowModal} />}
      {showModalAdd && <AddTeacher showModalAdd={setShowModalAdd} />}
    </div>
  );
};

export default AdminHome;
