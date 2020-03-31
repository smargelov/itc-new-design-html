$(document).ready(function () {
    svg4everybody({});

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
