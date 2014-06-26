
//##########################################################
/**
 A set of methods that define the functionality of the 
 language selection screen.
**/
//##########################################################
	var seletedButton;/**The selected button**/
	
	var buttons = new Array();/**The array of language buttons**/
	var buttonsSel = new Array();/**The selected button array**/
	var buttonCount = 0;/**The number of buttons added**/
	
	var onMouseOverColor = '#bbeeff';/**Color state for mouse over**/
	var onMouseOutColor = 'transparent';/**Color state for mouse out*/
	var onOnSelectedMouseOverColor = '#FFdd00';/**Color state for selected mouse over.**/
	var onSelectedColor = '#FFbb00';/**Color state for selected**/
	
	var brz_wrn = "Your  internet browser does not support the HTML5 features required for Crater Impact. Consider installing one of the following bowsers.";
	
	//================================================================
	/**
	 Select a language based on its name.
	**/
	//================================================================
	function lang(name)
	{
		$.ajax({
		type: "GET",
		url: "lang/" + name +".xml",
		dataType: "xml",
		success: parseXml2
	  });
	}//===============================================================

	//================================================================
	/**
	*Called when the HTML document is loaded and ready.
	**/
	//================================================================
	$(document).ready(function()
	{

	  $.ajaxSetup({ cache: false });
		 
	  $.ajax({
		type: "GET",
		url: "lang/English.xml",
		dataType: "xml",
		success: parseXml
	  });
	  
	     var browserHeight = $(window).height();
		if( browserHeight < 600)
		{
			document.getElementById('header').style.display = 'none';
			document.getElementById('footer').style.display = 'none';
		}
		/*
		document.getElementById('uk').bgColor="transparent";
		document.getElementById('cy').bgColor="transparent";
		document.getElementById('gr').bgColor="transparent";
		document.getElementById('es').bgColor="transparent";
		document.getElementById('fr').bgColor="transparent";
		document.getElementById('pl').bgColor="transparent";
		*/
		
		document.getElementById('uk').style.background="transparent";
		document.getElementById('cy').style.background="transparent";
		document.getElementById('gr').style.background="transparent";
		document.getElementById('es').style.background="transparent";
		document.getElementById('fr').style.background="transparent";
		document.getElementById('pl').style.background="transparent";
		
	});//=============================================================

	//================================================================
	/**
	Parse the XML for this page
	**/
	//================================================================
	function parseXml(xml)
	{
		var x = $(xml).find("btStart").text();
		$("#StartButton").html(x);
		
		if (isCanvasSupported())
		{
			document.getElementById('StartButton').style.display = "block";
			document.getElementById('lang_warn').style.display = "none";
		}
		else
		{
			document.getElementById('StartButton').style.display = "none";
			document.getElementById('lang_warn').style.display = "block";
		}
	}
	//================================================================
	
	
	//================================================================
	/**
	Parse the XML for this page
	**/
	//================================================================
	function parseXml2(xml)
	{
		var x = $(xml).find("btStart").text();
		$("#StartButton").html(x);
		brz_wrn = $(xml).find("brz_warn").text();
		$("#lang_warn").html(brz_wrn);
		
		if (isCanvasSupported())
		{
			document.getElementById('StartButton').style.display = "block";
			document.getElementById('lang_warn').style.display = "none";
		}
		else
		{
			document.getElementById('StartButton').style.display = "none";
			document.getElementById('lang_warn').style.display = "block";
		}
		
	//	$(xml).find("lblTitle"){};
	//	$(xml).find("lblLanguage"){};
	}
	//================================================================
	
	//===================================================
	/**
	Stores the parameterised button in the array list of 
	language buttons so that selection, highlightng and 
	mouse over effects can be controlled.
	@param cell The button to be stored.
	**/
	//===================================================
	function storeButton( cell)
	{
	
		if (!containsObject(cell, buttons))
		{
			buttons[buttonCount] = cell;
			buttonsSel[buttonCount] = false;
			buttonCount++;
			x =  buttons.length;
		}//end if
		
	}//==================================================
	
	//===================================================
	/**
	Checks if the array ontains an object and returns a 
	true or false result.
	@param obj The object to check.
	@param list The array potentially containing obj.
	@return a True or False result.
	**/
	//===================================================
	function containsObject(obj, list) 
	{
		var i;
		for (i = 0; i < list.length; i++) {
			if (list[i] === obj) {
				return true;
			}//end if
		}//end for

    return false;
   }//====================================================
   
    //====================================================
	/**
	Clears any selection and mouse over states from all 
	stored buttons.
	**/
	//====================================================
	function clearButtons()
	{
		selectedButton = null;
		for (i = 0; i < buttons.length;i++)
		{   
			var but = buttons[i];
			but.style.background= onMouseOutColor;
			buttonsSel[i] = false;
		}//end for
	}//===================================================
	
	//=====================================================
	/**
	On mouse over of a button add it to the store of buttons 
	and change its colour to mouseOver if not one of the 
	selected buttons. If a selected button change its colour 
	to SelectedMouseOver color.
	@parm cell The cell for which this mouse over applies.
	**/
	//=====================================================
	function langMouseOver(cell)
	{
		storeButton(cell);
		
		var b = buttons.indexOf(cell);
		
		if (buttonsSel[b] != true)
			cell.style.background = onMouseOverColor;
		else
			cell.style.background= onOnSelectedMouseOverColor;
		
	}//===================================================
	
	//=====================================================
	/**
	On mouse out change the colour of the button to the 
	mouse out state.
	@param cell The cell for which this event applies.
	**/
	//=====================================================
	function langMouseOut(cell)
	{
		var x = buttons.length;
		var b = buttons.indexOf(cell);
		
		if (buttonsSel[b] != true)
			cell.style.background= onMouseOutColor;
		else
			cell.style.background= onSelectedColor;
		
		
	}//====================================================
	
	//=====================================================
	/**
	On mouse click apply a clicked state colour to the cell.
	@param The cell for which this event applies.
	**/
	//=====================================================
	function langMouseClick(cell,langName)
	{
		clearButtons();
		var i = buttons.indexOf(cell);
		
		buttonsSel[i] = true;
		cell.style.background= onOnSelectedMouseOverColor;
		selectedButton = cell;
		
		lang(langName);
		
	}//=====================================================
	
	//=======================================================
	/**
	Called when the start button is pressed to change is 
	colour state. 
	@param button The button for which this event applies.
	**/
	//=======================================================
	function startMouseDown(button)
	{
		button.className = 'StartButtonClicked';
	}//======================================================
	
	//=======================================================
	/**
	Called when the mouse moves out the bounds of the start 
	button to change its state to an on selected one.
	@param button The button for which this event applies.
	**/
	//=======================================================
	function startOnMouseOut(button)
	{
		button.className ='StartButton';
	}//======================================================
	
	//========================================================
	/**
	Called when the mouse is clicked up on the start component.
	Establishes the selected language and passes this to the
	next screen.
	**/
	//========================================================
	function startOnMouseUp()
	{
		if (typeof selectedButton !== 'undefined')
		{
			if ( selectedButton != null)
			{
			 //Get selected item and determine selected language
			 var lang = selectedButton.className;
			
			
			 window.location ="planet.html?lang=" + lang;
			//Launch next screen and pass selected language to it.
		
			}//end if
		}//end if
	}//======================================================
	
	//========================================================
	/**
	Returns true of the browser supporte the Canvas feature
	**/
	//========================================================
	function isCanvasSupported()
	{
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    }//=======================================================
	
	//=========================================================
	/**
	Check browser support for canvas.
	**/
	//=========================================================
	function isCanvasSupported()
	{
		var elem = document.createElement('canvas');
		return !!(elem.getContext && elem.getContext('2d'));
	}//========================================================
	
	//=========================================================
	/**
	Displays the Acknowlegement dialog.
	**/
	//=========================================================
	function displayACK()
	{

		 $( "#dialog-modal_ack" ).dialog({
			  height: 400,
			  width: 550,
			  modal: true	  
		});
	}//=======================================================
//#############################################################