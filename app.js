const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn")
const countDownText = document.querySelector(".controlBox_time_text");
const carrotCountText = document.querySelector(".controlBox_carrotCount_num");
const replayBtn = document.querySelector(".replayBtn");
const musicBtn = document.querySelector(".musicBtn");
const musicBtnIcon = musicBtn.querySelector("i");

const playBox = document.querySelector(".playBox");
const messageBox = document.querySelector(".messageBox");
const carrots = document.querySelector(".carrots");
const bugs = document.querySelector(".bugs");

const bgSound = new Audio("./sound/bg.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const lostSound = new Audio("./sound/alert.wav");

const CARROT_COUNT = 5;
const ITEM_SIZE = 50;
const SECONDS = 5;

let isPlaying = false;
let isBugExisting = false;
let isMusicPlaying = false;

let carrotDivs = [];
let bugDivs = [];
let carrotId = "";
let carrot_catched = 0;

let seconds = SECONDS;  //?


//게임 시작
const gameStart = () => {
    changePlayBtn();
    gameInit();
    isPlaying = true;
    carrotCountText.innerText = `${carrot_catched = 0}`;
    //카운트 다운 시작
}

//게임 환경 조성
const gameInit = () => {
    carrots.innerHTML = "";
    bugs.innerHTML = "";
    createItems('carrot', carrotDivs, carrots);
    createItems('bug', bugDivs, bugs);
}

const changePlayBtn = () => {
    playBtn.classList.add("invisible");
    pauseBtn.classList.remove("invisible");
    messageBox.classList.add("invisible");
}

const createItems = (itemName, itemDivs, itmes) => {
    for (let i = 0; i < CARROT_COUNT; i++) {
        const itemImg = document.createElement("img");
        itemImg.src = `./img/${itemName}.png`;
        itemImg.setAttribute("class", `${itemName}`);
        itemImg.classList.add("gameItem");
        playBox.appendChild(itmes);
        itemDivs.push(itemImg);
        const itemRangeArray = randomRange();
        // 좌표 위치에 item 복사하기 
        itemImg.style.left = itemRangeArray[i][0] + "px";
        itemImg.style.top = itemRangeArray[i][1] + "px";
        itmes.appendChild(itemImg);
    }
}

const randomRange = () => {
    const playBoxX_min = Number(Math.ceil(playBox.getBoundingClientRect().x));
    const playBoxX_max = Number(Math.floor(playBox.getBoundingClientRect().right)) - ITEM_SIZE;
    const playBoxY_min = Number(Math.ceil(playBox.getBoundingClientRect().y));
    const playBoxY_max = Number(Math.floor(playBox.getBoundingClientRect().bottom)) - ITEM_SIZE;

    let xRandom = [];
    let yRandom = [];
    let cordinate = [];
    // 랜덤으로 (x, y) 10 개 생성하기
    for (let i = 0; i < 10; i++) {
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
    if (CARROT_COUNT == carrot_catched) {
        messageBox_text.innerText = "You Won! 🎉";
        winSound.play();
    } else { //졌을 때
        messageBox_text.innerText = "You Lost! 😞";
        lostSound.play();
    }

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
        target.remove();
        if (carrot_catched >= CARROT_COUNT) {
            gameOver();
        }
    } else if (target.matches(".bug")) {
        console.log("bug!");
        bugSound.play();
        gameOver();
        target.remove();
    }
}



const handleBugClick = () => {
}

const handleReplay = () => {
    gameOver();
}

const musicPlay = () => {
    if (isMusicPlaying) {
        isMusicPlaying = false;
        musicBtnIcon.classList.remove("fa-volume-xmark");
        musicBtnIcon.classList.add("fa-music");
        console.log(isMusicPlaying);
        bgSound.pause();
    } else {
        bgSound.play();
        musicBtnIcon.classList.remove("fa-music");
        musicBtnIcon.classList.add("fa-volume-xmark");
        isMusicPlaying = true;
        console.log(isMusicPlaying);
    }
}

playBtn.addEventListener("click", gameStart);
replayBtn.addEventListener("click", gameStart);
pauseBtn.addEventListener("click", onClickPauseBtn);

playBox.addEventListener("click", onFieldClick);
musicBtn.addEventListener("click", musicPlay);