import store from '../../store.js';
import { clamp } from '../../utils/helpers.js';

export const audioParent = document.getElementById("audio-parent");
export const allSounds = [];

function masterVolume() {
	const masterV = store.getState().audio.volume;
	return parseFloat(masterV) || 1;
}

class Sound {
	constructor(src) {
		if (audioExists(src)) return;

		this.sound = document.createElement("audio");
		this.sound.src = src;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls", "none");
		this.sound.style.display = "none";

		this._volume = masterVolume();
		this._masterVolume = masterVolume();
		this.sound.volume = masterVolume();

		audioParent.appendChild(this.sound);
		allSounds.push(this);
	}

	get volume() {
		return this._volume;
	}

	set volume(volume) {
		const newVolume = clamp(volume, 0, 1);
		this._volume = newVolume;
		this.sound.volume = newVolume * this.masterVolume;
	}

	get masterVolume() {
		return this._masterVolume;
	}

	set masterVolume(masterVolume) {
		const newMaster = clamp(masterVolume, 0, 1);
		this._masterVolume = newMaster;
		this.sound.volume = this._volume * newMaster;
	}

	play() {
		this.sound.play();
	};

	replay() {
		this.sound.currentTime = 0;
		this.sound.play();
	};

	pause() {
		this.sound.pause();
	};

	stop() {
		this.sound.pause();
		this.sound.currentTime = 0;
	};
}

export function audioExists(src) {
	const children = audioParent.children;
	const length = children.length;
	for (let i = 0; i < length; i++) {
		if (children[i].getAttribute("src") === src) {
			return children[i];
		}
	}
	return null;
}

export function updateMasterVolume(masterVolume) {
	for (let i = 0; i < allSounds.length; i++) {
		allSounds[i].masterVolume = masterVolume;
	}
}

export default Sound;