// JavaScript Document

/* global $, document */

$(document).ready(function () {
    
    $('.cntnt-btn').hover(
        function () {
            var button = $(this).attr('id');

            if (button == 'btn-main-demo') {
                $(this).children('.btn-text').css('left', '25px');
                $(this).children('.btn-line').css('left', '0');
                $('.bg-main-demo').css('opacity', '1');
            }
            else if (button == 'btn-main-music') {
                $(this).children('.btn-text').css('right', '25px');
                $(this).children('.btn-line').css('right', '0');
                $('.bg-main-music').css('opacity', '1');
            }
            else {
                $(this).children('.btn-text').css('left', '25px');
                $(this).children('.btn-line').css('left', '0');
                $('.bg-main-sound').css('opacity', '1');
            }
        },

        function () {
            var button = $(this).attr('id');

            if (button == 'btn-main-music') {
                $(this).children('.btn-text').css('right', '0');
                $(this).children('.btn-line').css('right', '25px');
            }

            else {
                $(this).children('.btn-text').css('left', '0');
                $(this).children('.btn-line').css('left', '25px');
            }
            $('.bg-main-demo').css('opacity', '0');
            $('.bg-main-sound').css('opacity', '0');
            $('.bg-main-music').css('opacity', '0');
        }

    );

    $('.hdr-btn').click(
        function () {
            $('.header').css('display', 'none');
            $('.page').css('display', 'none');
            $('#pg-menu').css('display', 'flex');
        }
    );

    $('.exit-btn').click(
        function () {
            $('')
        }
    )
    
    /*
    $('.cntnt-btn').hover(
        function () {
            var button = $(this).attr('id');

            if (button == 'btn-main-demo') {
                $(this).children('.btn-text').css('left', '25px');
                $(this).children('.btn-line').css('left', '0');
                $('.bg-main-demo').css('opacity', '1');
                $('.bg-text .top').css({ 'transition': '0s', 'bottom': '-125vh' });
                $('.bg-text .btm').css({ 'transition': '0s', 'bottom': '125vh' });
                $('#bg-top-text').text('DEMO');
                $('#bg-btm-text').text('REEL');
                setTimeout(function () {
                    $('.bg-text .top').css({ 'transition': '0.5s', 'bottom': '-40px' });
                    $('.bg-text .btm').css({ 'transition': '0.5s', 'bottom': '25px' });
                }, 10);
            }
            else if (button == 'btn-main-music') {
                console.log('btn-main-music');
                $(this).children('.btn-text').css('right', '25px');
                $(this).children('.btn-line').css('right', '0');
                $('.bg-main-music').css('opacity', '1');
                $('.bg-text .top').css({ 'transition': '0s', 'bottom': '-125vh' });
                $('.bg-text .btm').css({ 'transition': '0s', 'bottom': '125vh' });
                $('#bg-top-text').text('MUSIC');
                $('#bg-btm-text').text('COMP');
                setTimeout(function () {
                    $('.bg-text .top').css({ 'transition': '0.5s', 'bottom': '-40px' });
                    $('.bg-text .btm').css({ 'transition': '0.5s', 'bottom': '25px' });
                }, 10);
            }
            else {
                $(this).children('.btn-text').css('left', '25px');
                $(this).children('.btn-line').css('left', '0');
                $('.bg-main-sound').css('opacity', '1');
                $('.bg-text .top').css({ 'transition': '0s', 'bottom': '-125vh' });
                $('.bg-text .btm').css({ 'transition': '0s', 'bottom': '125vh' });
                $('#bg-top-text').text('SOUND');
                $('#bg-btm-text').text('DESIGN');
                setTimeout(function () {
                    $('.bg-text .top').css({ 'transition': '0.5s', 'bottom': '-40px' });
                    $('.bg-text .btm').css({ 'transition': '0.5s', 'bottom': '25px' });
                }, 10);
            }
        },

        function () {
            var button = $(this).attr('id');

            if (button == 'btn-main-music') {
                $(this).children('.btn-text').css('right', '0');
                $(this).children('.btn-line').css('right', '25px');
            }

            else {
                $(this).children('.btn-text').css('left', '0');
                $(this).children('.btn-line').css('left', '25px');
            }
            $('.bg-main-demo').css('opacity', '0');
            $('.bg-main-sound').css('opacity', '0');
            $('.bg-main-music').css('opacity', '0');
            $('.bg-text .top').css({ 'transition': '0s', 'bottom': '-125vh' });
            $('.bg-text .btm').css({ 'transition': '0s', 'bottom': '125vh' });
            $('#bg-top-text').text('KING');
            $('#bg-btm-text').text('SOUND');
            setTimeout(function () {
                $('.bg-text .top').css({ 'transition': '0.5s', 'bottom': '-40px' });
                $('.bg-text .btm').css({ 'transition': '0.5s', 'bottom': '25px' });
            }, 10);
        }

    );
    */
});

function changePage(value) {

    var button = value;

    if (button == "EXIT") {
        $('#pg-menu').css('display', 'none');
        $('#pg-main').css('display', 'block');
        $('.hdr-btn').css('display', 'flex');
    }

    else if (button == "") {

    }
}