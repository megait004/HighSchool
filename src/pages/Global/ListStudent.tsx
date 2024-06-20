import { faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons/faChartPie";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalAddScore from "../../components/ModalAddScore";
import ModalDelete from "../../components/ModalDelete";
import { getValueOfCookie } from "../../scripts/Function";

const ModalStudent = ({
  name,
  userName,
  setUserName,
}: {
  name: string;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [currentTab, setcurrentTab] = useState(true);
  const [listScore, setListScore] = useState<string[] | undefined>();
  const [showModalAddScore, setShowModalAddScore] = useState(false);
  const [subject, setSubject] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentSubject, setCurrentSubject] = useState<string>("");

  const addScore = (subject: string, score: string, note: string) => {
    if (subject !== "" && score !== "" && note !== "") {
      let pass = false;
      if (Number(score) > 5) {
        pass = true;
      }
      window.chrome.webview.postMessage({
        type: "addScore",
        ID: userName,
        subject: subject,
        score: score,
        pass: pass,
        note: note,
      });
    }
  };
  const getScore = (userName: string) => {
    window.chrome.webview.postMessage({
      type: "getScore",
      ID: userName,
    });
  };
  useEffect(() => {
    getScore(userName);
  }, [userName]);
  useEffect(() => {
    setTimeout(() => {
      setListScore(localStorage.getItem("score")?.split("|") || []);
    }, 100);
  }, []);
  useEffect(() => {
    console.log(showModalAddScore);
  }, [showModalAddScore]);

  return (
    <div
      className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-20"
      onClick={() => {
        setUserName("");
      }}
    >
      <div
        className="flex max-h-[80vh] w-1/2 max-w-[80vw] flex-col gap-2 rounded-lg bg-white p-2 shadow-2xl shadow-pink-200 drop-shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-around">
          <b
            className={`mb-2 w-1/2 cursor-pointer rounded-l-lg border border-r-0 border-pink-600 py-1 text-center text-xl ${currentTab ? "bg-pink-600 text-white" : "bg-white text-pink-600"} hover:bg-pink-600 hover:text-white`}
            onClick={() => {
              setcurrentTab(true);
            }}
          >
            <FontAwesomeIcon icon={faCircleInfo} /> Thông tin học sinh
          </b>
          <b
            className={`mb-2 w-1/2 cursor-pointer rounded-r-lg border border-pink-600 py-1 text-center text-xl text-pink-600 hover:bg-pink-600 hover:text-white ${currentTab ? "bg-white" : "bg-pink-600 text-white"}`}
            onClick={() => {
              setcurrentTab(false);
            }}
          >
            <FontAwesomeIcon icon={faChartPie} /> Điểm số
          </b>
        </div>
        {currentTab ? (
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="flex flex-row items-center gap-0">
              <b className="m-0 w-1/5 rounded-l-xl border border-pink-600 bg-pink-600 p-1 text-center text-white">
                <FontAwesomeIcon icon={faCircleUser} /> Họ tên:
              </b>
              <input
                type="text"
                id="name"
                value={name}
                className="w-1/2 rounded-r-xl border border-l-0 border-pink-600 p-1 font-medium text-pink-600"
                readOnly
              />
            </label>
            <label htmlFor="name" className="flex flex-row items-center gap-0">
              <b className="m-0 w-1/5 rounded-l-xl border border-pink-600 bg-pink-600 p-1 text-center text-white">
                <FontAwesomeIcon icon={faFingerprint} /> ID:
              </b>
              <input
                type="text"
                id="name"
                value={userName}
                className="w-1/2 rounded-r-xl border border-l-0 border-pink-600 p-1 font-medium text-pink-600"
                readOnly
              />
            </label>
          </div>
        ) : (
          <div>
            {showModalAddScore ? (
              <ModalAddScore
                goBack={setShowModalAddScore}
                userName={userName}
                subject={subject}
                score={score}
                note={note}
                setSubject={setSubject}
                setScore={setScore}
                setNote={setNote}
              />
            ) : (
              <div>
                <div className="px-1">
                  <div className="flex flex-row items-center gap-0 border-y border-pink-600 text-center">
                    <b className="w-1/2 border-l border-r border-pink-600 bg-pink-600 text-white">
                      Môn học
                    </b>
                    <b className="w-1/2 border-r border-pink-600 bg-pink-600 text-white">
                      Điểm
                    </b>
                    <b className="w-1/2 border-r border-pink-600 bg-pink-600 text-white">
                      Đạt
                    </b>
                    <b className="w-1/2 border-r border-pink-600 bg-pink-600 text-white">
                      Ghi chú
                    </b>
                  </div>
                </div>
                <div className="overflow-auto">
                  <ul className="max-h-[56vh] p-1 pt-0">
                    {listScore?.map((score, index) => (
                      <li
                        key={index}
                        className="flex w-full flex-row items-center gap-1 whitespace-nowrap border-b border-pink-600"
                        onClick={() => {
                          setCurrentSubject(score.split(";")[1]);
                          setShowModal(true);
                        }}
                      >
                        <b className="w-1/4 max-w-[25%] truncate border-l border-r border-pink-600 text-center text-pink-600">
                          {score.split(";")[1]}
                        </b>
                        <b className="w-1/4 max-w-[25%] truncate border-r border-pink-600 text-center text-pink-600">
                          {score.split(";")[2]}
                        </b>
                        <b className="w-1/4 max-w-[25%] truncate border-r border-pink-600 text-center text-pink-600">
                          {score.split(";")[3]}
                        </b>
                        <b className="w-1/4 max-w-[25%] truncate border-r border-pink-600 text-center text-pink-600">
                          {score.split(";")[4]}
                        </b>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <button
              className="mt-2 w-full cursor-pointer rounded-lg bg-pink-600 p-1 font-black text-white hover:scale-95 hover:bg-pink-700"
              onClick={() => {
                if (showModalAddScore) {
                  addScore(subject, score, note);
                  setSubject("");
                  setScore("");
                  setNote("");
                  toast.success("Đã thêm điểm thành công");
                  getScore(userName);
                  setTimeout(() => {
                    setListScore(
                      localStorage.getItem("score")?.split("|") || [],
                    );
                    setShowModalAddScore(false);
                  }, 100);
                } else {
                  setShowModalAddScore(true);
                }
              }}
            >
              Thêm điểm
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <ModalDelete
          setShowModal={setShowModal}
          getScore={getScore}
          setListScore={setListScore}
          UserName={userName}
          Subject={currentSubject}
        />
      )}
    </div>
  );
};

const ListStudent = () => {
  const [listStudent, setListStudent] = useState<string[] | undefined>();
  const [userName, setUserName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nameValue, setNameValue] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const handleStorageChange = () => {
    const userNameValue = JSON.parse(
      localStorage.getItem("usernameList") || "[]",
    );
    if (userNameValue) {
      setListStudent(userNameValue);
    }
  };
  const viToEng = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const handleSearch = () => {
    const tempListStudent: string[] | undefined = [];
    const tempNameValue: string[] = [];
    if (searchValue === "") {
      handleStorageChange();
      setNameValue(JSON.parse(localStorage.getItem("nameList") || "[]"));
    } else {
      nameValue.forEach((name, index) => {
        const nameCurrent = viToEng(name.toLowerCase());
        const searchValueCurrent = viToEng(searchValue.toLowerCase());
        if (nameCurrent.includes(searchValueCurrent)) {
          tempListStudent?.push(listStudent?.[index] || "");
          tempNameValue.push(name);
        }
      });
      setListStudent(tempListStudent);
      setNameValue(tempNameValue);
    }
  };
  useEffect(() => {
    const classID = getValueOfCookie("classID");
    window.chrome.webview.postMessage({
      type: "getListStudent",
      classID: classID,
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      handleStorageChange();
      setNameValue(JSON.parse(localStorage.getItem("nameList") || "[]"));
    }, 100);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <b className="text-3xl text-pink-500">
          <FontAwesomeIcon icon={faList} /> Danh sách học sinh
        </b>
        <div className="mt-2 flex items-center justify-center self-end">
          <input
            type="text"
            placeholder="Nhập tên học sinh"
            className="rounded-l-lg border border-pink-600 px-2 py-2 text-pink-600 placeholder:text-pink-600"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleSearch();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
              if (e.key === "Escape") {
                setSearchValue("");
                handleSearch();
              }
            }}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="cursor-pointer rounded-r-lg border border-pink-600 bg-pink-600 p-3 text-white"
            onClick={handleSearch}
          />
        </div>
        <ul className="w-full items-start justify-start py-4">
          {listStudent?.map((student, index) => (
            <li
              key={student}
              className="rounded-lg border border-b-white bg-pink-600 px-2 text-xl font-bold text-white"
              onClick={() => {
                if (student !== "Danh sách trống") {
                  setUserName(student);
                  setName(nameValue[index]);
                }
              }}
            >
              {student !== "Danh sách trống" && `${index + 1}. `}{" "}
              <b className="font-medium">{nameValue[index]}</b>
            </li>
          ))}
        </ul>
      </div>
      {userName !== "" && (
        <ModalStudent
          name={name}
          userName={userName}
          setUserName={setUserName}
        />
      )}
    </>
  );
};

export default ListStudent;
