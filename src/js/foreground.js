//timer constant for timer
let timerConstant = {
  start: false,
  //type of miliseconds
  fullDash: 283,
  timeLimit: 200000,
  timeLeft: 200000,
  //per of second
  per: 1000,
  //timer function
  timerInterval: null,
};
const colorLimits = {
  danger: {
    color: "red",
    limit: timerConstant.timeLimit / 4,
  },
  info: {
    color: "orange",
    limit: timerConstant.timeLimit / 2,
  },
};
//elems(html) of counts
const elems = {
  counterCircle: document.getElementById("counter-path-remaining"),
  startButton: document.getElementById("start_button"),
  timeRemainingText: document.getElementById("time_remaining_text"),
};


//calculator stroke dash
function calculateTimeFraction() {
  const rawTimeFraction = timerConstant.timeLeft / timerConstant.timeLimit;
  return (
    rawTimeFraction - (1 / timerConstant.timeLimit) * (1 - rawTimeFraction)
  );
}
//update counter circle width
const updateCounterCircle = () => {
      timerConstant.timerInterval = setInterval(() => {
       if(timerConstant.timeLeft > 0){
        timerConstant.timeLeft = timerConstant.timeLeft - timerConstant.per;
        remainingTimeColor(timerConstant.timeLeft);
        remainingTimeText(timerConstant.timeLeft);
        const circleDasharray = `${(
          calculateTimeFraction() * timerConstant.fullDash
        ).toFixed(0)} 283`;
        elems.counterCircle.setAttribute("stroke-dasharray", circleDasharray);
       }
       else {
         resetCounter();
       }
      }, 1000);
};
//update time circle color
const remainingTimeColor = (timeLeft) => {
  if (colorLimits.danger.limit > timeLeft) {
    elems.counterCircle.classList.add("red");
  } else if (colorLimits.info.limit > timeLeft) {
    elems.counterCircle.classList.add("orange");
  }
};

const remainingTimeText = (time) => {
  let min, sec;
  min = Math.floor(time / (60 * 1000));
  if(min < 10){
    min = `0${min}`
  }
  sec = Math.floor((time / 1000) % 60);
  if(sec < 10){
    sec = `0${sec}`
  }
  elems.timeRemainingText.innerHTML = min + ':' + sec;
}
//start timer after click
const startTimer = () => {
  updateCounterCircle();
};
//reset counter
const resetCounter = () => {
  window.clearInterval(timerConstant.timerInterval);
  //reset updated variables
  timerConstant = {
    start: false,
    //type of miliseconds
    fullDash: 283,
    timeLimit: 5000,
    timeLeft: 5000,
    //per of second
    per: 1000,
    //timer function
    timerInterval: null,
  };
  //reset circle width
  elems.counterCircle.setAttribute("stroke-dasharray", "283");
  elems.counterCircle.classList.add("green");
  elems.counterCircle.classList.remove("orange", "red");
};
//after page uploaded
elems.startButton.addEventListener("click", () => {
  if (!timerConstant.start) {
    timerConstant.start = true;
    startTimer();
  } else {
    const isReset = confirm("Çalışma sayacınız sıfırlansın mı?");
    if(isReset) {
      timerConstant.start = false;
      resetCounter();
    }
  }
});
