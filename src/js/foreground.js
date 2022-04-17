//timer constant for timer
let timerConstant = {
  start: false,
  //type of miliseconds
  fullDash: 283,
  timeLimit: 10,
  timeLeft: 10,
  //per of second
  per: 1,
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
      timerConstant.timeLeft = timerConstant.timeLeft - timerConstant.per;
      remainingTimeColor(timerConstant.timeLeft);
      const circleDasharray = `${(
        calculateTimeFraction() * timerConstant.fullDash
      ).toFixed(0)} 283`;
      elems.counterCircle.setAttribute("stroke-dasharray", circleDasharray);
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
    timeLimit: 100,
    timeLeft: 100,
    //per of second
    per: 1,
    //timer function
    timerInterval: null,
  };
  //reset circle width
  elems.counterCircle.setAttribute("stroke-dasharray", "283")
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
