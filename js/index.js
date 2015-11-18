
function moveCurrentToView() {
	$(".slide").css("top", "0px");
	var page_height = $(window).height();
	$(".slide").not(".current").css("top", page_height + "px").attr("data-top", page_height);
	var current_height = $(".slide.current").height();
	var current_top = (page_height - current_height) / 2;
	$(".slide.current").css("top", current_top + "px").attr("data-top", current_top);
}

function handleScroll() {
	var top = $(window).scrollTop();
	var downTime = 200;
	var timeInView = 500;
	var fadeOutTime = 500;
	var fadeInTime = 500;
	var fadeOut = 1 - ((top - timeInView - fadeInTime - downTime) / fadeOutTime);
	var fadeIn = (top - downTime) / fadeInTime
	$(".slide").each(function() {
		var curr_height = $(this).attr("data-top")
		curr_height = Number.parseInt(curr_height);
		new_top = curr_height + top;
		$(this).css("top", new_top + "px")
	})
	if (top < fadeInTime && top > downTime) {
		$(".slide").css("opacity", fadeIn);
	} else if (top > (fadeInTime + timeInView)) {
		$(".slide").css("opacity", fadeOut);
	}
	if (top > (fadeOutTime + timeInView + fadeInTime + downTime)) {
		var curr_num = Number.parseInt($(".slide.current").attr("data-order"));
		var next_num = curr_num + 1;
		$(".slide.current").removeClass("current");
		$(".slide[data-order='" + next_num + "']").addClass("current");
		moveCurrentToView()
	}
}

function main(x) {
	moveCurrentToView()
	$(window).scroll(handleScroll)
}

$(document).ready(main)