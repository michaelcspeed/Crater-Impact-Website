//###############################################################
/**
The control code for the input screen and its various elements  
which are a mixture of HTML5.0 compatible XHTML4.0 and JQuery UI.
**/
//###############################################################
	var seletedButton;/**The selected button**/
	
	var buttons = new Array();/**The array of language buttons**/
	var buttonsSel = new Array();/**The selected button array**/
	var buttonCount = 0;/**The number of buttons added**/
	
	var distVal = 0;/**Distance from impact zone**/
	var diameterVal = 0;/**Diamiter of projectile.**/
	var tragAngleVal = 0;/**Angle of impact**/
	var projVelVal = 0;/**Object velocity.**/
	var pjDens = 0;/**Projectile Density**/
	var tgDens = 0;/**Target Density**/
	var waterLevel = 0;/**The level in mtrs when water selected**/
	
	var imgAngle = new Image();
	imgAngle.src = 'imgs/impactAngle.png';
	var imgAngleB = new Image();
	imgAngleB.src = 'imgs/impactAngleB.png';
	
	
	var leftArrow = new Image();
	var rightArrow = new Image();
	leftArrow.src = 'imgs/arrowL.png';
	rightArrow.src = 'imgs/arrowR.png';
	
	var pjd1 = new Image();
	var pjd2 = new Image();
	var pjd3 = new Image();
	var pjd4 = new Image();
	pjd1.src = 'imgs/pjd1.jpg';
	pjd2.src = 'imgs/pjd2.jpg';
	pjd3.src = 'imgs/pjd3.jpg';
	pjd4.src = 'imgs/pjd4.jpg';
	
	var tgd1 = new Image();
	var tgd2 = new Image();
	var tgd3 = new Image();
	tgd1.src = 'imgs/tgd1.jpg';
	tgd2.src = 'imgs/tgd2.jpg';
	tgd3.src = 'imgs/water.jpg';

	
	var mntn = new Image();
	mntn.src = 'imgs/water.jpg';
	var refl = new Image();
	refl.src= 'imgs/water_u3.jpg';
	
	var imgBlank = new Image();
	imgBlank.src = 'imgs/blank.png';

	//Dynamicly build array of speed images.
	var speedImgs = new Array();
	for (var i = 0; i <= 9; i++)
	{
	    var img = new Image();
		img.src = 'imgs/n' + i + '.png'; 
		speedImgs[i] = img;
	}//end for
	
	var speedNeedle = new Image();
	speedNeedle.src = 'imgs/speedNeedle1.png';
	
	var speedo= new Image();
	speedo.src = 'imgs/speedo.png';
	
	var lang = "English";
	var planet = "Earth";
	
	var input_error_title;
	var input_error_diam;
	var input_error_angle;
	var input_error_vel;
	var input_error_pjd;
	var input_error_tgd;
	var input_error_water;
	var help_title;
	var help_text;
	var help_text2;

	//==============================================
	/**
	Called at the start to prepare the view for 
	display
	**/
	//==============================================
	 function prepareView()
	{
	
	
		updateVelocity(); 
		updateAngle();  
		updateDiameter();
		updateWater();
		
		var browserHeight = $(window).height();
		
		if( browserHeight < 600)
		{
			document.getElementById('header').style.display = 'none';
			document.getElementById('footer').style.display = 'none';
		}

	}//=============================================
	
	//==============================================
	/**
	Use regular expressions to extract the parameters 
	by name
	**/
	//==============================================
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
	}//============================================


	//============================================
	/**
	Parse the XML for this page
	**/
	//=============================================
	function parseXml(xml)
	{
		var x = $(xml).find("inputs").text();
		$("#Title").html(x);
		
		x = $(xml).find("lblValue").text();
		$("#Slider1_Text").html(x);
		$("#Slider2_Text").html(x);
		$("#Slider3_Text").html(x);
		$("#Slider4_Text").html(x);
		
		x = $(xml).find("lblDistance").text();
		$("#Slider5_Text").html(x);
		
		x = $(xml).find("lblAstDiam").text();
		$("#titleProjectile").html(x);
		
		x = $(xml).find("lbPjAng").text();
		$("#titleAngle").html(x);
		
		x = $(xml).find("lbPjVel").text();
		$("#titleVelocity").html(x);
		
		x = $(xml).find("lbPjDens").text();
		$("#titlePJDensity").html(x);
		
		x = $(xml).find("lbTgDens").text();
		$("#titleTGDensity").html(x);
		
		x = $(xml).find("btReset").text();
		$("#BT_Reset").html(x);
		
		x = $(xml).find("btSubmit").text();
		$("#BT_Submit").html(x);
		
		
		x = $(xml).find("lblSelect").text();
		$("#pjd_op0").html(x);
		$("#tgd_op0").html(x);
		
		x = $(xml).find("lblIce").text();
		$("#pjd_op1").html(x);
		x = $(xml).find("lblPorRock").text();
		$("#pjd_op2").html(x);
		x = $(xml).find("lblDensRock").text();
		$("#pjd_op3").html(x);
		x = $(xml).find("lblIron").text();
		$("#pjd_op4").html(x);
		
		x = $(xml).find("lblWater").text();
		$("#tgd_op1").html(x);
		x = $(xml).find("lblSedRock").text();
		$("#tgd_op2").html(x);
		x = $(xml).find("lblIgRock").text();
		$("#tgd_op3").html(x);
		
		help_title = $(xml).find("help_title").text();
		help_text = $(xml).find("help_text").text();
		help_text2=  $(xml).find("help_text2").text();

		input_error_title = $(xml).find("input_error_title").text();
		input_error_diam = $(xml).find("input_error_diam").text();
		input_error_angle = $(xml).find("input_error_angle").text();
		input_error_vel = $(xml).find("input_error_vel").text();
		input_error_pjd = $(xml).find("input_error_pjd").text();
		input_error_tgd = $(xml).find("input_error_tgd").text();
		input_error_water = $(xml).find("input_error_water").text();
		

	}//==============================================
	

	
	//===============================================
	/**
	Called when the distance slider is moved to a new 
	value.
	**/
	//===============================================
	 function updateDistance() 
	 {
		distVal = $("#impactDist").slider("value");
		document.getElementById('DistanceAMT').innerHTML = distVal +' km';
	 }//==============================================
	 
	 //==============================================
	 /**
	 Called when the diamiter slider is moved to a new 
	 value.
	 **/
	//===============================================
	 function updateDiameter()
	 {
		diameterVal = $("#projDiam").slider("value");
		img = document.getElementById('Projectile_Img');
		var canvasPrj = document.getElementById('Projectile');
		
		
		document.getElementById('ProjectileValue').innerHTML = diameterVal +' m';
		
		var dv = diameterVal/10;
	
		//asteroidImg.css('height', diamiter)
		var y = (dv/13);
		var x =  (dv/13);
		var cY =  153.0;//canvasPrj.style.height;
		var cX =  131.0;//canvasPrj.style.width;
		
		
		centerImage(img, y, x, cY, cX);
		DrawDiamiterLine(dv,cX);
	 }//=============================================
	 
	 //================================================
	/**
	Draws the diamiter lines for the Asteroid diamiter.
	**/
	//================================================
	 function DrawDiamiterLine(width,cX)
	 {
	   var c=document.getElementById("ProjectileWidth");
	   var ctx=c.getContext("2d");
	   
	   canvasReset(ctx,c);
	   
	   width = width/13.0;
	   
	    var L = c.width/2 - width/2;
		var E = c.width/2 + width/2;
		
		
		ctx.moveTo(L-12,6.5);
		ctx.lineTo(E-12,6.5);
		
		ctx.lineWidth = 5;
		ctx.stroke();
	
	    ctx.drawImage(leftArrow, L-22, 0);
		ctx.drawImage(rightArrow, E-15, 0);
	 }//================================================
	 
	  //=============================================
	  /**
	  Provides the ability to center an image within a
	  absolute div.
	  @param img The image to be centered.
	  @param iy The native image height.
	  @param ix The native image width.
	  @param cY The canvas DIVs width.
	  @param cX The canvas DIVs height.
	  **/
	  //=============================================
	  function centerImage(img, iy, ix,cY,cX) 
	  {
		   	   
			   var x = ix;
			   var marx = cX/2 - x/2;
			   img.style.height = x+"px";
			   img.style.left = (marx) + "px";

			   var y = iy;
			   var mary = cY/2 - y/2;
			   img.style.width = y+"px";
			   img.style.top = (mary) + "px";
			
	  }//============================================
  
	//===============================================
	/**
	Resets a canvas clearing any path lines or images 
	presented. Any transforms are cleared then restored 
	so that the clearRect command does not itself become 
	transformed.
	**/
	//===============================================
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
	}//================================================
	




  
	 //=================================================
	 /**
	 Called when the angle slider is moved to a new 
	 value.
	 **/
	//===================================================
	 function updateAngle()
	 {
		var c=document.getElementById("Angle");
		var ctx=c.getContext("2d");
		
	    var angleVal = $("#projAngle").slider("value");
		var angleValI = 90- angleVal;//Invert value
		
		canvasReset(ctx,c);
		 
		ctx.save();
		ctx.translate(79,104);//translate to where pivot point is
		 
		//Convert degrees to radian 
		var rad = angleValI * Math.PI / 180;
		ctx.rotate(rad);//rotate context
		 
		ctx.drawImage(imgAngle,-7,-85);//draw image

		ctx.translate(-79, -104);//translate back
		ctx.restore();//restore state
		
		ctx.drawImage(imgAngleB, 55,104);//draw image
		
		ctx.font = '14pt Arial';
		
		if (angleVal >= 10)
			ctx.fillText(''+angleVal, 125, 40);
		else
			ctx.fillText(''+angleVal, 130, 40);
		ctx.font = '12pt Arial';
		
		if (angleVal >= 10)
			ctx.fillText('o', 150, 35);
		else
			ctx.fillText('o', 142, 35);
			
		tragAngleVal = angleVal;
		
	 }//=============================================
	 
	 //==============================================
	 /**
	 Called when the velocity slider is moved to a new 
	 value.
	 **/
	//===============================================
	var deg = 0;
	 function updateVelocity()
	 {
	 
		var c=document.getElementById("Speedo");
		var ctx=c.getContext("2d");
		
	    projVelVal = $("#projVel").slider("value");
		var r = 60 + projVelVal*3;
	
		ctx.drawImage(speedo,0,0);
		
		//Split speed into two values.
		var str = "" + projVelVal;
		var n1 = str.charAt(0);
		//ctx.drawImage(speedImgs[parseInt(n1)],60,105);
		
		 var img;
		if(str.length > 1)
		{	
			img = speedImgs[parseInt(n1)];
			//if(n1 != 9)
			ctx.drawImage(img,63,105);
			var n2 = str.charAt(1);
			img = speedImgs[parseInt(n2)];
			//if(n2 != 9)
			ctx.drawImage(img,73,105);
		}
		else
		{
			img = speedImgs[parseInt(n1)];
			//if(n1 != 9)
			ctx.drawImage(img,68,105);
		}
		

		 drawImageRot(speedNeedle,65,65,32,64,r,ctx);
		 ctx.restore();
		 
	 }//=============================================
	 
	 //==============================================
	 /**
	 Rotate an item on a canvas using rotate transforms.
	 @param img The image to rotate.
	 @param x The x coordinate of the image,
	 @param y The y coordinate of the image,
	 @param width The width of the image,
	 @param height The height of the image,
	 @param dex The rotation amount in degrees,
	 @param ctx The context on which to put the image.
	 */
	 //===============================================
	 function drawImageRot(img,x,y,width,height, deg,ctx)
	 {

			//Convert degrees to radian 
			var rad = deg * Math.PI / 180;

			//Set the origin to the center of the image
			ctx.translate(x + width / 2, (y + height / 2)-20);

			//Rotate the canvas around the origin
			ctx.rotate(rad);

			//draw the image    
			ctx.drawImage(img,width / 2 * (-1),((height / 2)-18) * (-1),width,height);

			//reset the canvas  
			ctx.rotate(rad * ( -1 ) );
			ctx.translate((x + width / 2) * (-1), ((y + height / 2)-20) * (-1));
	}//================================================
	
	
	
	//===============================================
	 /**
	 Rotate an item on a canvas using rotate transforms.
	 
	 TTHIS METHOD IS THE OROGINAL UNTOUCHED VERSION OF 
	 THE ABOVE METHOD. REMOVE IF UNEEDED.
	 
	 @param img The image to rotate.
	 @param x The x coordinate of the image,
	 @param y The y coordinate of the image,
	 @param width The width of the image,
	 @param height The height of the image,
	 @param dex The rotation amount in degrees,
	 @param ctx The context on which to put the image.
	 */
	 //===============================================
	function drawImageRotCenter(img,x,y,width,height,deg)
	{

	//Convert degrees to radian 
	var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image    
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    //reset the canvas  
    ctx.rotate(rad * ( -1 ) );
    ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
	}//==============================================
	
	 //=============================================
	 /**
	 Called when the target density list is selected.
	 **/
	 //=============================================
	 function selectTgDensity(tgList)
	 {
		var idx = tgList.selectedIndex;
		
		var tgImg =document.getElementById("TargetImage");
		 
		
		switch(idx)
		{
			case 1:
				document.getElementById('TargetFeature').style.display = "none";
				document.getElementById('WaterFeature').style.display = "block";
				updateWater();
				tgImg.src = tgd3.src;
				break;
			case 2:
				document.getElementById('TargetFeature').style.display = "block";
				document.getElementById('WaterFeature').style.display = "none";
				tgImg.src = tgd1.src;
				break;
			case 3:
				document.getElementById('TargetFeature').style.display = "block";
				document.getElementById('WaterFeature').style.display = "none";
				tgImg.src = tgd2.src;
				break;
			default:
				tgImg.src = imgBlank.src;
		}//end switch
		
		tgDens = idx;
	 }//============================================
	 
	 	 //=============================================
	 /**
	 Called when the target density list is selected.
	 **/
	 //=============================================
	 function selectTgDensity2(x)
	 {
		var idx = x;
		
		var tgImg =document.getElementById("TargetImage");
		 
		
		switch(idx)
		{
			case 1:
				document.getElementById('TargetFeature').style.display = "none";
				document.getElementById('WaterFeature').style.display = "block";
				updateWater();
				tgImg.src = tgd3.src;
				break;
			case 2:
				document.getElementById('TargetFeature').style.display = "block";
				document.getElementById('WaterFeature').style.display = "none";
				tgImg.src = tgd1.src;
				break;
			case 3:
				document.getElementById('TargetFeature').style.display = "block";
				document.getElementById('WaterFeature').style.display = "none";
				tgImg.src = tgd2.src;
				break;
			default:
				tgImg.src = imgBlank.src;
		}//end switch
		
		tgDens = idx;
	 }//============================================
	 
	  //=============================================
	 /**
	 Called when the target density list is selected.
	 **/
	 //=============================================
	 function selectPjDensity(pjList)
	 {
		var idx = pjList.selectedIndex;
		
	    var pjImg =document.getElementById("ProjectileImage");
		 
		switch(idx)
		{
			case 1:
				pjImg.src = pjd1.src;
				break;
			case 2:
				pjImg.src = pjd2.src;
				break;
			case 3:
				pjImg.src = pjd3.src;
				break;
			case 4:
				pjImg.src = pjd4.src;
				break;
			default:
				pjImg.src = imgBlank.src;
		}//end switch
		
		pjDens = idx;
	 }//============================================
	 
	 
	  //=============================================
	 /**
	 Called when the target density list is selected.
	 **/
	 //=============================================
	 function selectPjDensity2(x)
	 {
		var idx = x;
		
	    var pjImg =document.getElementById("ProjectileImage");
		 
		switch(idx)
		{
			case 1:
				pjImg.src = pjd1.src;
				break;
			case 2:
				pjImg.src = pjd2.src;
				break;
			case 3:
				pjImg.src = pjd3.src;
				break;
			case 4:
				pjImg.src = pjd4.src;
				break;
			default:
				pjImg.src = imgBlank.src;
		}//end switch
		
		pjDens = idx;
	 }//============================================
	 
	 //=============================================
	 /**
	 Whe the water slider has been moved.
	 **/
	 //=============================================
	 function updateWater()
	 {
		var c=document.getElementById("WaterVis");
		var ctx=c.getContext("2d");
		
	    var level = $("#wtr").slider("value");
		
		var val = (level/20)-13;
		
		ctx.drawImage(mntn, 0,0);
				
		var clp = 278-(level);
		
		ctx.drawImage(refl, 0  ,level,  343,   clp, 0,clp-155,343, clp);
		
		ctx.font = '600 12pt Arial';
		
		waterLevel = level *20;
		
		ctx.fillText(waterLevel+"m", 280, 24);
		
		
		
	 }//============================================
	 
	 //=============================================
	 /**
	 Validate the entry
	 **/
	 //=============================================
	 function validateAndSumbit()
	 {
		var passed = true;
		var msg = "";
	
	
		if (diameterVal <= 0)
		{
		    msg += "<li>" + input_error_diam + "</li>";
			passed = false;
		}
		
		if(tragAngleVal <= 0)
		{
			msg += "<li>" + input_error_angle + "</li>";
			passed = false;
		}
		
		if(projVelVal <= 0)
		{
			msg +="<li>" + input_error_vel + "</li>";
			passed = false;
		}
		
		if (pjDens <= 0)
		{
			msg+= "<li>" + input_error_pjd + "</li>";
			passed = false;
		}
		
		if(tgDens <= 0)
		{
			msg += "<li>" + input_error_tgd + "</li>";
			passed = false;
			
		}
		
		if (tgDens == 1)
		{
			if (waterLevel <= 0)
			{
				passed = false;
				msg +="<li>" + input_error_water + "</li>";
			}
		}
		
		
		if (passed == false)
		{
		//  alert("More Details Required","More Details Required/n/nTest");
		
		 $( "#dialog-modal" ).dialog({
			  height: 220,
			  modal: true	  
		});
		
		document.getElementById('dialog_text').innerHTML = "<ul>" + msg + "</ul>";
    	$("span.ui-dialog-title").text(input_error_title); 
		}
		else
		{
		//"results.html?dist=" + distVal +"&diam=" + diameterVal + "&trag=" + tragAngleVal + "&velo=" + projVelVal = "&pjd=" + pjDens + "&tjd=" + tgDens + "&wlvl=" + waterLevel
		  window.location = "results.html?lang=" + lang +"&dist=" +"&planet=" + planet +"&dist=" + distVal +"&diam=" + diameterVal + "&trag=" + tragAngleVal + "&velo=" + projVelVal + "&pjd=" + pjDens + "&tjd=" + tgDens + "&wlvl=" + waterLevel;
		}
	 }//===========================================
	 
	 //============================================
	 /**
	 Display the help window.
	 **/
	 //============================================
	 function help()
	 {
		 $( "#dialog-modal2" ).dialog({
			  height: 250,
			  modal: true	  
		});
		$("span.ui-dialog-title").text(help_title); 
		document.getElementById('dialog_text2').innerHTML = help_text + "<br/><br/>" + help_text2;
	 }//============================================
	 
	 //==============================================
	 /**
	 Resets all the input fields and globals.
	 **/
	 //============================================
	 function reset()
	 {
		$( "#impactDist" ).slider( "value", 0 );
		$( "#projDiam" ).slider( "value", 0 );
		$( "#projAngle" ).slider( "value", 90 );
		$( "#projVel" ).slider( "value", 0 );
		$( "#wtr" ).slider( "value", 0 );

		
		 $("#cpPjDens").val(0); 
		 $("#cpTgDens").val(0); 
		 
		
		selectTgDensity(document.getElementById("cpPjDens"));
		selectPjDensity(document.getElementById("cpTgDens"));
		
		distVal = 0;
		diameterVal = 0;
		tragAngleVal = 90;
		projVelVal = 0;
		pjDens = 0;
		tjDens = 0;
		waterLevel = 0;
		
		document.getElementById('TargetFeature').style.display = "block";
		document.getElementById('WaterFeature').style.display = "none";
		

	 }//============================================
	 


	var callOnce = 0;
	 //============================================
	 /**
	 JQuery initialisation event.
	 **/
	 //============================================
	$(function() 
	{
		if (callOnce > 0) return;
			initialise();
		callOnce++;
	
	});//=========================================
	
	//============================================
	/**
	Can be called at any time to initialise the controls
	to that specified in the URL params.
	**/
	//============================================
	function initialise()
	{

	  
		lang = getParameterByName("lang");
		if (lang == "") lang = "English";
		
		planet = getParameterByName("planet");
		if (planet == "") planet = "Earth";
		
		var param = getParameterByName("dist");
		if (param == "" ) distVal = 0;
		else distVal = parseInt(param);
		
		param = getParameterByName("diam");
		if (param == "") diameterVal = 0;
		else diameterVal = parseInt(param);
		
		param = getParameterByName("trag");
		if (param  == "") tragAngleVal  = 90;
		else tragAngleVal = parseInt(param);
		
		param = getParameterByName("velo");
		if (param == "") projVelVal = 0;
		else projVelVal = parseInt(param);
		
		param = getParameterByName("pjd");
		if (param == "") pjDens = 0;
		else pjDens = parseInt(param);
		
	    param = getParameterByName("tjd");
	    if (param == "") tgDens = 0;
		else tgDens = parseInt(param);
		
		//else tgDens++;
		param = getParameterByName("wlvl");
		if (param == "") waterLevel = 0;
		else waterLevel = parseInt(param);
		
		
		$.ajaxSetup({ cache: false });
		
		$.ajax({
		type: "GET",
		url: "lang/" + lang +".xml",
		dataType: "xml",
		success: parseXml
	  });
	  

		
		
		/**Add handlers for distance slider**/
		$( "#impactDist" ).slider({
		  orientation: "horizontal",
		  range: "min",
		  max: 500,
		  value: 0,
		  slide: updateDistance,
		  change: updateDistance
		});
		$( "#impactDist" ).slider( "value", distVal );
		
		/**Add handlers for diamiter slider**/
		$("#projDiam").slider({
		  orientation: "horizontal",
		  range: "min",
		  max: 15000,
		  value: 0,
		  step: 100,
		  slide: updateDiameter,
		  change: updateDiameter
		});
		$( "#projDiam" ).slider( "value", diameterVal );
		
		/**Add handlers for angle slider**/
		$("#projAngle").slider({
		  orientation: "horizontal",
		  range: "min",
		  max: 90,
		  value: 90,
		  slide: updateAngle,
		  change: updateAngle
		});
		$( "#projAngle" ).slider( "value", tragAngleVal);

		
		/**Add handlers for velocity slider**/
		$("#projVel").slider({
		  orientation: "horizontal",
		  range: "min",
		  max: 60,
		  value: 0,
		  slide: updateVelocity,
		  change: updateVelocity
		});
		$( "#projVel" ).slider( "value", projVelVal);
		
		  /**Add handlers for velocity slider**/
		$("#wtr").slider({
		  orientation: "horizontal",
		  range: "min",
		  max: 100,
		  value: 0,
		  slide: updateWater,
		  change: updateWater
		});
		$( "#wtr" ).slider( "value", waterLevel /20 );
		
		
		setSelectedIndex(document.getElementById("cpPjDens"), parseInt(pjDens)+1);
		setSelectedIndex(document.getElementById("cpTgDens"), parseInt(tgDens)+1);
		selectTgDensity2(parseInt(tgDens));
		selectPjDensity2(parseInt(pjDens));
		
		
		
		
		//updateWater();
	}//===========================================
	
	//============================================
	/**
	To pre select values in a comobo box.
	@param s The combo box to select.
	@param i The index to select;
	**/
	//============================================
	function setSelectedIndex(s, i)
	{
	 s.options[i-1].selected = true;
	  return;
	}//============================================
	
	//=============================================
	/**
	Displays the Acknowlegement dialog.
	**/
	//=============================================
	function displayACK()
	{

		
		 $( "#dialog-modal_ack" ).dialog({
			  height: 400,
			  width: 550,
			  modal: true	  
		});
	}//=============================================
//#################################################