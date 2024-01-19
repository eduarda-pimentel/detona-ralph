const state = {
    view : {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        livesLeft: document.querySelector("#lives-left"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLives: 3,
    }, 
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })
    let randomNumber = Math.floor(Math.random()*9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}

function gameOver(){
    state.view.livesLeft.textContent = state.values.currentLives;
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    setTimeout(function(){alert(`Game over! Seu resultado foi ${state.values.result}`)},1);
}

function addListenerHitbox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if (square.id === state.values.hitPosition){
                state.values.result++;
                playSound()
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            } else {
                state.values.currentLives--;
                if (state.values.currentLives > 0){
                    state.view.livesLeft.textContent = state.values.currentLives;
                } else if (state.values.currentLives == 0){
                   gameOver();
                }
            }
        })
    })
} 

function countDown(){
    state.values.currentTime--;
    if(state.values.currentTime >= 0){
        state.view.timeLeft.textContent = state.values.currentTime;
    }
    if (state.values.currentTime <= 0){
        gameOver();
    }
}
function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play()
}

function init(){
    addListenerHitbox();
}

init();