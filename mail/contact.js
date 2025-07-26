$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            // Create WhatsApp message
            var whatsappMessage = "New Contact Form Submission:\n\n" +
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Subject: " + subject + "\n" +
                "Message: " + message;

            // Encode the message for URL
            var encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp number (without + sign, with country code)
            var whatsappNumber = "917028159983";
            
            // Create WhatsApp URL
            var whatsappURL = "https://wa.me/" + whatsappNumber + "?text=" + encodedMessage;

            // Show success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
            $('#success > .alert-success')
                    .append("<strong>Opening WhatsApp... </strong>");
            $('#success > .alert-success')
                    .append('Your message is ready to send!');
            $('#success > .alert-success')
                    .append('</div>');

            // Open WhatsApp with pre-filled message
            window.open(whatsappURL, '_blank');
            
            // Reset form
            $('#contactForm').trigger("reset");

            // Re-enable button after delay
            setTimeout(function () {
                $this.prop("disabled", false);
            }, 1000);
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});