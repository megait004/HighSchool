using System;
using System.IO;
using Microsoft.Data.Sqlite;
using System.Text.Json;
using System.Collections.Generic;
namespace HighSchool
{
    internal interface IDatabase
    {
        public class Database()
        {
            private static readonly string ConnectionString = "Data Source=database/database.db;";
            public static void InitDatabase()
            {
                if (!Directory.Exists("database"))
                {
                    Directory.CreateDirectory("database");
                }
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    const string initializeDatabase = @"
                            CREATE TABLE IF NOT EXISTS
                                ADMINACCOUNT (
                                    USERNAME TEXT UNIQUE NOT NULL,
                                    PASSWORD TEXT NOT NULL
                                );
                            CREATE TABLE IF NOT EXISTS
                                TEACHERACCOUNT (
                                    CLASSID CHAR(6),
                                    NAME TEXT NOT NULL,
                                    USERNAME TEXT UNIQUE NOT NULL,
                                    PASSWORD TEXT NOT NULL
                                );
                            CREATE TABLE IF NOT EXISTS
                                STUDENTACCOUNT (
                                    CLASSID CHAR(6) ,
                                    NAME TEXT NOT NULL,
                                    USERNAME TEXT UNIQUE NOT NULL,
                                    PASSWORD TEXT NOT NULL
                                );
                            CREATE TABLE IF NOT EXISTS
                                SCORE (
                                    ID TEXT NOT NULL,
                                    SUBJECT TEXT NOT NULL,
                                    SCORE REAL NOT NULL,
                                    PASS BOOL NOT NULL,
                                    TYPE CHAR(32) NOT NULL,
                                    FOREIGN KEY (ID) REFERENCES STUDENTACCOUNT (USERNAME)
                                );
                            CREATE TABLE IF NOT EXISTS
                                SCHEDULE10 (
                                    SUBJECT INT UNIQUE NOT NULL,
                                    DAY1 TEXT,
                                    DAY2 TEXT,
                                    DAY3 TEXT,
                                    DAY4 TEXT,
                                    DAY5 TEXT
                                );
                            CREATE TABLE IF NOT EXISTS
                                SCHEDULE11 (
                                    SUBJECT INT UNIQUE NOT NULL,
                                    DAY1 TEXT,
                                    DAY2 TEXT,
                                    DAY3 TEXT,
                                    DAY4 TEXT,
                                    DAY5 TEXT
                                );
                            CREATE TABLE IF NOT EXISTS
                                SCHEDULE12 (
                                    SUBJECT INT UNIQUE NOT NULL,
                                    DAY1 TEXT,
                                    DAY2 TEXT,
                                    DAY3 TEXT,
                                    DAY4 TEXT,
                                    DAY5 TEXT
                                );
                            INSERT or IGNORE INTO
                                ADMINACCOUNT (USERNAME, PASSWORD)
                            VALUES
                                ('admin', 'admin');
                            INSERT or IGNORE INTO
                                SCHEDULE10 (
                                    SUBJECT,
                                    DAY1,
                                    DAY2,
                                    DAY3,
                                    DAY4,
                                    DAY5
                                )
                            VALUES
                                (1, '', '', '', '', ''),
                                (2, '', '', '', '', ''),
                                (3, '', '', '', '', ''),
                                (4, '', '', '', '', ''),
                                (5, '', '', '', '', '');
                            INSERT or IGNORE INTO
                                SCHEDULE11 (
                                    SUBJECT,
                                    DAY1,
                                    DAY2,
                                    DAY3,
                                    DAY4,
                                    DAY5
                                )
                            VALUES
                                (1, '', '', '', '', ''),
                                (2, '', '', '', '', ''),
                                (3, '', '', '', '', ''),
                                (4, '', '', '', '', ''),
                                (5, '', '', '', '', '');
                            INSERT or IGNORE INTO
                                SCHEDULE12 (
                                    SUBJECT,
                                    DAY1,
                                    DAY2,
                                    DAY3,
                                    DAY4,
                                    DAY5
                                )
                            VALUES
                                (1, '', '', '', '', ''),
                                (2, '', '', '', '', ''),
                                (3, '', '', '', '', ''),
                                (4, '', '', '', '', ''),
                                (5, '', '', '', '', '');
                    ";

                    command.CommandText = initializeDatabase;
                    command.ExecuteNonQuery();
                }
                connection.Close();
            }
            public static string Login(string username, string password)
            {
                if (username == "admin")
                {
                    return LoginEachAccount(username, password, "ADMINACCOUNT");
                }
                else if (username.Length == 6)
                {
                    return LoginEachAccount(username, password, "TEACHERACCOUNT");
                }
                else
                {
                    return LoginEachAccount(username, password, "STUDENTACCOUNT");
                }
            }
            private static string LoginEachAccount(string username, string password, string table)
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText =
                        $"SELECT * FROM {table} WHERE USERNAME = @username AND PASSWORD = @password";
                    command.Parameters.AddWithValue("@username", username);
                    command.Parameters.AddWithValue("@password", password);
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return "Đăng nhập thành công!";
                        }
                    }
                }
                connection.Close();
                return "Sai tên đăng nhập hoặc mật khẩu!";
            }

            public static string GetInfo(string username)
            {
                if (username.Length == 6)
                {
                    return GetUserInfo(username, "TEACHERACCOUNT");
                }
                else
                {
                    return GetUserInfo(username, "STUDENTACCOUNT");
                }
            }

            public static string GetUserInfo(string username, string tablename)
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = $"SELECT * FROM {tablename} WHERE USERNAME = @username";
                    command.Parameters.AddWithValue("@username", username);
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            string name = reader.GetString(reader.GetOrdinal("NAME"));
                            string classId = reader.GetString(reader.GetOrdinal("CLASSID"));
                            string response = classId + "|" + name;
                            return response;
                        }
                    }
                }
                connection.Close();
                return "Danh sách trống";
            }

            public static void UpdateStudentAccount(string username, string newName, string newPassword)
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "UPDATE STUDENTACCOUNT " +
                        "SET NAME = @newName, PASSWORD = @newPassword " +
                        "WHERE USERNAME = @username";
                    command.Parameters.AddWithValue("@newName", newName);
                    command.Parameters.AddWithValue("@newPassword", newPassword);
                    command.Parameters.AddWithValue("@username", username);
                    command.ExecuteNonQuery();
                }
            }

            public static string GetListStudent(string classID)
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT USERNAME,NAME FROM STUDENTACCOUNT WHERE CLASSID = @classID";
                    command.Parameters.AddWithValue("@classID", classID);
                    using (var reader = command.ExecuteReader())
                    {
                        List<string> listStudent = new List<string>();
                        while (reader.Read())
                        {
                            listStudent.Add(reader.GetString(reader.GetOrdinal("USERNAME")));
                            listStudent.Add(reader.GetString(reader.GetOrdinal("NAME")));
                        }
                        if (listStudent.Count > 0)
                        {
                            string response = string.Join("|", listStudent);
                            return response;
                        }
                        else
                        {
                            return "Danh sách trống";
                        }
                    }
                }
            }
            public static string GetScore(string ID)
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM SCORE WHERE ID = @ID";
                    command.Parameters.AddWithValue("@ID", ID);
                    using (var reader = command.ExecuteReader())
                    {
                        List<string> listScore = new List<string>();
                        while (reader.Read())
                        {
                            var currentRow = reader.GetString(reader.GetOrdinal("ID")) + ";" +
                                reader.GetString(reader.GetOrdinal("SUBJECT")) + ";" +
                                reader.GetString(reader.GetOrdinal("SCORE")) + ";" +
                                reader.GetString(reader.GetOrdinal("PASS")) + ";" +
                                reader.GetString(reader.GetOrdinal("TYPE"));
                            listScore.Add(currentRow);
                        }
                        if (listScore.Count > 0)
                        {
                            string response = string.Join("|", listScore);
                            return response;
                        }
                        else
                        {
                            return "";
                        }
                    }
                }
            }



            public static void AddScore(string ID, string subject, string score, string pass, string type)
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();
                using (var checkCommand = connection.CreateCommand())
                {
                    checkCommand.CommandText = "SELECT 1 FROM SCORE WHERE ID = @ID AND SUBJECT = @subject";
                    checkCommand.Parameters.AddWithValue("@ID", ID);
                    checkCommand.Parameters.AddWithValue("@subject", subject);
                    bool recordExists = false;
                    using (var reader = checkCommand.ExecuteReader())
                    {
                        recordExists = reader.Read();
                    }
                    using (var command = connection.CreateCommand())
                    {
                        if (recordExists)
                        {
                            command.CommandText = "UPDATE SCORE " +
                                                  "SET SCORE = @score, PASS = @pass, TYPE = @type " +
                                                  "WHERE ID = @ID AND SUBJECT = @subject";
                        }
                        else
                        {
                            command.CommandText = "INSERT INTO SCORE (ID, SUBJECT, SCORE, PASS, TYPE) " +
                                                  "VALUES (@ID, @subject, @score, @pass, @type)";
                        }
                        command.Parameters.AddWithValue("@ID", ID);
                        command.Parameters.AddWithValue("@subject", subject);
                        command.Parameters.AddWithValue("@score", score);
                        command.Parameters.AddWithValue("@pass", pass);
                        command.Parameters.AddWithValue("@type", type);
                        command.ExecuteNonQuery();
                    }
                }
            }



            public static void DeleteScore(string ID, string subject)
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "DELETE FROM SCORE WHERE ID = @ID AND SUBJECT = @subject";
                    command.Parameters.AddWithValue("@ID", ID);
                    command.Parameters.AddWithValue("@subject", subject);
                    command.ExecuteNonQuery();
                }
            }
            public static string GetSchedule(string classID)
            {
                List<Day> days = new List<Day>();
                using (var connection = new SqliteConnection(ConnectionString))
                {
                    string tableName = "SCHEDULE" + classID;
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText =
                        $@"
                        SELECT
                            SUBJECT,
                            DAY1,
                            DAY2,
                            DAY3,
                            DAY4,
                            DAY5
                        FROM
                            {tableName};
                        ";

                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                try
                                {
                                    var day = new Day
                                    {
                                        ID = reader.GetInt32(reader.GetOrdinal("SUBJECT")),
                                        DAY1 = reader.GetString(reader.GetOrdinal("DAY1")),
                                        DAY2 = reader.GetString(reader.GetOrdinal("DAY2")),
                                        DAY3 = reader.GetString(reader.GetOrdinal("DAY3")),
                                        DAY4 = reader.GetString(reader.GetOrdinal("DAY4")),
                                        DAY5 = reader.GetString(reader.GetOrdinal("DAY5"))
                                    };
                                    days.Add(day);
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine(ex.Message);
                                }
                            }
                        }
                    }
                }
                string jsonString = JsonSerializer.Serialize(days);
                return jsonString;
            }


            public static void UpdateSchedule(string classID, string day, string subject_id, string content)
            {
                try
                {
                    using (var connection = new SqliteConnection(ConnectionString))
                    {
                        string tableName = "SCHEDULE" + classID;
                        connection.Open();
                        using (var command = connection.CreateCommand())
                        {
                            var dayColumn = "DAY" + day;
                            command.CommandText = $"UPDATE {tableName} SET {dayColumn} = @CONTENT WHERE SUBJECT = @SUBJECT";
                            command.Parameters.AddWithValue("@SUBJECT", subject_id);
                            command.Parameters.AddWithValue("@CONTENT", content);
                            command.ExecuteNonQuery();
                        }
                        connection.Close();
                    }
                }
                catch
                {
                    throw;
                }
            }


            public static string SignUp(string username, string password, string name = "", string classID = "")
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();
                using (var checkCommand = connection.CreateCommand())
                {
                    checkCommand.CommandText = "SELECT USERNAME FROM STUDENTACCOUNT WHERE USERNAME = @USERNAME";
                    checkCommand.Parameters.AddWithValue("@USERNAME", username);
                    bool recordExists = false;
                    using (var reader = checkCommand.ExecuteReader())
                    {
                        recordExists = reader.Read();
                    }
                    using (var command = connection.CreateCommand())
                    {
                        if (recordExists && classID.Length == 0)
                        {
                            return "Tài khoản đã tồn tại!";
                        }
                        else if (!recordExists && classID.Length == 0)
                        {
                            return "Tài khoản không tồn tại!";
                        }
                        else
                        {
                            command.CommandText = "INSERT INTO STUDENTACCOUNT (USERNAME, PASSWORD, NAME, CLASSID) " +
                                                  "VALUES (@USERNAME, @PASSWORD, @NAME, @CLASSID)";
                        }
                        command.Parameters.AddWithValue("@USERNAME", username);
                        command.Parameters.AddWithValue("@PASSWORD", password);
                        command.Parameters.AddWithValue("@NAME", name);
                        command.Parameters.AddWithValue("@CLASSID", classID);
                        command.ExecuteNonQuery();
                        return "Đăng ký thành công!";
                    }
                }

            }
            public static string getListTeacher(string classID)
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT USERNAME,NAME FROM TEACHERACCOUNT WHERE CLASSID = @classID";
                    command.Parameters.AddWithValue("@classID", classID);
                    using (var reader = command.ExecuteReader())
                    {
                        List<string> listStudent = new List<string>();
                        while (reader.Read())
                        {
                            listStudent.Add(reader.GetString(reader.GetOrdinal("USERNAME")));
                            listStudent.Add(reader.GetString(reader.GetOrdinal("NAME")));
                        }
                        if (listStudent.Count > 0)
                        {
                            string response = string.Join("|", listStudent);
                            return response;
                        }
                        else
                        {
                            return "Danh sách trống";
                        }
                    }
                }
            }
            public static string addTeacher(string username, string password, string name = "", string classID = "")
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();
                using (var checkCommand = connection.CreateCommand())
                {
                    checkCommand.CommandText = "SELECT USERNAME FROM TEACHERACCOUNT WHERE USERNAME = @USERNAME";
                    checkCommand.Parameters.AddWithValue("@USERNAME", username);
                    bool recordExists = false;
                    using (var reader = checkCommand.ExecuteReader())
                    {
                        recordExists = reader.Read();
                    }
                    using (var command = connection.CreateCommand())
                    {
                        if (recordExists)
                        {
                            return "Tài khoản đã tồn tại!";
                        }
                        else
                        {
                            command.CommandText = "INSERT INTO TEACHERACCOUNT (USERNAME, PASSWORD, NAME, CLASSID) " +
                                                  "VALUES (@USERNAME, @PASSWORD, @NAME, @CLASSID)";
                        }
                        command.Parameters.AddWithValue("@USERNAME", username);
                        command.Parameters.AddWithValue("@PASSWORD", password);
                        command.Parameters.AddWithValue("@NAME", name);
                        command.Parameters.AddWithValue("@CLASSID", classID);
                        command.ExecuteNonQuery();
                        return "Thêm mới thành công!";
                    }
                }

            }
        }
        public class Day
        {
            public int ID { get; set; }
            public string DAY1 { get; set; } = "";
            public string DAY2 { get; set; } = "";
            public string DAY3 { get; set; } = "";
            public string DAY4 { get; set; } = "";
            public string DAY5 { get; set; } = "";
        }
    }





    // public static void UpdateScore(string ID, string subject, string score, string pass, string type)
    // {
    //     using var connection = new SqliteConnection(ConnectionString);
    //     connection.Open();

    //     using (var command = connection.CreateCommand())
    //     {
    //         command.CommandText = "UPDATE SCORE " +
    //             "SET SCORE = @score, PASS = @pass, TYPE = @type " +
    //             "WHERE ID = @ID AND SUBJECT = @subject";
    //         command.Parameters.AddWithValue("@score", score);
    //         command.Parameters.AddWithValue("@pass", pass);
    //         command.Parameters.AddWithValue("@type", type);
    //         command.Parameters.AddWithValue("@ID", ID);
    //         command.Parameters.AddWithValue("@subject", subject);
    //         command.ExecuteNonQuery();
    //     }
    // }

}
