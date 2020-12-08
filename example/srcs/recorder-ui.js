/**
 * Load different JS library and callback when fully loaded
 * @param {string} src The path of the script (can be relative or absolute)
 * @param {Function} cb Callback, function to launch when loaded
*/
/*function loadJS(src, cb) {
	let ref = document.getElementsByTagName("script")[0];
	let script = document.createElement("script");

	script.src = src;
	ref.parentNode.insertBefore(script, ref);

	if (cb && typeof(cb) === "function") {
		//script.onerror = onScriptLoadFail(script.src);
		script.onload = cb;
	}
	return script;
}*/

function onScriptLoadFail(scriptSrc) {
	alert("The script at this address: " + scriptSrc + " failed to load. Please check your internet connection or if the script exist");
}

/**
 * Turn milliseconds to minutes and seconds in the following format:
 * '00:00'
 * @param {integer} millis n// Restore the style and onclick of recordButtonumber of millis to convert
 */
function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
  
/**
 * Compute time in minute and second between two rrweb events.
 * Compute doing firstFrame - secondFrame
 * @param {rrweb-event} firstFrame The first frame
 * @param {rrweb-event} secondFrame The second frame
 * @returns {string} String in the format "00:00"
 */
 function computeTimeBetweenTwoFrames(firstFrame, secondFrame) {
	logger("Recording time is event[last] - event[0] = " + (firstFrame.timestamp - secondFrame.timestamp));
  	logger("Aka " + millisToMinutesAndSeconds(firstFrame.timestamp - secondFrame.timestamp) + " mn and secs");
  	return millisToMinutesAndSeconds(firstFrame.timestamp - secondFrame.timestamp);
}
  
/**
 * Change the size of the ma// Restore the style and onclick of recordButtoninDiv
 * @param {integer} newWidthInPx The will that will be added to the current width
 * @param {integer} newHeightInPx The new height that will be added to the current height
 */
function changeMainDivSize(newWidthInPx, newHeightInPx) {
	mainDivSize.width += newWidthInPx;
 	mainDivSize.height += newHeightInPx;
 	mainDiv.style.width = mainDivSize.width + "px";
 	mainDiv.style.height = mainDivSize.height + "px";
}
  
/**
 * Check if log has been activated and print stringLog if so.
 * @param {string} String to print if log is activated.
 */
function logger(stringLog){
	//if (config_ui.debug)
		console.log("generic-rrweb-recorder: " + stringLog);
}

/**
 * 
 * @param {string} path The path of the external document 
 * @param {boolean} isURL Is the path should be returned as url (for CSS rules)
 * @returns Return the string with the right path
 */
function getRightLibPath(config, path, isURL) {
	if (isURL) return "url(" + config.libPath + path + ")";
	else return config.libPath + path;
}

/**
 * Increase size of the mainDiv and make visible pause Button
 */
/*function openMenu() {
	if (isDragged == false) {
		if (!isMenuOpen) {
			changeMainDivSize(80, 0);
			if (!isPauseButtonCreated) {
				isPauseButtonCreated = true;
				
			} else { pauseButton.show(); }
			isMenuOpen = true;
		} else {
			pauseButton.hide();
			changeMainDivSize(-80, 0);
			isMenuOpen = false;
		}
	}
}*/

/**
 * Show the buttons depending on recorder state.
 */
function maximizeAllElements() {
	if (isDragged == false) {
		minimizeButton.style.backgroundImage = getRightLibPath('media/recorder/minimize32.png', true);
		recordButton.show();
		if (recorderState == "RECORDING") {
			pauseButton.show();
		} else if (recorderState == "STOPPED") {
			postEdButton.show();
			downButton.show();
		}
		minimizeButton.onclick = minimizeAllElements;
	}
}

/**
 * Hide the buttons depending on recorder state.
 */
function minimizeAllElements() {
	if (isDragged == false) {
		minimizeButton.style.backgroundImage = getRightLibPath('media/recorder/maximize32.png', true);
		recordButton.hide();
		if (recorderState == "RECORDING") {
			pauseButton.hide();
		} else if (recorderState == "STOPPED") {
			postEdButton.hide();
			downButton.hide();
		}
		minimizeButton.onclick = maximizeAllElements;
	}
}

/**
 * This function create the minimize button.
 * @returns Return the button created
 */
function displayMinimizeButton() {
	let button = document.createElement("button");
	button.onclick = minimizeAllElements;
	button.id = "rrweb-minimizeButton";
	button.style.backgroundImage = getRightLibPath('media/recorder/minimize32.png', true);;
	button.title = "Minimize the icons";
	button.classList.add("rrweb-Buttons");
	mainDiv.appendChild(button);
	return button;
}

/**
 * Set the button position according to user config
 * @param {Object} button The object to apply the style to
 */
function buttonPosition(config, button) {
	if (config.position.search("bottom") > -1)
		button.style.bottom = "50px";
	if (config.position.search("top") > -1)
		button.style.top = "50px";
	if (config.position.search("middle") > -1)
		button.style.top = "50px";
	if (config.position.search("-right") > -1)
		button.style.right = "50px";
	if (config.position.search("-left") > -1)
		button.style.left = "50px";
}

/**
 * Allow to detect if the div is dragged or clicked
 */
function finishDragging() {
	isDragged = false;
}

/**
 * The goal of this function is to make an element movable with mouse
 * @param {string} element The element id
 */
function makeElementMovable(element, mainDivSize) {
	//Make the button element draggable:
	dragElement(element);

	function dragElement(elmnt) {
        logger("Make element draggable");
		var pos1 = 0, pos2 = 0, mouseX = 0, mouseY = 0;
		let isClick = true;
		if (document.getElementById(elmnt.id + "header")) {
			/* if present, the header is where you move the element from:*/
			document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
		} else {
			elmnt.onmousedown = dragMouseDown;
		}

		/**
		 * Change the behaviour when the mouse is down
		 * @parent {event} The event when triggered
		 */
		function dragMouseDown(e) {
			isDragged = true;
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			mouseX = e.clientX;
			mouseY = e.clientY;
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
		}

		/**
		 * Compute the new element position and put it at the right place
		 * @parent {event} The event when triggered
		 */
		function elementDrag(e) {
			// If this function is called, then this it not a "click"
			isClick = false;
			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			pos1 = mouseX - e.clientX;
			pos2 = mouseY - e.clientY;
			mouseX = e.clientX;
			mouseY = e.clientY;
			// set the element's new position, only if not going out of the window:
			if (elmnt.offsetLeft - pos1 >= 0 && (elmnt.offsetLeft + mainDivSize.width) - pos1 < window.screen.width
				&& elmnt.offsetTop - pos2 >= 0 && (elmnt.offsetTop + mainDivSize.width) - pos2 < window.screen.height) {
				elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
			}
		}

		/**
		 * End the drag
		 * @parent {event} The event when triggered
		 */
		function closeDragElement() {
			/* stop moving when mouse button is released:*/
			document.onmouseup = null;
			document.onmousemove = null;
			// we add a "delay" to prevent misclick while dragging
			// ONLY if elementDrag is not called (Because the mouse is not moving)
			isClick ? finishDragging() : setTimeout(finishDragging, 300);
			isClick = true;
		}
	}
}

/**
 * Create base div containing recorder, pause, resume, stop and downloader
 * buttons.
 * @param {string} mainDivId Specify the div id
 * @return {Object} Return the object of the div, allowing to be modifiable
 */
function createBaseDiv(mainDivId) {
	var mainDiv = document.createElement("div");
	mainDiv.classList.add("rr-block");
	mainDiv.id = mainDivId;
	document.body.appendChild(mainDiv);
	return mainDiv;
}

/*function isScriptLoaded(src) {
    return document.querySelector('script[src="' + src + '"]') ? true : false;
}*/

/**
 * Load CSS file from path given
 * @param {string} path The path for the css file to load
 */
function loadCss(path) {
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = path;
	link.media = 'all';
	head.appendChild(link);
	logger("Loaded Css !");
}

/**
 * Launch the audio and screen record
 */
function startRecord(buttons, recorder) {
	if (!isDragged) {
		console.log("Recording has started! ");
		//Check if edit and download buttons are visible
		/*if (buttons.postEdButton && buttons.postEdButton.isVisible())
			buttons.postEdButton.hide();*/
		if (buttons.downButton && buttons.downButton.isVisible())
			buttons.downButton.hide();

		recorder.startRecord();

		buttons.recordButton.id = "rrweb-stopButton";
		
		buttons.recordButton.onclick = function() {
			stopRecord(buttons, recorder);
		};

		buttons.pauseButton.show();

		// Let's create the minimize button. as this is not a normal button, we cannot create it with 
		// the button class
		//buttons.minimizeButton = displayMinimizeButton();
	}
}

/**
 * When the record is in pause make appear the range bar
 */
function pauseRecord(buttons, recorder) {
	if (!isDragged) {
		recorder.pauseRecord();
		buttons.pauseButton.id = "rrweb-resumeButton";
		buttons.pauseButton.onclick = function() {
			resumeRecord(buttons, recorder);
		};
	}
}

/**
 * Resume the record
 * This function is very similar to {@link launchRecord}, excepted we do not
 * need to check for permissions, they should be granted
 */
function resumeRecord(buttons, recorder) {
	if (!isDragged) {
		recorder.resumeRecord();
		buttons.pauseButton.id = "rrweb-pauseButton";
		buttons.pauseButton.onclick = function () {
			pauseRecord(buttons, recorder);
		};
	}
}

/**
 * This function stop the record of the screen and audio.
 */
function stopRecord(buttons, recorder) {
	if (!isDragged) {
		recorder.stopRecord();
		buttons.recordButton.id = "rrweb-recordButton";
		buttons.recordButton.onclick = function () {
			startRecord(buttons, recorder);
		};
		buttons.gifLoadingButton.show();
		buttons.pauseButton.hide();
	}
}

function downRecord(buttons, recorder) {
		//changeMainDivSize(80, 0);
		logger("I can download the page");
		recorder.downRecord();
}

/**
 * Launch the post edit
 */
function postEdit() {
	logger("Launching the post edit...");
	localStorage.setItem('rrweb-events', JSON.stringify(events));
	localStorage.setItem('rrweb-audio', URL.createObjectURL(soundBlob));
	console.log(localStorage.getItem('rrweb-events'));
	console.log(localStorage.getItem('rrweb-audio'));
	window.open(getRightLibPath("postEdit/newEdit.html"));
}

function displayPostEditButton() {
	//avoid concatenating if there is only one element
	if (events.length > 2) {
		changeMainDivSize(80, 0);
		logger("I can download the page");
	}
}

class RecorderUi {

/**
 * This is the default configuration variable
 * @type {Object}
*/
config_ui = {
	// The slash at the end is important
	libPath: "./",
	startOnload: true,
	position: "bottom-right",
	movable: true,
	debug: true,
	// color is a string
	mainButtonColor: null,
	childButtonColor: null
};

recorder;

/**
 * This variable is used to see if the button is dragged or clicked.
 * Default value: false;
 * @type {boolean}
*/
isDragged = false;
/**
 * This variable is used to see if the menu is open or closed.
 * Default value: false;
 * @type {boolean}
*/
isMenuOpen = false;

/**
 * Main div Object
 * @type {Object}
 */
mainDiv;
mainDivSize = {width: 70, height: 70};

/**
 * Record Button Object
 * @type {Button}
 */
recordButton;
/**
 * Pause Button Object
 * @type {Button}
 */
pauseButton;
/**
 * Download Button Object
 * @type {Button}
 */
downButton;
/**
 * The object of the gif button. This button is not clickable,
 * it is just showing a running gif.
 * @type {Object}
 */
gifLoadingButton;
/**
 * Post Edition Button Object
 * @type {Button}
 */
postEdButton;
/**
 * Minimize Button Object
 * @type {dom_element}
 */
minimizeButton;
/**
 * Check if pause Button has been created
 * Default value: false
 * @type {boolean}
 */
//isPauseButtonCreated = false;

/**
 * Variable to check if all script used to record are loaded.
 * Default value: false
 * @type {boolean}
 */
areRecordScriptsLoaded = false;

/**
 * Save the last element created (the most right)
 * @type {Button}
 */
//lastButton;

/**
 * Contains the current time when the user pause the recorder
 * @type {integer}
 */
pauseStart = 0;

	constructor() {
		this.recorder = new Recorder("lib/generic-rrweb-recorder/", this.config_ui.debug, "mp3");
		//this.recorder.onEncodingComplete(this.onRecordingComplete);
		logger("Page has finished Loading, launching generic-rrweb-recorder-ui");
		// We create a mainDiv in which we will display all menu element as block
		this.mainDiv = createBaseDiv("rrweb-mainDivButton");

		console.log(this.recorder);
		// We load CSS
		loadCss(getRightLibPath(this.config_ui,"media/recorder/style.css", false));

		// We define a button that will launch recording
		this.recordButton = new Button(this.config_ui, this.mainDiv, "rrweb-recordButton", "Start recording!");

		buttonPosition(this.config_ui, this.mainDiv);

		logger("Main Button has been created");

		if (this.config_ui.movable)
			makeElementMovable(this.mainDiv, this.mainDivSize);

		this.pauseButton = new Button(this.config_ui, this.mainDiv, "rrweb-pauseButton", "Pause the record", this.recordButton);
		this.pauseButton.createChildButton(pauseRecord, {pauseButton: this.pauseButton.button}, this.recorder);
		this.pauseButton.hide();

		/*this.postEdButton = new Button(this.config_ui, this.mainDiv, "rrweb-postEdit", "Edit your record", 'media/recorder/edit32.png', this.recordButton);
		this.postEdButton.createChildButton();
		this.postEdButton.show();*/
		
		this.downButton = new Button(this.config_ui, this.mainDiv, "rrweb-downRecord", "Download your record", this.recordButton);
		this.downButton.createChildButton(downRecord, {}, this.recorder);
		this.downButton.hide();

		this.gifLoadingButton = new Button(this.config_ui, this.mainDiv, "rrweb-loadingDown", "Your download is almost ready !", this.recordButton);
		this.gifLoadingButton.setClickable(false);
		this.gifLoadingButton.hide();
		this.gifLoadingButton.createChildButton();

		this.recordButton.createMenuButton({recordButton: this.recordButton.button, pauseButton: this.pauseButton, gifLoadingButton: this.gifLoadingButton, downButton: this.downButton}, this.recorder);
		
		let that = this;

		this.recorder.callbackWhenOnCompleted = function() {
			console.log("Recording is all finished");
			that.gifLoadingButton.hide();
			that.downButton.show();
			//displayPostEditButton();
		}
	}
}

/**
 * Create a new Button
 * @class
 *
 * @param {Object} parentElem The parent Node. The button will be append to this
 * node
 *
 * @param {Function} func On click on the button, this function will be
 * triggered
 *
 * @param {string} id The id of the button
 *
 * @param {string} text The name of the button (displayed when the mouse is over
 * the button)
 *
 * @param {string} icon The path of the image displayed in the button
 *
 * @param {Button} rightOf The button will be dispplayed to right of this
 * element
 */
class Button {
	constructor(config, parentElem, id, title, rightOf) {
		this.config = config;
		this.parentElem = parentElem;
		this.button = document.createElement("button");
		this.button.id = id;
		this.button.title = title;
		this.button.classList.add("rrweb-Buttons");
		this.width = rightOf != null ? rightOf.getWidth() + 80 : 0;
	}

	setClickable(isClickable) {
		this.button.disabled = isClickable;
		//if (!isClickable) {
		//	this.button.style.backgroundColor = "grey";
		//}
    }
	
	/**
	 * Return width of the button
	 */
	getWidth() { return this.width; }

	/**
	 * Set the button to visiblelaunchUiRecord
	 */
	show() { this.button.style.visibility = "visible"; }

	/**
	 * Hide the button
	 */
	hide() { this.button.style.visibility = "hidden"; }

	/**
	 * Return if the button is visible or not
	 */
	isVisible() { return this.button.style.visibility; }

	/**
	 * Create main Button (recording button).
	 * Call {@link Button#createBasicButton createBasicButton}.
	 */
	createMenuButton(buttons, recorder) {
		this.button.onclick = function() {
			startRecord(buttons, recorder);
		};
		if (this.config.mainButtonColor)
			this.button.style.backgroundColor = this.config.recordButtonColor;
			this.button.classList.add("rrweb-mainButton")
		this.parentElem.appendChild(this.button);
	}

	/**
	 * Create others button that are not mainButton.
	 * Call {@link Button#createBasicButton createBasicButton}.
	 */
	createChildButton(func, buttons, recorder) {
		this.button.onclick = function() {
			func(buttons, recorder);
		};
		if (this.config.childRecordColor)
			this.button.style.backgroundColor = this.config.childButtonColor;
		this.button.classList.add("rrweb-childButton");
		this.button.style.left = this.width + "px";
		this.parentElem.appendChild(this.button);
	}
}

/**
 * When the page has finished Loading
 * @function window.onload
 */
window.onload = function() {
	//if (config_ui.startOnload) {
		new RecorderUi();
	//}
}