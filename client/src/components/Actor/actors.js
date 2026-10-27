import Sound from '../../features/Audio/audio';

export class Animation {
    constructor(img, ctx, totalFrames, x, y, scale = 1, map = null, loop = false, onDone = null) {
        this.img = img;
        this.ctx = ctx;
        this.totalFrames = totalFrames;
        this.tic = 0;
        this.totalTics = map ? map.length : totalFrames;
        this.frameWidth = img.width / totalFrames;
        this.frameHeight = img.height;
        this.width = (img.width / totalFrames) * scale;
        this.height = img.height * scale;
        this.x = x;
        this.y = y;
        this.map = map;
        this.loop = loop;

        this.playing = false;
        this.done = false;

        this.onDone = onDone;

        this.timeout = null;

        this.animate = this.animate.bind(this);
    }

    cancel() {
        if (this.timeout) clearTimeout(this.timeout);
    }

    play() {
        this.tic = 0;
        if (this.timeout) clearTimeout(this.timeout);
        this.playing = true;
        this.done = false;
        this.animate();
    }
    
    animate() {
        if (this.ctx) {
            if (this.tic < this.totalTics) {
                const frame = this.map ? this.map[this.tic] : this.tic;
                //console.log(`Frame: ${frame}, Tic: ${this.tic}`);
                
                this.ctx.clearRect(this.x, this.y, this.width, this.height);
                this.ctx.drawImage(this.img, 
                    frame * this.frameWidth, 0, // x and y - where in the sprite
                    this.frameWidth, this.frameHeight, // frame width and height
                    this.x, this.y, // x and y - where on the screen
                    this.width, this.height // width and height
                );
                this.timeout = setTimeout(this.animate, 83);
                this.tic++;
                if (this.loop && this.tic >= this.totalTics) this.tic = 0;
            } else {
                this.playing = false;
                this.done = true;
                if (this.onDone) this.onDone();
            }
        } else {
            this.cancel();
        }
    }
}



//  ----- SOUNDS

//Crow
import caw1Src from '/sounds/D2_caw01.wav?url';
export const caw1Sound = new Sound(caw1Src);
import caw2Src from '/sounds/D2_caw02.wav?url';
export const caw2Sound = new Sound(caw2Src);

//Wise Owl
import hootSrc from '/sounds/anthousai_owl.wav?url';
export const hootSound = new Sound(hootSrc);
hootSound.volume = 0.6;




