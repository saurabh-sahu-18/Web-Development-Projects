let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h = document.querySelector("h2");
let btns = ["yellow", "red", "purple", "green"];
let allBtns = document.querySelectorAll(".btn");

document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;

        for (btn of allBtns) {
            btn.addEventListener("click", btnPress);
        }

        levelUp();
    }
})

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout( function() {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    h.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (gameSeq[idx] == userSeq[idx]) {
        if(gameSeq.length == userSeq.length){
            setTimeout(()=> {
                levelUp();
            }, 1000);
        }
    }
    else{
        h.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(()=> {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        for (let btn of allBtns) {
            btn.removeEventListener("click", btnPress);
        }
        reset();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}