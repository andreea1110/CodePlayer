function update_output() {
/* Update the contents of the output panel. */	
	$("iframe").contents().find("html").html(
	"<html> \
		<head> \
			<style type='text/css'>" + $("#cssPanel").val() + "</style> \
		</head> \
		<body>" + $("#htmlPanel").val() + "</body> \
	</html>"
	);
	
	document.getElementById("outputPanel").contentWindow.eval($("#javascriptPanel").val());
	
}

$(document).ready(function() {
	
	update_output();
	
	// set initial height and width of the default panels
	$(".panel").height($(window).height() - $("#top_bar").height());
	$(".panel").width(($(window).width() / 2) - 10);

	// update the output as text is added in any of the input panels
	$("textarea").on('change keyup paste', function() {	
		update_output();
	});

	// set on-hover behaviour of the buttons
	$(".toggle_button").hover(function() {	
		$(this).addClass("highlighted_button");
	}, function() {
		$(this).removeClass("highlighted_button");
	});

	// set on-click behaviour of the buttons
	$(".toggle_button").click(function() {
		
		$(this).toggleClass("active");
		$(this).removeClass("highlighted_button");
		
		var panelId = $(this).attr("id") + "Panel";
		
		$("#" + panelId).toggleClass("hidden");
		
		var numberOfActivePanels = 4 - $(".hidden").length;
		
		$(".panel").width(($(window).width() / numberOfActivePanels) - 10);	
	});
	
	// adjust the width and height of the panels when the page is resized
	$( window ).resize(function() {
		var numberOfActivePanels = 4 - $(".hidden").length;
		$(".panel").width(($(window).width() / numberOfActivePanels) - 10);
		$(".panel").height($(window).height() - $("#top_bar").height());
	});
	
});