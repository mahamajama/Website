import sound from '../features/Audio/audio.js';

export function expandSection(element) {
  var sectionHeight = element.scrollHeight;
  element.style.height = sectionHeight + 'px';
  element.addEventListener('transitionend', onExpandEnd);
}

function onExpandEnd(e) {
  var element = e.target;
  element.removeEventListener('transitionend', onExpandEnd);
  element.style.height = 'auto';
}

export function collapseSection(element, callback = null) {
  element.removeEventListener('transitionend', onExpandEnd);
  const currentHeight = element.offsetHeight;

  var elementTransition = element.style.transition;
  element.style.transition = '';
  
  requestAnimationFrame(function() {
    element.style.height = currentHeight + 'px';
    if (callback) callback(element);
    element.style.transition = elementTransition;
    requestAnimationFrame(function() {
      element.style.height = 0 + 'px';
    });
  });
}

export const ignoreTransition = (element, property, target) => {
  const elementTransition = element.style.transition;

  element.style.transition = 'none';
  element.style.setProperty(property, target);

  element.offsetHeight;
  
  requestAnimationFrame(() => {
    element.style.transition = null;
  });
}

export const ignoreTransitionTemp = (element, property, target, delay) => {
  const elementTransition = element.style.transition;

  element.style.transition = 'none';
  element.style.setProperty(property, target);

  element.offsetHeight;
  
  setTimeout(() => {
    element.style.transition = null;
    element.style.setProperty(property, null);
  }, delay * 1000);
}

export const ignoreTransformTransition = (element, targetTransform) => {
  const elementTransition = element.style.transition;

  element.style.transition = 'none';
  element.style.transform = targetTransform;

  element.offsetHeight;
  
  requestAnimationFrame(() => {
    element.style.transition = elementTransition;
  });
}

export const ignoreTransformTransitionTemp = (element, targetTransform, delay) => {
  const elementTransition = element.style.transition;
  const elementTransform = element.style.transform;

  element.style.transition = 'none';
  element.style.transform = targetTransform;

  element.offsetHeight;
  
  setTimeout(() => {
    element.style.transition = elementTransition;
    element.style.transform = elementTransform;
  }, delay * 1000);
}


//  MY NAME FUNCTIONS
import blipSrc from '/sounds/SSB_Dot.wav?url';
const blipSound = new sound(blipSrc);

export function colorRoulette(e) {
    const tics = 16;
    let colors = [
      '#ff0000', '#ff9900', '#ffff00', '#00ff00',
      '#00ffff', '#0000ff', '#ff00ff', '#9900ff',
    ];
    let currentColor = '#ffffff';
    function getRandomColor() {
      const i = Math.floor(Math.random() * colors.length);
      const newColor = colors[i];
      colors[i] = currentColor;
      currentColor = newColor;
      return currentColor;
    }

    let i = 0;
    let delay = 100;
    function spinColor() {
      delay *= 1.1;
      e.target.children[0].children[0].style.color = getRandomColor();
      i++;

      blipSound.replay();

      if (i < tics) {
        setTimeout(() => {
          spinColor();
        }, delay);
      }
    }

    spinColor();
  }




