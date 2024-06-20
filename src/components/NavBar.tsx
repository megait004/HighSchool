import {
  faSquareCaretLeft,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentAvatar from "../assets/AvatarStudent.png";
import TeacherAvatar from "../assets/AvatarTeacher.png";
import Logo from "../assets/Logo.png";
import { getValueOfCookie } from "../scripts/Function";
import ModalLogOut from "./ModalLogOut";
const NavBar = () => {
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const [onlyIcon, setOnlyIcon] = useState(false);
  const classId = getValueOfCookie("classID");
  useEffect(() => {
    setIsTeacher(getValueOfCookie("username").length === 6);
    setName(getValueOfCookie("name"));
  }, []);
  return (
    <>
      <div
        className={`flex h-screen items-center justify-center bg-pink-600 p-4 ${!onlyIcon && "pr-2"} whitespace-nowrap text-white`}
      >
        <div
          className={`flex h-full flex-col gap-2 ${onlyIcon && "items-center justify-center gap-4"}`}
        >
          {!onlyIcon && (
            <div className="flex items-center justify-center gap-1 self-center rounded-lg bg-white px-4 text-pink-500">
              <img
                src={Logo}
                alt=""
                className={`h-16 w-16 self-center brightness-125 -hue-rotate-15`}
              />
              <div>
                <b>THPT VIP</b>
                <p>2023 - 2024</p>
              </div>
            </div>
          )}
          <img
            src={isTeacher ? TeacherAvatar : StudentAvatar}
            alt=""
            className={`${onlyIcon ? "h-10 w-10" : "h-24 w-24"} self-center`}
          />
          {!onlyIcon && (
            <div className="flex w-full flex-col items-center justify-center gap-1 self-center rounded-lg border border-white bg-gradient-to-r from-pink-400 to-pink-600 p-2">
              <b className="self-center">
                {isTeacher
                  ? `Giáo viên - Khối ${classId}`
                  : `Học sinh - Khối ${classId}`}
              </b>
              <b className="self-center text-balance">{name}</b>
            </div>
          )}
          <b
            className="cursor-pointer hover:scale-105"
            onClick={() => navigate("/home/student")}
          >
            <FontAwesomeIcon icon={faHouse} size={onlyIcon ? "xl" : "1x"} />{" "}
            {!onlyIcon && "Trang Chủ"}
          </b>
          {isTeacher && (
            <b
              className="cursor-pointer hover:scale-105"
              onClick={() => navigate("/home/list")}
            >
              <FontAwesomeIcon icon={faList} size={onlyIcon ? "xl" : "1x"} />{" "}
              {!onlyIcon && "Danh sách học sinh"}
            </b>
          )}
          {!isTeacher && (
            <b
              className="cursor-pointer hover:scale-105"
              onClick={() => navigate("/home/score")}
            >
              <FontAwesomeIcon icon={faHeart} size={onlyIcon ? "xl" : "1x"} />{" "}
              {!onlyIcon && "Điểm Học Tập"}
            </b>
          )}
          <b
            className="cursor-pointer hover:scale-105"
            onClick={() => navigate("/home/schedule")}
          >
            <FontAwesomeIcon icon={faCalendar} size={onlyIcon ? "xl" : "1x"} />{" "}
            {!onlyIcon && "Thời khóa biểu"}
          </b>
          {!isTeacher && (
            <b
              className="cursor-pointer hover:scale-105"
              onClick={() => navigate("/home/setting")}
            >
              <FontAwesomeIcon icon={faGear} size={onlyIcon ? "xl" : "1x"} />{" "}
              {!onlyIcon && "Cài đặt"}
            </b>
          )}
          <b
            className="cursor-pointer hover:scale-105"
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size={onlyIcon ? "xl" : "1x"}
            />{" "}
            {!onlyIcon && "Đăng xuất"}
          </b>
          {onlyIcon ? (
            <FontAwesomeIcon
              icon={faSquareCaretRight}
              size="xl"
              className="mt-auto cursor-pointer hover:scale-105"
              onClick={() => setOnlyIcon(false)}
            />
          ) : (
            <span className="mt-auto self-center text-center font-semibold">
              © OvFTeam 💖
            </span>
          )}
        </div>
        <div>
          {!onlyIcon && (
            <FontAwesomeIcon
              icon={faSquareCaretLeft}
              size="xl"
              className="cursor-pointer hover:scale-105"
              onClick={() => setOnlyIcon(true)}
            />
          )}
        </div>
      </div>
      {showModal && <ModalLogOut setShowModal={setShowModal} />}
    </>
  );
};

export default NavBar;
