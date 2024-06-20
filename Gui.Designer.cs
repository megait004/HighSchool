namespace HighSchool
{
    partial class Gui
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            webView2 = new Microsoft.Web.WebView2.WinForms.WebView2();
            ((System.ComponentModel.ISupportInitialize)webView2).BeginInit();
            SuspendLayout();
            //
            // webView2
            //
            webView2.AllowExternalDrop = false;
            webView2.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            webView2.CreationProperties = null;
            webView2.DefaultBackgroundColor = Color.White;
            webView2.Location = new Point(0, 0);
            webView2.Margin = new Padding(0);
            webView2.Name = "webView2";
            webView2.Size = new Size(1024, 576);
            webView2.TabIndex = 0;
            webView2.ZoomFactor = 1D;
            //
            // Gui
            //
            ClientSize = new Size(1020, 572);
            Controls.Add(webView2);
            FormBorderStyle = FormBorderStyle.Fixed3D;
            MinimizeBox = true;
            MaximizeBox = false;
            Name = "Gui";
            ShowIcon = false;
            StartPosition = FormStartPosition.CenterScreen;
            Text = "HighSchool";
            TopMost = true;
            ((System.ComponentModel.ISupportInitialize)webView2).EndInit();
            ResumeLayout(false);
        }
        #endregion

        private Microsoft.Web.WebView2.WinForms.WebView2 webView2;
    }
}
