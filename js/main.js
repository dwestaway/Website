$(document).ready(function(){

var height = 50;
var width = 50;

var cells = [];

function drawGrid(h,w) {
  var size = h * w;

  for (var i = 0; i < size; i++) {
    cells[i] = false;
  }

  for (i = 0; i < cells.length; i++) {
    $('#grid').append('<div class="cell"></div>');
  }
}

drawGrid(height,width);




/* Image Carousel */

	$(".nextButton").on("click", function(a){ //when next button is clicked

		var currentImage = $(".shownImage"); //current image uses shownImage class
		var nextImage = currentImage.next(); //next image is next image in shownImage class

		if(nextImage.length === 0) //if at final image, go back to first image
		{
			nextImage = $(".carousel img").first();
		}

		currentImage.removeClass("shownImage").addClass("hiddenImage").css("z-index", -1); //remove class that shows image, add class that hides image, put image at bottom with z-index

		nextImage.addClass("shownImage").removeClass("hiddenImage").css("z-index", 1); //add show image class to the next image, remove hidden class, put image at top with z-index

		$(".carousel img").not([currentImage, nextImage]).css("z-index", 1); //make all images except current and next image z-index to 1

		a.preventDefault(); //prevent link href
	});

	$(".previousButton").on("click", function(a){

		var currentImage = $(".shownImage");
		var nextImage = currentImage.prev();

		if(nextImage.length === 0)
		{
			nextImage = $(".carousel img").last();
		}

		currentImage.removeClass("shownImage").addClass("hiddenImage").css("z-index",-1);

		nextImage.addClass("shownImage").removeClass("hiddenImage").css("z-index", 1);

		$(".carousel img").not([currentImage, nextImage]).css("z-index",1);

		a.preventDefault();
	});

});
