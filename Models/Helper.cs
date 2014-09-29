using System;
using System.Collections.Generic;
using System.Configuration;
using System.DirectoryServices;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using System.Xml.XPath;

namespace FirmOuting.Models
{
    public static class Helper
    {
        private const string passphrase = "RETBGF02w3547rlsRFfdpseEWRfdmqwevclRsgeo4mnmwEqf54u2354634ksdgf943LDI93YU=";

        // Guid Id for html content edit mode.
        public static string CONTENT_HTML_EDIT = "BF11DEE0-2BE9-4A16-A86D-C32B75FF3DE9";

        // Guid Id for registered users edit mode.
        public static string CONTENT_REGISTERED_USER_EDIT = "7F0D60A2-AF50-429D-9CD2-89F98C8B7BB1";

        public static string Encrypt(string Message)
        {
            byte[] Results;
            System.Text.UTF8Encoding UTF8 = new System.Text.UTF8Encoding();
            MD5CryptoServiceProvider HashProvider = new MD5CryptoServiceProvider();
            byte[] TDESKey = HashProvider.ComputeHash(UTF8.GetBytes(passphrase));
            TripleDESCryptoServiceProvider TDESAlgorithm = new TripleDESCryptoServiceProvider();
            TDESAlgorithm.Key = TDESKey;
            TDESAlgorithm.Mode = CipherMode.ECB;
            TDESAlgorithm.Padding = PaddingMode.PKCS7;
            byte[] DataToEncrypt = UTF8.GetBytes(Message);
            try
            {
                ICryptoTransform Encryptor = TDESAlgorithm.CreateEncryptor();
                Results = Encryptor.TransformFinalBlock(DataToEncrypt, 0, DataToEncrypt.Length);
            }
            finally
            {
                TDESAlgorithm.Clear();
                HashProvider.Clear();
            }
            return Convert.ToBase64String(Results);
        }

        public static string Decrypt(string Message)
        {
            byte[] Results;
            System.Text.UTF8Encoding UTF8 = new System.Text.UTF8Encoding();
            MD5CryptoServiceProvider HashProvider = new MD5CryptoServiceProvider();
            byte[] TDESKey = HashProvider.ComputeHash(UTF8.GetBytes(passphrase));
            TripleDESCryptoServiceProvider TDESAlgorithm = new TripleDESCryptoServiceProvider();
            TDESAlgorithm.Key = TDESKey;
            TDESAlgorithm.Mode = CipherMode.ECB;
            TDESAlgorithm.Padding = PaddingMode.PKCS7;
            byte[] DataToDecrypt = Convert.FromBase64String(Message);
            try
            {
                ICryptoTransform Decryptor = TDESAlgorithm.CreateDecryptor();
                Results = Decryptor.TransformFinalBlock(DataToDecrypt, 0, DataToDecrypt.Length);
            }
            finally
            {
                TDESAlgorithm.Clear();
                HashProvider.Clear();
            }
            return UTF8.GetString(Results);
        }

        /// <summary>
        /// Gets the base path of the site
        /// </summary>
        /// <param name="url"></param>
        /// <returns>Site path- string (site)</returns>
        public static string GetSitePath(Uri url)
        {
            string site = (url.OriginalString.ToLower().Replace(("home" + url.Query.ToLower()), ""));
            return site;
        }

        public static Match GetUID(HttpRequestBase request)
        {
            var m = Regex.Match(request.Url.Query, "(?<uid>.{8}-.{4}-.{4}-.{4}-.{12})", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.ExplicitCapture);

            return m;
        }

        /// <summary>
        /// Loads the editable pages for creation of the tree structure by GetFileContent()
        /// </summary>
        /// <param name="request">HttpRequestBase</param>
        /// <returns>MvcHtmlString (content)</returns>
        public static MvcHtmlString GetArticle(HttpRequestBase request)
        {
            // Load file content
            string content = string.Empty;
            content += GetFileContent("FormContent.cshtml", request);
            content += GetFileContent("Confirmation.cshtml", request);

            return new MvcHtmlString(content);
        }

        /// <summary>
        /// Formats and parses the form page and registration confirmation pages and builds the Solution Explorer tree structure
        /// </summary>
        /// <param name="file">Page to parse/build tree structure from</param>
        /// <param name="request">HttpRequestBase</param>
        /// <returns>string (content)</returns>
        public static string GetFileContent(string file, HttpRequestBase request)
        {
            string contentName = file.Replace(".cshtml", "");
            string content = string.Empty;
            string src = (request.PhysicalApplicationPath + ("Views\\Home\\" + file));
            var html = System.IO.File.ReadAllText(src);
            string url = Helper.GetSitePath(request.Url);
            RegexOptions opt = RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace | RegexOptions.ExplicitCapture;
            //html = Regex.Replace(html, "@(?<using>using \\s(\\w?\\S)*)", "<!--{${using}}-->", opt);
            //html = Regex.Replace(html, "@(?<model>model \\s(\\w?\\S)*)", "<!--{${model}}-->", opt);
            //html = html.Replace("@Url.Content(\"~/Images/asterisk.png\")", (url + "Images/asterisk.png"));
            //html = html.Replace("@Url.Content(\"~/uploads/sunningdalePool.jpg\")", (url + "Uploads/sunningdalePool.jpg"));
            //html = html.Replace("@Url.Content(\"~/uploads/AttorneyOutingHeader.jpg\")", (url + "Uploads/AttorneyOutingHeader.jpg"));
            // html = Regex.Replace(html, "@Url.Content(\"~/(?<img>\\s(\\w?\\S)*)\")", (url + "${img}"), opt);
            //content = Regex.Replace(content, "@Url.Content(\"~/(?<value>uploads/\\s(\\w?\\S)*)\")", (url + "${value}"), opt);
            //content = Regex.Replace(content, "@Url.Content(\"~/(?<value>Images/\\s(\\w?\\S)*)\")", (url + "${value}"), opt);
            html = html.Replace("&nbsp;", " ");
            html = html.Replace("&", "&amp;");
            html = html.Replace("“", "&quot;");
            html = html.Replace("”", "&quot;");
            html = Regex.Replace(html, @"@url.content\(\""~?/(?<File>[a-zA-Z0-9|\/|.]*)\""\)", (url + "${File}"), opt);

            XDocument doc = XDocument.Parse(html);

            //Build tree structure

            #region Outer + Article Tables

            string artGuid = Guid.NewGuid().ToString("D");
            string artId = "imgArticle_" + artGuid;

            //outer table (pages)
            content = "<table border=\"0\" cellpadding=\"2\" cellspacing=\"3\" style=\"width:auto\">";
            content += "<tr>";
            //expand/collapse button
            content += "<td style=\"width:12px;vertical-align:top\">";
            content += "<img id=\"" + artId + "\" src=\"" + GetSitePath(request.Url) + "/Content/Images/ig_tblMinus.gif\"/>";
            content += "</td>";
            //article name
            content += "<td colspan=\"2\">";
            content += "<a style=\"cursor:pointer\" onclick=\"javascript:ShowContent('" + contentName + "')\" ondblclick=\"javascript:ExpandCollapseItem(document.getElementById('" + artId + "'));\">";
            content += "<b>" + (contentName.Replace(".cshtml", "")) + "</b>";
            content += "</a>";
            //article table
            content += "<table id=\"tbArticle_" + artGuid + "\">";
            content += "<tr>";
            content += "<td>";

            //Find all section tags
            IEnumerable<XElement> sections = doc.XPathSelectElements("//section");

            #region Sections Table

            int indx = 1;
            foreach (XElement section in sections)
            {
                XAttribute attId = section.Attribute("id");
                string id = attId.Value;
                id = id.Replace("_", " ");
                string sectGuid = Guid.NewGuid().ToString("D");

                IEnumerable<XElement> labels = section.XPathSelectElements(".//label[@for]");
                int label_count = labels.Count();
                string imgTreeNode = "<img id=\"imgSection" + indx + "_" + sectGuid + "\" src=\"" + GetSitePath(request.Url) + "/Content/Images/ig_tblPlus.gif\" />";
                content += string.Format(
                    "<table border=\"0\" cellpadding=\"2\" cellspacing=\"3\" id=\"tbSection" + indx + "\">" +
                    "<tr>" +
                    "<td style=\"width:12px;vertical-align:top\">" +
                    "<p style=\"margin:0px\">{0}" +
                    "</td>" +

                    "<td style=\"width:auto;vertical-align:top;margin:0px\">" +
                    "<p style=\"margin:0px; vertical-align: top\">" +
                    "<img align=\"bottom\" src=\"" + GetSitePath(request.Url) + "/Content/Images/HtmlBalanceBracesHS.png\" style=\"margin:2px\"/>{1}" +
                    "</p>",
                    (label_count > 0 ? imgTreeNode : ""), id);

                if (label_count > 0)
                {
                    #region Labels Table

                    content += "<table  id=\"tbSection" + indx + "_" + sectGuid + "\" style=\"display:none;width:100%\" border=\"0\" cellpadding=\"2\" cellspacing=\"3\">";
                    foreach (XElement label in labels)
                    {
                        var cc1 = section.XPathSelectElement(".//input[@id='" + label.Attribute("for").Value + "']");
                        string c1 = ((cc1 != null) ? label.Attribute("for").Value : label.Attribute("id").Value);
                        string bold = ((cc1 == null) ? ";font-weight:bold" : "");

                        content += "<tr>";
                        content += "<td id=\"tbl\" style=\"width:12px;vertical-align:top\">{0}</td>";
                        content += "<td style=\"white-space:nowrap\">";
                        //label

                        content += "<a " + GetLinkIdFromLabel(label.Attribute("id")) + " style=\"color:#1f7fd6;cursor:Pointer;text-decoration: underline;" + bold + "\" onclick=\"FindShowControl('" + c1 + "')\">" + label.Value.Replace(":", "") + "</a>";

                        string lbl = label.Attribute("for").Value;
                        if (lbl.StartsWith("rdo") || lbl.StartsWith("chk") || lbl.StartsWith("drp"))
                        {
                            IEnumerable<XElement> controls = null;

                            #region commented out

                            //if (lbl.StartsWith("rdo"))
                            //{
                            //    lbl = lbl.Replace("rdo", "lbl");
                            //    controls = section.XPathSelectElements(".//label[starts-with(@id,'" + lbl + "')]");
                            //}
                            //else if (lbl.StartsWith("chk") || lbl.StartsWith("drp"))
                            //{
                            //    controls = section.XPathSelectElements(".//input[@name='" + lbl + "']");
                            //}

                            #endregion commented out

                            if (lbl.StartsWith("chk") || lbl.StartsWith("rdo"))
                                controls = section.XPathSelectElements(".//input[@name='" + lbl + "']");
                            else if (lbl.StartsWith("drp"))
                                controls = section.XPathSelectElements(".//select[@id='" + lbl + "']");

                            #region commented out

                            //else
                            //else if (lbl.StartsWith("drp"))
                            //{
                            //    lbl = lbl.Replace("rdo", "lbl");
                            //    controls = section.XPathSelectElements(".//input[@id='" + lbl + "']");
                            //}

                            #endregion commented out

                            int length = controls.Count();
                            string lblGuid = Guid.NewGuid().ToString("D");

                            content = string.Format(content, length > 0 ? "<img id=\"imgLabel_" + lblGuid + "\" src=\"" + GetSitePath(request.Url) + "/Content/Images/ig_tblPlus.gif\" style=\"margin:2px\"/>" : "");
                            if (length > 0)
                            {
                                #region controls Table

                                //content += "<tr id=\"tbLabel_" + Guid.NewGuid().ToString("D") + "\" style=\"display:none\"><td></td><td><table style=\"width:100%\" border=\"1\" cellpadding=\"2\" cellspacing=\"3\">";
                                content += "<table id=\"tbLabel_" + lblGuid + "\" style=\"display:none; width:100%\" border=\"0\" cellpadding=\"2\" cellspacing=\"3\">";
                                foreach (XElement control in controls)
                                {
                                    if (control.HasElements)
                                    {
                                        //control is a dropdown/select box
                                        if (control.Attribute("id").Value.StartsWith("drp"))
                                        {
                                            var ctrlId = control.Attribute("id").Value;
                                            ctrlId = ctrlId.Replace("drp", "op");
                                            var options = section.XPathSelectElements(".//option[starts-with(@id,'" + ctrlId + "')]");
                                            foreach (XElement option in options)
                                            {
                                                content += "<tr>";
                                                //empty cell for indentation
                                                content += "<td style=\"width:12px\">&nbsp;&nbsp;&nbsp;</td>";

                                                //options
                                                content += "<td style=\"width:auto\">";
                                                content += "<a style=\"color:#1f7fd6;cursor:Pointer;text-decoration: underline;\" onclick=\"FindShowControl('" + option.Attribute("id").Value + "')\">" + option.Value + "</a>";
                                                content += "</td>";

                                                content += "</tr>";
                                            }
                                        }
                                        else
                                        {
                                            content += "<tr>";
                                            //empty cell for indentation
                                            content += "<td style=\"width:12px\">&nbsp;&nbsp;&nbsp;</td>";

                                            //inputs
                                            content += "<td style=\"width:auto\">";
                                            content += "<a " + GetLinkIdFromLabel(label.Attribute("id")) + " style=\"color:#1f7fd6;cursor:Pointer;text-decoration: underline;\" onclick=\"FindShowControl('" + control.Element("input").Attribute("id").Value + "')\">" + control.Value + "</a>";
                                            content += "</td>";

                                            content += "</tr>";
                                        }
                                    }
                                    else
                                    {
                                        //control is a checkbox
                                        if ((control.Attribute("type") != null) && (control.Parent.Attribute("id").Value.StartsWith("lbl")))
                                        {
                                            content += "<tr>";
                                            //empty cell for indentation
                                            content += "<td style=\"width:12px\">&nbsp;&nbsp;&nbsp;</td>";

                                            //checkbox text (from parent label)
                                            content += "<td style=\"width:auto\">";
                                            content += "<a " + GetLinkIdFromLabel(label.Attribute("id")) + " style=\"color:#1f7fd6;cursor:Pointer;text-decoration: underline;\" onclick=\"FindShowControl('" + control.Attribute("id").Value + "')\">" + control.Parent.Value + "</a>";
                                            content += "</td>";

                                            content += "</tr>";
                                        }
                                    }
                                }
                                content += "</td></tr></table>";

                                #endregion controls Table
                            }
                        }
                        else
                        {
                            content = string.Format(content, "");
                        }
                        content += "</td></tr>";
                    }
                    content += "</td></tr></table>";

                    #endregion Labels Table
                }
                indx += 1;
                content += "</td></tr></table>";
            }
            //close article table
            content += "</td></tr></table>";

            #endregion Sections Table

            //close outer table
            content += "</td>";
            content += "</tr>";
            content += "</table>";

            #endregion Outer + Article Tables

            return content;
        }

        /// <summary>
        /// Pulls the mail template names from the database and displays them as clickable links in the Solution Explorer dialog
        /// </summary>
        /// <param name="request">HttpRequestBase</param>
        /// <returns>MvcHtmlString (content)</returns>
        public static MvcHtmlString GetMailTemplates(HttpRequestBase request)
        {
            string content = "";
            var db = new LegalRecruitingEntities();
            var o = db.AttorneyOutingMailTemplates;
            content += "<ul style=\"list-style:square\">";
            foreach (AttorneyOutingMailTemplate a in o)
            {
                content += "<li><a href=\"" + Helper.GetSitePath(request.Url) + "home?uid=BF11DEE0-2BE9-4A16-A86D-C32B75FF3DE9&edit=email&id=" + a.Id + "\">" + a.TemplateName + "</a></li>";
            }
            content += "</ul>";

            return new MvcHtmlString(content);
        }

        public static string IsChecked(bool b)
        {
            return (b == true) ? "checked" : "";
        }

        public static string IsDisplay(bool b)
        {
            return (b == true) ? "Block" : "none";
        }

        //public static AttorneyOuting GetData()
        //{
        //    var db = new LegalRecruitingEntities();
        //    var o =  db.AttorneyOutings.FirstOrDefault();
        //    return o;
        //}

        /// <summary>
        /// Checks in Active Directory if the given user belong to the provided group.
        /// </summary>
        /// <param name="groupName">The group to check for the user existence.</param>
        /// <param name="userName">The user to look for.</param>
        /// <returns>bool (result)</returns>
        public static bool IsUserInGroup(string groupName, string userName)
        {
            bool result = false;

            string usr = userName.ToLower();
            usr = usr.Replace("kasowitz\\", "");
            DirectoryEntry ent = new DirectoryEntry(ConfigurationManager.AppSettings["ADPath"]);
            DirectorySearcher srch = new DirectorySearcher(string.Format("(CN={0})", groupName));

            srch.PropertiesToLoad.Add("member");
            SearchResult coll = srch.FindOne();

            if (coll != null)
            {
                ResultPropertyValueCollection results = coll.Properties["member"];
                foreach (var p in results)
                {
                    // If this is a user compare the user name
                    if (Regex.IsMatch(p.ToString(), "(OU=Users)"))
                    {
                        DirectoryEntry gpMemberEntry = new DirectoryEntry("LDAP://" + p);
                        if (gpMemberEntry.Properties["sAMAccountName"][0].Equals(usr))
                        {
                            result = true;
                            goto FX_23;
                        }
                    }
                    else
                    {
                        // this is a group.
                        string[] ss = p.ToString().Split(new char[] { ',' });
                        if (IsUserInGroup(ss[0].Replace("CN=", ""), usr))
                        {
                            result = true;
                            goto FX_23;
                        }
                    }
                }
            }

        FX_23:

            return result;
        }

        /// <summary>
        /// Checks user's credentials in ActiveDirectory and the Outing Auth database, if not found in AD or the data table, user fails login.
        /// If user is authentic and a Kasowitz employee, also checks for FirmOuting admin permissions.
        /// </summary>
        /// <param name="session">HttpSessionStateBase</param>
        /// <param name="username">Kasowitz username if employee; pre-generated username if guest.</param>
        /// <param name="password">Kasowitz login password if employee; pre-generated password if guest.</param>
        /// <returns>bool (isUserAuthentic)</returns>
        public static bool AuthenticateUser(HttpSessionStateBase session, string username, string password)
        {
            bool isUserAuthentic = false;
            try
            {
                var db = new LegalRecruitingEntities();
                DirectoryEntry entry = new DirectoryEntry(ConfigurationManager.AppSettings["ADPath"], username, password);
                DirectorySearcher search = new DirectorySearcher(entry);
                string usr = Regex.Match(username, "\\\\(?<user>.*)|(?<user>.*)@").Groups["user"].Value;
                search.Filter = "(SAMAccountName=" + (!string.IsNullOrEmpty(usr) ? usr : username) + ")";

                search.PropertiesToLoad.Add("extensionattribute1");
                search.PropertiesToLoad.Add("cn"); // Full Name
                search.PropertiesToLoad.Add("givenName"); // First Name
                search.PropertiesToLoad.Add("middleName"); // Middle Name
                search.PropertiesToLoad.Add("sn"); // Last Name
                search.PropertiesToLoad.Add("mail");
                search.PropertiesToLoad.Add("SAMAccountName");
                SearchResult result = search.FindOne();

                if (result != null)
                {
                    #region Kasowitz employee login

                    // user found in AD
                    int id = int.Parse(result.Properties["extensionattribute1"][0].ToString());
                    session["ID"] = id;
                    session["User"] = result.Properties["cn"][0];
                    session["FirstName"] = result.Properties["givenName"][0];
                    //session["MiddleName"] = result.Properties["middleName"][0];
                    session["LastName"] = result.Properties["sn"][0];
                    session["Email"] = result.Properties["mail"][0];
                    session["PersonType"] = "KBTF Employee";

                    session["IsNewButtonValue"] = (db.AttorneyOutings.Where(e => e.EmployeeID == id).Count() > 0) ? "Save" : "Submit";

                    string[] lstAccess = ConfigurationManager.AppSettings["ADAccessUsers"].Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                    var activeUsr = (result.Properties["SAMAccountName"][0] != null ? result.Properties["SAMAccountName"][0].ToString().ToLower() : "");
                    //var usrAcc = Array.Find(lstAccess, x => x.Equals(result.Properties["SAMAccountName"][0]));
                    var usrAcc = lstAccess.Where(e => e == activeUsr).FirstOrDefault();
                    bool hasGroupAcc = (!string.IsNullOrEmpty(usrAcc));
                    if (hasGroupAcc == false)
                    {
                        lstAccess = ConfigurationManager.AppSettings["ADAccessGroups"].Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                        for (int i = 0; i < lstAccess.Length; i++)
                        {
                            hasGroupAcc = IsUserInGroup(lstAccess[i], result.Properties["SAMAccountName"][0].ToString());
                            if (hasGroupAcc)
                                i = lstAccess.Length;
                        }
                    }
                    session["IsAdmin"] = hasGroupAcc;
                    isUserAuthentic = true;

                    #endregion Kasowitz employee login
                }
            }
            catch
            {
                // AD user not found, try the database

                #region spouse login

                var db = new LegalRecruitingEntities();
                string enryptPassword = Helper.Encrypt(password);
                var authentic = db.AttorneyOutingAuthentications.Where(e => e.UserName == username && e.Password == enryptPassword).FirstOrDefault();
                if (authentic != null)
                {
                    var spouse = db.AttorneyOutings.Where(e => (e.EmployeeID == authentic.SpouseEmployeeId) && e.PersonType == "SpouseGuest").FirstOrDefault();
                    if (spouse != null)
                    {
                        int id = int.Parse(authentic.SpouseEmployeeId.ToString());
                        session["ID"] = id;
                        //session["User"] = result.Properties["cn"][0];
                        session["FirstName"] = spouse.NameTagFirstName;
                        //session["MiddleName"] = spouse.NameTagMiddleName;
                        session["LastName"] = spouse.NameTagLastName;
                        session["Email"] = spouse.EmailAddress;
                        session["PersonType"] = "SpouseGuest";
                        session["IsAdmin"] = false;
                        session["IsNewButtonValue"] = (db.AttorneyOutings.Where(e => e.EmployeeID == id).Count() > 0) ? "Save" : "Submit";
                        isUserAuthentic = true;
                    }
                }

                #endregion spouse login
            }

            return isUserAuthentic;
        }

        /// <summary>
        /// Checks input string and returns the string value if and only if the string is not null or empty. Otherwise returns null.
        /// </summary>
        /// <param name="value">String to test</param>
        /// <returns>Either 'null' or the value of the input string.</returns>
        public static string CheckForNull(string value)
        {
            string s = null;

            if (!string.IsNullOrEmpty(value))
            {
                s = value;
            }
            return s;
        }

        /// <summary>
        ///  Gets date (year) of next attorney outing to put in wizard title bar
        /// </summary>
        public static int NextOuting
        {
            get
            {
                if (DateTime.Today.Month >= 7)
                {
                    return DateTime.Today.Year + 1;
                }
                else
                {
                    return DateTime.Today.Year;
                }
            }
        }

        /// <summary>
        /// Pulls names from database to put in javascript array for txtFoursome autocomplete
        /// </summary>
        /// <param name="request">HttpRequestBase</param>
        /// <returns>MvcHtmlString (strAttorneyNames)</returns>
        public static MvcHtmlString GetAttorneyNames(HttpRequestBase request)
        {
            var strAttorneyNames = string.Empty;
            var db = new LegalRecruitingEntities();
            var o = db.AttorneyOutings;
            foreach (AttorneyOuting a in o)
            {
                var first = a.NameTagFirstName;
                var middle = (a.NameTagMiddleName != null && a.NameTagMiddleName != " ") ? a.NameTagMiddleName : "";
                var last = a.NameTagLastName;
                if (first != null && first != "" && last != null && last != "")
                {
                    strAttorneyNames += (strAttorneyNames.Length > 0) ? "," : "";
                    strAttorneyNames += (first + " " + middle + " " + last);
                }
            }
            return new MvcHtmlString(strAttorneyNames);
        }

        public static void SendGuestRegistrationMail(int employeeID, string path)
        {
            var db = new LegalRecruitingEntities();
            var mailDb = db.AttorneyOutingMailTemplates.Where(e => e.Id == 3).FirstOrDefault();
            var outingDbSpouse = db.AttorneyOutings.Where(e => e.EmployeeID == employeeID && e.PersonType == "SpouseGuest").FirstOrDefault();
            var outingDbEmployee = db.AttorneyOutings.Where(e => e.EmployeeID == employeeID && e.PersonType == "KBTF Employee").FirstOrDefault();
            var authDb = db.AttorneyOutingAuthentications.Where(e => e.SpouseEmployeeId == outingDbEmployee.EmployeeID).FirstOrDefault();
            string sitePath = path;

            MailMessage mail = new MailMessage();
            mail.To.Add(outingDbSpouse.EmailAddress);
            mail.From = new MailAddress(mailDb.From);
            //mail.CC.Add(outingDbEmployee.EmailAddress);
            if (mailDb.Bcc != null)
            {
                string[] userBccList = mailDb.Bcc.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string bcc in userBccList)
                {
                    mail.Bcc.Add(bcc);
                }
            }
            mail.Subject = mailDb.Subject;

            string msg = mailDb.Body.Replace("{firstname}", outingDbSpouse.NameTagFirstName);
            msg = msg.Replace("{username}", authDb.UserName);
            msg = msg.Replace("{site}", sitePath);
            //mail.Body = msg.Replace("{password}", authDb.Password); // <-- temporarily unencrypted to facilitate debugging
            mail.Body = msg.Replace("{password}", Helper.Decrypt(authDb.Password));
            mail.IsBodyHtml = true;

            SmtpClient sc = new SmtpClient();
            sc.Host = ConfigurationManager.AppSettings["ContactHost"];
            //sc.Send(mail);
        }

        public static void SendFormSubmissionConfirmationMail(int employeeID, string personType, string path)
        {
            var db = new LegalRecruitingEntities();
            var mailDb = db.AttorneyOutingMailTemplates.Where(e => e.Id == 4).FirstOrDefault();
            var outingDbSpouse = db.AttorneyOutings.Where(e => e.EmployeeID == employeeID && e.PersonType == "SpouseGuest").FirstOrDefault();
            var outingDbEmployee = db.AttorneyOutings.Where(e => e.EmployeeID == employeeID && e.PersonType == "KBTF Employee").FirstOrDefault();

            MailMessage mail = new MailMessage();
            mail.To.Add((personType == "SpouseGuest") ? outingDbSpouse.EmailAddress : outingDbEmployee.EmailAddress);
            mail.From = new MailAddress(mailDb.From);

            if (personType == "SpouseGuest" && outingDbSpouse.EmailAddress != outingDbEmployee.EmailAddress)
                mail.CC.Add(outingDbEmployee.EmailAddress);
            if (mailDb.Bcc != null)
            {
                string[] userBccList = mailDb.Bcc.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string bcc in userBccList)
                {
                    mail.Bcc.Add(bcc);
                }
            }

            mail.Subject = mailDb.Subject;
            mail.Body = mailDb.Body.Replace("{firstname}", ((personType == "SpouseGuest") ? outingDbSpouse.NameTagFirstName : outingDbEmployee.NameTagFirstName));
            mail.IsBodyHtml = true;

            SmtpClient sc = new SmtpClient();
            sc.Host = ConfigurationManager.AppSettings["ContactHost"];
            //sc.Send(mail);
        }

        public static string GetLinkIdFromLabel(XAttribute label)
        {
            string s = "";
            if (label != null)
            {
                if (!string.IsNullOrEmpty(label.Value))
                    s += ("id=\"" + label.Value.Replace("lbl", "lnk") + "\"");
            }

            return s;
        }
    }

    public class AttorneyOutingModel
    {
        public int AttorneyOutingID { get; set; }

        public string NameTagFirstName { get; set; }

        public string NameTagMiddleName { get; set; }

        public string NameTagLastName { get; set; }

        public string PersonType { get; set; }

        public Nullable<int> EmployeeID { get; set; }

        public string EmailAddress { get; set; }

        public string BringingGuest { get; set; }

        public string AttendingOuting { get; set; }

        public string MealsLunch { get; set; }

        public string MealsDinner { get; set; }

        public string DietaryRestrictions { get; set; }

        public string BusToSunningdale { get; set; }

        public string BusToNYC { get; set; }

        public string TennisPlaying { get; set; }

        public string TennisRentRacquet { get; set; }

        public string TennisLevelOfPlay { get; set; }

        public string TennisMorning { get; set; }

        public string TennisAfternoon { get; set; }

        public string GolfPlaying { get; set; }

        public string GolfLevelOfPlay { get; set; }

        public string GolfMorning { get; set; }

        public string GolfClinicMorning { get; set; }

        public string GolfAfternoon { get; set; }

        public string GolfClinicAfternoon { get; set; }

        public string GolfRentClubs { get; set; }

        public string GolfClubRightLeft { get; set; }

        public string GolfCartOrWalk { get; set; }

        public string GolfFoursome { get; set; }

        public string BasketballOpenPlay { get; set; }

        public string BasketballOrganizedGame { get; set; }

        public string SpaInterest { get; set; }

        public string SpaManicure { get; set; }

        public string SpaPedicure { get; set; }

        public string SpaMiniMassage { get; set; }

        public string YogaInterest { get; set; }

        public string YogaSkillLevel { get; set; }

        public string SpouseFirstName { get; set; }

        public string SpouseMiddleName { get; set; }

        public string SpouseLastName { get; set; }

        public string SpouseEmail { get; set; }

        public Nullable<System.DateTime> DateSubmitted { get; set; }
    }
}