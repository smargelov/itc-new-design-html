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
        let scrollEvent = ($(window).scrollTop()  > (countBlock.offset().top - $(window).height()));

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
        $('#'+target).addClass('active');
    })

    // Fancybox video


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
