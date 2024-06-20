import { useEffect, useState } from "react";

const ListTeacher = ({
  setCount,
  classID,
}: {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  classID: number;
}) => {
  const [listTeacher, setListTeacher] = useState<string[] | undefined>();
  const [nameValue, setNameValue] = useState<string[]>([]);
  const handleStorageChange = () => {
    const userNameValue = JSON.parse(
      localStorage.getItem("usernameList") || "[]",
    );
    if (userNameValue) {
      setListTeacher(userNameValue);
    }
  };
  useEffect(() => {
    window.chrome.webview.postMessage({
      type: "getListTeacher",
      classID: classID.toString(),
    });
  }, [classID]);
  useEffect(() => {
    setTimeout(() => {
      handleStorageChange();
      if (
        listTeacher !== undefined &&
        listTeacher[0] !== "Danh sách trống" &&
        listTeacher.length > 0
      ) {
        setCount(listTeacher.length);
      } else {
        setCount(0);
      }
      setNameValue(JSON.parse(localStorage.getItem("nameList") || "[]"));
    }, 100);
  }, [listTeacher, setCount]);
  return (
    <>
      <ul className="w-full items-start justify-start py-4">
        {listTeacher?.map((teacher, index) => (
          <li
            key={teacher}
            className="rounded-lg border border-b-white bg-pink-600 px-2 text-xl font-bold text-white"
          >
            {teacher !== "Danh sách trống" && `${index + 1}. `}{" "}
            <b className="font-medium">{nameValue[index]}</b>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListTeacher;
