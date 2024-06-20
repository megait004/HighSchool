using System.Windows.Forms.VisualStyles;
using Microsoft.Web.WebView2.Core;
namespace HighSchool
{
    public partial class Gui : Form
    {
        public Gui()
        {
            InitializeComponent();
            var server = new HttpServer();
            server.StartHttpListener();
            RunWebView2();
            IDatabase.Database.InitDatabase();
        }
        private async void RunWebView2()
        {
            await webView2.EnsureCoreWebView2Async(null);
            webView2.CoreWebView2.Navigate("http://localhost:8080/login");
            webView2.CoreWebView2.WebMessageReceived += OnWebMessageReceived;
        }

        private void OnWebMessageReceived(object? sender, CoreWebView2WebMessageReceivedEventArgs args)
        {
            var message = args.WebMessageAsJson;
            var type = IApi.Api.GetType(message);
            if (type == "login")
            {
                var receivedUsername = "";
                var response = IApi.Api.Login(message);
                webView2.CoreWebView2.PostWebMessageAsString(response);
                if (response != "Đăng nhập thành công!")
                {
                    webView2.CoreWebView2.ExecuteScriptAsync($"showErrorMessage('{response}')");
                    return;
                };
                receivedUsername = IApi.Api.GetUsername(message);
                webView2.CoreWebView2.ExecuteScriptAsync("document.cookie = 'logedIn=true; path=/;");
                webView2.CoreWebView2.ExecuteScriptAsync($"document.cookie = 'username={receivedUsername}; path=/;'");
                webView2.CoreWebView2.ExecuteScriptAsync("goToHome()");
            }
            else if (type == "getInfo")
            {
                var response = IApi.Api.GetInfo(message);
                webView2.CoreWebView2.PostWebMessageAsString(response);
                if (response != "Lỗi không xác định")
                {
                    var classId = response.Split("|")[0];
                    var name = response.Split("|")[1];
                    webView2.CoreWebView2.ExecuteScriptAsync($"document.cookie = 'classID = {classId}; path=/;'");
                    webView2.CoreWebView2.ExecuteScriptAsync($"document.cookie = 'name = {name}; path=/;'");
                }
            }
            else if (type == "updateStudentAccount")
            {
                var api = new IApi.Api();
                api.UpdateStudentAccount(message);
            }
            else if (type == "getListStudent")
            {
                var api = new IApi.Api();
                var response = api.GetListStudent(message);
                webView2.CoreWebView2.ExecuteScriptAsync($"getListStudent('{response}')");
            }
            else if (type == "getScore")
            {
                var api = new IApi.Api();
                var response = api.GetScore(message);
                var encodedResponse = response.Replace("'", "\\'").Replace("\n", "\\n").Replace("\r", "\\r").Replace("\t", "\\t");
                webView2.CoreWebView2.ExecuteScriptAsync($"localStorage.setItem('score', '{encodedResponse}');");
            }
            else if (type == "addScore")
            {
                IApi.Api.AddScore(message);
            }
            else if (type == "deleteScore")
            {
                IApi.Api.DeleteScore(message);
            }
            else if (type == "getSchedule")
            {
                var api = new IApi.Api();
                var response = api.GetSchedule(message);
                webView2.CoreWebView2.ExecuteScriptAsync($"localStorage.setItem(\'schedule\', \'{response}\'); ");
            }
            else if (type == "updateSchedule")
            {
                IApi.Api.UpdateSchedule(message);
                var api = new IApi.Api();
                var response = api.GetSchedule(message);
                webView2.CoreWebView2.ExecuteScriptAsync($"localStorage.setItem(\'schedule\', \'{response}\'); ");
            }

            else if (type == "signup")
            {
                var signupResult = IApi.Api.SignUp(message);
                if (signupResult == "Đăng ký thành công!")
                {
                    webView2.CoreWebView2.ExecuteScriptAsync("signUpSuccess();");
                }
                else if (signupResult == "Tài khoản không tồn tại!")
                {
                    webView2.CoreWebView2.ExecuteScriptAsync($"localStorage.setItem(\'signUpState\', \'true\'); ");
                }
                else
                {
                    webView2.CoreWebView2.ExecuteScriptAsync($"showErrorMessage('{signupResult}');");
                }
            }

            else if (type == "getListTeacher")
            {
                var api = new IApi.Api();
                var response = api.getListTeacher(message);
                webView2.CoreWebView2.ExecuteScriptAsync($"getListTeacher('{response}')");

            }
            else if (type == "addTeacher")
            {
                var signupResult = IApi.Api.addTeacher(message);
                if (signupResult == "Thêm mới thành công!")
                {
                    webView2.CoreWebView2.ExecuteScriptAsync("window.location.reload();");
                }
                else
                {
                    webView2.CoreWebView2.ExecuteScriptAsync($"showErrorMessage('{signupResult}');");
                }
            }
        }
    }
}
