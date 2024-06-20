import { faChartGantt } from "@fortawesome/free-solid-svg-icons/faChartGantt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getValueOfCookie } from "../../scripts/Function";

const Score = () => {
  const [listScore, setListScore] = useState<string[] | undefined>();

  useEffect(() => {
    const ID = getValueOfCookie("username");
    window.chrome.webview.postMessage({
      type: "getScore",
      ID: ID,
    });
    setTimeout(() => {
      if (localStorage.getItem("score") !== "") {
        setListScore(localStorage.getItem("score")?.split("|") || []);
      }
    }, 100);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <b className="text-3xl text-pink-500">
          <FontAwesomeIcon icon={faChartGantt} /> Điểm học tập
        </b>
        <table className="mt-4 w-full justify-center border border-pink-400 bg-pink-600 text-white">
          <thead>
            <tr>
              <th className="w-[15%] border-r-2 border-pink-400">Số thứ tự</th>
              <th className="w-[20%] border-r-2 border-pink-400">Môn học</th>
              <th className="w-[10%] border-r-2 border-pink-400">Điểm</th>
              <th className="w-[10%] border-r-2 border-pink-400">Xếp loại</th>
              <th className="w-[45%] border-r-2 border-pink-400">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {listScore?.map((item, index) => {
              const [, subject, score, pass, note] = item.split(";");
              let updatedPass = pass;
              if (pass === "1") {
                updatedPass = "Đạt";
              } else {
                updatedPass = "Không đạt";
              }
              const inputId = crypto.randomUUID();
              return (
                <tr key={inputId}>
                  <td className="body body truncate border-2 border-pink-400 border-b-pink-400 bg-white text-center">
                    {index + 1}
                  </td>
                  <td className="body truncate border-2 border-pink-400 bg-white text-center">
                    {subject}
                  </td>
                  <td className="body truncate border-2 border-pink-400 bg-white text-center">
                    {score}
                  </td>
                  <td className="body truncate border-2 border-pink-400 bg-white text-center">
                    {updatedPass}
                  </td>
                  <td className="body truncate border-2 border-pink-400 bg-white text-center">
                    {note}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Score;
