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
   
    console.log('generateQuestion ran');
    const theQuestion = QUESTIONS.find(item => item.number === id);
    console.log(theQuestion);
    
    return `
    <section class ="js-questions questions">
        <h4>Question <span id="js-question-number">${theQuestion.number}</span></h4>
        <p>${theQuestion.name}</p>
        <ul>
        <li><input type="radio" class="options" id="answerOption1" value="Star Wars"> Star Wars</li>
        <li><input type="radio" class="options" id="answerOption2" value="Star Trek"> Star Trek</li>
        <li><input type="radio" class="options" id="answerOption3" value="LOTR"> Lord of the Rings</li>
        <li><input type="radio" class="options" id="answerOption4" value="Marvel"> Marvel</li>
        </ul>
      </section> `;
    
  };

  function generateVerifyButton(){
    console.log('`generateVerifyButton` ran');
    return `
    <section class="js-buttons verify">
    <button type ="submit" id="verify">Verify</button>
    </section>`;
  };
    

  function renderQuestion(id){
      console.log('renderQuestion ran');
      const questionString = generateQuestion(id);
      const verifyButton = generateVerifyButton();
      //insert into DOM
     $('.js-questions').removeClass('offer-to-start-quiz');
     $('.js-questions').replaceWith(questionString);
     $('.js-questions').append(verifyButton);
     checkAnswer(id);
  }
 
  function renderNextQuestion(id){
    console.log('renderQuestion ran');
    const questionString = generateQuestion(id);
    const verifyButton = generateVerifyButton();
    //insert into DOM
   $('#quizzlet').removeClass('next-question');
   $('.js-questions').replaceWith(questionString);
   $('.js-questions').append(verifyButton);
   checkAnswer(id);
}


//function that checks the answer and shows button to select the next question. 
function checkAnswer(id) {
  
   $('#quizzlet').on('click', `#verify`, event => {
     event.preventDefault();
     console.log('`checkAnswer` ran');
    const thisGuess = $("input[name='answerOption']:checked").val();
    const theQuestion = QUESTIONS.find(item => item.number === id);
    console.log(thisGuess); 
    console.log(theQuestion);
    renderAnswer(thisGuess, theQuestion);
    disable();
    
    });
  
 }


//Post the answer and next button
function generateAnswer(thisGuess, theQuestion){
    console.log('`generateAnswer` ran');
    
      if(thisGuess === theQuestion.answer){
      return `
      <section class ="js-questions questions answers" id="answer">
      <span>You Are correct!     
      </span>`;
      }
      else {
          return `<section class ="js-questions questions answers" id="answer">
          <span> You are incorrect.</span>
          <span>The correct asnwer is ${theQuestion.answer} </span>`;
      }
     
  };

  function nextButton(){
    return `<section class ="next-question">    
    <button type="submit" id="next">Next Question</button>
    </section>`

  }


  function finalScore(){
    return `<section class="js-buttons questions">
    <button type="submit" id="final">Check Your Final Score</button>
    </section>`
  }

  function disable() {
    document.getElementById("answerOption1").disabled = true;
    document.getElementById("answerOption2").disabled = true;
    document.getElementById("answerOption3").disabled = true;
    document.getElementById("answerOption4").disabled = true;
  }
  
  function undisable() {
    document.getElementById("answerOption").disabled = false;
  }

  function renderAnswer(thisGuess, theQuestion){
      console.log('`renderAnswer` ran');
      const answerString = generateAnswer(thisGuess, theQuestion);

      //insert into DOM
      $('#answer').remove()
      $('.js-questions').prepend(answerString);
      const count = theQuestion.number;
      if(count < 11){
      $('.js-buttons').replaceWith(nextButton);
      } else {
       $('.js-buttons').replaceWith(finalScore); 
      };
      const nextId = count + 1;
      questionPrep(nextId);
      
  }

function questionPrep(nextId){
  $('#quizzlet').on('click', `#next`, event => {
    event.preventDefault();
    console.log('`questionPrep` ran');
    renderNextQuestion(nextId); 
  
  });
}






function handleQuiz(){
    handleStart();
    
}

$(handleQuiz);