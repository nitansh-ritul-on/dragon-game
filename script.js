var sc = 0, cross = true;
const audio = new Audio('music/music.mp3');
const audio_over = new Audio('music/gameover.mp3');
setTimeout(() => {
    audio.play();
}, 2000);
document.onkeydown = function (e) {
    if (e.keyCode == 38) {
        const dino = document.querySelector('.dino');
        dino.classList.add('animationDino');
        setTimeout(() =>  dino.classList.remove('animationDino') , 1400);
    }
    else if (e.keyCode == 39) {
        const dino = document.querySelector('.dino');
        const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dx + 250 < screen.width) {
            dino.style.left = dx + 40 + 'px';
        }
    }
    else if (e.keyCode == 37) {
        const dino = document.querySelector('.dino');
        const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dx - 10 > 0) {
            dino.style.left = dx - 40 + 'px';
        }
    }
}

function updateScore(sc){
    score.innerHTML = "Your score is: " + sc;
}

setInterval(() => {
    const dino = document.querySelector(".dino");
    const monster = document.querySelector(".dragon");
    const gameOver = document.querySelector(".gameOver");

    const dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    const dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    const mx = parseInt(window.getComputedStyle(monster,null).getPropertyValue('left'));
    const my = parseInt(window.getComputedStyle(monster,null).getPropertyValue('top'));

    const offset_x = Math.abs(dx - mx);
    const offset_y = Math.abs(dy - my);

    
    if (offset_x < 160 && offset_y < 80) {
        gameOver.style.visibility = 'visible'
        monster.classList.remove('dragonAnimaton');
        audio_over.play()
        setTimeout(() => {//for pausing audio
            audio_over.pause();
        }, 1000);
        setTimeout(() => {//for pausing audio
            audio.pause();
        }, 2000);
    }
    else if (cross && (offset_x < 160)) {
        sc += 1;
        updateScore(sc);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000)
        setTimeout(() => {
            var speed = parseFloat(window.getComputedStyle(monster, null).getPropertyValue('animation-duration'));
            speed -= 0.02;
            monster.style.animationDuration = speed + 's';
            console.log('New animation duration: ', speed)
        }, 500);    
    }    
}, 10)