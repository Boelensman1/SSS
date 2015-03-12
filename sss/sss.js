/** Super Simple Slider by @intllgnt **/
;(function($, window, document, undefined ) {

$.fn.sss = function(options) {

	// Options
	var settings = $.extend({
		slideShow : true,
		startOn : 0,
		speed : 3500,
		transition : 400,
		arrows : true,
		pauseOnHover: true
	}, options);

	return this.each(function() {

		// Variables
		var wrapper = $(this),
				slides = wrapper.children().wrapAll('<div class="sss"/>').addClass('ssslide'),
				slider = wrapper.find('.sss'),
				slide_count = slides.length,
				transition = settings.transition,
				starting_slide = settings.startOn,
				target = starting_slide > slide_count - 1 ? 0 : starting_slide,
				isAnimating = false,
				isHovering = false,
				clicked,
				timer,
				key,
				prev,
				next,

				// Reset Slideshow
				reset_timer = settings.slideShow ? function() {
					clearTimeout(timer);
					timer = setTimeout(next_slide, settings.speed);
				} : $.noop;

		// Get Slide Height
		function get_height(target) {
			return ((slides.eq(target).height() / slider.width()) * 100) + '%';
		}

		// Pause on Hover
		function pauseOnHover() {
			slider.on('mouseenter', function() {
				isHovering = true;
			}).on('mouseleave', function() {
				isHovering = false;
			});
		}

		// Animate Slider
		function animate_slide(target, isNavClick) {
			if (!isAnimating) {
				if (!isHovering || isNavClick) {
					isAnimating = true;
					var target_slide = slides.eq(target);

					target_slide.fadeIn(transition);
					slides.not(target_slide).fadeOut(transition);

					slider.animate({paddingBottom: get_height(target)}, transition,  function() {
						isAnimating = false;
					});
				}
				reset_timer();
			}
		}

		// Next Slide
		function next_slide(isNavClick) {
			target = target === slide_count - 1 ? 0 : target + 1;
			animate_slide(target, isNavClick);
		}

		// Prev Slide
		function prev_slide(isNavClick) {
			target = target === 0 ? slide_count - 1 : target - 1;
			animate_slide(target, isNavClick);
		}

		if (settings.arrows) {
			slider.append('<div class="sssprev"/>', '<div class="sssnext"/>');
		}
		next = slider.find('.sssnext');
		prev = slider.find('.sssprev');

		$(window).load(function() {
			if (settings.pauseOnHover) { pauseOnHover(); }
			slider.css({paddingBottom: get_height(target)}).click(function(e) {
				clicked = $(e.target);
				if (clicked.is(next)) {
					next_slide(true);
				} else if (clicked.is(prev)) {
					prev_slide(true);
				}
			});

			animate_slide(target);

			$(document).keydown(function(e) {
				key = e.keyCode;
				if (key === 39) {
					next_slide();
				} else if (key === 37) {
					prev_slide();
				}
			});
		});

	}); // End

}; // End $.fn

})(jQuery, window, document);
