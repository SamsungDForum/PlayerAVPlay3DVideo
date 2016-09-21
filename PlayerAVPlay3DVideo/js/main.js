/* 
 * Methods use shows below:
 * open : This method instantiates the player object and take input url as input paramter.
 * prepare: This method prepare the media player for playback. 
 * Player must have been created before this with a valid URI.
 * setDisplayRect:This method sets the display area for playing video content on TV screen
 * play: This method starts the playback of the stream.
 * close:This method destroys the avplay object.
 * 
 */

//Check supported 3D mode
tizen.tvdisplaycontrol.getSupported3DEffectModeList(function(e){
	if(e.length > 0){
		document.getElementById("supported").innerHTML = "3D is supported";
	}else{
		document.getElementById("supported").innerHTML = "3D is not supported";
	}
});

/**
 * This object is used in order to obtain the Buffering, 
 * Playback Time, Playback mode, DRM mode information etc. * 
 */
var listener = {
	onbufferingstart : function() {
		console.log("Buffering start.");
	},
	onbufferingprogress : function(percent) {
		console.log("Buffering progress data : " + percent);
	},
	onbufferingcomplete : function() {
		console.log("Buffering complete.");
	},
	oncurrentplaytime : function(currentTime) {
		console.log("Current Playtime : " + currentTime);
	},
	onevent : function(eventType, eventData) {
		console.log("event type : " + eventType + ", data: " + eventData);
		console.log(eventType);
		console.log(eventData);
	},
	onerror : function(eventType) {
		console.log("error type : " + eventType);
		console.log(eventType);
	},
	onsubtitlechange : function(duration, text, data3, data4) {
		console.log("Subtitle Changed.");
	},
	ondrmevent : function(drmEvent, drmData) {
		console.log("DRM callback: " + drmEvent + ", data: " + drmData);
	},
	onstreamcompleted : function() {
		console.log("Stream Completed");
		//You should write stop code in onstreamcompleted.
		webapis.avplay.pause();
		webapis.avplay.seekTo(0);
	}
};


var playMVC = function() {
	//MVC encoding can be played with same code with 2D contents. Just play
	webapis.avplay.close();
	//Write URL of your test media
	webapis.avplay.open("Write URL of MVC codec");
	webapis.avplay.setListener(listener);
	webapis.avplay.prepare();
	var avPlayerObj = document.getElementById("av-player");	
	webapis.avplay.setDisplayRect(avPlayerObj.offsetLeft, avPlayerObj.offsetTop, avPlayerObj.offsetWidth, avPlayerObj.offsetHeight);
	webapis.avplay.play();
}

var playSideBySide = function() {
	webapis.avplay.close();
	tizen.tvdisplaycontrol.getSupported3DEffectModeList(function(e){
		if(e.length > 0){
			//Write URL of your test 3D media
			webapis.avplay.open("Write URL of side by side");				
		}else{
			//Write URL of your test 2D media
			webapis.avplay.open("Write URL of side by side");				
		}
		webapis.avplay.setListener(listener);	
		
		if(e.length > 0){
			//If TV support 3D media			
			//setStreamingProperty should be done for non-MVC encoding
			//setStreamingProperty should be done before prepare
			webapis.avplay.setStreamingProperty("SET_MODE_3D", "MODE_3D_EFFECT_SIDE_BY_SIDE");				
		}		
		
		webapis.avplay.prepare();
		var avPlayerObj = document.getElementById("av-player");	
		webapis.avplay.setDisplayRect(avPlayerObj.offsetLeft, avPlayerObj.offsetTop, avPlayerObj.offsetWidth, avPlayerObj.offsetHeight);
		webapis.avplay.play();
	});
}