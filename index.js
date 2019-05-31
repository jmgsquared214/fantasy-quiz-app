'use strict';

const QUESTIONS = [

  {number: 1,  name: "Q: Andoria", answer: "Star Trek", Link: "<a href='https://memory-alpha.fandom.com/wiki/Andoria'> More Info</a>"},
  {number: 2,  name: "Q: Salacious Crumb ", answer: "Star Wars", Link: "<a href='https://starwars.fandom.com/wiki/Salacious_B._Crumb'> More Info </a>"},
  {number: 3, name: "Q: Xemnu",  answer: "Marvel", Link: "<a href='https://marvel.fandom.com/wiki/Xemnu_(Earth-616)'>More Info</a>"},
  {number: 4, name: "Q: Sarlaac",  answer: "Star Wars", Link: "<a href='https://starwars.fandom.com/wiki/Sarlacc'>More Info</a>"},
  {number: 5, name: "Q: Anduin River", answer: "LOTR", Link: "<a href='https://lotr.fandom.com/wiki/Anduin'>More Info</a>"}, 
  {number: 6, name: "Q: Guinan", Answer: "Star Trek",  Link: "<a href='https://memory-alpha.fandom.com/wiki/Guinan'>More Info</a>"},
  {number: 7, name: "Q: Sakaar", Answer: "Marvel", Link: "<a href='https://marvelcinematicuniverse.fandom.com/wiki/Sakaar'>More Info</a>"},
  {number: 8, name: "Q: Kashyyk",  Answer: "Star Wars", Link:"<a href='https://starwars.fandom.com/wiki/Kashyyyk'>More Info</a>"}, 
  {number: 9, name: "Q: Radagast", Answer: "LOTR", Link: "<a href='https://lotr.fandom.com/wiki/Radagast'>More Info</a>"},
  {number: 10, name: "Q: Altamid", Answer: "Star Trek", Link: "<a href='https://memory-alpha.fandom.com/wiki/Altamid'>More Info</a>"}

   

];

const STATUS = [
    
]

//start the quiz
function handleStart(){
    $('#quizzlet').on('click', `#js-start`, event => {
        event.preventDefault();
        console.log('`handleStartingQuiz` ran');
        renderQuestion(1);
        
      });
    }



//function that shows the question
function generateQuestion(id){
  //need to add 1 each time
    const theQuestion = QUESTIONS.find(item => item.number === id);
    console.log(theQuestion);
    console.log('generateQuestion ran');
    return `
    <section class ="js-questions questions">
          <h4>Question <span id="js-question-number">${theQuestion.number}</span></h4>
          <p>${theQuestion.name}</p>
          <ul>
          <li> <input type="radio" class="options" value="Star Wars"> Star Wars</li>
          <li><input type="radio" class="options"  value="Star Trek"> Star Trek</li>
          <li><input type="radio" class="options"  value="LOTR"> Lord of the Rings</li>
          <li><input type="radio" class="options"  value="Marvel"> Marvel</li>
          </ul>
        </section> 
      <section class ="verify">    
        <button type="submit" id="verify">Verify</button>
      </section>`; 
  };



  function renderQuestion(id){
      console.log('renderQuestion ran');
      const questionString = generateQuestion(id);
      //insert into DOM
     $('.js-questions').removeClass('offer-to-start-quiz');
      $('.js-questions').replaceWith(questionString);
  }
 

//function that checks the answer and shows button to select the next question. 
function checkAnswer() {
    $('.content').on('click', `#verify`, event => {
      event.preventDefault();
      console.log('`checkAnswer` ran');
    // const thisItem = getItemIdFromElement(event.currentTarget);
    //  const theQuestion = QUESTIONS.find(item => item.number === id);
      
    });
  //  generateAnswer(thisItem, theQuestion);
  }


//Post the answer and next button
function generateAnswer(thisItem, theQuestion){
    console.log('`postAnswer` ran');
      if(thisItem === theQuestion.answer){
      return `<span>You Are correct!     
      </span>`;
      }
      else {
          return `<span> You are incorrect.
          The correct asnwer is ${theQuestion.answer} </span>`;
      }
  };


  function renderAnswer(){
      console.log('`renderAnswer` ran');
      const answerString = generateAnswer(thisItem, theQuestion);
      //insert into DOM
      $('js-questions').replaceWIth(answerString);
  }







function handleQuiz(){
    handleStart();
    
}

$(handleQuiz);