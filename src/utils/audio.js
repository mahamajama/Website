
const audioParent = document.getElementById("audio-parent");

export default function sound(src) {   //sound constructor via: https://www.w3schools.com/graphics/game_sound.asp
	if (audioExists(src)) return;

	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	this.sound.volume = 0.5;
	
	this.play = function(){
		this.sound.play();
	}
	this.replay = function(){
		this.sound.currentTime = 0;
		this.sound.play();
	}
	this.pause = function(){
		this.sound.pause();
	}
	this.stop = function(){
		this.sound.pause();
		this.sound.currentTime = 0;
	}

	audioParent.appendChild(this.sound);
}

function audioExists(src) {
	const children = audioParent.children;
	const length = children.length;
	for (let i = 0; i < length; i++) {
		if (children[i].getAttribute("src") === src) {
			return true;
		}
	}
	return false;
}


