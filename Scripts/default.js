var pathName = location.pathname.toLowerCase();
pathName = pathName.replace("secure", "");
pathName = pathName.replace("home", "");
pathName = pathName.replace("profiles", "");
pathName += ((pathName.substring(pathName.length - 1) != "/") ? "/" : "");
pathName = location.protocol + "//" + location.host + pathName.replace("//", "/");

$(document).ready(function () {
    // Code for login page
    $(window).resize(function () {
        try {
            $('#header').css({ width: $(window).width() });
            $("#dvLogin").css(
          {
              position: "absolute",
              top: (($(window).height() / 2) - 275) + "px",
              left: (($(window).width() / 2) - 169) + "px"
          });
        } catch (e)
        { }
    });

    $(window).resize();
   $("input[type=submit], input[id=btnCancelRecoverPassword]").button();
    // Set focus on the user textbox
    $("#txtUsername").focus();

    $("#btnLogin,#btnCancelRecoverPassword,#btnRecoverPassword").button().click(function () {
        if (this.id == "btnLogin") {
            //  Save form Data
            var form = $(this).closest('form');
            // $.ajax({ type: "POST", async: false, dataType: "json", url: (pathName + form.attr('action')) + "?" + form.serialize() });
            var usr = $("#txtUsername").val();
            var pwd = $("#txtPassword").val();
            if (usr != "" && pwd != "") {
                //var path = pathName + "Secure/Login?username=" + usr + "&password=" + pwd;
                var path = (pathName + form.attr('action')) + "?" + form.serialize();
                $.get(path, function (e) {
                    // alert(pathName + e.redirectPath + "\nisUserAuthentic=" + e.isUserAuthentic);
                    if (e.isUserAuthentic) {
                        window.location = (pathName + e.redirectPath);
                    }
                    else {
                        $("#spnInvalidUser").show();
                        $("#txtPassword").val("");
                        $("#txtPassword").focus();
                    }
                });
            }
            else {
                // alert("invalid");
                $("#spnInvalidUser").show();
                $("#txtPassword").val("");
                $("#txtPassword").focus();
                $("#forgotPass").show();
            }
        }
        else if (this.id == "btnRecoverPassword") {
            var form = $(this).closest('form');
            // $.ajax({ type: "POST", async: false, dataType: "json", url: (pathName + form.attr('action')) + "?" + form.serialize() });
            RecoverMyPassword();
        }
        else if (this.id == "btnCancelRecoverPassword") {
            window.location = (pathName + "Secure");
        }
    });

    /***** Login form *****************************************************/
    if ($('.exp-form').length) {
        exp_loadForms();
    }

    // Submit when enter key is press.
    $(document).keypress(function (e) {
        if (e.which == 13) {
            $("#btnLogin").click();
        }
    });
});

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

    function Recover() {
        $('#exp-register').hide();
        $('#exp-login').hide();
        $('#exp-recovery').show();
        $("#pswRecovery").hide();
        return false;
    }

    function CancelRecover() {
        $('#exp-register').hide();
        $('#exp-login').show();
        $('#exp-recovery').hide();
        $("#pswRecovery").show();
        return false;
    }

    function RecoverMyPassword() {
        var em = $('#txtEmail').val();
        if (em == undefined || em == null || em == "") {
            alert("Please enter a valid email address.");
            return;
        }

        if (em.toLowerCase().indexOf("@") == -1 || em.toLowerCase().indexOf(".") == -1) {
            alert("This email is invalid.");
            return;
        }

        var path = pathName + "Secure/RecoverPassword?email=" + $("#txtEmail").val() + "&referral=" + encodeURI(pathName + "secure?logoff=true");
        var jqxhr = $.post(path);
        jqxhr.success(function (event, xhr, settings) {
            $("#txtEmail").val("");
            $("#lblRecover").hide();
            // $("#spnRecover").show();
            alert("Your password has been sent to the email you provided.");
        });
    }