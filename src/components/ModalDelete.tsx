import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "../assets/WarningDelete.png";

interface ModalDeleteProps {
  setShowModal: (isOpen: boolean) => void;
  getScore: (userName: string) => void;
  setListScore: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  UserName: string;
  Subject: string;
}
const ModalDelete: React.FC<ModalDeleteProps> = ({
  setShowModal,
  getScore,
  setListScore,
  UserName,
  Subject,
}) => {
  const DeleteScore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    window.chrome.webview.postMessage({
      type: "deleteScore",
      UserName,
      Subject,
    });
    getScore(UserName);
    setTimeout(() => {
      setListScore(localStorage.getItem("score")?.split("|") || []);
    }, 100);
    setShowModal(false);
  };
  return (
    <div className="bg-cat fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 rounded-lg bg-white p-2">
        <div className="w-full rounded-t-lg bg-pink-600 p-2 text-center text-3xl font-bold text-white">
          <FontAwesomeIcon icon={faTrash} /> Xóa điểm
        </div>
        <div className="my-2 text-center text-4xl">
          <img src={Image} alt="" />
        </div>
        <div className="mt-2 flex w-full justify-between gap-2">
          <button
            className="w-1/2 rounded-lg bg-gray-300 p-2 font-bold"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
          >
            Hủy
          </button>
          <button
            className="w-1/2 whitespace-nowrap rounded-lg bg-pink-600 p-2 py-0 font-bold text-white"
            onClick={(e) => {
              DeleteScore(e);
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
