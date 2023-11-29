'use strict';

const bgSound = new Audio('./sound/bg.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const lostSound = new Audio('./sound/alert.wav');
const popSound = new Audio('./sound/pop_sound.wav');
const mouseClickSound = new Audio('./sound/mouse_click.wav');
const startSound = new Audio('./sound/game_start.wav');

let isMusicPlaying = false;

const musicPlay = () => {
  mouseClickSound.play();
  if (isMusicPlaying) {
    isMusicPlaying = false;
    musicBtnIcon.classList.remove('fa-volume-xmark');
    musicBtnIcon.classList.add('fa-music');
    console.log(isMusicPlaying);
    bgSound.pause();
    bgSound.currentTime = 0;
  } else {
    bgSound.play();
    musicBtnIcon.classList.remove('fa-music');
    musicBtnIcon.classList.add('fa-volume-xmark');
    isMusicPlaying = true;
    console.log(isMusicPlaying);
  }
};



musicBtn.addEventListener('click', musicPlay);
