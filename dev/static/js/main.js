$(document).ready(function () {
    svg4everybody({});


    $("[data-b24form]").submit(function () {
        const th = $(this)
        const formTargetName = th.data('form-target-name')
        $.ajax({
            type: "POST",
            url: "/ajax/rest-b24.php",
            dataType: 'json',
            data: $(this).serialize(),
            beforeSend: function (data) {
                th.find('input[type="submit"]').attr('disabled', 'disabled');
            },
            success: function (data) {
                // console.log(data['msg']);
                var hastype = 'success';
                if (data['hasError'] == true) {
                    hastype = 'error'
                }
                swal({
                    icon: hastype,
                    text: data['msg'],
                    title: data['title']
                })
                if (!data['hasError']) {
                    th.trigger('reset')
                    closeAdPopup();
                    if (formTargetName) {
                        dataLayer.push({'event': formTargetName})
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                swal("Ошибка", "Повторите отправку формы", "error")

            },
            complete: function (data) {
                th.find('input[type="submit"]').prop('disabled', false);
                closePopup();

            }
        })
        return false;
    });


    $('.input-phone').mask('+7 (999) 999-9999')

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
        })
    }
    menuLogic();

    $(window).resize(() => {
        menuLogic()
    })

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
        $('html, body').animate({scrollTop: 0}, '300');
    });

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
    if (countBlock.length) {
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
            dots: false
        });
        th.parents('.case-slider__wrap').find('.controls__prev').click(function () {
            th.trigger("prev.owl.carousel");
        });
        th.parents('.case-slider__wrap').find('.controls__next').click(function () {
            th.trigger("next.owl.carousel");
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
            dots: false
        });
        th.parents('.feedback__wrap').find('.controls__prev').click(function () {
            th.trigger("prev.owl.carousel")
        });
        th.parents('.feedback__wrap').find('.controls__next').click(function () {
            th.trigger("next.owl.carousel")
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
            dots: false
        });
        th.find('.controls__prev').click(function () {
            images.trigger("prev.owl.carousel")
        });
        th.find('.controls__next').click(function () {
            images.trigger("next.owl.carousel")
        });
    });

    $('.topcases-card__images.owl-carousel').each(function (index) {
        let th = $(this);
        th.on('initialized.owl.carousel changed.owl.carousel', function (e) {
            if (!e.namespace) {
                return;
            }
            var carousel = e.relatedTarget;
            th.parents('.topcases-card').find('.controls__counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
        }).owlCarousel({
            items: 1,
            loop: true,
            dots: false
        });
        th.parents('.topcases-card').find('.controls__prev').click(function () {
            th.trigger("prev.owl.carousel")
        });
        th.parents('.topcases-card').find('.controls__next').click(function () {
            th.trigger("next.owl.carousel")
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
        const target = $(this).data('target')
        $('.overlay').fadeIn(300);
        $('#' + target).closest('.popup').slideDown(500);
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
    // Advertising Popups
    $('[data-action="estore-popup"]').click(function (e) {
        e.preventDefault();
        $('html').css('overflow', 'hidden');
        $('body').css('overflow', 'auto');
        $('.estore-popup__overlay').fadeIn(300);
        $('.estore-popup').slideDown(500);
    })
    let closeAdPopup = () => {
        $('.estore-popup').slideUp(500);
        $('.estore-popup__overlay').fadeOut(300);
        $('html').css('overflow', 'auto');
        $('body').css('overflow', 'initial');
    }
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
        document.cookie = "estore-line=1; path=/;"
    })


    // Megamenu

    $('.sandwich').click(function () {
        const th = $(this),
            header = $('.header'),
            megamenu = $('.megamenu');

        if (th.hasClass('is-active')) {
            th.removeClass('is-active');
            header.removeClass('header--active-menu');
            megamenu.removeClass('is-active');
            $('body').css('overflowY', 'initial');

        } else {
            megamenu.addClass('is-active');
            header.addClass('header--active-menu');
            th.addClass('is-active');
            $('body').css('overflowY', 'hidden');
        }
    })

    // Top cases
    $('.topcases-tab').click(function (e) {
        let target = $(this).data('case-target');
        $('.topcases-tab').removeClass('topcases-tab--active');
        $(this).addClass('topcases-tab--active');
        $('.topcases-card').removeClass('topcases-card--active');
        $('.topcases-card.' + target).addClass('topcases-card--active');

    })

    // City on contacts page
    $('.contacts-page__city-tab').click(function (e) {
        let target = $(this).data('target');
        $('.contacts-page__city-tab').removeClass('contacts-page__city-tab--active');
        $(this).addClass('contacts-page__city-tab--active');
        $('.contacts-page__info').removeClass('contacts-page__info--active');
        $(`.contacts-page__info[data-tab=${target}]`).addClass('contacts-page__info--active');
    })

    // Cases tab
    // $('.cases-line__tab').click(function () {
    //     let target = $(this).data('target');
    //     $('.cases-line__tab').removeClass('cases-line__tab--active');
    //     $(this).addClass('cases-line__tab--active');
    //     $('.cases-content__tab').removeClass('cases-content__tab--active');
    //     $(`[data-id=${target}]`).addClass('cases-content__tab--active');
    //     // window.location.hash = target === 'develop' ? '#develop' : '';
    // })

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
