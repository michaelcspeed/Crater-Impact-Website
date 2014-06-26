/*################################################################################
Provides the main functionality of the Sculder app.
##################################################################################*/

  
var theScroll;
var imageData;
var root;
var APP_NAME = "Sculder";

//=================================================================================
/*
Ensures the mapping script is loaded before the view starts.

*/
//=================================================================================
 function loadScript() 
 {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
		document.body.appendChild(script);
}//================================================================================


//=================================================================================
/*
Initialise the mapping features of the maps tab.

*/
//=================================================================================
function initialize() 
{
	
		var map;
      function initialize() {
        var mapOptions = {
          zoom: 8,
          center: new google.maps.LatLng(-34.397, 150.644),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);
      }
	
 };//===============================================================================
      

/*=================================================================================
Initializes the scrolling feature.
==================================================================================*/
function scroll(){
    theScroll = new iScroll('wrapper');
    
    $('#tab-bar a').on('click', function(e){
    e.preventDefault();
    var nextPage = $(e.target.hash);
    page(nextPage); //You need to add this for it to work
    $("#pages .current").removeClass("current");
    nextPage.addClass("current");
    
});
}//================================================================================


/*=================================================================================
Takes a parameter, which will be the page to navigate to, then it will add the 
classes necessary to fade the new page in and bind a function to webkitAnimationEnd, 
this will then remove the necessary classes. The function looks like this.

@param toPage The page to scroll to.
==================================================================================*/
function page(toPage) {
    var toPage = $(toPage),
    fromPage = $("#pages .current");
    if(toPage.hasClass("current") || toPage === fromPage) {
        return;
    };
    toPage.addClass("current fade in").one("webkitAnimationEnd", function(){
        fromPage.removeClass("current fade out");
        toPage.removeClass("fade in")
    });
    fromPage.addClass("fade out");
}//===================================================================================






//#######################################################################################