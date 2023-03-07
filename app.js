const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn")
const countDownText = document.querySelector(".controlBox_time_text");
const carrotCountText = document.querySelector(".controlBox_carrotCount_num");
const replayBtn = document.querySelector(".replayBtn");
const musicBtn = document.querySelector(".musicBtn");
const musicBtnIcon = musicBtn.querySelector("i");

const playBox = document.querySelector(".playBox");
const messageBox = document.querySelector(".messageBox");
const gameOverBox = document.querySelector(".gameOverBox");
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
    !isPlaying; //true
    changePlayBtn();
    //벌레, 당근 생성
    if (!isBugExisting) {
        createItems('carrot', carrotDivs, carrots);
        createItems('bug', bugDivs, bugs);
        !isBugExisting;
    } else {
        carrots.innerHTML = "";
        bugs.innerHTML = "";
    }
    gameOverBox.classList.add("invisible");

    //카운트 다운 시작
}

const changePlayBtn = () => {
    playBtn.classList.add("invisible");
    pauseBtn.classList.remove("invisible");
    messageBox.classList.add("invisible");
}


const createItems = (itemName, itemDivs, itmes) => {
    for (let i = 0; i < 10; i++) {
        const itemDiv = document.createElement("div");
        itemDiv.setAttribute("class", `${itemName}Div`);
        itemDiv.classList.add("gameItem");
        playBox.appendChild(itmes);
        itemDivs.push(itemDiv);
        const itemImg = document.createElement("img");
        itemImg.src = `./img/${itemName}.png`;
        itemDiv.appendChild(itemImg);
        const itemRangeArray = randomRange();
        // 좌표 위치에 당근 복사하기 
        itemDiv.style.left = itemRangeArray[i][0] + "px";
        itemDiv.style.top = itemRangeArray[i][1] + "px";
        itmes.appendChild(itemDiv);
        itemImg.setAttribute("id", `${itemRangeArray[i][0]}`);
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
    gameOverBox.classList.remove("invisible");

}

const changePauseBtn = () => {
    playBtn.classList.remove("invisible");
    pauseBtn.classList.add("invisible");
    messageBox.classList.remove("invisible");
}

const onClickPauseBtn = () => {
    gameOver();
}




////////////// 리펙토링 1차

const handleCarrotClick = (event) => {
    const clickedCarrot = event.target;
    document.getElementById(`${clickedCarrot.id}`).remove();
    carrotSound.play();

    //carrot 클릭시 해당 carrotDiv carrots에서 제거 
    // const clikedCarrotId = carrot.id;
    // carrots.removeChild(`#${clikedCarrotId}`);
    carrot_catched++;
    carrotCountText.innerText = `${carrot_catched}`;
    if (carrot_catched == 10) {
        gameOver();
    }
}

const handleBugClick = () => {
    //플레이 버튼으로 바뀜
    pauseBtn.classList.add("invisible");
    playBtn.classList.remove("invisible");
    bugSound.play();
    gameOver();
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

bugs.addEventListener("click", handleBugClick);
carrots.addEventListener("click", handleCarrotClick);
musicBtn.addEventListener("click", musicPlay);