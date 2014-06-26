//###########################################################################
/**
 * Provides a link between the underlying calculation and the front end UI
 * features. All communication with the back end is done though this class.
 * It is also the class to go though when getting the results of an impact.
 * 
 * In this class are a collection of getter and setter methods which should 
 * erface with the UI. 
 * 
 */
//###########################################################################

function DataProvider()
{

	
	this.LANGUAGE_UK = "uk";/**For UK locale**/
	this.LANGUAGE_DE = "de";/**For German locale**/
	this.LANGUAGE_FR = "fr";/**For French locale**/
	this.LANGUAGE_PL = "pl";/**For Polish locale**/
	this.LANGUAGE_SP = "sp";/**For Spanish locale**/
	this.LANGUAGE_CY = "cy";/**For Welsh locale**/
	
	this.selected_language;
	
	this.latitude;
	this.longitude;
	
	//Input fields//
	this.cbPjDens;/**Projectile Density selected index (combo box in ui)**/
	this.cbTgDens;/**Target Density selected index (combo box in ui)**/
	this.slTgDepth;/**Selected depth when water is the target (slider in ui)**/
	this.cbSelectDepthObject;/**Not actually crater depth but selected landmark on Crater depth screen (a como box)**/
	
	this.cbLocation;/**The selected location if a default location is selected**/
	
	this.projDiam;/**Projectile Diamiter**/
	this.projAngle;/**Projectile Angle**/
	this.projVel;/**Projectile velolcity**/
	this.impactDist;/**Distance from Impact**/
	
	//Output Fields//
	this.txtDamage;/**Description of damage caused by seismic activity**/
	this.txtImpactor;/**Description of the impact**/
	
	//Outputs for Results Tables in key value pairs//
	this.dgInputs;/**The values input HMAP**/
	this.dgOutputs;/**The core of the calculated results HMAP**/
	this.dgEnergy;/**Energy created by impact HMAP**/
	this.dgFirevall;/**Fire ball results HMAP**/
	
	this.impactor;/**The populated impact data model**/


	
/**
	 * Sets the projectile density selected index.
	 * @return An  value.
	 */
	this.getCbPjDens = getCbPjDens;
	function getCbPjDens() {
		return this.cbPjDens;
	}

	/**
	 * Sets the projectile density selected index.
	 * @param cbPjDens An .
	 */
	this.setCbPjDens = setCbPjDens;
	function setCbPjDens( cbPjDens_) {
		this.cbPjDens = cbPjDens_;
	}

	/**
	 * Gets the target density selected index.
	 * @return An  value.
	 */
	this.getCbTgDens = getCbTgDens;
	function getCbTgDens() {
		return this.cbTgDens;
	}

	/**
	 * Sets the target density selected index.
	 * @param cbTgDens An  value.
	 */
	 this.setCbTgDens = setCbTgDens;
	function setCbTgDens( cbTgDens_) {
		this.cbTgDens = cbTgDens_;
	}

	/**
	 * Gets the selected depth for when water is the target.
	 * @return Stored as an eger.
	 */
	 this.getSlTgDepth = getSlTgDepth;
	function  getSlTgDepth() {
		return this.slTgDepth;
	}

	/**
	 * Sets the selected depth when water is the target.
	 * @param slTgDepth The depth as an eger value.
	 */
	 this.setSlTgDepth = setSlTgDepth;
	function setSlTgDepth( slTgDepth_) {
		this.slTgDepth = slTgDepth_;
	}

	/**
	 * Gets the textual description of the damage caused by the impact.
	 * @return A description contained in a .
	 */
	 this.getTxtDamage = getTxtDamage;
	function  getTxtDamage() {
		return this.txtDamage;
	}

	/**
	 * Sets the text describing the damage caused by the 
	 * impact.
	 * @param txtDamage A  containing the description.
	 */
	 this.setTxtDamage = setTxtDamage;
	function setTxtDamage( txtDamage_) {
		this.txtDamage = txtDamage_;
	}

	/**
	 * Gets the textual description of the impact.
	 * @return A  containing the description.
	 */
	 this.getTxtImpactor = getTxtImpactor;
	function  getTxtImpactor() {
		return this.txtImpactor;
	}

	/**
	 * Sets the textual description of the impact.
	 * @param txtImpactor The description in a .
	 */
	 this.setTxtImpactor = setTxtImpactor;
	function setTxtImpactor( txtImpactor_) {
		this.txtImpactor = txtImpactor_;
	}

	/**
	 * Gets the HashMap containing the titles and values of the data 
	 * originally input by the various UI elements of the application.
	 * @return The HashMap of inputs in title, value pairs.
	 */
	 this.getDgInputs = getDgInputs;
	function  getDgInputs() {
		return this.dgInputs;
	}

	/**
	 * Sets the HashMap containing the titles and values of the data originally 
	 * input by the various UI elements of the application.
	 * @param dgInputs The HashMap of inputs in title, value pairs.
	 */
	 this.setDgInputs = setDgInputs;
	function setDgInputs( dgInputs_) {
		this.dgInputs = dgInputs_;
	}

	/**
	 * Gets the HashMap contain the core calculated data about the
	 * impact. The data is stored in title, values pairs.
	 * @return The HashMap containing the data.
	 */
	 this.getDgOutputs = getDgOutputs;
	function getDgOutputs() {
		return this.dgOutputs;
	}

	/**
	 * Sets the results output Hashmap. The results are stored in title 
	 * value pairs.
	 * @param dgOutputs The Hashmap of the core calculated data.
	 */
	 this.setDgOutputs = setDgOutputs;
	function setDgOutputs(dgOutputs_) {
		this.dgOutputs = dgOutputs_;
	}

	/**
	 * Gets a HashMap of impact energy data. It is stored in title, value pairs.
	 * @return The HashMap containing the data.
	 */
	 this.getDgEnergy = getDgEnergy;
	function getDgEnergy() {
		return this.dgEnergy;
	}

	/**
	 * Set the HashMap of impact energy data. It is stored in title value pairs.
	 * @param dgEnergy The HashMap of engergy data.
	 */
	 this.setDgEnergy = setDgEnergy;
	 function setDgEnergy( dgEnergy_) {
		this.dgEnergy = dgEnergy_;
	}

	/**
	 * Gets the HashMap of the fire ball data which contastitle value pairs.
	 * @return The HashMap of fire ball data.
	 */
	 this.getDgFirevall = getDgFirevall;
	function getDgFirevall() {
		return this.dgFirevall;
	}

	/**
	 * Set the FireWall HasMap containing fireball data in title value pairs/
	 * @param dgFirevall HashMap of fireball data.
	 */
	 this.setDgFirevall = setDgFirevall;
	function  setDgFirevall( dgFirevall_) {
		this.dgFirevall = dgFirevall_;
	}

	/**
	 * Get the impactor model object 
	 * @return The impactor model object.
	 */
	 this.getImpactor = getImpactor;
	function getImpactor() {
		return this.impactor;
	}

	/**
	 * Set the impactor data model object.
	 * @param impactor The impactor object.
	 */
	 this.setImpactor = setImpactor;
	function setImpactor(impactor_) {
		this.impactor = impactor_;
	}

	/**
	 * Get the selected projectile diameter
	 * @return
	 */
	 this.getProjDiam = getProjDiam;
	function  getProjDiam() {
		return this.projDiam;
	}

	/**
	 * Set the projectile diameter
	 * @param projDiam
	 */
	 this.setProjDiam = setProjDiam;
	function setProjDiam( projDiam) {
		this.projDiam = projDiam;
	}

	/**
	 * Get the projectile angle.
	 * @return
	 */
	 this.getProjAngle = getProjAngle;
	function  getProjAngle() {
		return this.projAngle;
	}

	/**
	 * Set the projectile angle.
	 * @param projAngle
	 */
	 this.setProjAngle = setProjAngle;
	function setProjAngle( projAngle) {
		this.projAngle = projAngle;
	}

	/**
	 * Get the projectile velocity.
	 * @return
	 */
	 this.getProjVel = getProjVel;
	function  getProjVel() {
		return this.projVel;
	}

	/**
	 * Set the projectile velocity.
	 * @param projVel
	 */
	 this.setProjVel = setProjVel;
	function setProjVel( projVel) {
		this.projVel = projVel;
	}

	/**
	 * Get the distance from impact.
	 * @return
	 */
	 this.getImpactDist = getImpactDist;
	function  getImpactDist() {
		return this.impactDist;
	}

	/**
	 * Set the distance from impact.
	 * @param impactDist
	 */
	 this.setImpactDist = setImpactDist;
	function setImpactDist( impactDist) {
		this.impactDist = impactDist;
	}

	/**
	 * Get the selected depth
	 * @return
	 */
	 this.getCbSelectDepthObject = getCbSelectDepthObject;
	function  getCbSelectDepthObject() {
		return this.cbSelectDepthObject;
	}

	/**
	 * Set the selected depth 
	 * @param cbSelectDepthObject
	 */
	 this.setCbSelectDepthObject = setCbSelectDepthObject;
	function setCbSelectDepthObject( cbSelectDepthObject) {
		this.cbSelectDepthObject = cbSelectDepthObject;
	}
	
	
	/**
	 * Gets the selected location id. The id is an eger that related to the selected place.
	 * @return The selected place type as an eger.
	 */
	 this.getCbLocation = getCbLocation;
	function  getCbLocation() {
		return this.cbLocation;
	}

	
	/**
	 * Gets the he map latitude.
	 * @return A .
	 */
	 this.getLatitude = getLatitude;
	function  getLatitude() {
		return this.latitude;
	}

	/**
	 * Sets the map latitude..
	 * @param latitude A .
	 */
	 this.setLatitude = setLatitude;
	function setLatitude( latitude) {
		this.latitude = latitude;
	}

	/**
	 * Gets the map longitude.
	 * @return A .
	 */
	 this.getLongitude = getLongitude;
	function  getLongitude() {
		return this.longitude;
	}

	/**
	 * Sets the map longitude.
	 * @param longitude A .
	 */
	 this.setLongitude = setLongitude;
	function setLongitude( longitude) {
		this.longitude = longitude;
	}

	/**
	 * Sets the selected location id. The id is an eger that related to the selected place.
	 * zero indicates no selection.
	 * @param The new selected place type as an eger.
	 */
	 this.setCbLocation = setCbLocation;
	function setCbLocation( cbLocation) {
		this.cbLocation = cbLocation;
	}

	/**
	 * Though this method the back end will instruct the front end to display
	 * an alert with a title and alert text.
	 * @param desc The alert descriptive text.
	 * @param title The alert title.
	 */
	this.displayAlert = displayAlert;
	function displayAlert( desc,  title)
	{
		//Michael you need to code this bit to link this with
		//what ever UI you decide to build.
	}

	/**
	 * Gets the currently selected language instance.
	 * @return
	 */
	 this.getSelected_language = getSelected_language;
	function getSelected_language() {
		return this.selected_language;
	}

	/**
	 * Sets the selected language and also updates the locale via the
	 * contol class.
	 * @param selected_language
	 */
	 this.setSelected_language = setSelected_language;
    function setSelected_language( selected_language_) 
	{
		selected_language = selected_language_;
	}
		
}//###########################################################################
