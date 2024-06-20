import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { faChartBar } from "@fortawesome/free-solid-svg-icons/faChartBar";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const apiKey = "AIzaSyC7owbh7REktEL18Gn-4ehMDaEULvk5z1Q";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(message: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Một học sinh của tôi có số điểm là 10, hãy gợi ý ghi chú cho tôi, viết ngắn gọn, no yapping\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "- Rất ấn tượng!\n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Một học sinh của tôi có số điểm là 5, hãy gợi ý ghi chú cho tôi, viết ngắn gọn, no yapping\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "- Cần cố gắng!\n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Một học sinh của tôi có số điểm là 7, hãy gợi ý ghi chú cho tôi, viết ngắn gọn, no yapping\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "- Cần cố gắng hơn!\n",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(message);
  return result.response.text();
}

const ModalAddScore = ({
  goBack,
  subject,
  score,
  note,
  setSubject,
  setScore,
  setNote,
}: {
  goBack: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;

  subject: string;
  score: string;
  note: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  setScore: React.Dispatch<React.SetStateAction<string>>;
  setNote: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [placeholder, setPlaceholder] = useState<string>("Nhập ghi chú!");
  const scoreRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full translate-x-0 rounded-lg bg-white bg-opacity-50 bg-gradient-to-br from-white via-gray-100 to-gray-200 p-4 pt-0 text-pink-600 shadow-xl">
      <button
        className="mb-1 rounded-lg bg-pink-600 p-1 px-2 text-white"
        onClick={() => {
          goBack(false);
        }}
      >
        <FontAwesomeIcon icon={faCaretLeft} /> Quay lại
      </button>
      <label htmlFor="subject">
        <b>
          <FontAwesomeIcon icon={faBook} /> Môn học
        </b>
        <input
          type="text"
          placeholder="Nhập tên môn học"
          className="rounded-lg border border-pink-600 p-1 px-2 placeholder:text-pink-300"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
      </label>
      <label htmlFor="score">
        <b>
          <FontAwesomeIcon icon={faChartBar} /> Điểm
        </b>
        <input
          type="number"
          placeholder="Nhập điểm số"
          className="rounded-lg border border-pink-600 p-1 px-2 placeholder:text-pink-300"
          ref={scoreRef}
          value={score}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 0 && value <= 10) {
              setScore(e.target.value);
            } else {
              toast.error("Điểm số phải từ 0 đến 10");
            }
          }}
        />
      </label>
      <label htmlFor="note">
        <b>
          <FontAwesomeIcon icon={faPen} /> Ghi chú
        </b>
        <input
          type="text"
          placeholder={placeholder}
          className="rounded-lg border border-pink-600 p-1 px-2 font-semibold placeholder:animate-ping placeholder:text-pink-400"
          value={note}
          onFocus={async () => {
            if (!score) {
              toast.error("Vui lòng nhập điểm số trước!");
              scoreRef.current?.focus();
              return;
            }
            setPlaceholder("Nhập ghi chú - (Hoặc nhấn Tab để tạo gợi ý!)");
            const result = await run(
              `Một học sinh của tôi có số điểm là ${score}, hãy gợi ý ghi chú cho tôi, viết ngắn gọn, no yapping\n`,
            );
            setPlaceholder(result + " (Nhấn Tab để dùng gợi ý!)");
          }}
          onKeyDown={async (e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              if (placeholder.includes(" (Nhấn Tab để dùng gợi ý!)")) {
                setNote(placeholder.replace(" (Nhấn Tab để dùng gợi ý!)", ""));
              } else {
                const tempPlaceholder = "Vui lòng đợi trong giây lát...";
                setPlaceholder(tempPlaceholder);
                const result = await run(
                  `Một học sinh của tôi có số điểm là ${score}, hãy gợi ý ghi chú cho tôi, viết ngắn gọn, no yapping\n`,
                );
                setNote(result);
                setPlaceholder(result + " (Nhấn Tab để dùng gợi ý!)");
              }
            }
          }}
          onChange={(e) => {
            setPlaceholder("Nhập ghi chú!");
            setNote(e.target.value);
          }}
        />
      </label>
    </div>
  );
};

export default ModalAddScore;
