import {
  faFaceSurprise,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons/faPersonRunning";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons/faUserGraduate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "../../assets/HomeStudent.png";
const HomePage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 p-4">
      <b className="mb-4 text-center text-3xl text-pink-500">
        Chào mừng đến với HighSchool Manager Plus
      </b>

      <div className="w-full max-w-4xl">
        <div className="flex gap-1">
          <div className="mb-6 rounded-lg bg-gradient-to-r from-pink-500 via-pink-600 via-80% to-pink-500 p-6 text-white shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Các thông báo mới</h2>
            <ul>
              <li className="mb-2 flex flex-col gap-1">
                <div>
                  <FontAwesomeIcon icon={faBell} /> Trường sắp có sự kiện vào
                  20/11.<b>...</b>
                </div>
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faUserGraduate} /> Thông báo tuyển sinh
                vào lớp 10 năm học - <b>(2024-2025)</b>
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faFaceSurprise} /> Top 3 Học Sinh suất
                sắc nhất năm học 2023 <b>...</b>
              </li>
            </ul>
          </div>

          <div className="mb-6 rounded-lg bg-gradient-to-r from-pink-500 via-pink-600 via-80% to-pink-500 p-6 text-white shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Sự kiện sắp diễn ra</h2>
            <ul>
              <li className="mb-2">
                <FontAwesomeIcon icon={faPersonRunning} /> Chạy đua mở rộng{" "}
                <b>(08:00 AM - 10:00AM - 19/11/2024)</b>
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faPaintBrush} /> Vẽ tranh mừng ngày 20/11
              </li>
            </ul>
          </div>
        </div>
        <img src={Image} className="overflow-hidden rounded-lg" alt="" />
      </div>
    </div>
  );
};

export default HomePage;
