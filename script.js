const game = document.querySelector('.game');
const hole = game.querySelectorAll('.hole');
const mole = game.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const modalBox = document.querySelector('.modal-difficulty');
const mainButton = document.querySelector('.button-main');
const secondaryButton = document.querySelectorAll('.button-secondary');
const timer = document.querySelector('.time');

let score = 0;
//Variable that will stop the function
let timeout = true;
//Save last hole so you don't select it twice
let lastHole;
let countdown;

function openBox(){
  mainButton.classList.remove('button-active');
  modalBox.classList.add('button-active');
}

function startGame(min,max) {
  score = 0
  scoreBoard.textContent = score;
  timeout = false;
  modalBox.classList.remove('button-active');
  moleUp(min,max);
  time(10)
}

function time(seconds){
  const now = Date.now();
  const then = now + seconds*1000;
  displayTime(seconds);
  countdown = setInterval(()=>{
    const sec = Math.round((then - Date.now())/1000); 
    //Stop it on 0
    console.log(`${sec} seconds left`);
    if(sec === 0 ){
      clearInterval(countdown);
      timeout = true
      //Bring back the start now button
      mainButton.classList.add('button-active');
    }
    displayTime(sec);
  },1000); 
}
function displayTime(seconds){
  display = `${seconds<10 ? '0' : ''}${seconds}`;
  timer.textContent = display;
}


function randomTime(min,max){
  return  Math.round(Math.random() * (max-min) + min);
}

function moleUp(min,max){
    const time = randomTime(min,max);
    console.log(time);
    const currentHole = randomItem(hole);
    currentHole.classList.add('up');
    setTimeout(()=> {
      currentHole.classList.remove('up');
      if(!timeout) moleUp(min,max);
    },time);
}

function randomItem(list){
  const index = Math.floor(Math.random() * list.length);
  const current = list[index];
  if(lastHole === index) return randomItem(list);
  lastHole = index;
  return current;
}

function addScore(e) {
  if(!e.isTrusted) return; //Avoid javascript clicks as cheating method;
  this.closest('.hole').classList.remove('up'); //remove the mole after you click it
  scoreBoard.textContent = score++;
}

mole.forEach(mole => {
  mole.addEventListener('mousedown', addScore);
});


//currently min,max values are not working properly
secondaryButton.forEach(btn => {
  btn.addEventListener('click', () => {
    const [min,max] = btn.dataset.speed.split(',').map(num => parseFloat(num));
    startGame(min,max);
  });
})
