const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn")
const countDownText = document.querySelector(".controlBox_time_text");
const carrotCountText = document.querySelector(".controlBox_carrotCount_num");

const carrot = document.querySelector(".carrots");
const bug = document.querySelector(".bugs");


let carrotCount = 0;

const countDownFn = () => {
    let seconds = 10;
    seconds -= 1;
    countDownText.innerText = `0:${seconds}`;
}
//?
setInterval(countDownFn, 1000);

const onClickPlayBtn = () => {
    //정지버튼으로 바뀜
    playBtn.classList.add("invisible");
    pauseBtn.classList.remove("invisible");
    //랜덤으로 carrot, bugs 추가 
    //카운트다운 스타트

}

const onClickPauseBtn = () => {
    //플레이 버튼으로 바뀜
    pauseBtn.classList.add("invisible");
    playBtn.classList.remove("invisible");
    //시간 멈춤
    //다시하기 + replay?
}


const handleCarrotClick = () => {
    carrot.classList.add("invisible");
    carrotCount++;
    carrotCountText.innerText = `${carrotCount}`;
}

playBtn.addEventListener("click", onClickPlayBtn);
pauseBtn.addEventListener("click", onClickPauseBtn);
carrot.addEventListener("click", handleCarrotClick)