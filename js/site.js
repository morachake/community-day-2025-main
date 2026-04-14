$(function() {
    tableScroll();
    if ($(window).width() < 996) {
        toastScroll();
    }
    $(document).on("click", ".scroll", function() {
        $("html, body").animate({
                scrollTop: $(window).height() - 70
            },
            500
        );
    });
    $(function() {
        $(document).on("click", ".ven", function() {
            $(this)
                .addClass("active")
                .siblings()
                .removeClass("active");
            // var latt = parseFloat($(this).attr("data-lat"));
            // var lngg = parseFloat($(this).attr("data-lng"));
            // var labb = $(this).attr("data-label");
            // console.log(latt + " - " + lngg);
            // setCoords(latt, lngg, labb);
        });
        $(document).on("click", "#toggle", function() {
            $(this).toggleClass("on");
            $("#nav-bar").toggleClass("active");
        });
        $("#link").click(function() {
            var src = "https://www.youtube.com/embed/xEUwfHzgXiw?si=82hoJiHbfBg855Ea";
            $("#myModal").modal("show");
            $("#myModal iframe").attr("src", src);
        });

        $("#myModal button").click(function() {
            $("#myModal iframe").removeAttr("src");
        });
        $(document).on("click", "#nav-bar ul li", function() {
            $("#nav-bar").removeClass("active");
            $("#toggle").removeClass("on");
        });
        $(".section.hdr").css({
            paddingTop: $(".section.hdr > .content").height()
        });
    });

    function toastScroll() {
        var sections = $(".section");
        var targets = [
            "#com_info",
            "#tickets",
            "#venues",
            "#agenda",
            "#workshop",
            "#sponsors",
            "#speakers",
            "#volunteers",
            "#subscribe"
        ];
        var text = [
            "About Community Day",
            "Buy Tickets",
            "Venues",
            "Agenda",
            "Workshops",
            "Sponsors",
            "Speakers",
            "Volunteers",
            "Share"
        ];
        var secidx = 0;
        $.map(sections, function(val, i) {
            if ($(this).scrollTop() > val.offsetTop) {
                secidx = i + 1;
            }
        });
        if (
            $(this).scrollTop() + $(this).height() >
            $("#volunteers").offset().top
        ) {
            $(".floating_toast a")
                .attr("href", "#home")
                .text("Goto Top");
        } else {
            $(".floating_toast a")
                .attr("href", targets[secidx])
                .text("Goto " + text[secidx]);
        }
    }

    function tableScroll() {
        if (
            $(this).scrollTop() > $(".table").offset().top - $("#nav-bar").height() &&
            $(this).scrollTop() < $(".table").offset().top + $(".table").height()
        ) {
            $(".table").addClass("fixit");
            $(".table").removeClass("absit");
        } else if (
            $(this).scrollTop() > $(".table").offset().top - $("#nav-bar").height() &&
            $(this).scrollTop() > $(".table").offset().top + $(".table").height()
        ) {
            $(".table").addClass("absit");
            $(".table").removeClass("fixit");
        } else if (
            $(this).scrollTop() <
            $(".table").offset().top - $("#nav-bar").height()
        ) {
            $(".table")
                .removeClass("absit")
                .removeClass("fixit");
        }
    }
    $(document).scroll(function() {
        $(".section.hdr > .content").css({
            top: 0 - $(this).scrollTop() / 1.5,
            opacity: 1 - $(this).scrollTop() / $(".section.hdr > .content").height()
        });
        if ($(this).scrollTop() < $(".section.hdr > .content").height()) {
            $(".section.hdr").css({
                background: "rgba(0,0,0," +
                    $(this).scrollTop() / $(".section.hdr > .content").height() / 0.25 +
                    ")"
            });
        }

        tableScroll();

        if ($(window).width() < 996) {
            toastScroll();
        }

        if ($(this).scrollTop() >= $(".section.hdr > .content").height()) {
            $("#nav-bar").addClass("fixi-it");
            $("body").css({
                paddingTop: $("#nav-bar").height()
            });
        } else {
            $("#nav-bar").removeClass("fixi-it");
            $("body").css({
                paddingTop: 0
            });
        }
    });
    $(document).on("click", "a", function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $("html, body").animate({
                    scrollTop: $(hash).offset().top - 70
                },
                700
            );
        }
    });
});

$(document).ready(function() {
    // Check if we're on mobile
    if ($(window).width() < 992) {
        // Add mobile-specific background elements
        $('.section-1 .content').prepend('<div class="mobile-hero-bg"></div><div class="mobile-hero-overlay"></div>');
        
        // Add divider between sections
        $('.section-1 .content .container>div .right').after('<div class="mobile-divider"></div>');
        
        // Optional: Simplify the gallery for mobile
        // If you want to show a simplified version instead of hiding it completely
        /*
        $('.gal').html('<div class="mobile-hero-image" style="height: 180px; background: url(\'images/aws2024/activity1.webp\') center center/cover no-repeat; border-radius: 10px; margin-bottom: 20px;"></div>');
        $('.gal').css('display', 'block');
        */
    }
});

// Add this to your site.js file
document.addEventListener('DOMContentLoaded', function() {
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('animate');
                // Remove observer after animation is added
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Element is considered in viewport when 10% is visible
        threshold: 0.1
    });

    // Observe "Who Are We" section
    const whoAreWeSection = document.getElementById('com_info');
    if (whoAreWeSection) {
        observer.observe(whoAreWeSection);
    }
    
    // Observe "What to Expect" section
    const whatToExpectSection = document.getElementById('even_info');
    if (whatToExpectSection) {
        observer.observe(whatToExpectSection);
    }
    
    // Add hover effect for list items
    const listItems = document.querySelectorAll('#even_info .circle li');
    listItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.color = '#ff9900';
            this.style.paddingLeft = '5px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.paddingLeft = '';
        });
    });
    
    // Add subtle pulse animation to the AWS User Group Kenya logo
    const awsLogo = document.querySelector('.awsug_logo img');
    if (awsLogo) {
        awsLogo.addEventListener('mouseenter', function() {
            this.style.animation = 'subtleBounce 1s infinite';
        });
        
        awsLogo.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    }
});