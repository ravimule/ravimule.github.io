jQuery(document).ready(function ($) {
    "use strict";

    //Contact
    $('form.contactForm').submit(function () {
        var f = $(this).find('.form-group'),
            ferror = false,
            emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

        f.children('input').each(function () { // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            ferror = ierror = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(exp)) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'email':
                        if (!emailExp.test(i.val())) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'checked':
                        if (!i.is(':checked')) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'regexp':
                        exp = new RegExp(exp);
                        if (!exp.test(i.val())) {
                            ferror = ierror = true;
                        }
                        break;
                }
                i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });
        f.children('textarea').each(function () { // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            ferror = ierror = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(exp)) {
                            ferror = ierror = true;
                        }
                        break;
                }
                i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });
        if (ferror) return false;
        else var str = $(this).serialize();
        var action = $(this).attr('action');

        // try Mandrill next https://medium.com/@mariusc23/send-an-email-using-only-javascript-b53319616782

        $("#contact-preloader").show();
        var template_params = {
            "from_name": $("#name").val(),
            "from_email": $("#email").val(),
            "to_name": "Ravi",
            "subject": $("#subject").val(),
            "message_html": $("#message").val()
        }

        var service_id = "default_service";
        var template_id = "template_UuB4Wa2N";

        emailjs.send(service_id, template_id, template_params)
            .then(function (response) {
                if ($('#contact-preloader').length) {
                    $('#contact-preloader').delay(100).fadeOut('slow');
                }
                console.log('SUCCESS!', response.status, response.text);
                $("#sendmessage").addClass("show");
                $("#errormessage").removeClass("show");
                $('.contactForm').find("input, textarea").val("");
            }, function (error) {
                $(".loader").hide();
                $("#sendmessage").removeClass("show");
                $("#errormessage").addClass("show");
                $('#errormessage').html(msg);
            });

        return false;
    });

});
