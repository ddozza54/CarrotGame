const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn")
const countDownText = document.querySelector(".controlBox_time_text");
const carrotCountText = document.querySelector(".controlBox_carrotCount_num");
const replayBtn = document.querySelector(".lostBox_btn");

const playBox = document.querySelector(".playBox");
const lostBox = document.querySelector(".lostBox");
const gameOverBox = document.querySelector(".gameOverBox");
const carrots = document.querySelector(".carrots");
const bugs = document.querySelector(".bugs");

let isBugExisting = false;

let carrotCount = 0;
let carrotDivs = [];
let carrotId = "";

let seconds = 10;

const ITEM_SIZE = 50;


const countDownFn = () => {
    if (seconds > 0) {
        seconds -= 1;
        countDownText.innerText = `0:${seconds}`;
    } else {
        gameOver();
    }

}

const playBoxRandomRange = () => {
    //랜덤으로 carrot, bugs 추가
    //play Box 내에서 랜덤으로 (x, y) 좌표 추출
    //left = x
    // top = y
    // right = x + width
    // bottom = y + height
    const playBoxX_min = Number(Math.ceil(playBox.getBoundingClientRect().x)) + ITEM_SIZE;
    const playBoxX_max = Number(Math.floor(playBox.getBoundingClientRect().right)) - ITEM_SIZE;

    const playBoxY_min = Number(Math.ceil(playBox.getBoundingClientRect().y)) + ITEM_SIZE;
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

const createCarrots = () => {
    //당근 10개 만들기
    for (let i = 0; i < 10; i++) {
        //당근 div
        const carrotDiv = document.createElement("div");
        carrotDiv.setAttribute("class", "carrotDiv");
        carrotDiv.classList.add("gameItem");
        playBox.appendChild(carrots);
        carrotDivs.push(carrotDiv);
        //당근 img
        const carrotImg = document.createElement("img");
        carrotImg.src = "./img/carrot.png";
        carrotDiv.appendChild(carrotImg);
        // 랜덤 범위 생성
        const carrotRangeArray = playBoxRandomRange();
        // 좌표 위치에 당근 복사하기 
        carrotDiv.style.left = carrotRangeArray[i][0] + "px";
        carrotDiv.style.top = carrotRangeArray[i][1] + "px";
        carrots.appendChild(carrotDiv);
        carrotImg.setAttribute("id", `${carrotRangeArray[i][0]}`);
    }
}
const createBugs = () => {
    for (let i = 0; i < 10; i++) {
        //당근 div
        const bugDiv = document.createElement("div");
        bugDiv.setAttribute("class", "bugDiv");
        bugDiv.classList.add("gameItem");
        playBox.appendChild(bugs);
        //당근 img
        const bugImg = document.createElement("img");
        bugImg.src = "./img/bug.png";
        bugDiv.appendChild(bugImg);
        // 랜덤 범위 생성
        const bugRangeArray = playBoxRandomRange();
        // 좌표 위치에 당근 복사하기 
        bugDiv.style.left = bugRangeArray[i][0] + "px";
        bugDiv.style.top = bugRangeArray[i][1] + "px";

        bugs.appendChild(bugDiv);
    }

}

const removeGameItems = (divs) => {
    while (divs.firstChild) {
        divs.removeChild(divs.firstChild);
    }
}

const createGameItems = () => {
    createCarrots();
    createBugs();
}

const onClickPlayBtn = () => {
    //정지버튼으로 바뀜
    playBtn.classList.add("invisible");
    pauseBtn.classList.remove("invisible");
    lostBox.classList.add("invisible");
    console.log(isBugExisting);
    //게임 item 생성
    if (!isBugExisting) {
        createGameItems();
        isBugExisting = true;
    } else {
        removeGameItems(bugs);
        removeGameItems(carrots);
        createGameItems();
        isBugExisting = true;
    }
    //시간 카운트다운 스타트
    setInterval(countDownFn, 1000);
}


const gameOver = () => {
    //플레이 버튼으로 바뀜
    pauseBtn.classList.add("invisible");
    playBtn.classList.remove("invisible");
    //시간 멈춤

    //lost 메세지
    lostBox.classList.remove("invisible");
    //게임요소 클릭 불가
    gameOverBox.classList.remove("invisible");
}

const onClickPauseBtn = () => {
    gameOver();
}


const handleCarrotClick = (event) => {
    const clickedCarrot = event.target;
    document.getElementById(`${clickedCarrot.id}`).remove();

    //carrot 클릭시 해당 carrotDiv carrots에서 제거 
    // const clikedCarrotId = carrot.id;
    // carrots.removeChild(`#${clikedCarrotId}`);
    carrotCount++;
    carrotCountText.innerText = `${carrotCount}`;
    if (carrotCount == 10) {
        const lostBox_text = document.querySelector(".lostBox_message");
        lostBox_text.innerText = "You Won! 🎉"
        lostBox.classList.remove("invisible");
        gameOver();
    }
}

const handleBugClick = () => {
    lostBox.classList.remove("invisible");
    //플레이 버튼으로 바뀜
    pauseBtn.classList.add("invisible");
    playBtn.classList.remove("invisible");

}

const handleReplay = () => {
    gameOver();
    //기존에 있던 bugs, carrots 삭제

}

playBtn.addEventListener("click", onClickPlayBtn);
replayBtn.addEventListener("click", onClickPlayBtn);
pauseBtn.addEventListener("click", onClickPauseBtn);

bugs.addEventListener("click", handleBugClick);
carrots.addEventListener("click", handleCarrotClick);