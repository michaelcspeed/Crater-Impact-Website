	var str;
		
	function a()
	{
		getAllStringsA();
		
		
		
	}
	
	function b()
	{
	    var values = str.values();
		var keys = str.keys();
		
		for (var x = 0 ; x < 102;  x++)
		{
			document.writeln(x +" : " + keys[x] + ", " + values[x] + "<br/>");
		}
	}
	
	
	//==============================================================================
	/**
		Gets all string from the XML and stores in an HashMap implimentation called 
		str, via the method parseXml.
	**/
	//==============================================================================
	function getAllStringsA()
	{	
		$.ajax({
		type: "GET",
		url: "lang/" + "English" +".xml",
		dataType: "xml",
		success: parseXmlA
	  });
	}//============================================================================
	
	//=============================================================================
	/**
	Parse the XML file and load all into a hashmap
	**/
	//============================================================================
	function parseXmlA(xml)
	{
		str = new HashMap();

		var fields = ['btStart','lblTitle','lblLanguage','lblTranslation','cmdHelp','inputs','result','lblAstDiam','lblValue','lblWater','lblSedRock','lblIgRock','lblIce','lblPorRock','lblDensRock','lblIron','txtWaterDepth','btSubmit','lblObVelocity','lblSelect','lblSphinx','lblBen','lblEiffel','lblEmpireSt','lblCN','lblBurj','lblImpactVal','lblClickMap','cvsData','cvsSize','cvsDepth','btBack','btReset','lbCrater','htParameter','htValue','lblDistance','lblInVals','pnlResults','lblCrDepth','lblLandmark','lblImpEnergy','lblWhatthis.impactor','lblFireball','lbKE','lbImE','lbImM','lbPjVel','lbPjAng','lbTgDens','lbPjDens','lbCrDiam','lbCrDepth','lbCrThickness','lbAbBurst','lbAbBreak','lbAbVel','lbAbRichter','lbAbAmpl','lbFbRad','lbFbDuration','lbFbExp','lbFbPeaktime','lbNoData','lbFreq','lbAcknow','hide','lbAuthor','lbBased','projectile1','projectile2','projectile3','projectile4','projectile5','projectile6','projectile7','expos1','expos2','expos3','expos4','expos5','expos6','expos7','expos8','opress1','opress2','opress3','opress4','opress5','opress6','opress7','opress8','opress9','opress10','opress11','opress12','opress13','opress14','incrater','showCrater','hideCrater','damage1','damage2'];

			
		for (var i = 0; i < fields.length;i++)
		{
		    var x = $(xml).find(fields[i]).text();
			str.put(fields[i],x);
		}//for
		
		b();
		
		
	}//==========================================================================