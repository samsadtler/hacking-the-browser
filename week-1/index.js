var screenWidth = screen.width;
var windowWidth;
var windowHeight;
var framePixels;
var plays = 4;
var frameArray = [];
// 'cleo-field 01.jpg','cleo-field 02.jpg','cleo-field 03.jpg','cleo-field 04.jpg','cleo-field 05.jpg','cleo-field 06.jpg'
var frameCounter = 0;
var preveriousWidth = 0;
var preveriousGamma = 0;
$(document).ready(function(){
	init();

	;(function() {
		console.log('throttler')
	    var throttle = function(type, name, obj) {
	        obj = obj || window;
	        var running = false;
	        var func = function() {
	            if (running) { return; }
	            running = true;
	             requestAnimationFrame(function() {
	                obj.dispatchEvent(new CustomEvent(name));
	                running = false;
	            });
	        };
	        obj.addEventListener(type, func);
	    };

	    /* init - you can init any event */
	    throttle("resize", "optimizedResize");
	})();

	// handle event
	window.addEventListener("optimizedResize", function() {
		checkWidth();
	    console.log("Resource conscious resize callback!");
	});
});


function init(){
	console.log('init')
	inportMedia();
	// window.addEventListener('deviceorientation', handleOrientation);
}
function inportMedia(){
	var dir = "cleo-field/";
	var fileextension = ".jpg";
	$.ajax({
	    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
	    url: dir,
	    success: function (data) {
	        //Lsit all png file names in the page

	        $(data).find("a:contains(" + fileextension + ")").each(function () {
	            var filename = this.href.replace(window.location.host, "").replace("http:///", "");
	            frameArray.push(dir + filename);
	        });
	        console.log(frameArray)
	    }
	});
}
function handleOrientation(event) {
  	var absolute = event.absolute;
  	var alpha    = event.alpha;
  	var beta     = event.beta;
	var gamma    = event.gamma;
	console.log('absolute: ', absolute, ' alpha: ', alpha, ' beta: ', beta, 'gamma: ', gamma)
 	
 	if (gamma > preveriousGamma){
		if (frameCounter > frameArray.length | frameCounter == frameArray.length-1){
			frameCounter = 0;
		} else frameCounter++
	}
	if (gamma < preveriousGamma){
		if (frameCounter < 0 | frameCounter == 0 ){
			frameCounter = frameArray.length-1;
		} else frameCounter--
	}
	// frame(frameCounter);
  // Do stuff with the new orientation data
}
function checkWidth(){
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	if (windowWidth > preveriousWidth){
		preveriousWidth = windowWidth;
		if (frameCounter > frameArray.length | frameCounter == frameArray.length-1){
			frameCounter = 0;
		} else frameCounter++
	}
	if (windowWidth < preveriousWidth){
		preveriousWidth = windowWidth;
		if (frameCounter < 0 | frameCounter == 0 ){
			frameCounter = frameArray.length-1;
		} else frameCounter--
	}
	frame(frameCounter);
	console.log("windowHeight: ", windowHeight , ' and windowWidth: ', windowWidth)
}

function frame(nextFrame){
	framePixels = (screenWidth/plays)/frameArray;
	$('.animations').empty();
	console.log('frame', nextFrame,' and src',frameArray[nextFrame])
	$('.animations').prepend('<img id="theImg" src="'+frameArray[nextFrame]+'" />')
	
}