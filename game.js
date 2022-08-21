const textContainer = document.querySelector('.text');
const modalWrap = document.querySelector('.modal-wrap');
const refreshBTN = document.querySelector('.refresh');
const main = document.querySelector('.main');

const cardsColor = ["red", "red", "blue", "blue", "violet", "violet", "greenyellow", "greenyellow", "forestgreen", "forestgreen", "cadetblue", "cadetblue", "rosybrown", "rosybrown", "yellow", "yellow", "peru", "peru"]

let cards = [...document.querySelectorAll('.card')];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];
const gamePairs = cards.length/2;
let gameResult = 0;


function clickCard () {
    activeCard = this;
    if(activeCard == activeCards[0]) return;

    activeCard.classList.remove('hidden');

    if(activeCards.length === 0){
        activeCards[0]=activeCard;
        return;
    }

    else {
        cards.forEach(card => {
            card.removeEventListener('click', clickCard);
        })
        
        activeCards[1] =activeCard;

        setTimeout(() => {
            if(activeCards[0].className === activeCards[1].className)
            {
                activeCards.forEach((card) => {
                    card.classList.add('off');
                })   
                gameResult++;
                cards = cards.filter(card => !card.classList.contains('off'));

                if(gameResult === gamePairs){
                    const endTime = new Date().getTime();
                    const time = (endTime - startTime)/1000;
                    modalWrap.classList.remove("none");
                    main.classList.add('blur');
                    textContainer.innerHTML = `You win! Your time is ${time}s!`
                }
            }
            else{
                activeCards.forEach((card) => {
                     card.classList.add('hidden');
                })
            }
            activeCard = '';
            activeCards.length = 0;
            cards.forEach( (card) => {
                card.addEventListener('click', clickCard)
            })
        }, 500)  
    }
}


function init () {
    cards.forEach( (card) => {
        const position = Math.floor(Math.random()* cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1); 
    })

    setTimeout(() => {
        cards.forEach( (card) => {
            card.classList.add('hidden');
            card.addEventListener('click', clickCard)
        })
    }, 2000);
}
refreshBTN.addEventListener('click', () => {
    modalWrap.classList.add("none");
    main.classList.remove('blur');
    location.reload();
})
init();