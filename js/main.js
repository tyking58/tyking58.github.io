// JavaScript Document

/* global $, document */

function activeLink(temp,demo) {
	var moLink = document.getElementById("MO"),
		masLink = document.getElementById("MAS"),
		sdoLink = document.getElementById("SDO"),
		currentLink = document.getElementById(temp),
		demoMO = document.getElementById("d-mo"),
		demoMAS = document.getElementById("d-mas"),
		demoSDO = document.getElementById("d-sdo"),
	    currentDemo = document.getElementById(demo);
	
	moLink.className = "link-option";
	masLink.className = "link-option";
	sdoLink.className = "link-option";
	currentLink.className += " " + "active-link";
	
	demoMO.style.display = "none";
	demoMAS.style.display = "none";
	demoSDO.style.display = "none";
	currentDemo.style.display = "block";
}

function bgChangeStart() {
	var startSec = document.getElementById("body-start"),
		mainSec = document.getElementById("body-main");
	
	mainSec.style.display = "block";
	startSec.style.opacity = "0";
	setTimeout(function(){startSec.style.display = "none";},1000);
	
}

function bgChangeMusic() {
	var bgColor = document.getElementById("bg-color"),
		musicSec = document.getElementById("body-music"),
		mainSec = document.getElementById("body-main"),
		soundSec = document.getElementById("body-sound"),
		head = document.getElementById("header");
	
	bgColor.style.backgroundPosition = "bottom left";

	mainSec.style.zIndex = "0";
	mainSec.style.opacity = "0";
	mainSec.style.display = "none";
	soundSec.style.zIndex = "0";
	soundSec.style.opacity = "0";
	mainSec.style.display = "none";
	musicSec.style.display = "block";
	musicSec.style.zIndex = "1";
	musicSec.style.opacity = "1";
}

function bgChangeMain() {
	var bgColor = document.getElementById("bg-color"),
		musicSec = document.getElementById("body-music"),
		mainSec = document.getElementById("body-main"),
		soundSec = document.getElementById("body-sound"),
		head = document.getElementById("header");
	
	bgColor.style.backgroundPosition = "bottom";

	musicSec.style.zIndex = "0";
	musicSec.style.opacity = "0";
	musicSec.style.display = "none";
	soundSec.style.zIndex = "0";
	soundSec.style.opacity = "0";
	soundSec.style.display = "none";
	mainSec.style.display = "block";
	mainSec.style.zIndex = "1";
	mainSec.style.opacity = "1";
}

function bgChangeSound() {
	var bgColor = document.getElementById("bg-color"),
		musicSec = document.getElementById("body-music"),
		mainSec = document.getElementById("body-main"),
		soundSec = document.getElementById("body-sound");
	
	bgColor.style.backgroundPosition = "bottom right";
	
	musicSec.style.zIndex = "0";
	musicSec.style.opacity = "0";
	musicSec.style.display = "none";
	mainSec.style.zIndex = "0";
	mainSec.style.opacity = "0";
	mainSec.style.display = "none";
	soundSec.style.display = "block";
	soundSec.style.zIndex = "1";
	soundSec.style.opacity = "1";
}	

function bgChangeDemoOn() {
	var bgColor = document.getElementById("bg-color"),
		musicSec = document.getElementById("body-music"),
		mainSec = document.getElementById("body-main"),
		soundSec = document.getElementById("body-sound"),
		demoSec = document.getElementById("body-demo"),
		head = document.getElementById("header");
	
	bgColor.style.backgroundPosition = "bottom";

	demoSec.style.zIndex = "200";
	demoSec.style.opacity = "1";
	musicSec.style.zIndex = "0";
	musicSec.style.opacity = "0";
	mainSec.style.zIndex = "0";
	mainSec.style.opacity = "0";	
	soundSec.style.zIndex = "0";
	soundSec.style.opacity = "0";
	head.style.opacity = "0";
}

function bgChangeDemoOff() {
	var bgColor = document.getElementById("bg-color"),
		musicSec = document.getElementById("body-music"),
		mainSec = document.getElementById("body-main"),
		soundSec = document.getElementById("body-sound"),
		head = document.getElementById("header"),
		demoSec = document.getElementById("body-demo");
	
	bgColor.style.backgroundPosition = "bottom";

	demoSec.style.zIndex = "-1";
	demoSec.style.opacity = "0";
	musicSec.style.zIndex = "0";
	musicSec.style.opacity = "0";
	mainSec.style.zIndex = "1";
	mainSec.style.opacity = "1";	
	soundSec.style.zIndex = "0";
	soundSec.style.opacity = "0";
	head.style.opacity = "1";
}

$(document).scroll(function() {
	if($(this).scrollTop() >= 20){
		$('#btn-top').fadeIn(200);
	}
	else {
		$('#btn-top').fadeOut(200);
	}
});

$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
		event.preventDefault();

		var hash = this.hash;
		var parent = "#" + $(hash).parent().attr('id');

		$("html, body").animate({
			scrollTop: $(parent).scrollTop() + $(hash).offset().top}, 800);
	}
   });
});

$(function(){
	$("#btn-demo").load("DemoReel.html");
});