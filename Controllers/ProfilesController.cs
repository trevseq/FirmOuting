using FirmOuting.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace FirmOuting.Controllers
{
    public class ProfilesController : Controller
    {
        // GET: Profiles
        public ActionResult Default()
        {
            return View();
        }

        public ActionResult GetProfiles()
        {
            bool _success = false;
            dynamic data = null;
            var db = new LegalRecruitingEntities();
            try
            {
                data = db.AttorneyOutings.ToArray();
                _success = true;
            }
            catch
            {
            }
            return new JsonResult()
            {
                Data = new { db.AttorneyOutings, _success },

                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public ActionResult RemoveAllUsers()
        {
            bool _success = false;
            var db = new LegalRecruitingEntities();
            try
            {
                // Delete all records
                // db.Database.ExecuteSqlCommand("TRUNCATE TABLE AttorneyOutings", new object[] { null });
                _success = true;
            }
            catch
            {
            }
            return new JsonResult()
            {
                Data = _success,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public ActionResult RemoveRegisteredUser(int id)
        {
            bool _success = false;
            var db = new LegalRecruitingEntities();
            try
            {
                //// Find record with matching id.
                //var record = db.AttorneyOutings.SingleOrDefault(r => r.AttorneyOutingID == id);
                //if (record != null)
                //{
                //    // Remove record from database.
                //    db.AttorneyOutings.Remove(record);
                //    db.SaveChanges();
                //}
                _success = true;
            }
            catch
            {
            }
            return new JsonResult()
            {
                Data = _success,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public ActionResult ResaveDbData(int recId, string firstName, string middleName, string lastName, int employeeId,
            string personType, string attending, string email, string bringingGuest, string lunch, string dinner, string diet, string busToSunningdale, string busToNYC, string tennisPlaying, string tennisRentRacquet, string tennisLevel,
            string tennisMorning, string tennisAfternoon, string golfPlaying, string golfLevel, string golfMorning, string golfAfternoon, string golfClinicMorning, string golfClinicAfternoon, string golfRent, string golfHands,
            string golfCart, string golfFoursome, string basketballOpenPlay, string basketballOrganizedGame, string spaInterest, string spaMani, string spaPedi, string spaMassage, string yogaInterest, string yogaSkill)
        {
            var db = new LegalRecruitingEntities();
            var employee = db.AttorneyOutings.Where(e => e.EmployeeID.Value == employeeId && e.PersonType == personType).FirstOrDefault();
            bool _success = false;

            employee.NameTagFirstName = Helper.CheckForNull(firstName);
            employee.NameTagMiddleName = Helper.CheckForNull(middleName);
            employee.NameTagLastName = Helper.CheckForNull(lastName);
            employee.PersonType = Helper.CheckForNull(personType);
            employee.EmployeeID = employeeId;
            employee.EmailAddress = Helper.CheckForNull(email);
            employee.BringingGuest = Helper.CheckForNull(bringingGuest);
            employee.AttendingOuting = Helper.CheckForNull(attending);
            employee.MealsLunch = Helper.CheckForNull(lunch);
            employee.MealsDinner = Helper.CheckForNull(dinner);
            employee.DietaryRestrictions = Helper.CheckForNull(diet);
            employee.BusToSunningdale = Helper.CheckForNull(busToSunningdale);
            employee.BusToNYC = Helper.CheckForNull(busToNYC);
            employee.TennisPlaying = Helper.CheckForNull(tennisPlaying);
            employee.TennisRentRacquet = Helper.CheckForNull(tennisRentRacquet);
            employee.TennisLevelOfPlay = Helper.CheckForNull(tennisLevel);
            employee.TennisMorning = Helper.CheckForNull(tennisMorning);
            employee.TennisAfternoon = Helper.CheckForNull(tennisAfternoon);
            employee.GolfPlaying = Helper.CheckForNull(golfPlaying);
            employee.GolfLevelOfPlay = Helper.CheckForNull(golfLevel);
            employee.GolfMorning = Helper.CheckForNull(golfMorning);
            employee.GolfClinicMorning = Helper.CheckForNull(golfClinicMorning);
            employee.GolfAfternoon = Helper.CheckForNull(golfAfternoon);
            employee.GolfClinicAfternoon = Helper.CheckForNull(golfClinicAfternoon);
            employee.GolfRentClubs = Helper.CheckForNull(golfRent);
            employee.GolfClubRightLeft = Helper.CheckForNull(golfHands);
            employee.GolfCartOrWalk = Helper.CheckForNull(golfCart);
            employee.GolfFoursome = Helper.CheckForNull(golfFoursome);
            employee.BasketballOpenPlay = Helper.CheckForNull(basketballOpenPlay);
            employee.BasketballOrganizedGame = Helper.CheckForNull(basketballOrganizedGame);
            employee.SpaInterest = Helper.CheckForNull(spaInterest);
            employee.SpaManicure = Helper.CheckForNull(spaMani);
            employee.SpaPedicure = Helper.CheckForNull(spaPedi);
            employee.SpaMiniMassage = Helper.CheckForNull(spaMassage);
            employee.YogaInterest = Helper.CheckForNull(yogaInterest);
            employee.YogaSkillLevel = Helper.CheckForNull(yogaSkill);
            employee.DateSubmitted = DateTime.Now;

            //db.SaveChanges();

            return new JsonResult()
            {
                Data = _success,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}