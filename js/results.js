var mapTypes = {};  
var lang;
var planet;
var overlay;

	/**Images for the creater screen**/
	var craterImg = new Image();
	craterImg.src = 'imgs/crater1.png';
	
	var spynx = new Image();
	spynx.src = 'imgs/spynx.png';
	
	var bigBen = new Image();
	bigBen.src = 'imgs/bigBen.png';
	
	var eifelTower = new Image();
	eifelTower.src = 'imgs/eifel_tower.png';
	
	var empireState = new Image();
	empireState.src = 'imgs/empire_state.png';
	
	var cn_tower = new Image();
	cn_tower.src = 'imgs/cn_tower.png';
	
	var burj = new Image();
	burj.src = 'imgs/burj_dubai.png';
	
		var cmbLocation =0;/**The location combo box**/
	var selectedBuilding =0;/**The selected building**/
	
	//input values from previous screen
	var dist = 0;
	var diam = 0;
	var traj = 0;
	var velo = 0;
	var pjd = 0;
	var tgd = 0;
	var wlvl = 0;
	var lang = "English";
	
	var crater = null;/**Hold the map crater overlay object**/
	
	var dataProvider = new DataProvider();//for passing data to and fron the back end.
	var calcs = new CraterCalcs();//Will do the calcs/
	
	/**Locations for crater placement**/
	var lox;
	
	/**For drawing scale on crater screen**/
	var leftArrow = new Image();
	var rightArrow = new Image();
	leftArrow.src = 'imgs/arrowL.png';
	rightArrow.src = 'imgs/arrowR.png';
	
	//Holds crater damage text for the results view.
	var damage1;
	var damage2;

USGSOverlay.prototype = new google.maps.OverlayView();

 
    // set up the map types
    mapTypes['moon'] = {
      getTileUrl: function(coord, zoom) {
        return getHorizontallyRepeatingTileUrl(coord, zoom, function(coord, zoom) {
          var bound = Math.pow(2, zoom);
          return "http://mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw/" +
                 + zoom + "/" + coord.x + "/" + (bound - coord.y - 1) + '.jpg';
        });
      },
      tileSize: new google.maps.Size(256, 256),
      isPng: false,
      maxZoom: 9,
      minZoom: 0,
      radius: 1738000,
      name: 'Moon',
      credit: 'Image Credit: NASA/USGS'
    };
 
    mapTypes['sky'] = {
      getTileUrl: function(coord, zoom) {
        return getHorizontallyRepeatingTileUrl(coord, zoom, function(coord, zoom) {
          return "http://mw1.google.com/mw-planetary/sky/skytiles_v1/" +
                 coord.x + "_" + coord.y + '_' + zoom + '.jpg';
 
        });
      },
      tileSize: new google.maps.Size(256, 256),
      isPng: false,
      maxZoom: 13,
      radius: 57.2957763671875,
      name: 'Sky',
      credit: 'Image Credit: SDSS, DSS Consortium, NASA/ESA/STScI'
    };
 
    mapTypes['mars_elevation'] = {
      getTileUrl: function(coord, zoom) {
        return getHorizontallyRepeatingTileUrl(coord, zoom, function(coord, zoom) {
          return getMarsTileUrl("http://mw1.google.com/mw-planetary/mars/elevation/", coord, zoom);
        });
      },
      tileSize: new google.maps.Size(256, 256),
      isPng: false,
      maxZoom: 8,
      radius: 3396200,
      name: 'Mars Elevation',
      credit: 'Image Credit: NASA/JPL/GSFC'
    };
 
    mapTypes['mars_visible'] = {
      getTileUrl: function(coord, zoom) {
        return getHorizontallyRepeatingTileUrl(coord, zoom, function(coord, zoom) {
          return getMarsTileUrl("http://mw1.google.com/mw-planetary/mars/visible/", coord, zoom);
        });
      },
      tileSize: new google.maps.Size(256, 256),
      isPng: false,
      maxZoom: 9,
      radius: 3396200,
      name: 'Mars Visible',
      credit: 'Image Credit: NASA/JPL/ASU/MSSS'
    };
 
    mapTypes['mars_infrared'] = {
      getTileUrl: function(coord, zoom) {
        return getHorizontallyRepeatingTileUrl(coord, zoom, function(coord, zoom) {
          return getMarsTileUrl("http://mw1.google.com/mw-planetary/mars/infrared/", coord, zoom);
        });
      },
      tileSize: new google.maps.Size(256, 256),
      isPng: false,
      maxZoom: 9,
      radius: 3396200,
      name: 'Mars Infrared',
      credit: 'Image Credit: NASA/JPL/ASU'
    };
 
    // Normalizes the tile URL so that tiles repeat across the x axis (horizontally) like the
    // standard Google map tiles.
    function getHorizontallyRepeatingTileUrl(coord, zoom, urlfunc) {
      var y = coord.y;
      var x = coord.x;
 
      // tile range in one direction range is dependent on zoom level
      // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
      var tileRange = 1 << zoom;
 
      // don't repeat across y-axis (vertically)
      if (y < 0 || y >= tileRange) {
        return null;
      }
 
      // repeat across x-axis
      if (x < 0 || x >= tileRange) {
        x = (x % tileRange + tileRange) % tileRange;
      }
 
      return urlfunc({x:x,y:y}, zoom)
    }
 
    function getMarsTileUrl(baseUrl, coord, zoom) {
      var bound = Math.pow(2, zoom);
      var x = coord.x;
      var y = coord.y;
      var quads = ['t'];
 
      for (var z = 0; z < zoom; z++) {
        bound = bound / 2;
        if (y < bound) {
          if (x < bound) {
            quads.push('q');
          } else {
            quads.push('r');
            x -= bound;
          }
        } else {
          if (x < bound) {
            quads.push('t');
            y -= bound;
          } else {
            quads.push('s');
            x -= bound;
            y -= bound;
          }
        }
      }
 
      return baseUrl + quads.join('') + ".jpg";
    }
 
    var map;
    var mapTypeIds = [];
 
    // Setup a copyright/credit line, emulating the standard Google style
    var creditNode = document.createElement('div');
    creditNode.id = 'credit-control';
    creditNode.style.fontSize = '11px';
    creditNode.style.fontFamily = 'Arial, sans-serif';
    creditNode.style.margin = '0 2px 2px 0';
    creditNode.style.whitespace = 'nowrap';
    creditNode.index = 0;
 
    function setCredit(credit) {
      creditNode.innerHTML = credit + ' -';
    }
    
	//Use regular expressions to extract the parameters 
	//by name
	function getParameterByName(name)
	{
	  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	  var regexS = "[\\?&]" + name + "=([^&#]*)";
	  var regex = new RegExp(regexS);
	  var results = regex.exec(window.location.search);
	  if(results == null)
		return "";
	  else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	 
    function initialize() {
    	
    	console.log('initialising');
		resultTap(1);
		drawCrater(-1);//-1 as nothing has been selected yet.
		
		///////////////
		
		lang = getParameterByName("lang");
		if (lang == "") lang = "English";
		
		var param = getParameterByName("dist");
		if (param == "" ) dist = 0;
		else dist = parseInt(param);
		
		param = getParameterByName("diam");
		if (param == "") diam = 0;
		else diam = parseInt(param);
		
		param = getParameterByName("trag")
		if (param  == "") traj  = 90;
		else traj = parseInt(param);
		
		param = getParameterByName("velo");
		if (param == "") velo = 0;
		else velo = parseInt(param);
		
		param = getParameterByName("pjd");
		if (param == "") pjd = 0;
		else pjd= parseInt(param);
		
	    param = getParameterByName("tjd")
	    if (param == "") tgd = 0;
		else tgd = parseInt(param);
		
		//else tgDens++;
		param = getParameterByName("wlvl");
		if (param == "") wlvl = 0;
		else wlvl = parseInt(param);
		
		planet = getParameterByName('planet');
		if (planet == "") planet = "Earth";
		
		///////////////
		
		$.ajaxSetup({ cache: false });
		
		$.ajax({
		type: "GET",
		url: "lang/" + lang +".xml",
		dataType: "xml",
		success: parseXml
     	  });
	  
	   var browserHeight = $(window).height();
		if( browserHeight < 600)
		{
			document.getElementById('header').style.display = 'none'
			document.getElementById('footer').style.display = 'none';
		}
		 	
		 
      // push all mapType keys in to a mapTypeId array to set in the mapTypeControlOptions
      for (var key in mapTypes) {
        mapTypeIds.push(key);
      }
 
      var mapOptions = {
        zoom: 0,
        center: new google.maps.LatLng(62.281819, -150.287132),
        mapTypeControl:false,
        streetViewControl:false,
        mapTypeControlOptions: {
          mapTypeIds: mapTypeIds,
          style: google.maps.MapTypeControlStyle.SMALL
        }
      };
      map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
 
      // push the credit/copyright custom control
      map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(creditNode);
 
      // add the new map types to map.mapTypes
      for (key in mapTypes) {
        map.mapTypes.set(key, new google.maps.ImageMapType(mapTypes[key]));
      }
 
      // handle maptypeid_changed event to set the credit line
      google.maps.event.addListener(map, 'maptypeid_changed', function() {
        setCredit(mapTypes[map.getMapTypeId()].credit);
      });

	var planetCode;
	if(planet == 'Mars') planetCode = 'mars_elevation';
	if(planet == 'Moon') planetCode = 'moon';
	// Will always be Earth if it's not Mars or Moon because we
	// set it earlier.
	if(planet == 'Earth'){
		var mapOptions = {
		  zoom: 10,
		  center: new google.maps.LatLng(51.390209,-3.179855),
		  mapTypeId: google.maps.MapTypeId.SATELLITE,
		  draggableCursor: 'url(imgs/crosshairsS.png) 32 32, crosshair',
		  streetViewControl: false
		};
		
		map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
		
		//Listen for mouse clicks.
		google.maps.event.addListener(map, 'click', function(event) {
			addCrater(event.latLng);
		});
	}
	else{
      map.setMapTypeId(planetCode);
      google.maps.event.addListener(map, "click", function (e) { 
       	console.log( e.latLng.lat().toFixed(6) 
        + ' |' + e.latLng.lng().toFixed(6));	
	}); 
	
    
  var swBound = new google.maps.LatLng(62.281819, -150.287132);
  var neBound = new google.maps.LatLng(62.400471, -150.005608);
  var bounds = new google.maps.LatLngBounds(swBound, neBound);

  // Photograph courtesy of the U.S. Geological Survey
  var srcImage = 'craterimpact.png';
  overlay = new USGSOverlay(bounds, srcImage, map);
	}
}



var mc_1 = new MC();
var mc_2 = new MC();
var mc_3 = new MC();
var mc_4 = new MC();
var mc_5 = new MC();
var mc_6 = new MC();

function  MC()
{
	this._height=0.0;
	this._width = 0.0;
}


	//==================================================================================
	/**
	Adds a crater on the map at the selected location to the calculated size.
	**/
	//==================================================================================
	function addCrater(location_)
	{
		var location1 = location_;
		dataProvider.setCbSelectDepthObject(parseInt(selectedBuilding));
		var lat = location1.lat();
		var lng = location1.lng();
		dataProvider.setLatitude(parseFloat(lat));
		dataProvider.setLongitude( parseFloat(lng));
		dataProvider.setCbLocation(parseInt(cmbLocation));
		

		lox = location_;
		
		//if crater exists remove from map.
		if (crater != null )
		 crater.setMap(null);
		 
		var zoom = map.getZoom();

		var lat = lox.lat();
		var lng = lox.lng();
	
		/* OLD CODE FROM AS.
		var imageBounds = new google.maps.LatLngBounds
		(
			new google.maps.LatLng(lat-0.09,lng-0.15),
			new google.maps.LatLng(lat+0.09,lng +0.15)
		);
		*/
		var imageBounds =  craterBounds(lat,lng, dataProvider.impactor.crDiam);
		
		//Add new ground overlay for the crater.
		crater = new google.maps.GroundOverlay('imgs/craterImpact.png',imageBounds);
		
		crater.setMap(map);
	}//=================================================================================
	
	
	
		//======================================================================================
	/**
	Scroll the map to a predefined location on the map
	**/
	//======================================================================================
	function selectLocation(location)
	{
		cmbLocation  = location;
	   //if (map == null) return;
	// map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
	
	if (map == null)
		initialize();
		
		
	  switch (location.selectedIndex)
	  {
		case 1:
			map.setCenter(new google.maps.LatLng(51.390209,-3.179855), 11);//Cardiff
			break;
		case 2:
			map.setCenter(new google.maps.LatLng(51.495065,-0.282898), 11);//London
			break;
		case 3:
			map.setCenter(new google.maps.LatLng(48.767957,2.272797), 11);//Paris
			break;
		case 4:
			map.setCenter(new google.maps.LatLng(40.720201,-73.755341), 11);//New York
			break;
		case 5:
			map.setCenter(new google.maps.LatLng(34.988941,-110.99556), 11);//Berringer Meteor Crater, Arizona
			break;
		case 6:
			map.setCenter(new google.maps.LatLng(19.120841,19.267273), 11);//Aorounga, Chad , Africa
			break;
		case 7:
			map.setCenter(new google.maps.LatLng(19.093335,19.242731), 11);//Wolfe Creak, Austrailia
			break;
		case 8:
			map.setCenter(new google.maps.LatLng(-27.722436,16.369629), 11);//Roter Kamm, Namibia
			break;
		case 9:
			map.setCenter(new google.maps.LatLng(55.920354,-63.199539), 11);//Mistastin Lake, Canada
			break;
		case 10:
			map.setCenter(new google.maps.LatLng(6.50431,-1.378098), 11);//Bosumtwi, Ghana
			break;
		case 11:
			map.setCenter(new google.maps.LatLng(39.03572,73.464203), 12);//Kara-Kul, Tajikstan
			break;
	  }//end switch
	}//=========================================================================================


function resetSizes()
{

	mc_1._height = 20;//Spynx
	mc_1._width = 42;//Spynx
	mc_2._height = 96;//Big Ben
	mc_2._width = 17;//Big Ben
	mc_3._height = 324;//Eifel
	mc_3._width = 127;//Eifel
	mc_4._height = 449;//Empire State
	mc_4._width = 146;//Empire State
	mc_5._height = 554;//533;//CN
	mc_5._width =77; //76;//CN
	mc_6._height = 800;//Burg
	mc_6._width = 170;//Burg

}

	//============================================
	/**
	Parse the XML for this page
	**/
	//=============================================
	function parseXml(xml)
	{
		console.log('parsing xml');
		//var x =  $(xml).find("btStart").text();
		
		var x = $(xml).find("result").text();
		$("#Crater_Size_Title").html(x);
		$("#Crater_Depth_Title").html(x);
		$("#Data_Title").html(x);
		
	    x = $(xml).find("lblImpactVal").text();
		$("#InputValues_Title").html(x);
		
		 x = $(xml).find("htParameter").text();
		$("#Thead_param").html(x);
		$("#Thead_param1").html(x);
		$("#Thead_param3").html(x);
		$("#Thead_param4").html(x);
		
		x = $(xml).find("htValue").text();
		$("#Thead_value").html(x);
		$("#Thead_value1").html(x);
		$("#Thead_value3").html(x);
		$("#Thead_value4").html(x)
		
		x = $(xml).find("lblSelect").text();
		$("#SelectLM_Title").html(x);
		$("#cpp_0").html(x);
		$("#cpl_0").html(x);
		
		x = $(xml).find("lblSphinx").text();
		$("#cpl_1").html(x);
		x = $(xml).find("lblBen").text();
		$("#cpl_2").html(x);
		x = $(xml).find("lblEiffel").text();
		$("#cpl_3").html(x);
		x = $(xml).find("lblEmpireSt").text();
		$("#cpl_4").html(x);
		x = $(xml).find("lblCN").text();
		$("#cpl_5").html(x);
		x = $(xml).find("lblBurj").text();
		$("#cpl_6").html(x);
		
			
		x = $(xml).find("lblClickMap").text();
		$("#MapInst").html(x);

		x = $(xml).find("btBack").text();
		$("#BT_Back").html(x);
		
		x = $(xml).find("cvsData").text();
		$("#BT_Data").html(x);
		$("#Data_Title").append(" - " + x);
		
		x = $(xml).find("cvsDepth").text();
		$("#BT_CraterDepth").html(x);
		$("#Crater_Depth_Title").append(" - " + x);
		
		x = $(xml).find("cvsSize").text();
		$("#BT_CraterPlace").html(x);
		$("#Crater_Size_Title").append(" - " +x);
		
		x = $(xml).find("lblLandmark").text();
		$("#LB_SelectLandmark").html(x);
		
		x = $(xml).find("lblInVals").text();
		$("#LB_InpactValues").html(x);
		
		x = $(xml).find("damage1").text();
		damage1 = x;
		$("#LB_Damage").html(x);
		x = $(xml).find("damage2").text();
		damage2 = x;
		$("#LB_Damage").append( " " + x + " " + x);
		
		x = $(xml).find("lblImpEnergy").text();
		$("#LB_InputEnergy").html(x);
		
		x = $(xml).find("lblWhatImpactor").text();
		$("#LB_Impactor").html(x);
		
		x = $(xml).find("lblFireball").text();
		$("#LB_Fireball").html(x);
		

		////////////////////////////
		onLoadComplete();
	}
	//==============================================


	//===============================================
	/**
	Once loadinf is complete calculate results.
	**/
	//===============================================
	function onLoadComplete()
	{
	
		//////////////////////////////
		//Pass values to data provider
		//////////////////////////////
		//Values from prev screen.
		dataProvider.setSelected_language(lang);
		dataProvider.setImpactDist(parseInt(dist));
		dataProvider.setProjDiam(parseInt(diam));
		dataProvider.setProjAngle(parseInt(traj));
		dataProvider.setProjVel(parseInt(velo));
		dataProvider.setCbPjDens(parseInt(pjd));
		dataProvider.setCbTgDens(parseInt(tgd));
		dataProvider.setSlTgDepth(parseInt(wlvl));
		
		
		////////////////
		//DO THE CALCS
		////////////////
		calcs = new CraterCalcs();
		
		//Do calculation
		calcs.getData(dataProvider);//From CraterCalcs.js
		
	}//==============================================
	
	
	//==================================================================================
	/**
	Once the calc is complete put the results on the UI.
	**/
	//==================================================================================
	function onCalcComplete()
	{
		////////////////////////////////
		//Display Results
		////////////////////////////////
		
		//The data on the map screen.
		setImpactValues(dataProvider.getDgOutputs());
		
		//The inputValues
		setInputValues(dataProvider.getDgInputs());
		
		//The damage table
		setDamage(dataProvider.getTxtDamage());
		
		//Set Impact Energy Table
		setEnergyValues(dataProvider.getDgEnergy());
		
		//Get the what happenes to the impactor text.
		 setImpactorText(dataProvider.getTxtImpactor());
		 
		// get fireball dats.
		 setFireballSeen(dataProvider.getDgFirevall());
		
		drawScale();
		
	}//=================================================================================
	
	//==================================================================================
	/**
	Sets the output array that falls on the map screeen.
	**/
	//==================================================================================
	function setImpactValues(dgOutputs)
	{
		var impTbl = document.getElementById("ImpactValuesTable");
		//var impTbl2 = document.getElementById("InputValuesTable");
		//impTbl2.innerHTML = ' ';
		
		var keys = dgOutputs.keys()
		var values = dgOutputs.values();
		var tableData = "";
		for (var i = 0; i < keys.length;i++)
		{
			if (i % 2 && i != 0)
				tableData = tableData + "<tr><td>"+ keys[i]+ "</td><td>" + values[i] + "</td></tr>";
			else
				tableData = tableData + "<tr class=\"alt\"><td>"+ keys[i]+ "</td><td>" + values[i] + "</td></tr>";
				
		}//end for
		
		$('#ImpactValuesTable').html(tableData);
		//impTbl.innerHTML = tableData;
	}//=================================================================================
	
	
	//==================================================================================
	/**
	Sets the iinput array that is the first table in the Data View.
	**/
	//==================================================================================
	function setInputValues(dgInputs)
	{
		var impTbl = document.getElementById("InputValuesTable");
		//impTbl.innerHTML = "";
		
		var keys = dgInputs.keys()
		var values = dgInputs.values();
		var tableData = "";
		for (var i = 0; i < keys.length;i++)
		{
			if (i % 2 && i != 0)
				tableData = tableData + "<tr><td>"+ keys[i]+ "</td><td>" + values[i] + "</td></tr>";
			else
				tableData = tableData + "<tr class=\"alt\"><td>"+ keys[i]+ "</td><td>" + values[i] + "</td></tr>";
				
		}//end for
		
		$('#InputValuesTable').html(tableData);
		//impTbl.innerHTML = tableData;
	}//=================================================================================

	//==================================================================================
	/**
	Sets the damage text which is the second table of the data view are.
	**/
	//==================================================================================
	function setDamage(txtDamage)
	{
		

		$("#LB_Damage").text( damage1 + " " +  dist +" km "+ damage2);

		var impTbl = document.getElementById("DamageInfo");
		
		$('#DamageInfo').html(txtDamage);
		//impTbl.innerHTML = txtDamage;
	}//==================================================================================
	
	//===================================================================================
	/**
	Sets the data for the energy table which is the third table of the data view.
	**/
	//====================================================================================
	function setEnergyValues(dgEnergy)
	{
		var impTbl = document.getElementById("InputEnergyTable");
		//impTbl.innerHTML = "";
		
		var keys = dgEnergy.keys()
		var values = dgEnergy.values();
		var tableData = "";
		for (var i = 0; i < keys.length;i++)
		{
			if (i % 2 && i != 0)
				tableData = tableData + "<tr><td>"+ keys[i]+ "</td><td>" + values[i] + "</td></tr>";
			else
				tableData = tableData + "<tr class=\"alt\"><td>"+ keys[i]+ "</td><td>" + values[i] + "</td></tr>";
				
		}//end for
		
		$('#InputEnergyTable').html(tableData);
		//impTbl.innerHTML = tableData;
	}//===================================================================================
	
	//====================================================================================
	/**
	Sets the impactor text which is the fours data table in the data view.
	**/
	//====================================================================================
	 function setImpactorText(impactorText)
	 {
		var impTbl = document.getElementById("ImpactorInfo");
		$('#ImpactorInfo').html(impactorText);
		//impTbl.innerHTML = impactorText;
	 }//==================================================================================
	 
	 //===================================================================================
	 /**
	 Sets if a fireball has been seen which is the final table of the data view.
	 **/
	 //===================================================================================
	 function setFireballSeen(fireArray)
	 {
		var impTbl = document.getElementById("FireballTable");
		//impTbl.innerHTML = "";
		
		var keys = fireArray.keys()
		var values = fireArray.values();
		var tableData = "";
		//if dist is 0 do not display the exposure, the last value in the fire array.
		var display_exposure =  dist == 0? 1: 0;
		
		for (var i = 0; i < keys.length - display_exposure;i++)
		{
			if (i % 2 && i != 0)
				tableData = tableData + "<tr><td>"+ keys[i]+ "</td><td>" + values[i] + "</td></tr>";
			else
				tableData = tableData + "<tr class=\"alt\"><td>"+ keys[i]+ "</td><td>" + values[i] + "</td></tr>";
				
		}//end for
		
		$('#FireballTable').html(tableData);
		//impTbl.innerHTML = tableData;
	 }//===================================================================================
		 

	//======================================================================================
	/**
	Resets a canvas clearing any path lines or images presented. Any transforms are cleared 
	then restored so that the clearRect command does not itself become transformed.
	**/
	//========================================================================================
	function canvasReset (ctx, canvas)
	{
		// Store the current transformation matrix
		ctx.save();

		// Use the identity matrix while clearing the canvas
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();

		// Restore the transform
		ctx.restore();
	}//=======================================================================================
	


//=========================================================================================
/**
	Called when the building comobo box is selected on the crater screen
**/
//=========================================================================================
function drawCrater(building)
{
 selectedBuilding = building;
  var c=document.getElementById("Crater_Area");
  var ctx=c.getContext("2d");
  
  var craterBaseThickness = 29;
  
   canvasReset (ctx, c);
   
   if (building.selectedIndex > 0)
   {
	  resetSizes();
	   
	  var cd = dataProvider.impactor.crDepth;
	   
	  var _loc1 = cd / 92;
	  switch (building.selectedIndex)
	  {
		case 1:
			mc_1._height =  mc_1._height / _loc1;
			mc_1._width =  mc_1._width / _loc1;
			ctx.drawImage(spynx,c.width/2.0 - mc_1._width/2.0 , c.height -(craterBaseThickness + mc_1._height) ,mc_1._width,mc_1._height);
			//ctx.drawImage(spynx, mc_1._width/2.0-42/2.0,mc_1._height-(20+craterBaseThickness))
			//ctx.drawImage(spynx, c.width/2.0-42/2.0,c.height-(20+craterBaseThickness));
			break;
		case 2:
			mc_2._height =  mc_2._height / _loc1;
			mc_2._width =  mc_2._width / _loc1;
			//ctx.drawImage(spynx,c.width/2.0 - mc_1._width/2.0 , c.height -(20+craterBaseThickness) ,mc_1._width,mc_1._height);
			ctx.drawImage(bigBen,c.width/2.0 - mc_2._width/2.0 , c.height -(craterBaseThickness + mc_2._height) ,mc_2._width,mc_2._height);
			break;
		case 3:
			mc_3._height =  mc_3._height / _loc1;
			mc_3._width =  mc_3._width / _loc1;
			ctx.drawImage(eifelTower,c.width/2.0 - mc_3._width/2.0 , c.height -(craterBaseThickness + mc_3._height) ,mc_3._width,mc_3._height);
			break;
		case 4:
			mc_4._height =  mc_4._height / _loc1;
			mc_4._width =  mc_4._width / _loc1;
			ctx.drawImage(empireState,c.width/2.0 - mc_4._width/2.0 , c.height -(craterBaseThickness + mc_4._height) ,mc_4._width,mc_4._height);
			break;
		case 5:
			mc_5._height =  mc_5._height / _loc1;
			mc_5._width =  mc_5._width / _loc1;
			ctx.drawImage(cn_tower, c.width/2.0 - mc_5._width/2.0 , c.height -(craterBaseThickness + mc_5._height) ,mc_5._width,mc_5._height);
		
			//ctx.drawImage(cn_tower,0,0, 77,554, c.width/2.0 - mc_5._width/2.0 , c.height -(craterBaseThickness + mc_5._height) ,mc_5._width,mc_5._height);
			break;
		case 6:
			mc_6._height =  mc_6._height / _loc1;
			mc_6._width =  mc_6._width / _loc1;
			ctx.drawImage(burj,c.width/2.0 - mc_6._width/2.0 , c.height -(craterBaseThickness + mc_6._height ) ,mc_6._width,mc_6._height);
			break;
	  }//end switch
  }//end if
  
    ctx.drawImage(craterImg,(c.width-716.0)/2.0,c.height-121.0);
	
	if(typeof dataProvider.impactor != 'undefined')
		drawScale();
}//=====================================================================================



//=======================================================================================
/**
draw the scale line beneath the crater.
**/
//=======================================================================================
function drawScale()
{
	var c=document.getElementById("Crater_Area");
	var ctx=c.getContext("2d");
	
	ctx.font = '10pt Arial';
	
	 var diam = nbFormat(dataProvider.impactor.crDiam)+"m";
	 var depth = nbFormat(dataProvider.impactor.crDepth)+"m"; 
	 
	 var dl =depth.length;
	 var dil = diam.length;
	
	ctx.fillText(diam, c.width/2 -(dil*4.2), c.height - 18);
	ctx.fillText(depth, c.width -165 -(dl*4.2), c.height - 70);	   
	
}//==========================================================================================




	// Swap fragments
	function resultTap(tabNo)
	{
	  if(tabNo ==1)
	  {
		document.getElementById('ImpactCalc_Data_View').style.display = "none";
		document.getElementById('ImpactCalc_Crater_Depth').style.display = "none";
		document.getElementById('ImpactCalc_Output_Map').style.display = "block";
	  }
	  else if (tabNo ==2)
	  {
		document.getElementById('ImpactCalc_Data_View').style.display = "none";
		document.getElementById('ImpactCalc_Crater_Depth').style.display = "block";
		document.getElementById('ImpactCalc_Output_Map').style.display = "none";
	
	  }
	  else if (tabNo == 3)
	  {
		document.getElementById('ImpactCalc_Data_View').style.display = "block";
		document.getElementById('ImpactCalc_Crater_Depth').style.display = "none";
		document.getElementById('ImpactCalc_Output_Map').style.display = "none";
	  }
	}



/** @constructor */
function USGSOverlay(bounds, image, map) {

  // Now initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  // We define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay
  this.setMap(map);
}

USGSOverlay.prototype.onAdd = function() {

  // Note: an overlay's receipt of onAdd() indicates that
  // the map's panes are now available for attaching
  // the overlay to the map via the DOM.

  // Create the DIV and set some basic attributes.
  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create an IMG element and attach it to the DIV.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  div.appendChild(img);

  // Set the overlay's div_ property to this DIV
  this.div_ = div;

  // We add an overlay to a map via one of the map's panes.
  // We'll add this overlay to the overlayLayer pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
}

USGSOverlay.prototype.draw = function() {

  // Size and position the overlay. We use a southwest and northeast
  // position of the overlay to peg it to the correct position and size.
  // We need to retrieve the projection from this overlay to do this.
  var overlayProjection = this.getProjection();

  // Retrieve the southwest and northeast coordinates of this overlay
  // in latlngs and convert them to pixels coordinates.
  // We'll use these coordinates to resize the DIV.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's DIV to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
}

USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
}

google.maps.event.addDomListener(window, 'load', initialize);


