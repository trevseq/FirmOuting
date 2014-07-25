using FirmOuting.Models;
using RTE;
using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace FirmOuting.Controllers
{
    public class HomeController : Controller
    {


        public ActionResult Default()
        {
            if (Session["ID"] == null)
                this.Response.RedirectPermanent((Helper.GetSitePath(this.Request.Url) + "Secure?logoff=true"), true);

            // ViewBag.Uid = "BF11DEE0-2BE9-4A16-A86D-C32B75FF3DE9";
            var uid = Helper.GetUID(this.Request);

            if (uid.Groups.Count > 0 && uid.Groups["uid"].Value == Helper.CONTENT_HTML_EDIT)//ViewBag.Uid)
            {
                Editor editor = new Editor(System.Web.HttpContext.Current, "editor");
                editor.Width = Unit.Pixel(980);
                editor.Height = Unit.Pixel(800);
                editor.ResizeMode = RTEResizeMode.AutoAdjustHeight;
                //editor.ContentCss = "~/Content/style-explorer.css";
                //editor.PreviewCss = "~/Content/style-explorer.css";
                editor.EnableObjectResizing = RTEBooleanValue.True;
                editor.EnableIEBorderRadius = RTEBooleanValue.True;
                editor.EnableDragDrop = RTEBooleanValue.False;
                editor.UseHTMLEntities = true;
                editor.AllowScriptCode = true;
                editor.AutoParseClasses = RTEBooleanValue.True;
                editor.DesignDocType = RTEDesignDocType.HTML5;
                editor.EditCompleteDocument = true;
                editor.EnableContextMenu = RTEBooleanValue.True;
                editor.EnableMimetypeChecking = true;
                editor.RenderMode = RTERenderMode.RichOrSimple;
                editor.ValidateRequestMode = System.Web.UI.ValidateRequestMode.Disabled;
                //editor.ResizeMode = RTEResizeMode.AutoAdjustHeight;
                editor.Skin = "smartblue";
                editor.ShowRulers = true;
                editor.Toolbar = "ribbon";//pageproperties,
                //editor.DisabledItems = " insertlayer, new, fullscreen, insertform, insertbox, insertfieldset, fullscreen, syntaxhighlighter";

                #region Html Content Edit.
                var content = string.Empty;
                if (this.Request.QueryString["edit"] == "content")
                {
                    #region Page Content edit
                    string file = ((this.Request.QueryString["cType"] != null) ? this.Request.QueryString["cType"] : "FormContent");
                    // set editor height
                    //editor.Height = Unit.Pixel(560);
                    content += System.IO.File.ReadAllText(this.Request.PhysicalApplicationPath + "Views\\Home\\" + file + ".cshtml");
                    //content = content.Replace("~/uploads/", string.Format("{0}uploads/", Helper.GetSitePath(this.Request.Url)));

                    string url = Helper.GetSitePath(this.Request.Url);
                    url = url.ToLower().Replace("layout", "");
                    RegexOptions opt = RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace | RegexOptions.ExplicitCapture;
                    //string content = File.ReadAllText(string.Format("{0}Views\\Home\\{1}.cshtml", request.PhysicalApplicationPath, template));//"SummerBiographicalForm"
                    content = content.Replace("&nbsp;", " ");
                    content = content.Replace("&", "&amp;");
                    content = content.Replace("“", "&quot;");
                    content = content.Replace("”", "&quot;");
                    content = Regex.Replace(content, @"@url.content\(\""~?/(?<File>[a-zA-Z0-9|\/|.]*)\""\)", (url + "${File}"), opt);
                    // content = Regex.Replace(content, "@(?<using>using \\s(\\w?\\S)*)", "<!--{${using}}-->", opt);
                    //content = Regex.Replace(content, "@(?<model>model \\s(\\w?\\S)*)", "<!--{${model}}-->", opt);
                    //content = Regex.Replace(content, "(@\\*(?<comment>.*)\\*@)", "<!-- ${comment} -->", opt);
                    //content = Regex.Replace(content, @"(?<start><\s*select[^>]*>)(?<c>(.*?))(?<end><\s*/\s*select>)", "${start}<![CDATA[ ${c} ]]>${end}", opt);

                    //  content = Regex.Replace(content, "@Url.Content(\"~/(?<value>uploads/\\s(\\w?\\S)*)\")", (url + "${value}"), opt);
                    // content = Regex.Replace(content, "@Url.Content(\"~/(?<value>Images/\\s(\\w?\\S)*)\")", (url + "${value}"), opt);
                    //content = Regex.Replace(content, @"@\(Url.content\(\""?~/(?<value>(\w?\S)*.(\w))\""\)\)", (url + "${value}"), opt);

                    //  content = Regex.Replace(content, @"(?<attr>[\w]+)=\""@\((?<value>\w?[\S]*)\)\""", "${attr}=\"{${value}}\"", opt);

                    ////  content = Regex.Replace(content, "checked=\"@\\(Helper.IsChecked\\(Model.(\\w)+ == \"(?<isValue>(\\w)+\"\\))*\\)\"", "[${isValue}]", opt);
                    //content = Regex.Replace(content, "checked=\"@\\((?<isCheck>Helper.IsChecked\\(Model.(\\w)+ == \"(\\w)+\"\\))*\\)\"", "checked=\"{${isCheck}}\"");

                    //content = Regex.Replace(content, "(@{(?<code>.*)})", "<![CDATA[ ${code} ]]>", opt);

                    //  content = Regex.Replace(content, "checked=\"@\\((?<isCheck1>Helper.Is[Checked|Display]\\(Model.(\\w)+ == )\"(?<isCheck2>(\\w)+)\"(?<isCheck3>\\))*\\)\"", "checked=\"{${isCheck1}[${isCheck2}]${isCheck3}}\"");

                    //content = content.Replace("class=\"canEdit", "contenteditable=\"true\" class=\"canEdit");

                    content = Regex.Replace(content, "<div class=\"roundCornerBoxShadow\" style=\"background: url(\'" + @"@url.content\(\""~?/(?<source>[a-zA-Z0-9|\/|.]*)\""\)" + "\'); width: (?<width>(\\d*))px; height: (?<height>(\\d*))px; \" ></div>", "<img class=\"roundCornerBoxShadowImg\" style=\"width: ${width}px; height: ${height}px; \" src=\"${source}\"></img>", opt);
                    content = Regex.Replace(content, " for=\"", " forx=\"", opt);
                    #endregion
                }
                else if (this.Request.QueryString["edit"] == "email" && this.Request.QueryString["id"] != null)
                {
                    #region Email Content edit.
                    // set editor height
                    editor.Height = Unit.Pixel(300);

                    // Get email template id.
                    var db = new LegalRecruitingEntities();
                    int id = int.Parse(this.Request.QueryString["id"]);

                    var o = db.AttorneyOutingMailTemplates.Where(e => e.Id == id).FirstOrDefault();
                    ViewBag.From = o.From;
                    ViewBag.Cc = o.CC;
                    ViewBag.Bcc = o.Bcc;
                    ViewBag.Subject = o.Subject;
                    content += o.Body;
                    #endregion
                }

                // editor.LoadHtml();
                editor.LoadFormData(content);
                // editor.LoadHtml(this.Request.PhysicalApplicationPath + "Views\\Home\\FormContent.cshtml");

                editor.MvcInit();
                ViewBag.editor = editor.MvcGetString();
                #endregion
            }
            else if (uid.Groups.Count > 0 && uid.Groups["uid"].Value == Helper.CONTENT_REGISTERED_USER_EDIT)
            {
                #region Registered users repository
                // content += "<h2>Now editing user data entries</h2>";
                #endregion
            }

            return View();
        }

        public ActionResult GetUser()
        {
            var db = new LegalRecruitingEntities();

            int id = int.Parse(Session["ID"].ToString());
            string persontype = Session["PersonType"].ToString();

            var o = (from a in db.AttorneyOutings
                     where ((a.EmployeeID == id) && (a.PersonType == persontype))
                     select new AttorneyOutingModel
            {
                AttendingOuting = a.AttendingOuting ?? string.Empty,
                AttorneyOutingID = a.AttorneyOutingID,
                BasketballOpenPlay = a.BasketballOpenPlay ?? string.Empty,
                BasketballOrganizedGame = a.BasketballOrganizedGame ?? string.Empty,
                BringingGuest = a.BringingGuest ?? string.Empty,
                BusToNYC = a.BusToNYC ?? string.Empty,
                BusToSunningdale = a.BusToSunningdale ?? string.Empty,
                DateSubmitted = a.DateSubmitted,
                DietaryRestrictions = a.DietaryRestrictions ?? string.Empty,
                EmailAddress = a.EmailAddress ?? string.Empty,
                EmployeeID = a.EmployeeID,
                GolfAfternoon = a.GolfAfternoon ?? string.Empty,
                GolfCartOrWalk = a.GolfCartOrWalk ?? string.Empty,
                GolfClinicAfternoon = a.GolfClinicAfternoon ?? string.Empty,
                GolfClinicMorning = a.GolfClinicMorning ?? string.Empty,
                GolfClubRightLeft = a.GolfClubRightLeft ?? string.Empty,
                GolfFoursome = a.GolfFoursome ?? string.Empty,
                GolfLevelOfPlay = a.GolfLevelOfPlay ?? string.Empty,
                GolfMorning = a.GolfMorning ?? string.Empty,
                GolfPlaying = a.GolfPlaying ?? string.Empty,
                GolfRentClubs = a.GolfRentClubs ?? string.Empty,
                MealsDinner = a.MealsDinner ?? string.Empty,
                MealsLunch = a.MealsDinner ?? string.Empty,
                NameTagFirstName = a.NameTagFirstName ?? string.Empty,
                NameTagLastName = a.NameTagLastName ?? string.Empty,
                NameTagMiddleName = a.NameTagMiddleName ?? string.Empty,
                PersonType = a.PersonType ?? string.Empty,
                SpaInterest = a.SpaInterest ?? string.Empty,
                SpaManicure = a.SpaManicure ?? string.Empty,
                SpaMiniMassage = a.SpaMiniMassage ?? string.Empty,
                SpaPedicure = a.SpaPedicure ?? string.Empty,
                TennisAfternoon = a.TennisAfternoon ?? string.Empty,
                TennisLevelOfPlay = a.TennisLevelOfPlay ?? string.Empty,
                TennisMorning = a.TennisMorning ?? string.Empty,
                TennisPlaying = a.TennisPlaying ?? string.Empty,
                TennisRentRacquet = a.TennisRentRacquet ?? string.Empty,
                YogaInterest = a.YogaInterest ?? string.Empty,
                YogaSkillLevel = a.YogaSkillLevel ?? string.Empty,
                SpouseEmail = string.Empty,
                SpouseFirstName = string.Empty,
                SpouseLastName = string.Empty,
                SpouseMiddleName = string.Empty
            }).FirstOrDefault();

            if (o == null)
            {
                o = new AttorneyOutingModel()
                {
                    EmailAddress = Session["Email"].ToString() ?? string.Empty,
                    EmployeeID = int.Parse(Session["ID"].ToString()),
                    NameTagFirstName = Session["FirstName"].ToString(),
                    NameTagMiddleName = string.Empty,
                    NameTagLastName = Session["LastName"].ToString(),
                    PersonType = Session["PersonType"].ToString(),
                    DateSubmitted = new Nullable<DateTime>(),
                    AttendingOuting = string.Empty,
                    BasketballOpenPlay = string.Empty,
                    BasketballOrganizedGame = string.Empty,
                    BringingGuest = string.Empty,
                    BusToNYC = string.Empty,
                    BusToSunningdale = string.Empty,
                    DietaryRestrictions = string.Empty,
                    GolfAfternoon = string.Empty,
                    GolfCartOrWalk = string.Empty,
                    GolfClinicAfternoon = string.Empty,
                    GolfClinicMorning = string.Empty,
                    GolfClubRightLeft = string.Empty,
                    GolfFoursome = string.Empty,
                    GolfLevelOfPlay = string.Empty,
                    GolfMorning = string.Empty,
                    GolfPlaying = string.Empty,
                    GolfRentClubs = string.Empty,
                    MealsDinner = string.Empty,
                    MealsLunch = string.Empty,
                    SpaInterest = string.Empty,
                    SpaManicure = string.Empty,
                    SpaMiniMassage = string.Empty,
                    SpaPedicure = string.Empty,
                    TennisAfternoon = string.Empty,
                    TennisLevelOfPlay = string.Empty,
                    TennisMorning = string.Empty,
                    TennisPlaying = string.Empty,
                    TennisRentRacquet = string.Empty,
                    YogaInterest = string.Empty,
                    YogaSkillLevel = string.Empty,
                    SpouseEmail = string.Empty,
                    SpouseFirstName = string.Empty,
                    SpouseLastName = string.Empty,
                    SpouseMiddleName = string.Empty
                };
            }

            if (o != null && persontype != "SpouseGuest")
            {
                // find employee or spouse
                var spouse = db.AttorneyOutings.Where(e => e.EmployeeID.Value == id && e.PersonType == "SpouseGuest").FirstOrDefault();
                if (spouse != null)
                {
                    o.SpouseFirstName = spouse.NameTagFirstName;
                    o.SpouseMiddleName = spouse.NameTagMiddleName;
                    o.SpouseLastName = spouse.NameTagLastName;
                    o.SpouseEmail = spouse.EmailAddress;
                }
            }

            return new JsonResult()
            {
                Data = o,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        /// <summary>
        /// Gets the email templates from the database and displays the template the user chose to edit/view
        /// </summary>
        /// <param name="id">template id</param>
        /// <returns>appropriate email template for display on the edit page</returns>
        public ActionResult GetMailItem(int id)
        {
            var db = new LegalRecruitingEntities();
            var o = db.AttorneyOutingMailTemplates.Where(e => e.Id == id).FirstOrDefault();

            return new JsonResult()
            {
                Data = o,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        /// <summary>
        /// saves content that was modified in the editor
        /// </summary>
        /// <param name="file">html file to save</param>
        /// <returns>JsonResult</returns>
        public ActionResult SaveContent(string content)
        {
            var db = new LegalRecruitingEntities();
            var o = "";
            string file = (this.Request.QueryString["cType"] + ".cshtml");

            RegexOptions opt = RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace | RegexOptions.ExplicitCapture;
            content = Regex.Replace(content, "<img class=\"roundCornerBoxShadowImg\" style=\"width: (?<width>(\\d*))px; height: (?<height>(\\d*))px;\" src=\"" + @"@url.content\(\""~?/(?<source>[a-zA-Z0-9|\/|.]*)\""\)" + "\"></img>", "<div class=\"roundCornerBoxShadow\" style=\"background: url(\'${source}\'); width: ${width}px; height:${height}px; \" ></div>", opt);
            content = content.Replace(" ", "&nbsp;");
            content = content.Replace("&amp;", "&");
            content = content.Replace("&quot;", "“");
            content = content.Replace("&quot;", "”");

            return new JsonResult()
            {
                Data = o,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }



        /// <summary>
        /// Save the form data into the database.
        /// </summary>
        /// <param name="firstName"></param>
        /// <param name="middleName"></param>
        /// <param name="lastName"></param>
        /// <param name="attendingOuting"></param>
        /// <param name="bringingGuest"></param>
        /// <param name="spouseUserName"></param>
        /// <param name="spousePassword"></param>
        /// <param name="spouseEmail"></param>
        /// <param name="spouseFirstName"></param>
        /// <param name="spouseMiddleName"></param>
        /// <param name="spouseLastName"></param>
        /// <param name="mealsLunch"></param>
        /// <param name="mealsDinner"></param>
        /// <param name="dietaryRestrictions"></param>
        /// <param name="busToSunningdale"></param>
        /// <param name="busToNYC"></param>
        /// <param name="tennisPlaying"></param>
        /// <param name="tennisLevelOfPlay"></param>
        /// <param name="tennisRentRacquet"></param>
        /// <param name="tennisMorning"></param>
        /// <param name="tennisAfternoon"></param>
        /// <param name="golfPlaying"></param>
        /// <param name="golfLevelOfPlay"></param>
        /// <param name="golfRentClubs"></param>
        /// <param name="golfClubRightLeft"></param>
        /// <param name="golfCartOrWalk"></param>
        /// <param name="golfFoursome"></param>
        /// <param name="golfMorning"></param>
        /// <param name="golfClinicMorning"></param>
        /// <param name="golfAfternoon"></param>
        /// <param name="golfClinicAfternoon"></param>
        /// <param name="basketballOpenPlay"></param>
        /// <param name="basketballOrganizedGame"></param>
        /// <param name="spaInterest"></param>
        /// <param name="spaManicure"></param>
        /// <param name="spaPedicure"></param>
        /// <param name="spaMiniMassage"></param>
        /// <param name="yogaInterest"></param>
        /// <param name="yogaSkillLevel"></param>
        /// <returns>view (confirmation page)</returns>
        public ActionResult SaveData(
            string firstName, string middleName, string lastName,
            string attendingOuting, string bringingGuest,
            string spouseUserName, string spousePassword, string spouseEmail,
            string spouseFirstName, string spouseMiddleName, string spouseLastName,
            string mealsLunch, string mealsDinner, string dietaryRestrictions,
            string busToSunningdale, string busToNYC,
            string tennisPlaying, string tennisLevelOfPlay, string tennisRentRacquet, string tennisMorning, string tennisAfternoon,
            string golfPlaying, string golfLevelOfPlay, string golfRentClubs,
            string golfClubRightLeft, string golfCartOrWalk, string golfFoursome,
            string golfMorning, string golfClinicMorning, string golfAfternoon, string golfClinicAfternoon,
            string basketballOpenPlay, string basketballOrganizedGame,
            string spaInterest, string spaManicure, string spaPedicure, string spaMiniMassage,
            string yogaInterest, string yogaSkillLevel)
        {
            //   ViewBag.Message = "Your app description page.";
            var db = new LegalRecruitingEntities();

            if (Session["ID"] == null)
                this.Response.RedirectPermanent((Helper.GetSitePath(this.Request.Url) + "Secure?logoff=true"), true);

            int id = int.Parse(Session["ID"].ToString());
            string persontype = Session["PersonType"].ToString();
            bool _isNewEmployee = false;
            bool _isNewSpouse = false;

            // find employee or spouse in the AttorneyOuting database
            var employee = db.AttorneyOutings.Where(e => e.EmployeeID.Value == id && e.PersonType == persontype).FirstOrDefault();
            if (employee == null)
            {
                // New employee entry
                employee = db.AttorneyOutings.Add(new AttorneyOuting());
                _isNewEmployee = true;
            }

            // populate fields.
            employee.NameTagFirstName = Helper.CheckForNull(firstName);
            employee.NameTagMiddleName = Helper.CheckForNull(middleName);
            employee.NameTagLastName = Helper.CheckForNull(lastName);
            employee.PersonType = Helper.CheckForNull(persontype);
            employee.EmployeeID = id;
            employee.EmailAddress = Helper.CheckForNull(Session["Email"].ToString());
            employee.BringingGuest = Helper.CheckForNull(bringingGuest);
            employee.AttendingOuting = Helper.CheckForNull(attendingOuting);
            employee.MealsLunch = Helper.CheckForNull(mealsLunch);
            employee.MealsDinner = Helper.CheckForNull(mealsDinner);
            employee.DietaryRestrictions = Helper.CheckForNull(dietaryRestrictions);
            employee.BusToSunningdale = Helper.CheckForNull(busToSunningdale);
            employee.BusToNYC = Helper.CheckForNull(busToNYC);
            employee.TennisPlaying = Helper.CheckForNull(tennisPlaying);
            employee.TennisRentRacquet = Helper.CheckForNull(tennisRentRacquet);
            employee.TennisLevelOfPlay = Helper.CheckForNull(tennisLevelOfPlay);
            employee.TennisMorning = Helper.CheckForNull(tennisMorning);
            employee.TennisAfternoon = Helper.CheckForNull(tennisAfternoon);
            employee.GolfPlaying = Helper.CheckForNull(golfPlaying);
            employee.GolfLevelOfPlay = Helper.CheckForNull(golfLevelOfPlay);
            employee.GolfMorning = Helper.CheckForNull(golfMorning);
            employee.GolfClinicMorning = Helper.CheckForNull(golfClinicMorning);
            employee.GolfAfternoon = Helper.CheckForNull(golfAfternoon);
            employee.GolfClinicAfternoon = Helper.CheckForNull(golfClinicAfternoon);
            employee.GolfRentClubs = Helper.CheckForNull(golfRentClubs);
            employee.GolfClubRightLeft = Helper.CheckForNull(golfClubRightLeft);
            employee.GolfCartOrWalk = Helper.CheckForNull(golfCartOrWalk);
            employee.GolfFoursome = Helper.CheckForNull(golfFoursome);
            employee.BasketballOpenPlay = Helper.CheckForNull(basketballOpenPlay);
            employee.BasketballOrganizedGame = Helper.CheckForNull(basketballOrganizedGame);
            employee.SpaInterest = Helper.CheckForNull(spaInterest);
            employee.SpaManicure = Helper.CheckForNull(spaManicure);
            employee.SpaPedicure = Helper.CheckForNull(spaPedicure);
            employee.SpaMiniMassage = Helper.CheckForNull(spaMiniMassage);
            employee.YogaInterest = Helper.CheckForNull(yogaInterest);
            employee.YogaSkillLevel = Helper.CheckForNull(yogaSkillLevel);
            employee.DateSubmitted = DateTime.Now;

            if (persontype == "KBTF Employee" && "yes" == bringingGuest.ToLower())
            {
                // add spouse authentication entry to the AttorneyOutingAuthentications database
                var spouseAuthentication = db.AttorneyOutingAuthentications.Where(e => e.SpouseEmployeeId.Value == id).FirstOrDefault();
                if (spouseAuthentication == null)
                {
                    string encrytedPassword = Helper.Encrypt(spousePassword);
                    db.AttorneyOutingAuthentications.Add(new AttorneyOutingAuthentication() { UserName = spouseUserName, Password = encrytedPassword, SpouseEmployeeId = id });
                    // Add spouse to the AttorneyOuting database.
                    AddSpouse(db, id, spouseFirstName, spouseMiddleName, spouseLastName, spouseEmail);
                    _isNewSpouse = true;
                }
                else
                {
                    var spouse = db.AttorneyOutings.Where(e => e.EmployeeID == id && persontype == "SpouseGuest").FirstOrDefault();
                    if (spouse == null)
                    {
                        // Add spouse to the AttorneyOuting database.
                        AddSpouse(db, id, spouseFirstName, spouseMiddleName, spouseLastName, spouseEmail);
                        _isNewSpouse = true;
                    }
                }
            }

            // Save changes.
            db.SaveChanges();

            if (persontype == "KBTF Employee")
            {
                if (_isNewEmployee)
                {
                    //send submit email
                    Helper.SendFormSubmissionConfirmationMail(id, "KBTF Employee", Helper.GetSitePath(this.Request.Url));
                }
                if (_isNewSpouse)
                {
                    // send spouse registration with username and password
                    Helper.SendGuestRegistrationMail(id, Helper.GetSitePath(this.Request.Url));
                }
            }
            else
            {
                // Spouse
                if (_isNewSpouse)
                {
                    // send spouse submit email and cc employee
                    Helper.SendFormSubmissionConfirmationMail(id, "SpouseGuest", Helper.GetSitePath(this.Request.Url));
                }
            }

            return View();
        }

        /// <summary>
        ///  Add spouse to the AttorneyOuting database.
        /// </summary>
        /// <param name="db"></param>
        /// <param name="id"></param>
        /// <param name="spouseFirstName"></param>
        /// <param name="spouseMiddleName"></param>
        /// <param name="spouseLastName"></param>
        /// <param name="spouseEmail"></param>
        /// <returns></returns>
        public AttorneyOuting AddSpouse(LegalRecruitingEntities db, int id, string spouseFirstName, string spouseMiddleName, string spouseLastName, string spouseEmail)
        {
            var spouseEmployee = db.AttorneyOutings.Add(new AttorneyOuting());
            spouseEmployee.EmployeeID = id;
            spouseEmployee.NameTagFirstName = spouseFirstName;
            spouseEmployee.NameTagMiddleName = spouseMiddleName;
            spouseEmployee.NameTagLastName = spouseLastName;
            spouseEmployee.EmailAddress = spouseEmail;
            spouseEmployee.PersonType = "SpouseGuest";

            return spouseEmployee;
        }

        public ActionResult Admin()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}