$(document).ready(function () {
    svg4everybody({});


    $('[data-b24form]').submit(function () {
        const th = $(this);
        const formTargetName = th.data('form-target-name');
        $.ajax({
            type: 'POST',
            url: '/ajax/rest-b24.php',
            dataType: 'json',
            data: $(this).serialize(),
            beforeSend: function (data) {
                th.find('input[type="submit"]').attr('disabled', 'disabled');
            },
            success: function (data) {
                // console.log(data['msg']);
                var hastype = 'success';
                if (data['hasError'] == true) {
                    hastype = 'error';
                }
                if (!th.is('[data-custom-response]')) {
                    swal({
                        icon: hastype,
                        text: data['msg'],
                        title: data['title']
                    });
                } else {
                    $('.overlay').fadeIn(300);
                    $('#action-response').closest('.popup').slideDown(500);
                }

                if (!data['hasError']) {
                    th.trigger('reset');
                    closeAdPopup();
                    if (formTargetName) {
                        dataLayer.push({ 'event': formTargetName });
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                swal('Ошибка', 'Повторите отправку формы', 'error');

            },
            complete: function (data) {
                th.find('input[type="submit"]').prop('disabled', false);
                if (!th.is('[data-custom-response]')) {
                    closePopup();
                }

            },
        });
        return false;
    });

    $('.input-phone').mask('+7 (999) 999-9999');

    // Sticky nav
    let menuLogic = () => {
        let adHeight = $('.estore-line--active').height();
        let headerHeight = adHeight ? 120 + adHeight : 120;
        $('.before-fix').css('marginTop', headerHeight + 'px');
        $('.header').css('top', adHeight + 'px');
        $('.megamenu').css('paddingTop', headerHeight + 30 + 'px');
        let lastScrollTop = headerHeight;
        $(window).scroll(function (event) {
            let st = $(this).scrollTop();
            if (st > lastScrollTop) {
                $('.header').css('top', '-' + headerHeight + 'px');
            } else {
                $('.header').css('top', adHeight ? adHeight + 'px' : 0);
            }
            if (st > headerHeight) {
                lastScrollTop = st;
            } else {
                lastScrollTop = headerHeight;
            }
        });
    };
    menuLogic();

    $(window).resize(() => {
        menuLogic();
    });

    // Up button
    let upBtn = $('.up-button');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            upBtn.addClass('up-button--active');
        } else {
            upBtn.removeClass('up-button--active');
        }
    });

    upBtn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });

    // Number counter

    const countNum = (elementClass, endNum, startNum = 0, animTime = 1000) => {
        $({ numberValue: startNum }).animate({ numberValue: endNum }, {
            duration: animTime,
            easing: 'swing',
            step: function (val) {
                $(elementClass).html(Math.ceil(val));
            },
        });
    };
    let countBlock = $('.counters'),
        counterStatus = true;
    if (countBlock.length) {
        $(window).scroll(function () {
            let scrollEvent = ($(window).scrollTop() > (countBlock.offset().top - $(window).height()));

            if (scrollEvent && counterStatus) {
                counterStatus = false;
                $('.counters__num').each(function () {
                        countNum(this, $(this).data('num'));
                    },
                );
            }
        });
    }

    // Owl carousel

    $('.case-page__slider').each(function () {
        const th = $(this);
        th.on('initialized.owl.carousel changed.owl.carousel', function (e) {
            if (!e.namespace) {
                return;
            }

            const carousel = e.relatedTarget;
            th.parents('.case-slider__wrap').find('.controls__counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
        }).owlCarousel({
            items: 1,
            loop: true,
            dots: false,
        });
        th.parents('.case-slider__wrap').find('.controls__prev').click(function () {
            th.trigger('prev.owl.carousel');
        });
        th.parents('.case-slider__wrap').find('.controls__next').click(function () {
            th.trigger('next.owl.carousel');
        });
    });

    $('.feedback-carousel').each(function () {

        let th = $(this);
        th.on('initialized.owl.carousel changed.owl.carousel', function (e) {
            if (!e.namespace) {
                return;
            }
            var carousel = e.relatedTarget;
            th.parents('.feedback__wrap').find('.controls__counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
        }).owlCarousel({
            items: 1,
            loop: true,
            dots: false,
        });
        th.parents('.feedback__wrap').find('.controls__prev').click(function () {
            th.trigger('prev.owl.carousel');
        });
        th.parents('.feedback__wrap').find('.controls__next').click(function () {
            th.trigger('next.owl.carousel');
        });
    });

    $('.new-feedback__carousel').each(function () {

        let th = $(this);
        const prevIcon = `<svg class="svg-sprite-icon icon-arrow-left btn__icon-arrow btn__icon-arrow-left">
                        <use xlink:href="images/svg/symbol/sprite.svg#arrow-left"></use>
                      </svg>`
        const nextIcon = `<svg class="svg-sprite-icon icon-arrow btn__icon-arrow">
                        <use xlink:href="images/svg/symbol/sprite.svg#arrow"></use>
                      </svg>`
        th.owlCarousel({
            items: 1,
            loop: true,
            dots: true,
            nav: true,
            navText: [
                prevIcon,
                nextIcon
            ]
        });
        th.parents('.new-feedback__wrap').find('.new-feedback__prev > .new-feedback__btn').click(function () {
            th.trigger('prev.owl.carousel');
        });
        th.parents('.new-feedback__wrap').find('.new-feedback__next > .new-feedback__btn').click(function () {
            th.trigger('next.owl.carousel');
        });
    });

    $('.page-slider').each(function (index) {
        let th = $(this),
            images = th.find('.page-slider__imgs.owl-carousel');
        images.on('initialized.owl.carousel changed.owl.carousel', function (e) {
            if (!e.namespace) {
                return;
            }
            var carousel = e.relatedTarget;
            th.find('.controls__counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
        }).owlCarousel({
            items: 1,
            loop: true,
            dots: false,
        });
        th.find('.controls__prev').click(function () {
            images.trigger('prev.owl.carousel');
        });
        th.find('.controls__next').click(function () {
            images.trigger('next.owl.carousel');
        });
    });

    $('.topcases-card__images.owl-carousel').each(function (index) {
        let th = $(this);
        const prevIcon = `<svg class="svg-sprite-icon icon-arrow-left btn__icon-arrow btn__icon-arrow-left">
                        <use xlink:href="images/svg/symbol/sprite.svg#arrow-left"></use>
                      </svg>`
        const nextIcon = `<svg class="svg-sprite-icon icon-arrow btn__icon-arrow">
                        <use xlink:href="images/svg/symbol/sprite.svg#arrow"></use>
                      </svg>`
        th.owlCarousel({
            items: 1,
            loop: false,
            dots: false,
            nav: true,
            navText: [
                prevIcon,
                nextIcon
            ]
        });
    });

    $('.clients__list').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoWidth: true,
        margin: 40,
        items: 6,
    });

    // Taber
    $('.taber').each(function (i) {
        let th = $(this);
        th.find('.taber__title-item').on('click', function () {
            let target = $(this).data('target');
            th.find('.taber__title-item').removeClass('active');
            $(this).addClass('active');
            th.find('.taber__card').removeClass('active');
            th.find('#' + target).addClass('active');
        });
    });

    let tabsLine = document.getElementsByClassName('taber__title-items');
    [...tabsLine].forEach(timeline => {

        // timeline - блок с горизонтальным скроллом
        timeline.onmousedown = () => {
            let pageX = 0;

            document.onmousemove = e => {
                if (pageX !== 0) {
                    timeline.scrollLeft = timeline.scrollLeft + (pageX - e.pageX);
                }
                pageX = e.pageX;
            };

            // заканчиваем выполнение событий
            timeline.onmouseup = () => {
                document.onmousemove = null;
                timeline.onmouseup = null;
            };

            // отменяем браузерный drag
            timeline.ondragstart = () => {
                return false;
            };
        };
    });

    // Popups
    $('[data-action="popup"]').click(function (e) {
        e.preventDefault();
        const target = $(this).data('target');
        $('.overlay').fadeIn(300);
        $('#' + target).closest('.popup').slideDown(500);
    });
    let closePopup = () => {
        $('.popup').slideUp(500);
        $('.overlay').fadeOut(300);
    };
    $('.popup__close').click(closePopup);
    $('.overlay').click(closePopup);
    $(document).keydown(function (eventObject) {
        if (eventObject.which == 27) {
            closePopup();
        }
    });
    // Advertising Popups
    $('[data-action="estore-popup"]').click(function (e) {
        e.preventDefault();
        $('html').css('overflow', 'hidden');
        $('body').css('overflow', 'auto');
        $('.estore-popup__overlay').fadeIn(300);
        $('.estore-popup').slideDown(500);
    });
    let closeAdPopup = () => {
        $('.estore-popup').slideUp(500);
        $('.estore-popup__overlay').fadeOut(300);
        $('html').css('overflow', 'auto');
        $('body').css('overflow', 'initial');
    };
    $('.estore-popup__close').click(function () {
        closeAdPopup();


    });
    $('.estore-popup__overlay').click(closeAdPopup);
    $(document).keydown(function (eventObject) {
        if (eventObject.which == 27) {
            closeAdPopup();
        }
    });

    $('.estore-line__close').click(function () {
        $('.estore-line').removeClass('estore-line--active');
        menuLogic();

        $('.header').css('top', '-120px');
        document.cookie = 'estore-line=1; path=/;';
    });

    $('.accordion').find('.accordion__item-title').click(function() {
        $(this).closest('.accordion__item').toggleClass('accordion__item--open')
    })

    // Megamenu

    $('.sandwich').click(function () {
        const th = $(this),
            header = $('.header'),
            megamenu = $('.megamenu');

        if (th.hasClass('is-active')) {
            th.removeClass('is-active').css('display', '');
            header.removeClass('header--active-menu');
            megamenu.removeClass('is-active');
            $('body').css('overflowY', 'initial');
            setTimeout(function () {
                $('.header__menu').css('display', '');
            }, 500);

        } else {
            megamenu.addClass('is-active');
            header.addClass('header--active-menu');
            th.addClass('is-active');
            $('body').css('overflowY', 'hidden');
        }
    });

    $('[data-mega]').click(function () {
        const th = $(this).closest('.header__menu'),
            header = $('.header'),
            megamenu = $('.megamenu');

        megamenu.addClass('is-active');
        header.addClass('header--active-menu');
        th.css('display', 'none');
        $('.sandwich').css('display', 'block').addClass('is-active');
        $('body').css('overflowY', 'hidden');
    });

    $('.services-list__mob-plus').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).toggleClass('services-list__mob-plus--active');
        const siblingSub = $(this).closest('.services-list__item').find('.services-list__sublist');
        $(siblingSub).slideToggle(500);
    });

    $('.footer-services-list__mob-plus').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).toggleClass('footer-services-list__mob-plus--active');
        const siblingSub = $(this).closest('.footer-services-list__item').find('.footer-services-list__sublist');
        $(siblingSub).slideToggle(500);
    });

    // Top cases
    $('.topcases-tab').click(function (e) {
        let target = $(this).data('case-target');
        $('.topcases-tab').removeClass('topcases-tab--active');
        $(this).addClass('topcases-tab--active');
        $('.topcases-card').removeClass('topcases-card--active');
        $('.topcases-card.' + target).addClass('topcases-card--active');

    });

    // City on contacts page
    $('.contacts-page__city-tab').click(function (e) {
        let target = $(this).data('target');
        $('.contacts-page__city-tab').removeClass('contacts-page__city-tab--active');
        $(this).addClass('contacts-page__city-tab--active');
        $('.contacts-page__info').removeClass('contacts-page__info--active');
        $(`.contacts-page__info[data-tab=${target}]`).addClass('contacts-page__info--active');
    });

    // Cases tab
    // $('.cases-line__tab').click(function () {
    //     let target = $(this).data('target');
    //     $('.cases-line__tab').removeClass('cases-line__tab--active');
    //     $(this).addClass('cases-line__tab--active');
    //     $('.cases-content__tab').removeClass('cases-content__tab--active');
    //     $(`[data-id=${target}]`).addClass('cases-content__tab--active');
    //     // window.location.hash = target === 'develop' ? '#develop' : '';
    // })

    if (document.querySelector('.formats')) {
        const formats = document.querySelector('.formats')
        const tabs = formats.querySelectorAll('.formats__tab')
        const cards = formats.querySelectorAll('.formats-card')
        tabs.forEach((tab, idx) => {
            tab.addEventListener('click', (e) => {
                if (e.target.classList.contains('formats__tab--active')) return
                cards.forEach(card => {
                    card.classList.remove('formats-card--active')
                })
                cards[idx].classList.add('formats-card--active')
                tabs.forEach(item => {
                    item.classList.remove('formats__tab--active')
                })
                e.target.classList.add('formats__tab--active')
            })
        })
        $('.formats-card__title--collapse').click(() => {
            $('.formats-card__arrow').toggleClass('formats-card__arrow--open')
            $('.formats-card__spec-list').toggleClass('formats-card__spec-list--open')
        })
    }

    if (document.querySelector('.smm-table')) {
        const smmTable = $('.smm-table')
        const collapsedTitle = $(smmTable).find('.smm-table__name--collapsed')
        $(collapsedTitle).click((e) => {
            $(e.target).toggleClass('close')
            $(e.target).find('.smm-table__collapse-arrow').toggleClass('close')
        })
    }

    if (typeof rangeCalculator !== 'undefined') {

        const result = JSON.parse(rangeCalculator);

        let coefficients = {
            concurrent: result.concurrent.find(item => item.isDefault).k,
            regions: result.regions.find(item => item.isDefault).k,
            requests: result.requests.find(item => item.isDefault).k,
        };

        const calculator = document.querySelector('.range-calculator'),
            defaultPrice = Number(result.startPrice),
            ranges = calculator.querySelectorAll('.range-calculator__range'),
            priceResult = calculator.querySelector('.range-calculator__price-result');

        function getCurrentPrice() {
            return (defaultPrice * coefficients.concurrent * coefficients.regions * coefficients.requests)
                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }

        ranges.forEach(element => {

            const typeName = element.dataset.range,
                input = element.querySelector('.range-calculator__range-input'),
                statusEl = element.querySelector('.range-calculator__range-status');

            input.addEventListener('change', function () {

                const indexStatus = this.value,
                    newStatus = result[typeName][indexStatus].name,
                    lineWidth = (indexStatus * 100) / (result[typeName].length - 1);

                this.style.backgroundSize = lineWidth + '% 100%'
                coefficients[typeName] = result[typeName][indexStatus].k;
                statusEl.innerText = newStatus;
                priceResult.innerText = getCurrentPrice();
            });
        });
        priceResult.innerText = getCurrentPrice();
    }

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
