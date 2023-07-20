const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn")
const countDownText = document.querySelector(".controlBox_time_text");
const carrotCountText = document.querySelector(".controlBox_carrotCount_num");
const replayBtn = document.querySelector(".replayBtn");
const musicBtn = document.querySelector(".musicBtn");
const musicBtnIcon = musicBtn.querySelector("i");

const comfirmBtn = document.querySelector(".gameManual_confirm");
const levelChoice = document.querySelector(".levelChoice");

const playBox = document.querySelector(".playBox");
const messageBox = document.querySelector(".messageBox");
const carrots = document.querySelector(".carrots");
const bugs = document.querySelector(".bugs");

const bgSound = new Audio("./sound/bg.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const lostSound = new Audio("./sound/alert.wav");
const popSound = new Audio("./sound/pop_sound.wav");
const mouseClickSound = new Audio("./sound/mouse_click.wav");
mouseClickSound.playbackRate = 1.5;
const startSound = new Audio('./sound/game_start.wav')

let ITEM_COUNT = 5;
const ITEM_SIZE = 80;
let TIME = 5;

let isPlaying = false;
let isBugExisting = false;
let isMusicPlaying = false;

let carrotDivs = [];
let bugDivs = [];
let carrotId = "";
let carrot_catched = 0;

let remainTime = TIME;


//게임 시작
const gameStart = () => {
    remainTime = TIME;
    mouseClickSound.play();
    changePlayBtn();
    gameInit();
    isPlaying = true;
    carrotCountText.innerText = `${carrot_catched = 0}`;
    //카운트 다운 시작
    countDownText.innerText = `0:${remainTime}`;
    timer = setInterval(() => {
        if (remainTime <= 0) {
            gameOver();
            clearInterval(timer);
        } else {
            countDownText.innerText = `0:${--remainTime}`;
        }
    }, 1000)
}

//게임 환경 조성
const gameInit = () => {
    carrots.innerHTML = "";
    bugs.innerHTML = "";
    levelChoice.classList.add('invisible');
    createItems('carrot', carrotDivs, carrots);
    createItems('bug', bugDivs, bugs);
}

const changePlayBtn = () => {
    playBtn.classList.add("invisible");
    pauseBtn.classList.remove("invisible");
    messageBox.classList.add("invisible");
}

const createItems = (itemName, itemDivs, itmes) => {
    for (let i = 0; i < ITEM_COUNT; i++) {
        const itemImg = document.createElement("img");
        itemImg.src = `./img/${itemName}.png`;
        itemImg.setAttribute("class", `${itemName}`);
        itemImg.classList.add("gameItem");
        playBox.appendChild(itmes);
        itemDivs.push(itemImg);
        const itemRangeArray = randomRange(ITEM_COUNT);
        // 좌표 위치에 item 복사하기 
        itemImg.style.left = itemRangeArray[i][0] + "px";
        itemImg.style.top = itemRangeArray[i][1] + "px";
        itmes.appendChild(itemImg);
    }
}

const randomRange = (itemNumber) => {
    const playBoxX_min = Number(Math.ceil(playBox.getBoundingClientRect().x));
    const playBoxX_max = Number(Math.floor(playBox.getBoundingClientRect().right)) - ITEM_SIZE;
    const playBoxY_min = Number(Math.ceil(playBox.getBoundingClientRect().y));
    const playBoxY_max = Number(Math.floor(playBox.getBoundingClientRect().bottom)) - ITEM_SIZE;

    let xRandom = [];
    let yRandom = [];
    let cordinate = [];
    // 랜덤으로 (x, y) n 개 생성하기
    for (let i = 0; i < itemNumber; i++) {
        xRandom.push(Math.floor(Math.random() * (playBoxX_max - playBoxX_min) + playBoxX_min));
        yRandom.push(Math.floor(Math.random() * (playBoxY_max - playBoxY_min) + playBoxY_min));
        cordinate.push([xRandom[i], yRandom[i]]);
    }
    return cordinate;
}


//게임 끝

const gameOver = () => {
    !isPlaying;
    changePauseBtn();
    let messageBox_text = document.querySelector(".messageBox_message")
    //이겼을 때
    if (ITEM_COUNT == carrot_catched) {
        messageBox_text.innerText = "You Won! 🎉";
        winSound.play();
        clearInterval(timer);
    } else { //졌을 때
        messageBox_text.innerText = "You Lost! 😞";
        lostSound.play();
        clearInterval(timer);
    }
    levelChoice.classList.remove('invisible');

}

const changePauseBtn = () => {
    playBtn.classList.remove("invisible");
    pauseBtn.classList.add("invisible");
    messageBox.classList.remove("invisible");
}

const onClickPauseBtn = () => {
    gameOver();
}

const onFieldClick = (event) => {
    if (!isPlaying) {
        return;
    }
    const target = event.target;
    if (target.matches(".carrot")) {
        console.log("당근!");
        carrotSound.play();
        carrot_catched++;
        carrotCountText.innerText = `${carrot_catched}`;
        target.remove(); if (carrot_catched >= ITEM_COUNT) {
            gameOver();
        }
    } else if (target.matches(".bug")) {
        console.log("bug!");
        bugSound.play();
        gameOver();
        target.remove();
    }
}
const handleLevelChoice = (event) => {
    const target = event.target;
    if (target.matches(".level")) {
        startSound.play();
        messageBox.classList.add("invisible");
        carrots.innerHTML = "";
        bugs.innerHTML = "";
    }

    if (target.matches(".level_easy")) {
        console.log("easy!");
        ITEM_COUNT = 5;
        TIME = 5;
        levelChoice.classList.add('invisible');
    } else if (target.matches(".level_medium")) {
        console.log("medium!");
        ITEM_COUNT = 15;
        TIME = 10;
        levelChoice.classList.add('invisible');
    }
    else if (target.matches(".level_hard")) {
        console.log("hard!");
        ITEM_COUNT = 25;
        TIME = 15;
        levelChoice.classList.add('invisible');
    } else { return; };
}


const musicPlay = () => {
    mouseClickSound.play();
    if (isMusicPlaying) {
        isMusicPlaying = false;
        musicBtnIcon.classList.remove("fa-volume-xmark");
        musicBtnIcon.classList.add("fa-music");
        console.log(isMusicPlaying);
        bgSound.pause();
        bgSound.currentTime = 0;
    } else {
        bgSound.play();
        musicBtnIcon.classList.remove("fa-music");
        musicBtnIcon.classList.add("fa-volume-xmark");
        isMusicPlaying = true;
        console.log(isMusicPlaying);
    }
}

const clickConfirmBtn = () => {
    mouseClickSound.play();
    const gameManual = document.querySelector(".gameManual");
    gameManual.style.display = "none";
    levelChoice.classList.remove('invisible');
    console.log("click!")
}

comfirmBtn.addEventListener("click", clickConfirmBtn);
levelChoice.addEventListener("click", handleLevelChoice)

playBtn.addEventListener("click", gameStart);
replayBtn.addEventListener("click", gameStart);
pauseBtn.addEventListener("click", onClickPauseBtn);

playBox.addEventListener("click", onFieldClick);
musicBtn.addEventListener("click", musicPlay);