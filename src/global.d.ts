// Define a specific type for messages
interface WebViewMessage {
  type:
    | "login"
    | "getInfo"
    | "updateStudentAccount"
    | "getListStudent"
    | "getScore"
    | "addScore"
    | "deleteScore"
    | "getSchedule"
    | "signup"
    | "updateSchedule"
    | "getListTeacher"
    | "addTeacher";

  [key: string]: unknown;
}
type MessageEventListener = (event: MessageEvent) => void;

declare global {
  interface Window {
    chrome: {
      webview: {
        postMessage: (message: WebViewMessage) => void;
      };
    };
  }
}

export {};
