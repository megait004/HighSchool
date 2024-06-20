using System.Net;
using System.Text;

namespace HighSchool
{
    internal class HttpServer : Server
    {

        public void StartHttpListener()
        {
            string exePath = System.Reflection.Assembly.GetExecutingAssembly().Location;

            string exeFolder = Path.GetDirectoryName(exePath);
            string websiteFolder = Path.Combine(exeFolder, "src");
            string htmlPath = Path.Combine(websiteFolder, "index.html");

            if (File.Exists(htmlPath))
            {
                Task.Run(async () =>
                {
                    HttpListener listener = new HttpListener();
                    listener.Prefixes.Add("http://localhost:8080/");
                    listener.Start();

                    while (true)
                    {
                        HttpListenerContext context = await listener.GetContextAsync();
                        HttpListenerRequest request = context.Request;
                        HttpListenerResponse response = context.Response;

                        string filePath = Path.Combine(websiteFolder, request.Url.LocalPath.TrimStart('/'));

                        if (Directory.Exists(filePath))
                        {
                            filePath = Path.Combine(filePath, "index.html");
                        }
                        else if (!File.Exists(filePath))
                        {
                            filePath = Path.Combine(websiteFolder, "index.html");
                        }
                        if (File.Exists(filePath))
                        {
                            string extension = Path.GetExtension(filePath).ToLower();
                            string mimeType = GetMimeType(extension);
                            byte[] content = File.ReadAllBytes(filePath);

                            response.ContentType = mimeType;
                            response.ContentLength64 = content.Length;
                            await response.OutputStream.WriteAsync(content, 0, content.Length);
                        }
                        else
                        {
                            response.StatusCode = 404;
                            byte[] content = Encoding.UTF8.GetBytes("404 - File not found");
                            await response.OutputStream.WriteAsync(content, 0, content.Length);
                        }

                        response.OutputStream.Close();
                    }
                });

            }
            else
            {
                MessageBox.Show("Thiếu tệp thực thi!");
            }
        }

        private string GetMimeType(string extension)
        {
            switch (extension)
            {
                case ".html": return "text/html";
                case ".js": return "application/javascript";
                case ".css": return "text/css";
                case ".png": return "image/png";
                case ".jpg": return "image/jpeg";
                case ".gif": return "image/gif";
                case ".svg": return "image/svg+xml";
                default: return "application/octet-stream";
            }
        }
    }
}
