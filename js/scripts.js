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
$(document).ready(function () {
    navOverHero();
});

function navOverHero() {
    var hasHero = $('.hero-section').length;

    if (hasHero) {
        // Trigger the scroll event
        window.scrollTo(window.scrollX, window.scrollY - 1);
        window.scrollTo(window.scrollX, window.scrollY + 1);
    }

    $(window).scroll(function () {
        var scroll = $(window).scrollTop() + 200;

        if (!hasHero || scroll > $('.hero-section').height()) {
            $('.navbar').removeClass('overHero');
        } else {
            $('.navbar').addClass('overHero');
        }
    });

}



$(document).ready(function () {
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

$(document).ready(function () {
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
$(document).ready(function () {
    // Scroll to the admission form section
    $('#scroll-to-admission').click(function () {
        $('html, body').animate({
            scrollTop: $('#admission-form').offset().top
        }, 1000); // Duration of the scroll animation in milliseconds
    });

});


// Function to format numbers with commas
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Counter Animation with comma formatting
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Speed of the counter animation

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const updateCount = (counter) => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText.replace(/,/g, '');
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = formatNumberWithCommas(Math.ceil(count + increment));
                        setTimeout(() => updateCount(counter), 20);
                    } else {
                        counter.innerText = formatNumberWithCommas(target);
                    }
                };

                counters.forEach(counter => updateCount(counter));
                observer.disconnect(); // Stop observing once animation has started
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});