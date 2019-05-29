'use strict';

const QUESTIONS = [

  {id: 1,  name: "Q: Andoria", answer: "Star Trek", Link: "<a href='https://memory-alpha.fandom.com/wiki/Andoria'> More Info</a>"},
  {id: 2,  name: "Q: Salacious Crumb ", answer: "Star Wars", Link: "<a href='https://starwars.fandom.com/wiki/Salacious_B._Crumb'> More Info </a>"},
  {id: 3, name: "Q: Xemnu",  answer: "Marvel", Link: "<a href='https://marvel.fandom.com/wiki/Xemnu_(Earth-616)'>More Info</a>"},
  {id: 4, name: "Q: Sarlaac",  answer: "Star Wars", Link: "<a href='https://starwars.fandom.com/wiki/Sarlacc'>More Info</a>"},
  {id: 5, name: "Q: Anduin River", answer: "LOTR", Link: "<a href='https://lotr.fandom.com/wiki/Anduin'>More Info</a>"}, 
  {id: 6, name: "Q: Guinan", Answer: "Star Trek",  Link: "<a href='https://memory-alpha.fandom.com/wiki/Guinan'>More Info</a>"},
  {id: 7, name: "Q: Sakaar", Answer: "Marvel", Link: "<a href='https://marvelcinematicuniverse.fandom.com/wiki/Sakaar'>More Info</a>"},
  {id: 8, name: "Q: Kashyyk",  Answer: "Star Wars", Link:"<a href='https://starwars.fandom.com/wiki/Kashyyyk'>More Info</a>"}, 
  {id: 9, name: "Q: Radagast", Answer: "LOTR", Link: "<a href='https://lotr.fandom.com/wiki/Radagast'>More Info</a>"},
  {id: 10, name: "Q: Altamid", Answer: "Star Trek", Link: "<a href='https://memory-alpha.fandom.com/wiki/Altamid'>More Info</a>"}

   

];

const STATUS = [
    
]


//Post the answer and next button
function postAnswer(id){
    const item = QUESTIONS.id;
    return `
    <section class="answers">
    <span class="answer">
    ${item.answer}
    </span>
    
      <button class="next-item">
          <span class="button-label">next</span>
      </button>
   
  </section>`;
  };


//function that shows the question
function postQuestion(id){
  
    const item = QUESTIONS.find(item => item.id === id);
    console.log('postQuestionStartIsRunning');
    return `
    
    <section class= "nextQuestions">
    ${id.name}
   
   
      <button class="bestGuess">
          <span class="Star Wars">Star Wats</span>
      </button>
      <button class="bestGuess">
          <span class="Star Trek">Star Trek</span>
      </button>
      <button class="bestGuess">
          <span class="LOTR">LOTR</span>
      </button>
      <button class="bestGuess">
          <span class="Marvel">Marvel</span>
      </button>
    
  </section>`;
  };

    

//function that checks the answer and shows button to select the next question. 
function checkAnswer() {
    $('.quizzlet').on('click', `.choice`, event => {
      console.log('`handleCheckAnswer` ran');
      const thisItem = getItemIdFromElement(event.currentTarget);
      if(thisItem.answer === choice.name){
          `<span>You Are correct!     
          </span>
          }
          else {<span>
              You are incorrect.
              The correct asnwer is ${postAnswer};
          </span>`
          }
    });
    postAnswer(thisItem);
  }


//function shows if answer upon submit the first time and {next item}

function nextQuestion() {
    $('.js-').on('click', `.js-item-delete`, event => {
      console.log('`handleDeleteItemClicked` ran');
      const removedItem = getItemIdFromElement(event.currentTarget);
      removeListItemMarkedDelete(removedItem);
      renderShoppingList();
    });
  }

//function that shows which question out of ten

//start the quiz
function handleStart(){
$('#quizzlet').on('click', `#js-start`, event => {
    event.preventDefault();
    console.log('`handleStartingQuiz` ran');
    postQuestion(1);
  });
}

handleStart();