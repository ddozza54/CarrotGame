const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn")

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

playBtn.addEventListener("click", onClickPlayBtn);
pauseBtn.addEventListener("click", onClickPauseBtn);