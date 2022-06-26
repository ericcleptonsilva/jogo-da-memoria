const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
const backgroundSound = new Audio('./assets/sounds/background-sound.mp3');
const gotItRightSound = new Audio('assets/sounds/got-it-right.mp3');
const wrongSound = new Audio('assets/sounds/wrong.wav');
const clickSound = new Audio('./assets/sounds/click.wav');
const victory = new Audio('./assets/sounds/victory.mp3');
let count = 0; 
let score = 0;
const textValue = document.querySelector('.contador');



//função para virar carta
function flipCard() {
    clickSound.play();
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    
    
    secondCard = this;
    hasFlippedCard = false;      
    checkForVictory(); 
    checkForMatch();
  
}

//função que checa se as cartas são iguais
function checkForMatch() {  
    if(firstCard.dataset.card === secondCard.dataset.card) {                
        disableCards();        
        setTimeout(() => {
            gotItRightSound.play();
        } , 1000);
        return;
    }else{
        setTimeout(() => {
            wrongSound.play();
        }, 900);
    }
    unflipCards();
 
}


//função que desabilita as cartas
function disableCards() {    
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 2500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })  
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

function checkForVictory(){

    if(secondCard.dataset.card === firstCard.dataset.card){
        ++count; 
        if(count === cards.length/2){
            setTimeout(() => {
                victory.play();             
                cards.forEach(card => {
                    card.classList.remove('flip');
                    setTimeout(() => {
                        let randomPositionFinal = Math.floor(Math.random() * 12);
                        card.style.order = randomPositionFinal;
                    } , 1000);
                    
                });
                score +=1;
                textValue.innerHTML =  score
                count = 0; 
            } , 2000);
            
            resetBoard();
            return;
        }  
        
        return;
    }    
    lockBoard = true;
    cards.forEach(card => card.addEventListener('click', flipCard));
    return;
};
