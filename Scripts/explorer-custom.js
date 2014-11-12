var faq_view = 0;				//	 default view [ 0 = single view, 1 = full view ]
var faq_stiky_index = true;		//	 floating navigation
var editor;
var pathName = location.pathname.toLowerCase();
pathName = pathName.replace("secure", "");
pathName = pathName.replace("home", "");
pathName = pathName.replace("profiles", "");
pathName += ((pathName.substring(pathName.length - 1) != "/") ? "/" : "");
pathName = location.protocol + "//" + location.host + pathName.replace("//", "/");
// var pathName = location.pathname.toLowerCase();
var isValidated = false;
var pSwitch = false;

$(document).ready(function () {
    /***** Nav - Sidebar **************************************************/
    if ($('#side-nav').length) {
        exp_loadSideNav();
    }

    /***** Nav - Sidebar **************************************************/
    if ($('#header').length) {
        exp_loadTopNav();
    }

    /***** Panel - FAQ ****************************************************/
    if ($('.panel .faq-columns').size()) {
        exp_loadFAQ();
    }

    /***** Panel - Wizard *************************************************/
    if ($('.panel.wizard').size()) {
        exp_loadWizard();
    }

    exp_loadPanels();
    exp_colorSupport();

    if (location.pathname.toLowerCase().indexOf("home") > -1) {
        $('#btnSubmit').button();

        /*********** Populate the forms********************************/
        var jq = $.ajax({ type: "GET", async: true, dataType: "json", url: (pathName + "Home/GetUser"), cache: false });//
        jq.done(function (e) {
            /*_____Personal Info_____*/
            if (e.EmployeeID != null)
                $("#hdnEmployeeID").val(e.EmployeeID);
            if (e.NameTagFirstName != null)
                $("#txtFirstName").val(e.NameTagFirstName);
            if (e.NameTagMiddleName != null)
                $("#txtMiddleName").val(e.NameTagMiddleName);
            if (e.NameTagLastName != null)
                $("#txtLastName").val(e.NameTagLastName);
            if (e.PersonType != null)
                $("#Guest_Info").css("display", ((e.PersonType == "KBTF Employee") ? "block" : "none"));

            if (e.AttendingOuting != null) {
                if ("no" == e.AttendingOuting.toLowerCase())
                    $("#rdoAttendingNo").attr("checked", true);
                else if ("dinner" == e.AttendingOuting.toLowerCase())
                    $("#rdoAttendingDinner").attr("checked", true);
                else if ("yes" == e.AttendingOuting.toLowerCase())
                    $("#rdoAttendingYes").attr("checked", true);
                $(".hideAll").css("display", ("no" != e.AttendingOuting.toLowerCase()) ? "block" : "none");
                $(".hideActivities").css("display", ("dinner" != e.AttendingOuting.toLowerCase()) ? "block" : "none");
            }

            if (e.BringingGuest != null) {
                $("#rdoGuestBringYes").attr("checked", ($.trim($("#lblGuestBringYes").text().toLowerCase()) == e.BringingGuest.toLowerCase()));
                $("#rdoGuestBringNo").attr("checked", ($.trim($("#lblGuestBringNo").text().toLowerCase()) == e.BringingGuest.toLowerCase()));
                $(".hideGuest").css("display", (($.trim($("#lblGuestBringNo").text().toLowerCase()) != e.BringingGuest.toLowerCase()) ? "block" : "none"));
            }
            $("#rdoGuestBringYes").val($.trim($("#lblGuestBringYes").text()));
            $("#rdoGuestBringNo").val($.trim($("#lblGuestBringNo").text()));

            if (e.EmailAddress != null)
                $("#txtGuestEmail").val(e.SpouseEmail);

            /*_____Spouse_____*/
            $("#txtGuestFirstName").val($.trim(e.SpouseFirstName.toLowerCase()));
            $("#txtGuestMiddleName").val($.trim(e.SpouseMiddleName.toLowerCase()));
            $("#txtGuestLastName").val($.trim(e.SpouseLastName.toLowerCase()));
            $("#txtGuestEmail").val($.trim(e.SpouseEmail.toLowerCase()));

            /*_____Meals_____*/
            if (e.MealsLunch != null) {
                $("#rdoMealsLunchYes").attr("checked", ($.trim($("#lblMealsLunchYes").text().toLowerCase()) == e.MealsLunch.toLowerCase()));
                $("#rdoMealsLunchNo").attr("checked", ($.trim($("#lblMealsLunchNo").text().toLowerCase()) == e.MealsLunch.toLowerCase()));
            }
            $("#rdoMealsLunchYes").val($.trim($("#lblMealsLunchYes").text()));
            $("#rdoMealsLunchNo").val($.trim($("#lblMealsLunchNo").text()));

            if (e.MealsDinner != null) {
                $("#rdoMealsDinnerYes").attr("checked", ($.trim($("#lblMealsDinnerYes").text().toLowerCase()) == e.MealsDinner.toLowerCase()));
                $("#rdoMealsDinnerNo").attr("checked", ($.trim($("#lblMealsDinnerNo").text().toLowerCase()) == e.MealsDinner.toLowerCase()));
            }
            $("#rdoMealsDinnerYes").val($.trim($("#lblMealsDinnerYes").text()));
            $("#rdoMealsDinnerNo").val($.trim($("#rdoMealsDinner").text()));

            if (e.DietaryRestrictions != null) {
                var tempDietaryRestrictions = e.DietaryRestrictions;
                var arrDietSplit = e.DietaryRestrictions.split(",")
                for (var i = 0; i < arrDietSplit.length; i++) {
                    if ($.trim($("#lblDietKosher").text()) == arrDietSplit[i]) {
                        $("#chkDietKosher").attr("checked", true);
                        tempDietaryRestrictions = tempDietaryRestrictions.replace((arrDietSplit[i] + ","), "");
                    }
                    else if ($.trim($('#lblDietVegetarian').text()) == arrDietSplit[i]) {
                        $("#chkDietVegetarian").attr("checked", true);
                        tempDietaryRestrictions = tempDietaryRestrictions.replace((arrDietSplit[i] + ","), "");
                    }
                    else if ($.trim($('#lblDietVegan').text()) == arrDietSplit[i]) {
                        $("#chkDietVegan").attr("checked", true);
                        tempDietaryRestrictions = tempDietaryRestrictions.replace((arrDietSplit[i] + ","), "");
                    }
                    else if ($.trim($('#lblDietPescatarian').text()) == arrDietSplit[i]) {
                        $("#chkDietPescatarian").attr("checked", true);
                        tempDietaryRestrictions = tempDietaryRestrictions.replace((arrDietSplit[i] + ","), "");
                    }
                    else if ($.trim($('#lblDietGluten').text()) == arrDietSplit[i]) {
                        $("#chkDietGluten").attr("checked", true);
                        tempDietaryRestrictions = tempDietaryRestrictions.replace((arrDietSplit[i] + ","), "");
                    }
                    else if ($.trim($('#lblDietNut').text()) == arrDietSplit[i]) {
                        $("#chkDietNut").attr("checked", true);
                        tempDietaryRestrictions = tempDietaryRestrictions.replace((arrDietSplit[i] + ","), "");
                    }
                    else if ($.trim($('#lblDietShellfish').text()) == arrDietSplit[i]) {
                        $("#chkDietShellfish").attr("checked", true);
                        tempDietaryRestrictions = tempDietaryRestrictions.replace((arrDietSplit[i] + ","), "");
                    }
                    else if ($.trim($('#lblDietLactose').text()) == arrDietSplit[i]) {
                        $("#chkDietLactose").attr("checked", true);
                        tempDietaryRestrictions = tempDietaryRestrictions.replace((arrDietSplit[i] + ","), "");
                    }
                }
                $("#txtDietOther").val(tempDietaryRestrictions);
            }

            /*_____Transportation_____*/
            if (e.BusToSunningdale != null) {
                $("#rdoBus730").attr("checked", ($.trim($("#lblBus730").text().toLowerCase()) == e.BusToSunningdale.toLowerCase()));
                $("#rdoBus1130").attr("checked", ($.trim($("#lblBus1130").text().toLowerCase()) == e.BusToSunningdale.toLowerCase()));
                $("#rdoBus5").attr("checked", ($.trim($("#lblBus5").text().toLowerCase()) == e.BusToSunningdale.toLowerCase()));
                $("#rdoBusNo").attr("checked", ($.trim($("#lblBusNo").text().toLowerCase()) == e.BusToSunningdale.toLowerCase()));
            }
            $("#rdoBus730").val($.trim($("#lblBus730").text()));
            $("#rdoBus1130").val($.trim($("#lblBus1130").text()));
            $("#rdoBus5").val($.trim($("#lblBus5").text()));
            $("#rdoBusNo").val($.trim($("#lblBusNo").text()));

            if (e.BusToNYC != null) {
                $("#rdoBusHomeYes").attr("checked", ($.trim($("#lblBusHomeYes").text().toLowerCase()) == e.BusToNYC.toLowerCase()));
                $("#rdoBusHomeNo").attr("checked", ($.trim($("#lblBusHomeNo").text().toLowerCase()) == e.BusToNYC.toLowerCase()));
            }
            $("#rdoBusHomeYes").val($.trim($("#lblBusHomeYes").text()));
            $("#rdoBusHomeNo").val($.trim($("#lblBusHomeNo").text()));

            /*_____Tennis_____*/
            if (e.TennisPlaying != null) {
                $("#rdoTennisYes").attr("checked", ($.trim($("#lblTennisYes").text().toLowerCase()) == e.TennisPlaying.toLowerCase()));
                $("#rdoTennisNo").attr("checked", ($.trim($("#lblTennisNo").text().toLowerCase()) == e.TennisPlaying.toLowerCase()));
                $(".hideTennis").css("display", ($.trim($("#lblTennisYes").text().toLowerCase()) == e.TennisPlaying.toLowerCase()) ? "block" : "none");
            }
            $("#rdoTennisYes").val($.trim($("#lblTennisYes").text()));
            $("#rdoTennisNo").val($.trim($("#lblTennisNo").text()));

            if (e.TennisLevelOfPlay != null) {
                $("#drpTennisLevel").val(e.TennisLevelOfPlay);

                if ($("[name='rdoTennis']:checked").length == 0)
                    $("#drpTennisLevel").prop('selectedIndex', -1);
            }

            if (e.TennisRentRacquet != null) {
                $("#rdoTennisRentYes").attr("checked", ($.trim($("#lblTennisRentYes").text().toLowerCase()) == e.TennisRentRacquet.toLowerCase()));
                $("#rdoTennisRentNo").attr("checked", ($.trim($("#lblTennisRentNo").text().toLowerCase()) == e.TennisRentRacquet.toLowerCase()));
            }
            $("#rdoTennisRentYes").val($.trim($("#lblTennisRentYes").text()));
            $("#rdoTennisRentNo").val($.trim($("#lblTennisRentNo").text()));

            if (e.TennisMorning != null) {
                $("#rdoTennisMorningClinic").attr("checked", ($.trim($("#lblTennisMorningClinic").text().toLowerCase()) == e.TennisMorning.toLowerCase()));
                $("#rdoTennisMorningPlay").attr("checked", ($.trim($("#lblTennisMorningPlay").text().toLowerCase()) == e.TennisMorning.toLowerCase()));
                $("#rdoTennisMorningClinicPlay").attr("checked", ($.trim($("#lblTennisMorningClinicPlay").text().toLowerCase()) == e.TennisMorning.toLowerCase()));
                $("#rdoTennisMorningNone").attr("checked", ($.trim($("#lblTennisMorningNone").text().toLowerCase()) == e.TennisMorning.toLowerCase()));
            }
            $("#rdoTennisMorningClinic").val($.trim($("#lblTennisMorningClinic").text()));
            $("#rdoTennisMorningPlay").val($.trim($("#lblTennisMorningPlay").text()));
            $("#rdoTennisMorningClinicPlay").val($.trim($("#lblTennisMorningClinicPlay").text()));
            $("#rdoTennisMorningNone").val($.trim($("#lblTennisMorningNone").text()));

            if (e.TennisAfternoon != null) {
                $("#rdoTennisAfternoonClinic").attr("checked", ($.trim($("#lblTennisAfternoonClinic").text().toLowerCase()) == e.TennisAfternoon.toLowerCase()));
                $("#rdoTennisAfternoonPlay").attr("checked", ($.trim($("#lblTennisAfternoonPlay").text().toLowerCase()) == e.TennisAfternoon.toLowerCase()));
                $("#rdoTennisAfternoonClinicPlay").attr("checked", ($.trim($("#lblTennisAfternoonClinicPlay").text().toLowerCase()) == e.TennisAfternoon.toLowerCase()));
                $("#rdoTennisAfternoonNone").attr("checked", ($.trim($("#lblTennisAfternoonNone").text().toLowerCase()) == e.TennisAfternoon.toLowerCase()));
            }
            $("#rdoTennisAfternoonClinic").val($.trim($("#lblTennisAfternoonClinic").text()));
            $("#rdoTennisAfternoonPlay").val($.trim($("#lblTennisAfternoonPlay").text()));
            $("#rdoTennisAfternoonClinicPlay").val($.trim($("#lblTennisAfternoonClinicPlay").text()));
            $("#rdoTennisAfternoonNone").val($.trim($("#lblTennisAfternoonNone").text()));

            /*_____Golf_____*/
            if (e.GolfPlaying != null) {
                $("#rdoGolfPlayYes").attr("checked", ($.trim($("#lblGolfPlayYes").text().toLowerCase()) == e.GolfPlaying.toLowerCase()));
                $("#rdoGolfPlayNo").attr("checked", ($.trim($("#lblGolfPlayNo").text().toLowerCase()) == e.GolfPlaying.toLowerCase()));
                if ($.trim($("#lblGolfPlayYes").text().toLowerCase()) == e.GolfPlaying.toLowerCase()) {
                    $(".hideGolf").css("display", "block");
                    if (e.GolfRentClubs != null && $("#lblGolfRentClubsYes").text().toLowerCase() == e.GolfRentClubs.toLowerCase()) {
                        $(".hideRentClubs").css("display", "block");
                    }
                }
                else {
                    $(".hideGolf").css("display", "none");
                    $(".hideRentClubs").css("display", "none");
                }
            }
            $("#rdoGolfPlayYes").val($.trim($("#lblGolfPlayYes").text()));
            $("#rdoGolfPlayNo").val($.trim($("#lblGolfPlayNo").text()));

            if (e.GolfLevelOfPlay != null) {
                $("#drpGolfLevel").val(e.GolfLevelOfPlay);

                if ($("[name='rdoGolf']:checked").length == 0)
                    $("#drpGolfLevel").prop('selectedIndex', -1);
            }

            if (e.GolfRentClubs != null) {
                $("#rdoRentClubsYes").attr("checked", ($.trim($("#lblGolfRentClubsYes").text().toLowerCase()) == e.GolfRentClubs.toLowerCase()));
                $("#rdoRentClubsNo").attr("checked", ($.trim($("#lblGolfRentClubsNo").text().toLowerCase()) == e.GolfRentClubs.toLowerCase()));
                //  $(".hideRentClubs").css("display", ($.trim($("#lblGolfRentClubsYes").text().toLowerCase()) == e.GolfRentClubs.toLowerCase()) ? "block" : "none");
            }
            $("#rdoRentClubsYes").val($("#lblGolfRentClubsYes").text());
            $("#rdoRentClubsNo").val($("#lblGolfRentClubsNo").text());

            if (e.GolfClubRightLeft != null) {
                $("#rdoGolfHandsLeft").attr("checked", ($.trim($("#lblGolfHandsLeft").text().toLowerCase()) == e.GolfClubRightLeft.toLowerCase()));
                $("#rdoGolfHandsRight").attr("checked", ($.trim($("#lblGolfHandsRight").text().toLowerCase()) == e.GolfClubRightLeft.toLowerCase()));
            }
            $("#rdoGolfHandsLeft").val($.trim($("#lblGolfHandsLeft").text()));
            $("#rdoGolfHandsRight").val($.trim($("#lblGolfHandsRight").text()));

            if (e.GolfCartOrWalk != null) {
                $("#rdoCaddyYes").attr("checked", ($.trim($("#lblCaddyYes").text().toLowerCase()) == e.GolfCartOrWalk.toLowerCase()));
                $("#rdoCaddyNo").attr("checked", ($.trim($("#lblCaddyNo").text().toLowerCase()) == e.GolfCartOrWalk.toLowerCase()));
            }
            $("#rdoCaddyYes").val($.trim($("#lblCaddyYes").text()));
            $("#rdoCaddyNo").val($.trim($("#lblCaddyNo").text()));

            var golfText = e.GolfFoursome.replace(", ", "," + "/n");
            $("#txtFoursome").val(golfText);

            if (e.GolfMorning != null) {
                $("#drpTeeTimeAM").val(e.GolfMorning);
            }

            if (e.GolfClinicMorning != null) {
                $("#rdoGolfTypeAMClinic").attr("checked", ($.trim($("#lblGolfTypeAMClinic").text().toLowerCase()) == e.GolfClinicMorning.toLowerCase()));
                $("#rdoGolfTypeAMClinicPlay").attr("checked", ($.trim($("#lblGolfTypeAMClinicPlay").text().toLowerCase()) == e.GolfClinicMorning.toLowerCase()));
                $("#rdoGolfTypeAMPlay").attr("checked", (e.GolfClinicMorning.length > 0 && e.GolfMorning.length > 0));
            }
            $("#rdoGolfTypeAMClinic").val($.trim($("#lblGolfTypeAMClinic").text()));
            $("#rdoGolfTypeAMClinicPlay").val($.trim($("#lblGolfTypeAMClinicPlay").text()));
            $("#rdoGolfTypeAMPlay").val($.trim($("#lblGolfTypeAMPlay").text()));
            $("#rdoGolfTypeAMNone").val($.trim($("#lblGolfTypeAMNone").text()));

            if (e.GolfAfternoon != null) {
                $("#drpTeeTimePM").val(e.GolfAfternoon);
            }

            if (e.GolfClinicAfternoon != null) {
                $("#rdoGolfTypePMClinic").attr("checked", ($.trim($("#lblGolfTypePMClinic").text().toLowerCase()) == e.GolfClinicAfternoon.toLowerCase()));
                $("#rdoGolfTypePMClinicPlay").attr("checked", ($.trim($("#lblGolfTypePMClinicPlay").text().toLowerCase()) == e.GolfClinicAfternoon.toLowerCase()));
                $("#rdoGolfTypePMPlay").attr("checked", (e.GolfClinicAfternoon.length > 0 && e.GolfAfternoon.length > 0));
            }
            $("#rdoGolfTypePMClinic").val($.trim($("#lblGolfTypePMClinic").text()));
            $("#rdoGolfTypePMClinicPlay").val($.trim($("#lblGolfTypePMClinicPlay").text()));
            $("#rdoGolfTypePMPlay").val($.trim($("#lblGolfTypePMPlay").text()));
            $("#rdoGolfTypePMNone").val($.trim($("#lblGolfTypePMNone").text()));

            /*_____Basketball_____*/
            if (e.BasketballOpenPlay != null) {
                $("#rdoBasketballOpenPlayYes").attr("checked", ($.trim($("#lblBasketballOpenPlayYes").text().toLowerCase()) == e.BasketballOpenPlay.toLowerCase()));
                $("#rdoBasketballOpenPlayNo").attr("checked", ($.trim($("#lblBasketballOpenPlayNo").text().toLowerCase()) == e.BasketballOpenPlay.toLowerCase()));
            }
            $("#rdoBasketballOpenPlayYes").val($.trim($("#lblBasketballOpenPlayYes").text()));
            $("#rdoBasketballOpenPlayNo").val($.trim($("#lblBasketballOpenPlayNo").text()));

            if (e.BasketballOrganizedGame != null) {
                $("#rdoBasketballGameYes").attr("checked", ($.trim($("#lblBasketballGameYes").text().toLowerCase()) == e.BasketballOrganizedGame.toLowerCase()));
                $("#rdoBasketballGameNo").attr("checked", ($.trim($("#lblBasketballGameNo").text().toLowerCase()) == e.BasketballOrganizedGame.toLowerCase()));
            }
            $("#rdoBasketballGameYes").val($.trim($("#lblBasketballGameYes").text()));
            $("#rdoBasketballGameNo").val($.trim($("#lblBasketballGameNo").text()));

            /*_____Spa_____*/
            if (e.SpaInterest != null) {
                $("#rdoSpaYes").attr("checked", ($.trim($("#lblSpaYes").text().toLowerCase()) == e.SpaInterest.toLowerCase()));
                $("#rdoSpaNo").attr("checked", ($.trim($("#lblSpaNo").text().toLowerCase()) == e.SpaInterest.toLowerCase()));
                $(".hideSpa").css("display", ($.trim($("#lblSpaYes").text().toLowerCase()) == e.SpaInterest.toLowerCase()) ? "block" : "none");
            }
            $("#rdoSpaYes").val($.trim($("#lblSpaYes").text()));
            $("#rdoSpaNo").val($.trim($("#lblSpaNo").text()));

            if (e.SpaManicure != null) {
                $("#rdoManicureMorning").attr("checked", ($.trim($("#lblManicureMorning").text().toLowerCase()) == e.SpaManicure.toLowerCase()));
                $("#rdoManicureAfternoon").attr("checked", ($.trim($("#lblManicureAfternoon").text().toLowerCase()) == e.SpaManicure.toLowerCase()));
                $("#rdoManicureNo").attr("checked", ($.trim($("#lblManicureNo").text().toLowerCase()) == e.SpaManicure.toLowerCase()));
            }
            $("#rdoManicureMorning").val($.trim($("#lblManicureMorning").text()));
            $("#rdoManicureAfternoon").val($.trim($("#lblManicureAfternoon").text()));
            $("#rdoManicureNo").val($.trim($("#lblManicureNo").text()));

            if (e.SpaPedicure != null) {
                $("#rdoPedicureMorning").attr("checked", ($.trim($("#lblPedicureMorning").text().toLowerCase()) == e.SpaPedicure.toLowerCase()));
                $("#rdoPedicureAfternoon").attr("checked", ($.trim($("#lblPedicureAfternoon").text().toLowerCase()) == e.SpaPedicure.toLowerCase()));
                $("#rdoPedicureNo").attr("checked", ($.trim($("#lblPedicureNo").text().toLowerCase()) == e.SpaPedicure.toLowerCase()));
            }
            $("#rdoPedicureMorning").val($.trim($("#lblPedicureMorning").text()));
            $("#rdoPedicureAfternoon").val($.trim($("#lblPedicureAfternoon").text()));
            $("#rdoPedicureNo").val($.trim($("#lblPedicureNo").text()));

            if (e.SpaMiniMassage != null) {
                $("#rdoMassageMorning").attr("checked", ($.trim($("#lblMassageMorning").text().toLowerCase()) == e.SpaMiniMassage.toLowerCase()));
                $("#rdoMassageAfternoon").attr("checked", ($.trim($("#lblMassageAfternoon").text().toLowerCase()) == e.SpaMiniMassage.toLowerCase()));
                $("#rdoMassageNo").attr("checked", ($.trim($("#lblMassageNo").text().toLowerCase()) == e.SpaMiniMassage.toLowerCase()));
            }
            $("#rdoMassageMorning").val($.trim($("#lblMassageMorning").text()));
            $("#rdoMassageAfternoon").val($.trim($("#lblMassageAfternoon").text()));
            $("#rdoMassageNo").val($.trim($("#lblMassageNo").text()));

            /*_____Yoga_____*/
            if (e.YogaInterest != null) {
                $("#rdoYogaYes").attr("checked", ($.trim($("#lblYogaYes").text().toLowerCase()) == e.YogaInterest.toLowerCase()));
                $("#rdoYogaNo").attr("checked", ($.trim($("#lblYogaNo").text().toLowerCase()) == e.YogaInterest.toLowerCase()));
                $(".hideYoga").css("display", ($.trim($("#lblYogaYes").text().toLowerCase()) == e.YogaInterest.toLowerCase()) ? "block" : "none");
            }
            $("#rdoYogaYes").val($.trim($("#lblYogaYes").text()));
            $("#rdoYogaNo").val($.trim($("#lblYogaNo").text()));

            if (e.YogaSkillLevel != null) {
                $("#rdoYogaSkillBeginner").attr("checked", ($.trim($("#lblYogaSkillBeginner").text().toLowerCase().replace(/\s/g, "")) == e.YogaSkillLevel.toLowerCase().replace(/\s/g, "")));
                $("#rdoYogaSkillIntermediate").attr("checked", ($.trim($("#lblYogaSkillIntermediate").text().toLowerCase().replace(/\s/g, "")) == e.YogaSkillLevel.toLowerCase().replace(/\s/g, "")));
            }
            $("#rdoYogaSkillBeginner").val($.trim($("#lblYogaSkillBeginner").text()));
            $("#rdoYogaSkillIntermediate").val($.trim($("#lblYogaSkillIntermediate").text()));
        });

        /***** Content Control *****************************************/

        jQuery.fn.visible = function () {
            return this.css('visibility', 'visible');
        }

        jQuery.fn.invisible = function () {
            return this.css('visibility', 'hidden');
        }

        jQuery.fn.visibilityToggle = function () {
            return this.css('visibility', function (i, visibility) {
                return (visibility == 'visible') ? 'hidden' : 'visible';
            });
        }

        $('.help').hover(function () {
            $('.popup-help', this).fadeIn('fast');
        }, function () {
            $('.popup-help', this).fadeOut('fast');
        });

        $('.notice .close').click(function () {
            $(this).closest('.notice').slideUp('fast');
        });

        //"Will you be attending?"
        $("input[name='rdoAttending']").click(function () {
            if (this.id == "rdoAttendingNo") {
                $(".hideAll").hide();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
            else if (this.id == "rdoAttendingDinner") {
                $(".hideAll").show();
                $(".hideActivities").hide();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
            else if (this.id == "rdoAttendingYes") {
                $(".hideAll").show();
                $(".hideActivities").show();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
        });

        //"Do you plan to bring your spouse or a guest?"
        $("input[name='rdoGuestBring']").click(function () {
            if (this.id == "rdoGuestBringYes") {
                $(".hideGuest").show();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            } else if (this.id == "rdoGuestBringNo") {
                $(".hideGuest").hide();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
        });

        //"Will you be playing tennis?"
        $("input[name='rdoTennis']").click(function () {
            if (this.id == "rdoTennisYes") {
                $(".hideTennis").show();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
            else if (this.id == "rdoTennisNo") {
                $(".hideTennis").hide();
                $("#drpTennisLevel").prop('selectedIndex', -1);
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
        });

        //"Will you be playing golf?"
        $("input[name='rdoGolfPlay']").click(function () {
            if (this.id == "rdoGolfPlayYes") {
                $(".hideGolf").show();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
            else if (this.id == "rdoGolfPlayNo") {
                $(".hideGolf").hide();
                $("#drpGolfLevel").prop('selectedIndex', -1);
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
        });

        //"Do you need to rent golf clubs?"
        $("input[name='rdoRentClubs']").click(function () {
            if (this.id == "rdoRentClubsYes") {
                $(".hideRentClubs").show();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
            else if (this.id == "rdoRentClubsNo") {
                $(".hideRentClubs").hide();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
        });

        //Golf AM selection (clinic, open play, etc.)
        $("input[name='rdoGolfTypeAM']").click(function () {
            if (this.id == "rdoGolfTypeAMClinicPlay" || this.id == "rdoGolfTypeAMPlay") {
                $(".hideGolfAM").show();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
            else {
                $(".hideGolfAM").hide();
                $("#drpTeeTimeAM").prop('selectedIndex', -1);
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
        });

        //Golf PM selection (clinic, open play, etc)
        $("input[name='rdoGolfTypePM']").click(function () {
            if (this.id == "rdoGolfTypePMClinicPlay" || this.id == "rdoGolfTypePMPlay") {
                $(".hideGolfPM").show();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
            else {
                $(".hideGolfPM").hide();
                $("#drpTeeTimePM").prop('selectedIndex', -1);
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
        });

        //"Spa services?"
        $("input[name='rdoSpa']").click(function () {
            if (this.id == "rdoSpaYes") {
                $(".hideSpa").show();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
            else if (this.id == "rdoSpaNo") {
                $(".hideSpa").hide();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
        });

        //"Would you like to take an afternoon yoga class?"
        $("input[name='rdoYoga']").click(function () {
            if (this.id == "rdoYogaYes") {
                $(".hideYoga").show();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
            else if (this.id == "rdoYogaNo") {
                $(".hideYoga").hide();
                if (isValidated == true)
                    $("#contentForm").validationEngine("updatePromptsPosition");
            }
        });

        /*****Solution Explorer********************************************/

        var uid = window.location.search.match(/uid=.{8}-.{4}-.{4}-.{4}-.{12}/);
        if (uid != null) {
            uid = uid.toString().replace("uid=", "");
            if (uid == $("#hdnUid").val()) {
                var solutionDialogJQ = $('div[aria-describedby="dlgSolution"][aria-labelledby="ui-id-1"]');
                var activeAccord = 0;
                var edit = window.location.search.match("edit=email");
                if (edit != null) {
                    edit = edit[0].replace("edit=", "");
                    //if ("content" == edit.toLowerCase()) {
                    //    $("#accordion").accordion({ active: 0 });
                    //}
                    if ("email" == edit.toLowerCase()) {
                        activeAccord = 1;
                    }
                }

                //$("#accordion").accordion({
                //    collapsible: false,
                //    heightStyle: "fill",
                //    active: activeAccord
                //});
                $("#dlgSolution").dialog({
                    title: "Solution Explorer",
                    modal: false,
                    width: 330,
                    height: 500,
                    position: [10, 6],//{ my: "top left", at: "top left" },
                    resizable: false,
                    draggable: true,
                    open: function (event, ui) {
                        $("img[id^='img']").css("cursor", "Pointer");
                        $("img[id^='img']").click(
                            function () {
                                ExpandCollapseItem(this);
                            });
                        $("#accordion").accordion({
                            collapsible: false,
                            heightStyle: "fill",
                            active: activeAccord
                        });
                    },
                    //dragStop: function (event, ui) {
                    //    // Save dialog position
                    //}
                })
                .dialogExtend({
                    "closable": false,
                    "maximizable": false,
                    "minimizable": false,
                    "collapsable": false,
                    "minimizeLocation": "right",
                    "icons": {
                        "minimize": "ui-icon-minus",
                        "restore": "ui-icon-circle-triangle-s"
                    },
                });
            }
        }

        //Autocomplete for golf foursome text input
        var availableTags = split($("#hdnAttorneyNames").val(), ",");

        $("#txtFoursome")
        // don't navigate away from the field on tab when selecting an item
        .bind("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
            $(this).data("ui-autocomplete").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 2,
            autoFocus: true,
            source: function (request, response) {
                // delegate back to autocomplete, but extract the last term
                response($.ui.autocomplete.filter(
                availableTags, extractLast(request.term)));
            },
            focus: function () {
                // prevent value inserted on focus
                return false;
            },
            select: function (event, ui) {
                var terms = split(this.value);
                // remove the current input
                terms.pop();
                // add the selected item
                terms.push(ui.item.value);
                // add placeholder to get the comma-and-space at the end
                terms.push("");
                this.value = terms.join(",\n");
                return false;
            }
        });

        $(".ui-autocomplete").css("z-index", 5010);

        //Auto capitalize first letter of input text in text boxes/areas
        $("[type='text'],[type='textarea']").blur(function () {
            var form = $(this).closest("form");

            if (this.id != "txtGuestEmail") {
                var firstLetter = this.value.substring(0, 1);
                this.value = this.value.replace(firstLetter, firstLetter.toUpperCase());
            }
            //// Save form Data
            //$.ajax({ type: "POST", async: false, dataType: "json", url: form.attr('action') + "?" + form.serialize(), cache: false });
            //$.post(form.attr('action'), form.serialize());

            //// Save form to pdf.
            //SavePDF(form);
        });

        /***** Edit Confirmation/Warning ******************************/
        var editWarned = ($.cookie("editWarned") == 'true') ? true : false;

        if (window.location.search.match("edit=content")) {
            if (editWarned == false) {
                EditWarn();
                $.cookie("editWarned", 'true');
            }
        }
        //Wire click events (to re-validate) for Radio, Text and Dropdown controls.
        $("[type='radio']").click(function () {
            var rdo = $(this);
            if ($("[name='" + rdo.attr("name") + "']:checked").length > 0)
                rdo.validationEngine('hide');
            else {
                if (isValidated)
                    rdo.validationEngine('validate');
            }
        });

        $("[type='text'],[type='date'],[type='number'],[type='email'],[type='textarea']").blur(function () {
            var txt = $(this);
            if (txt.val().length > 0) {
                // close the validation
                txt.validationEngine('hide');
            }
            else {
                if (isValidated)
                    txt.validationEngine('validate');
            }
        });

        $("[type='select-one'],[type='select-multiple']").change(function () {
        });
    }
    else if (location.pathname.toLowerCase().indexOf("profiles") > -1) {
        // Code for profile page.
        LoadDbEditGrid();
        $('#accordion').accordion({ heightStyle: "fill" });
        var queryData = null;
    }
});

//Save Solution Dialog position and size as cookies
function saveSolutionState(solution) {
    var sol = solution;
    // save the position
    $.cookie("solutionPosLeft", sol.position.left);
    $.cookie("solutionPosTop", sol.position.top);
    // save the size
    $.cookie("solutionSizeWidth", sol.size.width);
    $.cookie("solutionSizeHeight", sol.size.height);

    // refresh the accordion (for proper height)
    $("#accordion").accordion("refresh");
}

function split(val) {
    return val.split(/,\n*/);
}
function extractLast(term) {
    return split(term).pop();
}

function LoadDbEditGrid() {
    //$.ajax({
    //    type: "GET",
    //    dataType: "json",
    //    url: pathName + "Profiles/GetProfiles",
    //    cache: false,
    //    success: function (data) {
    //    queryData = data.AttorneyOutings;

    var obj = { width: 1200, height: 700, title: "Firm Outing Form Entry Database" };
    var qUrl = pathName + "Profiles/GetProfiles";
    // TODO: add data indexes (named) for each column

    obj.colModel = [
        { title: "Rec #", width: 40, dataType: "integer", hidden: true },
        {
            title: "<img name='deleteAllRowsImage' title='Delete ALL rows' src='../Content/Images/warning-icon.png' style='height:16px; width:16px; cursor:pointer' />",
            dataIndx: 1, editable: false, sortable: false, width: 30, align: "center", resizable: false, render: function (ui) {
                var rowData = ui.rowData, dataIndx = ui.dataIndx;
                var val = rowData[dataIndx];
                str = "";
                return "<img name='deleteRowImage' title='Delete this row' src='../Content/Images/icon-remove.png' style='height:16px; width:16px;cursor:pointer' />"
            }, className: "deleteRowColumn"
        },
        { title: "First", width: 200, dataType: "string", editable: false },
        { title: "Middle", width: 200, dataType: "string", editable: false },
        { title: "Last", width: 200, dataType: "string", editable: false },
        { title: "EmployeeID", width: 100, dataType: "string", editable: false, hidden: true },
        { title: "PersonType", width: 100, dataType: "string", editable: false },
        { title: "Attending", width: 100, dataType: "string", editable: false },
        { title: "EmailAddress", width: 100, dataType: "string", editable: false },
        { title: "BringingGuest", width: 100, dataType: "string", editable: false },
        { title: "MealsLunch", width: 100, dataType: "string", editable: false },
        { title: "MealsDinner", width: 100, dataType: "string", editable: false },
        { title: "DietaryRestrictions", width: 100, dataType: "string", editable: false },
        { title: "BusToSunningdale", width: 100, dataType: "string", editable: false },
        { title: "BusToNYC", width: 100, dataType: "string", editable: false },
        { title: "TennisPlaying", width: 100, dataType: "string", editable: false },
        { title: "TennisRentRacquet", width: 100, dataType: "string", editable: false },
        { title: "TennisLevelOfPlay", width: 100, dataType: "string", editable: false },
        { title: "TennisMorning", width: 100, dataType: "string", editable: false },
        { title: "TennisAfternoon", width: 100, dataType: "string", editable: false },
        { title: "GolfPlaying", width: 100, dataType: "string", editable: false },
        { title: "GolfLevelOfPlay", width: 100, dataType: "string", editable: false },
        { title: "GolfMorning", width: 100, dataType: "string", editable: false },
        { title: "GolfAfternoon", width: 100, dataType: "string", editable: false },
        { title: "GolfClinicMorning", width: 100, dataType: "string", editable: false },
        { title: "GolfClinicAfternoon", width: 100, dataType: "string", editable: false },
        { title: "GolfRentClubs", width: 100, dataType: "string", editable: false },
        { title: "GolfClubRightLeft", width: 100, dataType: "string", editable: false },
        { title: "GolfCartOrWalk", width: 100, dataType: "string", editable: false },
        { title: "GolfFoursome", width: 100, dataType: "string", editable: false },
        { title: "BasketballOpenPlay", width: 100, dataType: "string", editable: false },
        { title: "BasketballOrganizedGame", width: 100, dataType: "string", editable: false },
        { title: "SpaInerest", width: 100, dataType: "string", editable: false },
        { title: "SpaManicure", width: 100, dataType: "string", editable: false },
        { title: "SpaPedicure", width: 100, dataType: "string", editable: false },
        { title: "SpaMiniMassage", width: 100, dataType: "string", editable: false },
        { title: "YogaInterest", width: 100, dataType: "string", editable: false },
        { title: "YogaSkillLevel", width: 100, dataType: "string", editable: false, },
        { title: "DateSubmitted", width: 100, dataType: "string", editable: false }];
    obj.dataModel = {
        location: "remote",
        sorting: "local",
        paging: "local",
        dataType: "JSON",
        method: "GET",
        url: qUrl,
        sortIndx: 2,
        sortDir: "up",
        rPP: 20
    };

    var $grid = $("#pqDbGrid").pqGrid(obj);
    //, { freezeCols: 3 }

    // Grid options
    $grid.pqGrid("option", "topVisible", false);
    $grid.pqGrid("option", "bottomVisible", true);
    $grid.pqGrid("option", "columnBorders", true);
    $grid.pqGrid("option", "rowBorders", true);
    $grid.pqGrid("option", "oddRowsHighlight", true);
    $grid.pqGrid("option", "numberCell", false);
    $grid.pqGrid("option", "flexHeight", false);
    $grid.pqGrid("option", "flexWidth", false);
    $grid.pqGrid("option", "scrollModel", { horizontal: true, });
    $grid.pqGrid("option", "resizable", true);
    $grid.pqGrid("option", "roundCorners", true);
    $grid.pqGrid("option", "editable", false);
    $grid.pqGrid("option", "selectionModel", { type: 'row', mode: 'single' });
    $grid.pqGrid({
        cellDblClick: function (event, ui) {
            // Show editing dialog.
            $("#dlgEditProfile").dialog({
                resizable: true,
                height: 700,
                width: 700,
                modal: true,
                buttons: {
                    Update: function () {
                        var DM = $grid.pqGrid("option", "dataModel");
                        var data = DM.data;
                        var rowIndx = getRowIndx();
                        var row = data[rowIndx];

                        var diet = $("[name='^=diet']:checked").map(function () {
                            return $.trim($("label [for='" + this.id + "']").text());
                        }).get().join();
                        var dietOther = $("#dietOther").val();
                        if (dietOther != null && dietOther != "")
                            diet += ("," + dietOther);

                        row[2] = $("#firstname").val();
                        row[3] = $("#middlename").val();
                        row[4] = $("#lastname").val();
                        row[6] = $("#persontype").val();
                        row[7] = $("#attending").val();
                        row[8] = $("#email").val();
                        row[9] = $("#bringingguest").val();
                        row[10] = $("#lunch").val();
                        row[11] = $("#dinner").val();
                        row[12] = diet;
                        row[13] = $("#busToSunningdale").val();
                        row[14] = $("#busToNYC").val();
                        row[15] = $("#tennisPlaying").val();
                        row[16] = $("#tennisRentRacquet").val();
                        row[17] = $("#tennisLevel").val();
                        row[18] = $("#tennisMorning").val();
                        row[19] = $("#tennisAfternoon").val();
                        row[20] = $("#golfPlaying").val();
                        row[21] = $("#golfLevel").val();
                        row[22] = $("#golfMorning").val();
                        row[23] = $("#golfAfternoon").val();
                        row[24] = $("#golfClinicMorning").val();
                        row[25] = $("#golfClinicAfternoon").val();
                        row[26] = $("#golfRent").val();
                        row[27] = $("#golfHands").val();
                        row[28] = $("#golfCart").val();
                        row[29] = $("#golfFoursome").val();
                        row[30] = $("#basketballOpenPlay").val();
                        row[31] = $("#basketballOrganizedGame").val();
                        row[32] = $("#spaInterest").val();
                        row[33] = $("#spaMani").val();
                        row[34] = $("#spaPedi").val();
                        row[35] = $("#spaMassage").val();
                        row[36] = $("#yogaInterest").val();
                        row[37] = $("#yogaSkill").val();

                        $grid.pqGrid("refreshRow", { rowIndx: rowIndx }).pqGrid('setSelection', { rowIndx: rowIndx });
                        //saveFromDbEditDlg();

                        $(this).dialog("close");
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                },
                open: function (event, ui) {
                    var $grid = $("#pqDbGrid");
                    var rowIndx = getRowIndx();

                    if (rowIndx != null) {
                        var DM = $grid.pqGrid("option", "dataModel");
                        var data = DM.data;
                        var row = data[rowIndx];
                        // string
                        $("#firstname").val(row[2]);
                        $("#middlename").val(row[3]);
                        $("#lastname").val(row[4]);
                        $("#persontype").val(row[6]);
                        $("#attending").val(row[7]);
                        $("#email").val(row[8]);
                        $("#bringingguest").val(row[9]);
                        $("#lunch").val(row[10]);
                        $("#dinner").val(row[11]);
                        // dietary restrictions
                        if (row[12].length > 0) {
                            var arrDietSplit = row[12].split(",");
                            var tempDiet = row[12];
                            for (var i = 0; i < arrDietSplit.length; i++) {
                                if ($.trim($("label[for=dietKosher").text()) == arrDietSplit[i]) {
                                    $("input[name=dietKosher]").attr("checked", true);
                                    tempDiet = tempDiet.replace((arrDietSplit[i] + ","), "");
                                }
                                else if ($.trim($("label[for=dietVegetarian").text()) == arrDietSplit[i]) {
                                    $("input[name=dietVegetarian]").attr("checked", true);
                                    tempDiet = tempDiet.replace((arrDietSplit[i] + ","), "");
                                }
                                else if ($.trim($("label[for=dietVegan").text()) == arrDietSplit[i]) {
                                    $("input[name=dietVegan]").attr("checked", true);
                                    tempDiet = tempDiet.replace((arrDietSplit[i] + ","), "");
                                }
                                else if ($.trim($("label[for=dietPescatarian").text()) == arrDietSplit[i]) {
                                    $("input[name=dietPescatarian]").attr("checked", true);
                                    tempDiet = tempDiet.replace((arrDietSplit[i] + ","), "");
                                }
                                else if ($.trim($("label[for=dietGluten").text()) == arrDietSplit[i]) {
                                    $("input[name=dietGluten]").attr("checked", true);
                                    tempDiet = tempDiet.replace((arrDietSplit[i] + ","), "");
                                }
                                else if ($.trim($("label[for=dietNut").text()) == arrDietSplit[i]) {
                                    $("input[name=dietNut]").attr("checked", true);
                                    tempDiet = tempDiet.replace((arrDietSplit[i] + ","), "");
                                }
                                else if ($.trim($("label[for=dietShellfish").text()) == arrDietSplit[i]) {
                                    $("input[name=dietShellfish]").attr("checked", true);
                                    tempDiet = tempDiet.replace((arrDietSplit[i] + ","), "");
                                }
                                else if ($.trim($("label[for=dietLactose").text()) == arrDietSplit[i]) {
                                    $("input[name=dietLactose]").attr("checked", true);
                                    tempDiet = tempDiet.replace((arrDietSplit[i] + ","), "");
                                }
                            }
                            $("#dietOther").val(tempDiet);
                        }
                        $("#busToSunningdale").val(row[13]);
                        $("#busToNYC").val(row[14]);
                        $("#tennisPlaying").val(row[15]);
                        $("#tennisRentRacquet").val(row[16]);
                        $("#tennisLevel").val(row[17]);
                        $("#tennisMorning").val(row[18]);
                        $("#tennisAfternoon").val(row[19]);
                        $("#golfPlaying").val(row[20]);
                        $("#golfLevel").val(row[21]);
                        $("#golfMorning").val(row[22]);
                        $("#golfAfternoon").val(row[23]);
                        $("#golfClinicMorning").val(row[24]);
                        $("#golfClinicAfternoon").val(row[25]);
                        $("#golfRent").val(row[26]);
                        $("#golfHands").val(row[27]);
                        $("#golfCart").val(row[28]);
                        $("#golfFoursome").val(row[29]);
                        $("#basketballOpenPlay").val(row[30]);
                        $("#basketballOrganizedGame").val(row[31]);
                        $("#spaInterest").val(row[32]);
                        $("#spaMani").val(row[33]);
                        $("#spaPedi").val(row[34]);
                        $("#spaMassage").val(row[35]);
                        $("#yogaInterest").val(row[36]);
                        $("#yogaSkill").val(row[37]);
                    }
                }
            });
        }
    });
    //}
    //});

    $(document).delegate("img[name='deleteRowImage']", "click", function (evt) {
        var b = window.confirm("Are you sure you want to delete this record?");
        if (b) {
            // Remove row from grid.
            deleteRow();
        }
    });
    $(document).delegate("img[name='deleteAllRowsImage']", "click", function (evt) {
        var b = window.confirm("Warning! This deletes all records PERMANENTLY. Are you sure you want to delete?");
        if (b) {
            //remove all rows
            deleteAll();
        }
    });
}

function saveFromDbEditDlg() {
    var DM = $grid.pqGrid("option", "dataModel");
    var data = DM.data;
    var row = data[rowIndx];

    var param = "Profiles/ResaveDbData";
    param += "?recId=" + row[0];
    param += "&firstName=" + row[2];
    param += "&middleName=" + row[3];
    param += "&lastName=" + row[4];
    param += "&employeeId=" + row[5];
    param += "&personType=" + row[6];
    param += "&attending=" + row[7];
    param += "&email=" + row[8];
    param += "&bringingGuest=" + row[9];
    param += "&lunch=" + row[10];
    param += "&dinner=" + row[11];
    param += "&diet=" + row[12];
    param += "&busToSunningdale=" + row[13];
    param += "&busToNYC=" + row[14];
    param += "&tennisPlaying=" + row[15];
    param += "&tennisRentRacquet=" + row[16];
    param += "&tennisLevel=" + row[17];
    param += "&tennisMorning=" + row[18];
    param += "&tennisAfternoon=" + row[19];
    param += "&golfPlaying=" + row[20];
    param += "&golfLevel=" + row[21];
    param += "&golfMorning=" + row[22];
    param += "&golfAfternoon=" + row[23];
    param += "&golfClinicMorning=" + row[24];
    param += "&golfClinicAfternoon=" + row[25];
    param += "&golfRent=" + row[26];
    param += "&golfHands=" + row[27];
    param += "&golfCart=" + row[28];
    param += "&golfFoursome=" + row[29];
    param += "&basketballOpenPlay=" + row[30];
    param += "&basketballOrganizedGame=" + row[31];
    param += "&spaInterest=" + row[32];
    param += "&spaMani=" + row[33];
    param += "&spaPedi=" + row[34];
    param += "&spaMassage=" + row[35];
    param += "&yogaInterest=" + row[36];
    param += "&yogaSkill=" + row[37];

    var x = $.ajax({ type: "GET", dataType: "json", url: param, cache: false });
    x.done(function (args) {
        alert(args);
    })
}

//delete Row.
function deleteRow() {
    var $grid = $("#pqDbGrid");
    var rowIndx = getRowIndx();

    if (rowIndx != null) {
        var DM = $grid.pqGrid("option", "dataModel");
        var data = DM.data;
        var row = data[rowIndx];
        data.splice(rowIndx, 1);
        $grid.pqGrid("refreshDataAndView");
        //$grid.pqGrid("setSelection", { rowIndx: rowIndx });

        // Remove from database
        $.ajax({ type: "GET", dataType: "json", url: "Profiles/RemoveRegisteredUser?id=" + row[0], cache: false });
    }
}

function deleteAll() {
    var $grid = $("#pqDbGrid");
    var DM = $grid.pqGrid("option", "dataModel");
    var data = DM.data;
    // Empty the grid
    for (var i = data.length - 1; i >= 0; i--) {
        data.splice(i, 1);
    }
    // Refresh grid view
    $grid.pqGrid("refreshDataAndView");
    // Empty the database
    $.ajax({ type: "GET", dataType: "json", url: "Profiles/RemoveAllUsers", cache: false });
}

function getRowIndx() {
    //var $grid = $("#grid_render_cells");
    var $grid = $("#pqDbGrid");
    //var obj = $grid.pqGrid("getSelection");
    //debugger;
    //  alert($grid);
    var arr = $grid.pqGrid("selection", { type: 'row', method: 'getSelection' });

    if (arr && arr.length > 0) {
        var rowIndx = arr[0].rowIndx;

        //if (rowIndx != null && colIndx == null) {
        return rowIndx;
    }
    else {
        alert("Select a row.");
        return null;
    }
}

function EditWarn() {
    alert("Modifying or deleting input buttons/fields will break the backend code and render the form unusable. Please be cautious when editing!");
    //$.Zebra_Dialog(
    //    "Modifying or deleting input buttons/fields will break the backend code and render the form unusable." +
    //    "<br />" +
    //    "<br />" +
    //    "<strong>Please be cautious when editing!</strong>" +
    //    "<br />" +
    //    "<br />" +
    //    "<p><b>Note:</b>If you choose to swap out an outdated image with a newer version, please add the \"roundCornersImg\" class to the image, and manually enter the image dimensions (in pixels) into the width and height fields.</p>" +
    //    "<br />" +
    //    "<i>If you are unfamiliar with how to do this, please refrain from editing the images.</i>", {
    //        'type': 'warning',
    //        'title': 'Warning',
    //        'keyboard': false,
    //        'overlay_close': false,
    //        'show_close_button': false,
    //    });
}

function FindShowControl(cId) {
    var frame = $('iframe');
    frame.focus();
    var c = frame.contents().find(("#" + cId));
    c[0].scrollIntoView(true);
}

//Expand and collapse solution dialog items
function ExpandCollapseItem(img) {
    if (img.src.indexOf("ig_tblPlus.gif") > 0)
        img.src = pathName + "Content/Images/ig_tblMinus.gif";
    else
        img.src = pathName + "Content/Images/ig_tblPlus.gif";

    //var ss = img.id.split("_");
    //var id = ss[0].replace("img", "tb");
    var id = img.id.replace("img", "tb");
    $("#" + id).toggle();
}

function ShowContent(contentName) {
    var url = window.location.href;
    if (window.location.search.match(("cType=" + contentName)) == null) {
        var editEmail = window.location.search.match("edit=email");
        if (editEmail != null) {
            url = pathName + "home?uid=BF11DEE0-2BE9-4A16-A86D-C32B75FF3DE9&edit=content";
            url += "&cType=" + contentName;
        }
        url = url.replace("&cType=Confirmation", "");
        url = url.replace("&cType=FormContent", "");
        url += "&cType=" + contentName;
        window.location = url;
    }
}

function exp_loadForms() {
    var form = $('.exp-form');

    $('.btn-recovery').click(function () {
        $('#exp-login').hide();
        $('#exp-recovery').show();

        return false;
    });

    $('#btnCancelRecoverPassword').click(function () {
        $('#exp-login').show();
        $('#exp-recovery').hide();

        return false;
    });
}

function exp_colorSupport() {
    $('.fc-widget-header').addClass('theme-bar-color');
    $('.fc-button-inner').addClass('theme-bar-color');
}

function loadPercents(animate) {
    if (typeof (animate) == 'undefined') { animate = true; }

    if ($('.percents>div:not(.done)').size()) {
        var currentPercent = $('.percents>div:not(.done)')[0];
        var percent = $('span', currentPercent).html();
        $('span', currentPercent).html('').css('display', 'block');

        //log('Load percent: [animate'+animate+']');

        if (animate) {
            $(currentPercent).delay(300).animate({
                'width': percent + '%'
            }, {
                duration: 600,
                step: function (width) {
                    var crPercent = 625 / 100;
                    var crValue = width;

                    $('span', currentPercent).html(Math.round(crValue) + '%');
                },
                complete: function () {
                    $(this).addClass('done');
                    loadPercents();
                }
            });
        } else {
            $('span', currentPercent).html(percent + '%');
            $(currentPercent).css('width', percent + '%').addClass('done');

            loadPercents();
        }
    }
}

//Useless function to collapse the comments
function commentedOutStuff() {
    //function exp_loadCalendar(){
    //	$('.tabularData').dataTable();

    //	if ($('#scrolable_content').size()){
    //		$("#scrolable_content").mCustomScrollbar( "vertical", 400, "easeOutCirc", 1.05, "auto", "yes", "yes", 10);
    //		}
    //	//$('#calendar-events-rnd').fullCalendar({ });

    //	var date = new Date();
    //	var d = date.getDate();
    //	var m = date.getMonth();
    //	var y = date.getFullYear();

    //	$('.calendar-nav .next').click(function(){
    //		 $('#calendar-events-rnd').fullCalendar('next');
    //		 $('.calendar-nav h1').html($('.fc-header-title h2').html());

    //		 return false;
    //	});

    //	$('.calendar-nav .back').click(function(){
    //		 $('#calendar-events-rnd').fullCalendar('prev');
    //		 $('.calendar-nav h1').html($('.fc-header-title h2').html());

    //		 return false;
    //	});

    //	var calendar = $('#calendar-events-rnd').fullCalendar({
    //		header: {
    //			left: 'prev,next today',
    //			center: 'title',
    //			right: ''

    //		},

    //		editable: true,
    //		selectable: true,
    //		selectHelper: true,
    //		select: function(start, end, allDay) {
    //			var title = prompt('Event Title:');
    //			if (title) {
    //				calendar.fullCalendar('renderEvent',
    //					{
    //						title: title,
    //						start: start,
    //						end: end,
    //						allDay: allDay
    //					},
    //					true
    //				);
    //			}
    //			calendar.fullCalendar('unselect');
    //		},
    //		events: [
    //			{
    //				title: 'All Day Event',
    //				start: new Date(y, m, 1)
    //			},
    //			{
    //				title: 'Long Event',
    //				start: new Date(y, m, d-5),
    //				end: new Date(y, m, d-2)
    //			},
    //			{
    //				id: 999,
    //				title: 'Repeating Event',
    //				start: new Date(y, m, d-3, 16, 0),
    //				allDay: false
    //			},
    //			{
    //				id: 999,
    //				title: 'Repeating Event',
    //				start: new Date(y, m, d+4, 16, 0),
    //				allDay: false
    //			},

    //			{
    //				title: 'Meeting',
    //				start: new Date(y, m, d, 10, 30),
    //				allDay: false
    //			},
    //			{
    //				title: 'Lunch',
    //				start: new Date(y, m, d, 12, 0),
    //				end: new Date(y, m, d, 14, 0),
    //				allDay: false
    //			},
    //			{
    //				title: 'Birthday Party',
    //				start: new Date(y, m, d+1, 19, 0),
    //				end: new Date(y, m, d+1, 22, 30),
    //				allDay: false
    //			},
    //			{
    //				title: 'Click for Google',
    //				start: new Date(y, m, 28),
    //				end: new Date(y, m, 29),
    //				url: 'http://google.com/'
    //			}
    //		]
    //	});

    //	$('.calendar-nav h1').html($('.fc-header-title h2').html());
    //}
}

function exp_loadGallery() {
    $(".gallery-view-thumbnail").sortable({
        placeholder: "thumb-state-highlight"
    });

    $(".gallery-view-thumbnail").disableSelection();

    /*
    $('.gallery-view-thumbnail .crop').click(function(){
        var picture = $(this).closest('li');
        var imgSrc = $('.thumb img', picture).attr('alt');
        $('.gallery-view-thumbnail', picture).append('<img src="'+imgSrc+'" >').fadeIn();
    });
    */

    $('.gallery-view-thumbnail .remove').click(function () {
        var thumb = $(this).closest('li');
        $(thumb).fadeOut('slow');
    });

    $('.gallery-view-thumbnail li').hover(function () {
        $('.edit, .remove', this).show(); //fadeIn('fast');
    }, function () {
        $('.edit, .remove', this).hide(); //.fadeOut('slow');
    });
}

function exp_loadPanels() {
    /***** Panel - Toolbar Support ****************************************/
    if ($('.panel .toolbar')) {
        $('.toolbar .view-button').click(function () {
            var panel = $(this).closest('.panel');

            $('.toolbar .view-button', panel).removeClass('selected');
            $(this).addClass('selected');

            var related_content = $(this).attr('rel');
            if ($('#' + related_content + '.view-content', panel).size()) {
                $('.view-content.selected', panel).removeClass('selected');
                $('#' + related_content + '.view-content', panel).addClass('selected');
            }

            return false;
        });

        $(".panel>.title .ui-icon").click(function () {
            $(this).toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
            $(this).parents(".panel:first").find(".panel > .content").toggle();
        });

        $(".panel .title>.drop, .panel .title-large>.drop").click(function (event) {
            event.stopPropagation();

            var panel = $(this).closest('.panel');
            var content = $('.content', panel);

            if ($(this).hasClass('minimized')) {
                $(content).slideDown('fast');
                $(this).removeClass('minimized');
            } else {
                $(content).slideUp('fast');
                $(this).addClass('minimized');
            }
        });
    }

    /***** Panel - Tabs Support *******************************************/
    $('.panel .tabs-box li').click(function () {
        var panel = $(this).closest('.panel');
        var tab_content_id = $('a', this).attr('rel');

        $('.tabs-box li', panel).removeClass('selected');
        $(this).addClass('selected');

        if ($('#' + tab_content_id, panel).size()) {
            $('.tabs-content.selected', panel).removeClass('selected');
            $('#' + tab_content_id + '.tabs-content', panel).addClass('selected');
        }

        return false;
    });
}

function exp_loadTopNav() {
    $('#header li').click(function () {
        if ($(this).hasClass('selected')) { return false; }

        var list = $(this).closest('ul');
        var li = this;

        $('.selected .sel', list).fadeOut('fast', function () {
            $('.selected', list).removeClass('selected');

            $('.sel', li).fadeIn('fast', function () {
                $(li).addClass('selected');
            })
        });
    });
}

function exp_loadSideNav() {
    $('#container > .nav-wrapper li').click(function () {
        $('#container > .nav-wrapper li').removeClass('selected');
        $(this).addClass('selected');
    });

    $('#side-nav li').hover(function () {
        if ($(this).hasClass('selected')) { return false; }

        $('div>div', this).fadeIn('slow');
    }, function () {
        if ($(this).hasClass('selected')) { return false; }

        $('div>div', this).fadeOut('slow');
    });
}

function exp_loadFAQ() {
    if (faq_stiky_index) {
        $('.columns-index').addClass('auto');
    }

    $('.columns-index>ul').containedStickyScroll({ duration: 300 });

    $('.columns-index>ul>li>a').click(function (event) {
        var stContentID = $(this).attr('rel');

        if (faq_view == 0) {
            if ($('.columns-content>div.selected').size()) {
                $('.columns-content>div.selected').slideUp('fast').removeClass('selected');
            }

            $('.columns-content #' + stContentID).slideDown('fast').addClass('selected');
        }
    });

    $('.columns-index ul ul li').click(function (event) {
        $('.columns-index>ul>li.active').removeClass('active selected');

        var pt_ul = $(this).closest('ul');
        var pt_li = $(pt_ul).closest('li');
        $(pt_li).addClass('active selected');
    });

    $('.view-column').click(function () {
        faq_view = 1;

        $('.columns-index ul ul').each(function () {
            $(this).slideDown().animate({ 'margin-bottom': '15px' });
        });

        $('.columns-content > div').slideDown();
    });

    $('.view-dropdown').click(function () {
        faq_view = 0;

        $('.columns-index li ul').each(function () {
            if (!$(this).parent().hasClass('selected')) {
                $(this).animate({ 'margin-bottom': '0' }).slideUp();
            }
        });

        var activeContentID = $('.columns-index>ul>li.selected>a').attr('rel');

        $('.columns-content>div').each(function () {
            if ($(this).attr('id') == activeContentID) {
            } else {
                $(this).slideUp();
            }
        });
    });

    $('.columns-index>ul>li').click(function () {
        if ($(this).hasClass('selected')) { return false; }

        $('.columns-index>ul>li').removeClass('selected active');
        $(this).addClass('selected active');

        if (faq_view == 1) { return false; }

        if ($('.columns-index ul ul:visible').size()) {
            $('.columns-index ul ul:visible').slideUp();
        }

        if ($('ul', this).size()) {
            $('ul', this).slideDown();
        }
    });
}

function exp_loadCharts() {
    if ($('#exp-line-chart').size()) {
        $('.chartData').visualize({ type: 'line', width: '862px', height: '250px' }).appendTo('#exp-line-chart');
        $('.chartData').visualize({ type: 'pie', width: '360px', height: '250px' }).appendTo('#exp-bar-pie');
        $('.chartData').visualize({ type: 'area', width: '360px', height: '250px' }).appendTo('#exp-bar-zone');
        $('.chartData').visualize({ type: 'bar', width: '862px', height: '250px' }).appendTo('#exp-bar-chart');
    }

    if ($('#fullpan-exp-line-chart').size()) {
        $('.chartData').visualize({ type: 'bar', width: '525px', height: '160px' }).appendTo('#fullpan-exp-bar-chart');
        $('.chartData').visualize({ type: 'pie', width: '525px', height: '160px' }).appendTo('#fullpan-exp-pie-chart');
        $('.chartData').visualize({ type: 'area', width: '525px', height: '160px' }).appendTo('#fullpan-exp-area-chart');
        $('.chartData').visualize({ type: 'line', width: '525px', height: '160px' }).appendTo('#fullpan-exp-line-chart');
    }
}

function exp_loadWizard() {
    var panel = $('.panel.wizard');
    var current_state = 0;

    var st_01 = 0;
    var st_02 = 105;
    var st_03 = 210;
    var st_04 = 315;
    var st_05 = 420;
    var st_06 = 525;

    if ($('.pbar', panel).hasClass('ct-step-1')) { current_state = 1; }
    if ($('.pbar', panel).hasClass('ct-step-2')) { current_state = 2; }
    if ($('.pbar', panel).hasClass('ct-step-3')) { current_state = 3; }
    if ($('.pbar', panel).hasClass('ct-step-4')) { current_state = 4; }
    if ($('.pbar', panel).hasClass('ct-step-5')) { current_state = 5; }
    if ($('.pbar', panel).hasClass('ct-step-6')) { current_state = 6; }

    //** Previews button click
    //**
    $('.wiz-prev', panel).click(function () {
        var prev_state = current_state;

        if (current_state > 1) { prev_state--; }

        if (current_state != prev_state) {
            var nt_width = ((prev_state - 1) * 105) + 'px';

            $('.pbar .done', panel).animate({ 'width': nt_width }, 350, 'easeInOutExpo', function () {
                $('.pbar', panel).removeClass('ct-step-' + current_state);
                $('.pbar', panel).addClass('ct-step-' + prev_state);

                $('.progress-wrap>.step-' + prev_state).addClass('selected').removeClass('on');
                $('.progress-wrap>.step-' + current_state).addClass('off').removeClass('selected').removeClass('on');

                current_state--;
            });

            $('.label', panel).removeClass('selected');
            $('.label:eq(' + (prev_state - 1) + ')', panel).addClass('selected');

            changeWizardStep(prev_state, panel);
        }
        return false;
    });

    //** Next button click
    //**
    $('.wiz-next', panel).click(function () {
        var next_state = current_state;

        if (current_state < 6) { next_state++; }

        if (current_state != next_state) {
            var nt_width = ((next_state - 1) * 105) + 'px';

            $('.pbar .done', panel).animate({ 'width': nt_width }, 350, 'easeInOutExpo', function () {
                $('.pbar', panel).removeClass('ct-step-' + current_state);
                $('.pbar', panel).addClass('ct-step-' + next_state);

                $('.progress-wrap>.step-' + current_state).addClass('on').removeClass('selected').removeClass('off');
                $('.progress-wrap>.step-' + next_state).addClass('selected').removeClass('off');

                current_state++;
            });

            $('.label', panel).removeClass('selected');
            $('.label:eq(' + current_state + ')', panel).addClass('selected');

            changeWizardStep(next_state, panel);
        }
        return false;
    });
}

function changeWizardStep(page, panel) {
    if ($('.wizard-content li').length < page - 1) { return false; }

    $('.wizard-content li:visible', panel).fadeOut(150, function () {
        $('.wizard-content li:eq(' + (page - 1) + ')', panel).fadeIn(150);
    });
}

function GeneratePassword() {
    if (parseInt(navigator.appVersion) <= 3) {
        alert("Sorry this only works in 4.0+ browsers");
        return true;
    }

    var length = 8;
    var sPassword = "";
    //length = document.aForm.charLen.options[document.aForm.charLen.selectedIndex].value;
    //var noPunction = (document.aForm.punc.checked);
    //var randomLength = (document.aForm.rLen.checked);
    var noPunction = true;
    var randomLength = true;

    if (randomLength) {
        length = Math.random();
        length = parseInt(length * 100);
        length = (length % 7) + 6
    }

    for (i = 0; i < length; i++) {
        numI = getRandomNum();
        if (noPunction) {
            while (checkPunc(numI)) {
                numI = getRandomNum();
            }
        }

        sPassword = sPassword + String.fromCharCode(numI);
    }

    // document.aForm.passField.value = sPassword

    return sPassword;
}

function getRandomNum() {
    // between 0 - 1
    var rndNum = Math.random()

    // rndNum from 0 - 1000
    rndNum = parseInt(rndNum * 1000);

    // rndNum from 33 - 127
    rndNum = (rndNum % 94) + 33;

    return rndNum;
}

function checkPunc(num) {
    if ((num >= 33) && (num <= 47)) {
        return true;
    }
    if ((num >= 58) && (num <= 64)) {
        return true;
    }
    if ((num >= 91) && (num <= 96)) {
        return true;
    }
    if ((num >= 123) && (num <= 126)) {
        return true;
    }

    return false;
}

function fixBoxShadowBlur(jQueryObject) {
    if ($.browser.msie && $.browser.version.substr(0, 1) == '9') {
        jQueryObject.each(function () {
            boxShadow = $(this).css('boxShadow');
            if (boxShadow != 'none') {
                var bsArr = boxShadow.split(' ');
                bsBlur = parseInt(bsArr[2]) || 0;
                bsBlurMeasureType = bsArr[2].substr(("" + bsBlur).length);
                bsArr[2] = (bsBlur * 2) + bsBlurMeasureType;
                $(this).css('boxShadow', bsArr.join(' '));
            }
        });
    }
}

function submitControl() {
    //Validate form inputs
    var formValid = $('#contentForm').validationEngine('validate', { autoPositionUpdate: true });
    isValidated = true;
    if (formValid != false) {
        var firstname = $("#txtGuestFirstName").val();
        var lastname = $("#txtGuestLastName").val();
        if (firstname != "" && lastname != "") {
            var min = 1000;
            var max = 9999;
            var s = (Math.floor(Math.random() * (max - min + 1)) + min);
            var u = ((firstname.substring(0, 1) + lastname) + s);
            var p = GeneratePassword();
        }

        var diet = $("[name='chkDietaryRestrictions']:checked").map(function () {
            return $.trim($("#" + this.id.replace("chk", "lbl")).text());
        }).get().join();
        var txtDietaryOther = $("#txtDietOther").val();
        if (txtDietaryOther != null && txtDietaryOther != "")
            diet += ("," + txtDietaryOther);

        var foursome = ($("#txtFoursome").val()).replace("/n", " ");

        var param = "Home/SaveData";
        param += "?firstName=" + $("#txtFirstName").val();
        param += "&middleName=" + $("#txtMiddleName").val();
        param += "&lastName=" + $("#txtLastName").val();
        param += "&attendingOuting=" + GetRadioButtonValue('rdoAttending');
        param += "&bringingGuest=" + GetRadioButtonValue('rdoGuestBring');
        param += "&spouseUserName=" + u;
        param += "&spousePassword=" + p;
        param += "&spouseEmail=" + $("#txtGuestEmail").val();
        param += "&spouseFirstName=" + $("#txtGuestFirstName").val();
        param += "&spouseMiddleName=" + $("#txtGuestMiddleName").val();
        param += "&spouseLastName=" + $("#txtGuestLastName").val();
        param += "&mealsLunch=" + GetRadioButtonValue('rdoMealsLunch');
        param += "&mealsDinner=" + GetRadioButtonValue('rdoMealsDinner');
        param += "&dietaryRestrictions=" + diet;
        param += "&busToSunningdale=" + GetRadioButtonValue('rdoBusTo');
        param += "&busToNYC=" + GetRadioButtonValue('rdoBusHome');
        param += "&tennisPlaying=" + GetRadioButtonValue('rdoTennis');
        param += "&tennisLevelOfPlay=" + $("#drpTennisLevel").val();
        param += "&tennisRentRacquet=" + GetRadioButtonValue('rdoTennisRent');
        param += "&tennisMorning=" + GetRadioButtonValue('rdoTennisAM');
        param += "&tennisAfternoon=" + GetRadioButtonValue('rdoTennisPM');
        param += "&golfPlaying=" + GetRadioButtonValue('rdoGolfPlay');
        param += "&golfLevelOfPlay=" + $("#drpGolfLevel").val();
        param += "&golfRentClubs=" + GetRadioButtonValue('rdoRentClubs');
        param += "&golfClubRightLeft=" + GetRadioButtonValue('rdoHand');
        param += "&golfCartOrWalk=" + GetRadioButtonValue('rdoCaddy');
        param += "&golfFoursome=" + foursome;
        param += "&golfMorning=" + $("#drpTeeTimeAM").val();
        param += "&golfClinicMorning=" + GetRadioButtonValue('rdoGolfTypeAM');
        param += "&golfAfternoon=" + $("#drpTeeTimePM").val();
        param += "&golfClinicAfternoon=" + GetRadioButtonValue('rdoGolfTypePM');
        param += "&basketballOpenPlay=" + GetRadioButtonValue('rdoBasketballOpenPlay');
        param += "&basketballOrganizedGame=" + GetRadioButtonValue('rdoBasketballGame');
        param += "&spaInterest=" + GetRadioButtonValue('rdoSpa');
        param += "&spaManicure=" + GetRadioButtonValue('rdoManicure');
        param += "&spaPedicure=" + GetRadioButtonValue('rdoPedicure');
        param += "&spaMiniMassage=" + GetRadioButtonValue('rdoMassage');
        param += "&yogaInterest=" + GetRadioButtonValue('rdoYoga');
        param += "&yogaSkillLevel=" + GetRadioButtonValue('rdoYogaSkill');

        //$.ajax({ type: "POST", async: false, dataType: "json", url: (pathName + param), cache: false });
        //navigate to confirm page
        window.location.search += "?issaved=1"
    }
}

//no longer needed
function CheckValid(c) {
    if (c.substring(0, 3) == 'txt') {
        var ctrl = $("#" + c);
        if ((ctrl.val() == undefined || ctrl.val() == null || ctrl.val() == "") && ctrl.is(':visible'))
            v += ("\n\t• " + $("[for='" + c + "']").text());
        //return false;
    }
    if (c.substring(0, 3) == 'rdo') {
        var ctrl = $("[name='" + c + "']");
        var cLength = $("[name='" + c + "']:checked").length;
        if (cLength == 0 && ctrl.is(':visible'))
            v += ("\n\t• " + $("[for='" + c + "']").text());
        //return false;
    }
    if (c.substring(0, 3) == 'drp') {
        var ctrl = $("#" + c);
        if ((ctrl.val() == undefined || ctrl.val() == null || ctrl.val() == "") && ctrl.is(':visible'))
            v += ("\n\t• " + $("[for='" + c + "']").text());
        //return false;
    }
}

function GetRadioButtonValue(v) {
    var s = "";
    if ($("[name='" + v + "']:checked").length > 0)
        s = $("[name='" + v + "']:checked").val()

    return s;
}

function Save(close_Dialog) {
    var jq = $.ajax({ type: "GET", async: true, dataType: "json", url: (pathName + "Home/SaveContent?content=" + window.encodeURI(editor.GetText())), cache: false });
    jq.done(function (e) {
        if (close_Dialog) {
            // remove solution dialog cookies
            SlnCookieRemover();
            // remove edit warning cookie
            $.removeCookie("editWarned");
            // trigger close button
            window.location = (pathName + "Home/");
        }
    });
}

// Delete solution cookies when page gets saved or user logs out
function SlnCookieRemover() {
    $.removeCookie("solutionPosLeft");
    $.removeCookie("solutionPosTop");
    $.removeCookie("solutionSizeWidth");
    $.removeCookie("solutionSizeHeight");
}
