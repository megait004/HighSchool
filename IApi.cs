using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
namespace HighSchool
{
    internal interface IApi
    {
        public class Api()
        {
            public static string GetType(string fullData)
            {
                JsonElement data = JsonSerializer.Deserialize<dynamic>(fullData);

                return data.TryGetProperty("type", out var keyType) ? keyType.ToString() : "Lỗi: Thiếu key type!";
            }
            public static string Login(string message)
            {
                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var receivedUsername = "";
                    var receivedPassword = "";

                    if (data.TryGetProperty("username", out JsonElement keyUserName))
                    {
                        receivedUsername = keyUserName.GetString() ?? "";
                        if (data.TryGetProperty("password", out JsonElement keyPassword))
                        {
                            receivedPassword = keyPassword.GetString() ?? "";
                        }
                    }
                    var response = IDatabase.Database.Login(receivedUsername, receivedPassword);
                    return response;
                }
                else
                {
                    return "Lỗi không xác định";
                }
            }

            public static string GetUsername(string message)
            {
                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var receivedUsername = "";

                    if (data.TryGetProperty("username", out JsonElement keyUserName))
                    {
                        receivedUsername = keyUserName.GetString() ?? "";
                    }
                    var response = receivedUsername;
                    return response;
                }
                else
                {
                    return "Lỗi không xác định";
                }
            }
            public static string GetInfo(string message)
            {
                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var receivedUsername = "";
                    if (data.TryGetProperty("username", out JsonElement keyUserName))
                    {
                        receivedUsername = keyUserName.GetString() ?? "";
                    }
                    var response = IDatabase.Database.GetInfo(receivedUsername);
                    return response;
                }
                else
                {
                    return "Lỗi không xác định";
                }
            }

            public void UpdateStudentAccount(string message)
            {
                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var receivedUsername = "";
                    var receivedName = "";
                    var receivedPassword = "";
                    if (data.TryGetProperty("username", out JsonElement keyUserName))
                    {
                        receivedUsername = keyUserName.GetString() ?? "";
                    }
                    if (data.TryGetProperty("name", out JsonElement keyName))
                    {
                        receivedName = keyName.GetString() ?? "";
                    }
                    if (data.TryGetProperty("password", out JsonElement keyPassword))
                    {
                        receivedPassword = keyPassword.GetString() ?? "";
                    }
                    IDatabase.Database.UpdateStudentAccount(receivedUsername, receivedName, receivedPassword);
                }
            }
            public string GetListStudent(string message)
            {
                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var receivedClassID = "";
                    if (data.TryGetProperty("classID", out JsonElement keyClassID))
                    {
                        receivedClassID = keyClassID.GetString() ?? "";
                    }
                    var response = IDatabase.Database.GetListStudent(receivedClassID);
                    return response;
                }
                return "Lỗi không xác định";
            }

            public string GetScore(string message)
            {
                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var receivedID = "";
                    if (data.TryGetProperty("ID", out JsonElement keyID))
                    {
                        receivedID = keyID.GetString() ?? "";
                    }
                    var response = IDatabase.Database.GetScore(receivedID);
                    return response;
                }
                return "Lỗi không xác định";
            }
            public static string AddScore(string message)
            {
                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var ID = "";
                    var subject = "";
                    var score = "";
                    var pass = "";
                    var type = "";

                    if (data.TryGetProperty("ID", out JsonElement keyID))
                    {
                        ID = keyID.GetString() ?? "";
                    }
                    if (data.TryGetProperty("subject", out JsonElement keySubject))
                    {
                        subject = keySubject.GetString() ?? "";
                    }
                    if (data.TryGetProperty("score", out JsonElement keyScore))
                    {
                        score = keyScore.GetString() ?? "";
                    }
                    if (data.TryGetProperty("pass", out JsonElement keyPass))
                    {
                        pass = keyPass.GetBoolean() ? "1" : "0";
                    }
                    if (data.TryGetProperty("note", out JsonElement keyType))
                    {
                        type = keyType.GetString() ?? "";
                    }

                    IDatabase.Database.AddScore(ID, subject, score, pass, type);
                    return "Thêm điểm thành công";
                }
                else
                {
                    return "";
                }
            }


            public static void DeleteScore(string message)
            {
                JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                var ID = "";
                var subject = "";
                if (data.TryGetProperty("UserName", out JsonElement keyID))
                {
                    ID = keyID.GetString() ?? "";
                }
                if (data.TryGetProperty("Subject", out JsonElement keySubject))
                {
                    subject = keySubject.GetString() ?? "";
                }
                IDatabase.Database.DeleteScore(ID, subject);
            }

            public static void UpdateSchedule(string message)
            {


                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var CLASID = "";
                    var DAY = "";
                    var SUBJECTID = "";
                    var CONTENT = "";
                    if (data.TryGetProperty("CLASSID", out JsonElement keyClassID))
                    {
                        CLASID = keyClassID.GetString() ?? "";
                    }
                    if (data.TryGetProperty("DAY", out JsonElement keyDay))
                    {
                        DAY = keyDay.GetString() ?? "";
                    }
                    if (data.TryGetProperty("ID", out JsonElement keySubjectID))
                    {
                        SUBJECTID = keySubjectID.GetString() ?? "";
                    }
                    if (data.TryGetProperty("SUBJECT", out JsonElement keyContent))
                    {
                        CONTENT = keyContent.GetString() ?? "";
                    }
                    IDatabase.Database.UpdateSchedule(CLASID, DAY, SUBJECTID, CONTENT);
                }
            }
            public string GetSchedule(string message)
            {
                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var receivedClassID = "";
                    if (data.TryGetProperty("classID", out JsonElement keyClassID))
                    {
                        receivedClassID = keyClassID.GetString() ?? "";
                    }
                    var response = IDatabase.Database.GetSchedule(receivedClassID);
                    return response;
                }
                return "Lỗi không xác định";
            }


            public static string SignUp(string message)
            {
                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var USERNAME = "";
                    var PASSWORD = "";
                    var NAME = "";
                    var CLASSID = "";
                    if (data.TryGetProperty("username", out JsonElement keyUserName))
                    {
                        USERNAME = keyUserName.GetString() ?? "";
                    }
                    if (data.TryGetProperty("password", out JsonElement keyPassword))
                    {
                        PASSWORD = keyPassword.GetString() ?? "";
                    }
                    if (data.TryGetProperty("name", out JsonElement keyName))
                    {
                        NAME = keyName.GetString() ?? "";
                    }
                    if (data.TryGetProperty("classID", out JsonElement keyClassID))
                    {
                        CLASSID = keyClassID.GetString() ?? "";
                    }
                    return IDatabase.Database.SignUp(USERNAME, PASSWORD, NAME, CLASSID);
                }
                return "Lỗi không xác định";

            }
            public string getListTeacher(string message)
            {
                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var receivedClassID = "";
                    if (data.TryGetProperty("classID", out JsonElement keyClassID))
                    {
                        receivedClassID = keyClassID.GetString() ?? "";
                    }
                    var response = IDatabase.Database.getListTeacher(receivedClassID);
                    return response;
                }
                return "Lỗi không xác định";
            }
            public static string addTeacher(string message)
            {
                if (!string.IsNullOrEmpty(message))
                {
                    JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                    var USERNAME = "";
                    var PASSWORD = "";
                    var NAME = "";
                    var CLASSID = "";
                    if (data.TryGetProperty("username", out JsonElement keyUserName))
                    {
                        USERNAME = keyUserName.GetString() ?? "";
                    }
                    if (data.TryGetProperty("password", out JsonElement keyPassword))
                    {
                        PASSWORD = keyPassword.GetString() ?? "";
                    }
                    if (data.TryGetProperty("name", out JsonElement keyName))
                    {
                        NAME = keyName.GetString() ?? "";
                    }
                    if (data.TryGetProperty("classID", out JsonElement keyClassID))
                    {
                        CLASSID = keyClassID.GetString() ?? "";
                    }
                    return IDatabase.Database.addTeacher(USERNAME, PASSWORD, NAME, CLASSID);
                }
                return "Lỗi không xác định";

            }
        }
    }
}