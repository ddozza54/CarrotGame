'use strict';

const gameManualOkBtn = document.querySelector('.gameManual_ok_btn');

const clickConfirmBtn = () => {
  mouseClickSound.play();
  const gameManual = document.querySelector('.gameManual');
  gameManual.style.display = 'none';
  levelChoice.classList.remove('invisible');
  console.log('click!');
};

gameManualOkBtn.addEventListener('click', clickConfirmBtn);
