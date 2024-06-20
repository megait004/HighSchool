interface MyData {
  id: number;
  name: string;
  age: number;
}
const addData = () => {
  const request: IDBOpenDBRequest = indexedDB.open("Database", 1);

  request.onupgradeneeded = function (event: IDBVersionChangeEvent) {
    const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
    db.createObjectStore("accountInfo", { keyPath: "id" });
  };

  request.onsuccess = function () {
    const db: IDBDatabase = (request as IDBOpenDBRequest).result;

    // Bắt đầu giao dịch
    const transaction: IDBTransaction = db.transaction(
      ["accountInfo"],
      "readwrite",
    );

    // Nhận object store
    const objectStore: IDBObjectStore = transaction.objectStore("accountInfo");

    // Tạo một đối tượng để lưu trữ
    const data: MyData = { id: 1, name: "John Doe", age: 30 };

    // Yêu cầu thêm đối tượng vào object store
    const addRequest: IDBRequest<IDBValidKey> = objectStore.add(data);

    addRequest.onsuccess = function () {
      console.log("Dữ liệu đã được thêm thành công");
    };

    addRequest.onerror = function () {
      objectStore.delete(1);
      //   addData();
      console.error("Lỗi khi thêm dữ liệu:", (addRequest as IDBRequest).error);
    };
  };

  request.onerror = function () {
    console.error("Lỗi cơ sở dữ liệu:", (request as IDBOpenDBRequest).error);
  };
};
export { addData };
