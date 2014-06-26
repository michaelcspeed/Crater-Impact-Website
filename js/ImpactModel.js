
//###############################################################################
/**
 * This object holds the core data model for the crater impact application holding
 * data for target, projectile, calculated cater values, crater dimensions, 
 * fireball, Ejecta, Air Blast, Seismic activity and impact.
 * 
 * @author Andrew S Scott University of South Wales.
 * @version v1.0
 */
//###############################################################################
	
	//=========================================================================
	/**
	 * Constructor for the impact model which sets all values to zero.
	 */
	//=========================================================================
	function  ImpactModel() 
	{
		//target
		 this.tgDens= 0;
		 this.tgDepth = 0;
		 this.tgDist = 0;
		 this.tgType = 0;
		// Projectile
		 this.pjDens = 0;
		 this.pjVel = 0;
		 this.pjAngle = 0;
		 this.pjDiam = 0;
		 this.pjMass = 0;
		 this.pjEnergy = 0;
		// ---- Output variables
		// Crater calculated values
		 this.crHeight = 0;
		 this.crDiam = 0;
		 this.crDepth = 0;
		 this.crMass = 0;
		 this.crWatermass = 0;
		 this.crVol = 0;
		 this.crVolMelt = 0;
		 this.crBrecThick = 0;
		 // Transient crater dimensions
		 this.crTsDiam = 0;
		 this.crTsDepth = 0;
		// Fireball 
		 this.fbRadius = 0;
		 this.fbDuration = 0;
		 this.fbExposure = 0;
		 this.fbFlux = 0;
		 this.fbPeaktime = 0;
		 this.fbEnergy = 0;
		// Ejecta
		 this.ejFalltime = 0;
		 this.ejThickness = 0;
		 this.ejFragsize = 0;
		// Air blast
		 this.abAmpl = 0;
		 this.abWindvel = 0;
		 this.abOpressure = 0;
		 this.abDesc = "";
		 this.abShockTime = 0;
		 this.abAltBreak = 0;
		 this.abAltBurst = 0;
		// Seismic 
		 this.smRichter = 0;
		 this.smArrival = 0;
		 this.smEffMag = 0;
		 this.smDesc = "";
		// Impact
		 this.imEnergy = 0;
		 this.imMegaton = 0;
		 this.imFreq = 0;
		 this.imDesc = "";
		 this.imDist = 0;
		 this.imVel = 0;
	
	}//========================================================================
	
	//=========================================================================
	/**
	 * Resets all the model values to zero
	 */
	//=========================================================================
	ImpactModel.prototype.reset = function()
	{
			//target
		 this.tgDens=0;
		 this.tgDepth = 0;
		 this.tgDist = 0;
		 this.tgType = 0;
		// Projectile
		 this.pjDens = 0;
		 this.pjVel = 0;
		 this.pjAngle = 0;
		 this.pjDiam = 0;
		 this.pjMass = 0;
		 this.pjEnergy = 0;
		// ---- Output variables
		// Crater calculated values
		 this.crHeight = 0;
		 this.crDiam = 0;
		 this.crDepth = 0;
		 this.crMass = 0;
		 this.crWatermass = 0;
		 this.crVol = 0;
		 this.crVolMelt = 0;
		 this.crBrecThick = 0;
		 // Transient crater dimensions
		 this.crTsDiam = 0;
		 this.crTsDepth = 0;
		// Fireball 
		 this.fbRadius = 0;
		 this.fbDuration = 0;
		 this.fbExposure = 0;
		 this.fbFlux = 0;
		 this.fbPeaktime = 0;
		 this.fbEnergy = 0;
		// Ejecta
		 this.ejFalltime = 0;
		 this.ejThickness = 0;
		 this.ejFragsize = 0;
		// Air blast
		 this.abAmpl = 0;
		 this.abWindvel = 0;
		 this.abOpressure = 0;
		 this.abDesc = "";
		 this.abShockTime = 0;
		 this.abAltBreak = 0;
		 this.abAltBurst = 0;
		// Seismic 
		 this.smRichter = 0;
		 this.smArrival = 0;
		 this.smEffMag = 0;
		 this.smDesc = "";
		// Impact
		 this.imEnergy = 0;
		 this.imMegaton = 0;
		 this.imFreq = 0;
		 this.imDesc = "";
		 this.imDist = 0;
		 this.imVel = 0;
	
	}//=========================================================================
	
//##############################################################################
