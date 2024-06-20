import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalScheduleEdit = ({
  classID,
  ID,
  DAY,
  setShowEditScheduleModal,
}: {
  classID: string;
  ID: string;
  DAY: string;
  setShowEditScheduleModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [subject, setSubject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const updateSchedule = (ID: string, DAY: string) => {
    window.chrome.webview.postMessage({
      type: "updateSchedule",
      CLASSID: classID,
      ID: ID,
      DAY: DAY,
      SUBJECT: subject,
    });
  };
  const navigate = useNavigate();
  return (
    <div
      className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-30"
      onClick={() => {
        setShowEditScheduleModal(false);
      }}
    >
      <div
        className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-2 shadow-2xl shadow-pink-600"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <b className="text-2xl text-pink-600">
          Tiết {ID} - Thứ {Number(DAY) + 1}
        </b>
        <input
          type="text"
          className="rounded-lg border border-pink-600 p-1 px-2 font-bold text-pink-600 placeholder:font-normal placeholder:text-pink-300"
          placeholder="Môn học"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateSchedule(ID, DAY);
              setLoading(true);
              setTimeout(() => {
                navigate(0);
              }, 10);
            }
          }}
        />
        <div className="flex w-full justify-around gap-2">
          <button
            className="flex-grow rounded-lg bg-gray-300 p-2 font-bold text-black hover:scale-95"
            onClick={() => {
              setShowEditScheduleModal(false);
            }}
          >
            Hủy
          </button>
          <button
            className="flex flex-grow items-center justify-center rounded-lg bg-pink-600 p-2 font-bold text-white hover:scale-95"
            onClick={() => {
              updateSchedule(ID, DAY);
              setLoading(true);
              setTimeout(() => {
                navigate(0);
              }, 10);
            }}
          >
            {loading ? <Loader /> : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="h-6 w-6 animate-spin rounded-full border-b-0 border-l-0 border-t-2 border-white p-2"></div>
  );
};

export default ModalScheduleEdit;
