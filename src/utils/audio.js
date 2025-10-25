


export default function sound(src) {   //sound constructor via: https://www.w3schools.com/graphics/game_sound.asp
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	this.sound.volume = 0.5;
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.currentTime = 0;
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
	}
}



