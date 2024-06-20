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
    | "updateSchedule";
  // Consider specifying known properties here
  // For example:
  // username?: string;
  // password?: string;
  // etc.
  [key: string]: unknown;
}

// Enhance the EventListener type for message events
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
