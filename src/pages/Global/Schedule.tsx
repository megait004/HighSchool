import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ModalScheduleEdit from "../../components/ModalScheduleEdit";
import { getValueOfCookie } from "../../scripts/Function";
interface DAYData {
  ID: number;
  DAY1: string;
  DAY2: string;
  DAY3: string;
  DAY4: string;
  DAY5: string;
}

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState<DAYData[]>([]);
  const [classID, setClassID] = useState<string>("");
  const [showEditScheduleModal, setShowEditScheduleModal] =
    useState<boolean>(false);
  const [currentID, setCurrentID] = useState<number>(0);
  const [currentDAY, setCurrentDAY] = useState<number>(0);

  useEffect(() => {
    setClassID(getValueOfCookie("classID") || "");
    window.chrome.webview.postMessage({
      type: "getSchedule",
      classID: classID,
    });
    setTimeout(() => {
      const scheduleFromLocalStorage = localStorage.getItem("schedule");
      if (scheduleFromLocalStorage) {
        const parsedSchedule: DAYData[] = JSON.parse(scheduleFromLocalStorage);
        setScheduleData(parsedSchedule);
      }
    }, 100);
  }, [classID]);
  const Edit = (id: number, day: number) => {
    const isTeacher = getValueOfCookie("username");
    if (isTeacher.length === 6) {
      setCurrentID(id);
      setCurrentDAY(day);
      setShowEditScheduleModal(true);
    } else {
      return;
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <b className="text-3xl text-pink-500">
          <FontAwesomeIcon icon={faCalendar} /> Thời khóa biểu - Khối {classID}
        </b>
        <table className="mt-4 w-full border border-pink-500">
          <thead className="bg-gradient-to-r from-pink-400 via-pink-600 to-pink-500">
            <tr className="bor bg-pink-600 text-white">
              <th className="w-1/5 max-w-[20%] border-r border-r-white">
                Thứ 2{" "}
              </th>
              <th className="w-1/5 max-w-[20%] border-r border-r-white">
                Thứ 3
              </th>
              <th className="w-1/5 max-w-[20%] border-r border-r-white">
                Thứ 4
              </th>
              <th className="w-1/5 max-w-[20%] border-r border-r-white">
                Thứ 5
              </th>
              <th className="">Thứ 6</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((item) => (
              <tr key={item.ID} className="body size-6 w-full">
                <td
                  className="body w-1/5 max-w-[150px] truncate border border-pink-500"
                  onClick={() => {
                    Edit(item.ID, 1);
                  }}
                >
                  {item.DAY1}
                </td>
                <td
                  className="body w-1/5 max-w-[150px] truncate border border-pink-500"
                  onClick={() => {
                    Edit(item.ID, 2);
                  }}
                >
                  {item.DAY2}
                </td>
                <td
                  className="body w-1/5 max-w-[150px] truncate border border-pink-500"
                  onClick={() => {
                    Edit(item.ID, 3);
                  }}
                >
                  {item.DAY3}
                </td>
                <td
                  className="body w-1/5 max-w-[150px] truncate border border-pink-500"
                  onClick={() => {
                    Edit(item.ID, 4);
                  }}
                >
                  {item.DAY4}
                </td>
                <td
                  className="body w-1/5 max-w-[150px] truncate border border-pink-500"
                  onClick={() => {
                    Edit(item.ID, 5);
                  }}
                >
                  {item.DAY5}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditScheduleModal && (
        <ModalScheduleEdit
          classID={classID}
          DAY={currentDAY.toString()}
          ID={currentID.toString()}
          setShowEditScheduleModal={setShowEditScheduleModal}
        />
      )}
    </>
  );
};

export default Schedule;
