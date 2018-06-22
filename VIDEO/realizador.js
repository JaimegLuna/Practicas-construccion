var myMainVideo, video1, video2, video3;
var sources = [];
var time_main;
var	time_v1;
var	time_v2;
var	time_v3;
var loop_start, loop_end;
var fullscreenenabled = false, counter = 0, time_loops = 1;

// Closure for decimal rounds
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // If the value is negative...
    if (value < 0) {
      return -decimalAdjust(type, -value, exp);
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

// Para cambiar los elementos de mi array
var swapArrayElements = function(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

// Para visualizar si mi audio está activo o no.
function audio_display() {
	if (myMainVideo.muted || Math.round10(myMainVideo.volume, -1) == 0){
		document.getElementById("soundmain").innerHTML = "INACTIVE";
	}else{
		document.getElementById("soundmain").innerHTML = "ACTIVE";
	};

	if (!video1.muted){
		document.getElementById("sound1").innerHTML = "ACTIVE";
	}else{
		document.getElementById("sound1").innerHTML = "INACTIVE";
	};

	if (!video2.muted){
		document.getElementById("sound2").innerHTML = "ACTIVE";
	}else{
		document.getElementById("sound2").innerHTML = "INACTIVE";
	};

	if (!video3.muted){
		document.getElementById("sound3").innerHTML = "ACTIVE";
	}else{
		document.getElementById("sound3").innerHTML = "INACTIVE";
	};

}

// Actualizar la informacion de lo escrito
function actualize() {
	document.getElementById("timemain").innerHTML = myMainVideo.currentTime;
	document.getElementById("time1").innerHTML = video1.currentTime;
	document.getElementById("time2").innerHTML = video2.currentTime;
	document.getElementById("time3").innerHTML = video3.currentTime;
	time_main = myMainVideo.currentTime;
	time_v1 = video1.currentTime;
	time_v2 = video2.currentTime;
	time_v3 = video3.currentTime;
	volumen = Math.round10(myMainVideo.volume, -1) * 100;
	document.getElementById("volume").innerHTML = volumen + "%";
	audio_display();
}

// Para que lance la funcion de actualizar
function GetData() {
	actualize();
	if (counter == time_loops){
		myMainVideo.removeEventListener("timeupdate", checkEnd);
		document.getElementById("looptime").innerHTML = "off";
		counter = 0;
	}
}

// Para cambiar el video
function change(clicked) {
	if (clicked.id == "toSelect1") {
		if (!myMainVideo.paused) {
			myMainVideo.src = sources[1];
			video1.src = sources[0]
			swapArrayElements(sources, 0, 1);
			myMainVideo.currentTime = time_main;
			video1.currentTime = time_main;
			video2.currentTime = time_main;
			video3.currentTime = time_main;
			myMainVideo.play();
			video1.play();
			video2.play();
			video3.play();
		} else {
			myMainVideo.src = sources[1];
			video1.src = sources[0];
			swapArrayElements(sources, 0, 1);
			video2.currentTime = 0;
			video3.currentTime = 0;
		}
	} else if (clicked.id == "toSelect2") {
		if (!myMainVideo.paused) {
			myMainVideo.src = sources[2];
			video2.src = sources[0];
			swapArrayElements(sources, 0, 2);
			myMainVideo.currentTime = time_main;
			video2.currentTime = time_main;
			video1.currentTime = time_main;
			video3.currentTime = time_main;
			myMainVideo.play();
			video2.play();
			video1.play();
			video3.play();
		} else {
			myMainVideo.src = sources[2];
			video2.src = sources[0];
			swapArrayElements(sources, 0, 2);
			video1.currentTime = 0;
			video3.currentTime = 0;
		}
	} else {
		if (!myMainVideo.paused) {
			myMainVideo.src = sources[3];
			video3.src = sources[0];
			swapArrayElements(sources, 0, 3);
			myMainVideo.currentTime = time_main;
			video3.currentTime = time_main;
			video1.currentTime = time_main;
			video2.currentTime = time_main;
			myMainVideo.play();
			video3.play();
			video1.play();
			video2.play();
		} else {
			myMainVideo.src = sources[3];
			video3.src = sources[0];
			swapArrayElements(sources, 0, 3);
			video1.currentTime = 0;
			video2.currentTime = 0;
		}
	}
}

// Para activar todos los vídeos
function play() {
	myMainVideo.play();
	video1.play();
	video2.play();
	video3.play();
}

// Para detener todos los vídeos
function stop() {
	myMainVideo.pause();
	video1.pause();
	video2.pause();
	video3.pause();
}

// Para empezar todos los vídeos
function rewind() {
	myMainVideo.currentTime = 0;
	video1.currentTime = 0;
	video2.currentTime = 0;
	video3.currentTime = 0;
	stop();
}

// Para quitar sonido al principal.
function mutemain() {
	myMainVideo.muted = true;
}

// Para dar mas sonido a mi video ppal
function moresound() {
	if (Math.round10(myMainVideo.volume, -1) != 1) {
		myMainVideo.volume += 0.2;
	}
}

// Para dar menos sonido a mi video ppal
function lesssound() {
	if (Math.round10(myMainVideo.volume, -1) != 0) {
		myMainVideo.volume -= 0.2;
	}
}

// Para desactivar el mute
function nomute() {
	myMainVideo.muted = false;
}

// Para cuando el cursor esté encima de un vídeo y que suene
function activeSound(thevideo) {
	myMainVideo.muted = true;
	if (thevideo.id == "toSelect1") {
		video1.muted = false;
	} else if (thevideo.id == "toSelect2") {
		video2.muted = false;
	} else {
		video3.muted = false;
	}
}

// Para cuando el cursor ya no esté encima del vídeo y lo mutee
function muteSound(thevideo) {
	if (thevideo.id == "toSelect1") {
		myMainVideo.muted = false;
		video1.muted = true;
	} else if (thevideo.id == "toSelect2") {
		myMainVideo.muted = false;
		video2.muted = true;
	} else {
		myMainVideo.muted = false;
		video3.muted = true;
	}
}

// Para hacer uso de la pantalla completa o no. API FULLSCREEN para todos los navegadores excepto IE10.
function zoominorout(clicked){
	if (!document.mozFullScreenElement && !document.fullscreenElement && !document.webkitfullscreenElement){
		if (clicked.requestFullscreen) {
			clicked.requestFullscreen();
		} else if (clicked.mozRequestFullScreen) {
			clicked.mozRequestFullScreen();
		} else if (clicked.webkitRequestFullscreen) {
			clicked.webkitRequestFullscreen();
		}
		mainVideo.style.cursor = "zoom-out";
	}else{
		if(!document.mozFullScreenElement){
			if(!document.fullscreenElement){
				document.webkitExitFullscreen();
			}else{
				document.exitFullscreen();
			}
		}else if(!document.fullscreenElement){
			if(!document.mozFullScreenElement){
				document.webkitExitFullscreen();
			}else{
				document.mozCancelFullScreen();
			}
		}else{
			if(!document.mozFullScreenElement){
				document.exitFullscreen();
			}else{
				document.mozCancelFullScreen();
			}
		}
		mainVideo.style.cursor = "zoom-in";
	}
}

// Para que me devuelva segundos.
function returnseconds(time){
	new_time = time.split(".");
	if (new_time.length >= 2) {
		minutes = new_time[0] * 60;
		total_time = minutes + new_time[1] * 1;
	} else {
		total_time = time * 60;
	}
	return total_time;
}

function checkEnd(){
	if (myMainVideo.currentTime >= loop_end) {
		myMainVideo.currentTime = loop_start;
		myMainVideo.play();
		counter += 1;
	}
}

// implementacion de las repeticiones de intervalo
function loopon(){
  loop_start = prompt("Please, set the start time for the loop", "example: 0.43 (it means: minute 0, second 43)");
	if (loop_start != null && !isNaN(loop_start)) {
		loop_startSeconds = returnseconds(loop_start);
		loop_start = loop_startSeconds;
		loop_end = prompt("Please, set the end time for the loop", "example: 2 (it means: minute 2, second 00)");
		if (loop_end != null && !isNaN(loop_end) && loop_end != 0) {
			loop_endSeconds = returnseconds(loop_end);
			loop_end = loop_endSeconds;
				if (loop_start > loop_end || loop_start >= myMainVideo.duration || loop_end > myMainVideo.duration) {
					alert("LOOP CANCELED. Your entry was not correct. Try it once again.");
					loop_start = 0;
					loop_end = 0;
				}else{
					time_loops = prompt("How many times you want to loop the video?");
					if (isNaN(time_loops || time_loops == 0)){
						time_loops = 1;
					}
					document.getElementById("looptime").innerHTML = "ON";
					myMainVideo.currentTime = loop_start;
					myMainVideo.play();
					myMainVideo.addEventListener("timeupdate", checkEnd);
				}
		} else {
				alert("LOOP CANCELED. Your entry was not a number value or was empty.");
				loop_start = 0;
				loop_end = 0;
			}
	} else {
		alert("LOOP CANCELED. Your entry was not a number value or was empty.");
		loop_start = 0;
		loop_end = 0;
	}
}

// desactivar las implementaciones de repeticiones por intervalo
function loopoff(){
	if (document.getElementById("looptime").innerHTML == "ON") {
		document.getElementById("looptime").innerHTML = "off";
		myMainVideo.removeEventListener("timeupdate", checkEnd);
	} else {
		alert("There is no loops running right now");
	}
}

// Para asignar valores a mis variables
function main() {
	myMainVideo = document.getElementById("mainVideo");
	video1 = document.getElementById("toSelect1");
	video2 = document.getElementById("toSelect2");
	video3 = document.getElementById("toSelect3");
	sources.push(document.getElementById("sourcemain").src);
	sources.push(document.getElementById("source1").src);
	sources.push(document.getElementById("source2").src);
	sources.push(document.getElementById("source3").src);
	Check = setInterval(GetData, 100);
	video1.muted = true;
	video2.muted = true;
	video3.muted = true;
}
