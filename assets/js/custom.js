/*-----------------------------------------------------------
* Template Name    : WESTIN - Fully Responsive Personal Template
* Author           : Retrina Group
* Version          : 2.0.0
* Created          : January 2021
* File Description : Main JQuery file of the template
*------------------------------------------------------------*/


// repeated variables
var $window = $(window);
var $root = $('html, body');

$(document).ready(function () {


    //SmothScroll
    $('.header .navbar-nav a, .to-contact, .scroll-down a').on('click', function(event) {
        var $anchor = $(this);
        $root.stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 60
        }, 1500, 'easeInOutQuart');
        event.preventDefault();
        $(".navbar-collapse").collapse('hide');
    });

    //SideBar Smooth Scroll
    $('.sidebar .navbar-nav a, .sidebar .list-group a').on('click', function(event) {
        var $anchor = $(this);
        $root.stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500, 'easeInOutQuart');
        event.preventDefault();
    });


    //SidebarToggler
    
    var $sidebarToggler = $('.sidebar-toggler');
    var $sidebar = $('.sidebar');
    var $pageContent = $('.page-content');

    $sidebarToggler.on('click', function(){
        $(this).toggleClass('move lni-chevron-left lni-menu');
        $sidebar.toggleClass('hide');
        // $pageContent.toggleClass('full-width');
    });

    if($window.width() < 1199){
        $sidebarToggler.addClass('move lni-menu');
        $sidebarToggler.removeClass('lni-chevron-left');
        $sidebar.addClass('hide');
        $pageContent.addClass('full-width');
        $('.sidebar .navbar-nav a, .sidebar .list-group a').on('click', function(){
            setTimeout(function () {
                $sidebarToggler.toggleClass('move lni-chevron-left lni-menu');
                $sidebar.toggleClass('hide');
                $pageContent.toggleClass('full-width');
            });
        });
    }


    //Typed Js
    var $element = $(".element");
    if($element.length){
        var options = {
            strings: $element.attr('data-elements').split(','),
            typeSpeed: 100,
            backDelay: 3000,
            backSpeed: 50,
            loop: true
        };
        var typed = new Typed(".element", options);
    }


    //Magnific Popup
    if (('.portfolio-items').length > 0) {
        $('.portfolio-items').each(function() {
            $(this).magnificPopup({
                delegate: '.js-zoom-gallery',
                type: 'image',
                gallery: {
                    enabled:true
                }
            });
        });
    }

    //Testimonial
    $("#testimonial .owl-carousel").owlCarousel({
        items: 1,
        nav: false,
        autoplay: false,
        loop: true,
        dots: true,
        mouseDrag: true,
        touchDrag: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
    });
    

   

});

$window.on("load", (function() {
    $("#angela-preloader").addClass("loaded");

        if ($("#angela-preloader").hasClass("loaded")) {
            $("#angela-preloader").delay(900).queue(function () {
                $(this).remove();
            });
        }

         // init Isotope
         var initial_items = $('#showMore-initials').data("initial");
         var next_items = $('#showMore-initials').data("next");
         var $pfilter = $('#portfolio-filter');
         var $grid = $('.portfolio-items');
         var $showMore = $('#showMore');
         $grid.isotope({
             itemSelector: '.portfolio-item',
             layoutMode: 'masonryHorizontal',
         });
         $pfilter.find('a').on("click",function() {
             var filterValue = $(this).attr('data-filter');
             $pfilter.find('a').removeClass('active');
             $(this).addClass('active');
             $grid.isotope({
                 filter: filterValue,
             });
             updateFilterCounts();
             return false;
         });
         function updateFilterCounts() {
             var itemElems = $grid.isotope('getFilteredItemElements');
             var count_items = $(itemElems).length;
             if (count_items > initial_items) {
                 $showMore.show();
                 $showMore.parent('.button-border').addClass('mr-2 mr-sm-4').removeClass('p-0');
                 
             } else {
                 $showMore.hide();
                 $showMore.parent('.button-border').removeClass('mr-2 mr-sm-4').addClass('p-0');
             }
             if ($('.portfolio-item').hasClass('visible_item')) {
                 $('.portfolio-item').removeClass('visible_item');
             }
             var index = 0;

             $(itemElems).each(function() {
                 if (index >= initial_items) {
                     $(this).addClass('visible_item');
                 }
                 index++;
             });
             $grid.isotope('layout');
         }
         function showNextItems(pagination) {
             var itemsMax = $('.visible_item').length;
             var itemsCount = 0;
             $('.visible_item').each(function() {
                 if (itemsCount < pagination) {
                     $(this).removeClass('visible_item');
                     itemsCount++;
                 }
             });
             if (itemsCount >= itemsMax) {
                 $showMore.hide();
                 $showMore.parent('.button-border').removeClass('mr-2 mr-sm-4').addClass('p-0');
             }
             $grid.isotope('layout');
         }
         // function that hides items when page is loaded
         function hideItems(pagination) {
             var itemsMax = $('.portfolio-item').length;
             var itemsCount = 0;
             $('.portfolio-item').each(function() {
                 if (itemsCount >= pagination) {
                     $(this).addClass('visible_item');
                 }
                 itemsCount++;
             });
             if (itemsCount < itemsMax || initial_items >= itemsMax) {
                 $showMore.hide();
                 $showMore.parent('.button-border').removeClass('mr-2 mr-sm-4').addClass('p-0');
             }
             $grid.isotope('layout');
         }
         $showMore.on('click', function(e) {
             e.preventDefault();
             showNextItems(next_items);
         });
     hideItems(initial_items);

}));
$window.on('scroll', function () {

    //Scroll Top
    var $returnToTop = $('.return-to-top');
    if ($window.scrollTop() > 150) {
        $returnToTop.addClass('show');
    } else {
        $returnToTop.removeClass('show');
    }
    $returnToTop.on('click', function(){
        $root.stop().animate({
            scrollTop: 0
        }, 1500);
    });


    //Counted Number
    var scroll = $window.scrollTop();
    var countId = $('#count-up');
    if (countId.length){
        var winH = $window.height(),
            countOffset = countId.offset().top;
        if (scroll + winH > countOffset) {
            $('.timer').countTo();
            $('.count-number').removeClass('timer');
        }
    }

    //Skills
    var scroll = $window.scrollTop();
    var skillsDiv = $('#skills');
    if(skillsDiv.length > 0){
        var winH = $window.height(),
            skillsT = skillsDiv.offset().top;
        if (scroll + winH > skillsT) {
            $('.skillbar').each(function () {
                $(this).find('.skillbar-bar').animate({
                    width: $(this).attr('data-percent')
                }, 6000);
            });
        }
    }
    
    
});

