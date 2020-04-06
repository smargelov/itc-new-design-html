$(document).ready(function () {
    svg4everybody({});

    // Number counter

    const countNum = (elementClass, endNum, startNum = 0, animTime = 1000) => {
        $({numberValue: startNum}).animate({numberValue: endNum}, {
            duration: animTime,
            easing: "swing",
            step: function (val) {
                $(elementClass).html(Math.ceil(val));
            }
        });
    };
    let countBlock = $('.counters'),
        counterStatus = true;
    $(window).scroll(function () {
        let scrollEvent = ($(window).scrollTop() > (countBlock.offset().top - $(window).height()));

        if (scrollEvent && counterStatus) {
            counterStatus = false;
            $('.counters__num').each(function () {
                    countNum(this, $(this).data('num'))
                }
            )
        }
    });

    // Owl carousel

    let feedbackCarousel = $('#feedback-carousel');
    feedbackCarousel.owlCarousel({
        items: 1,
        loop: true
    });
    $('.feedback__prev').click(function () {
        feedbackCarousel.trigger("prev.owl.carousel")
    });
    $('.feedback__next').click(function () {
        feedbackCarousel.trigger("next.owl.carousel")
    });

    // Taber

    $('.taber__title-item').on('click', function () {
        let target = $(this).data('target');
        $('.taber__title-item').removeClass('active');
        $(this).addClass('active');
        $('.taber__card').removeClass('active');
        $('#' + target).addClass('active');
    });


    // City menu

    $('#cityView').on('click', function (e) {
        e.preventDefault();
    });
    $('#cityView').parent('.header__city').hover(function () {
        $(this).addClass('active');
        $(this).find('.header__cities').slideDown(300);
        $(this).find('.header__subcities').addClass('active');
    }, function () {
        $(this).find('.header__subcities').removeClass('active');
        $(this).find('.header__cities').slideUp(300);
        $(this).removeClass('active');
    })

    // Popups
    $('[data-action="popup"]').click(function (e) {
        e.preventDefault();
        $('.overlay').fadeIn(300);
        $('.popup').slideDown(500);
    })
    let closePopup = () => {
        $('.popup').slideUp(500);
        $('.overlay').fadeOut(300);
    }
    $('.popup__close').click(closePopup);
    $('.overlay').click(closePopup);
    $(document).keydown(function (eventObject) {
        if (eventObject.which == 27) {
            closePopup();
        }
    });


    // Megamenu

    $('.sandwich').click(function () {
        const th = $(this),
              header = $('.header'),
              megamenu = $('.megamenu');

        if (th.hasClass('is-active')) {
            th.removeClass('is-active');
            header.removeClass('header--active-menu');
            megamenu.removeClass('is-active');

        } else {
            megamenu.addClass('is-active');
            header.addClass('header--active-menu');
            th.addClass('is-active');
        }
    })

});


// Полифилы

// forEach IE 11
if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// closest IE 11
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

// matches IE 11
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

//Array.form IE 11
if (!Array.from) {
    Array.from = function (object) {
        'use strict';
        return [].slice.call(object);
    };
}
