// Custom JavaScript
$(document).ready(function () {
    console.log('Page loaded successfully.');

    // jQuery UI Dialog example
    $("#dialog-button").click(function () {
        $("#dialog").dialog({
            modal: true,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
});

// Change navbar background when scrolling past hero section
$(window).scroll(function() {
    var scroll = $(window).scrollTop()+200;
    if (scroll > $('.hero-section').height()) {
        $('.navbar').addClass('scrolled');
    } else {
        $('.navbar').removeClass('scrolled');
    }
});


$(document).ready(function() {
    // Initialize Select2 on select elements
    $('select').select2({
        width: '100%', // Adjusts the width to fit the container
        dropdownCssClass: 'custom-dropdown', // Optional class for more customization
        dir: 'rtl' // Set direction to RTL
    });
    $('select.no-search').select2({
        width: '100%', // Adjusts the width to fit the container
        dropdownCssClass: 'no-search-dropdown', // Optional class for more customization
        dir: 'rtl', // Set direction to RTL
        minimumResultsForSearch: Infinity
    });
});

$(document).ready(function() {
    // Get references to the video element and the sound toggle button
    var video = document.getElementById('hero-video');
    var soundToggleButton = $('#sound-toggle');
    
    // Initialize the button state
    var isMuted = true; // Start with the video muted
    soundToggleButton.html('<i class="fa fa-volume-off"></i>'); // Initial button icon for muted state
    
    // Function to toggle sound
    function toggleSound() {
        if (isMuted) {
            video.muted = false;
            soundToggleButton.html('<i class="fa fa-volume-up"></i>'); // Icon for unmuted state
        } else {
            video.muted = true;
            soundToggleButton.html('<i class="fa fa-volume-off"></i>'); // Icon for muted state
        }
        isMuted = !isMuted; // Toggle the state
    }
    
    // Attach click event handler to the sound toggle button
    soundToggleButton.click(toggleSound);
});


/* Admission */
$(document).ready(function() {
    // Scroll to the admission form section
    $('#scroll-to-admission').click(function() {
        $('html, body').animate({
            scrollTop: $('#admission-form').offset().top
        }, 1000); // Duration of the scroll animation in milliseconds
    });
    
    let currentStep = 0;
    const steps = $('.form-step');
    const progressSteps = $('.progress-steps li');

    function showStep(index) {
        steps.removeClass('active');
        progressSteps.removeClass('active');
        $(steps[index]).addClass('active');
        $(progressSteps[index]).addClass('active');
    }

    $('.next-btn').click(function() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    });

    $('.prev-btn').click(function() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    showStep(currentStep); // Show the first step by default
});
