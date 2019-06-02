'use strict';

const QUESTIONS = [

  {number: 1, name: "Q: Andoria", answer: "Star Trek", Link: "<a href='https://memory-alpha.fandom.com/wiki/Andoria'target='_blank'> Want proof? </a>"},
  {number: 2, name: "Q: Salacious Crumb ", answer: "Star Wars", Link: "<a href='https://starwars.fandom.com/wiki/Salacious_B._Crumb' target='_blank'> Want proof? </a>"},
  {number: 3, name: "Q: Xemnu",  answer: "Marvel", Link: "<a href='https://marvel.fandom.com/wiki/Xemnu_(Earth-616)' target='_blank'>Want proof? </a>"},
  {number: 4, name: "Q: Sarlaac",  answer: "Star Wars", Link: "<a href='https://starwars.fandom.com/wiki/Sarlacc' target='_blank'>Want proof? </a>"},
  {number: 5, name: "Q: Anduin River", answer: "LOTR", Link: "<a href='https://lotr.fandom.com/wiki/Anduin' target='_blank'>Want proof? </a>"}, 
  {number: 6, name: "Q: Guinan", answer: "Star Trek",  Link: "<a href='https://memory-alpha.fandom.com/wiki/Guinan' target='_blank'>Want proof? </a>"},
  {number: 7, name: "Q: Sakaar", answer: "Marvel", Link: "<a href='https://marvelcinematicuniverse.fandom.com/wiki/Sakaar' target='_blank'>Want proof? </a>"},
  {number: 8, name: "Q: Kashyyk",  Answer: "Star Wars", Link:"<a href='https://starwars.fandom.com/wiki/Kashyyyk' target='_blank'>Want proof? </a>"}, 
  {number: 9, name: "Q: Radagast", Answer: "LOTR", Link: "<a href='https://lotr.fandom.com/wiki/Radagast' target='_blank'>Want proof? </a>"},
  {number: 10, name: "Q: Altamid", Answer: "Star Trek", Link: "<a href='https://memory-alpha.fandom.com/wiki/Altamid' target='_blank'>Want proof? </a>"}
];

const RIGHT = [    
];

const WRONG = [
];

//start the quiz
function handleStart(){
    $('#quizzlet').on('click', `#js-start`, event => {
        event.preventDefault();
        console.log('`handleStartingQuiz` ran');
        renderFirstQuestion();   
      });
    }

//function that shows the question
function generateQuestion(id){
  //need to add 1 each time
    console.log('generateQuestion ran');
    const theQuestion = QUESTIONS.find(item => item.number === id);
    console.log('generate questions id' + id);
    console.log(theQuestion);   
    return `
    <section class ="js-questions questions">
        <h4>Question <span id="js-question-number">${theQuestion.number}</span> of 10.</h4>
        <p>${theQuestion.name}</p>
        <ul>
        <li><input type="radio" class="options" name="answerOption" id="answerOption1" value="Star Wars"> Star Wars</li>
        <li><input type="radio" class="options" name="answerOption" id="answerOption2" value="Star Trek"> Star Trek</li>
        <li><input type="radio" class="options" name="answerOption" id="answerOption3" value="LOTR"> Lord of the Rings</li>
        <li><input type="radio" class="options" name="answerOption" id="answerOption4" value="Marvel"> Marvel</li>
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
    

  function renderFirstQuestion(){
      console.log('renderFirstQuestion ran');
      const questionString = generateQuestion(1);
      const verifyButton = generateVerifyButton();
      //insert into DOM
     $('.js-questions').removeClass('offer-to-start-quiz');
     $('.js-questions').replaceWith(questionString);
     $('.js-questions').append(verifyButton);
     checkAnswer(1);
  }
 
  function renderNextQuestion(nextId){
    console.log('renderQuestion ran');
    const questionString = generateQuestion(nextId);
    const verifyButton = generateVerifyButton();

    //insert into DOM
   $('#quizzlet').removeClass('next-question');
   $('.js-questions').replaceWith(questionString);
   $('.js-questions').append(verifyButton);
   checkAnswer(nextId);
}

// loop through an array of objects and find the objects that matches the name key
function findByNumber(id){
  for (let i=0; i < QUESTIONS.length; i++){
    if (QUESTIONS[i].number === id){
      return QUESTIONS[i];
    }
  }
}


//function that checks the answer and shows button to select the next question then posts the status. 
function checkAnswer(id) { 
   $('#quizzlet').on('click', `#verify`, event => {
     event.preventDefault();
     console.log('`checkAnswer` ran');
     let thisGuess = null;
     let theQuestion = null;
     console.log('guess after null '+ thisGuess);
     console.log('the Question variable prior to loading it' + theQuestion);
     thisGuess = $("input[name='answerOption']:checked").val();
     //theQuestion =$.grep(QUESTIONS, function(item){ return item.number === id;});
     //theQuestion = QUESTIONS.find(item => item.number === id);
     //attempting to use a separate function to try to limit the redudant runs. 
     theQuestion = findByNumber(id);
     console.log(id);
     console.log(thisGuess); 
     console.log(theQuestion);
     renderAnswer(thisGuess, theQuestion);
     disable(); 
     renderProgress(); 
    }); 
 }

//Post the answer, add to the RIGHT array if correct, and WRONG array if incorrectand next button
function generateAnswer(thisGuess, theQuestion){
    console.log('`generateAnswer` ran'); 
      if(thisGuess === theQuestion.answer){
      RIGHT.push(theQuestion.number); 
      return `<section class ="js-questions answers" id="answer">
      <span>You Are correct!</span>`;
      }
      else if(thisGuess !== theQuestion.answer) {  
        WRONG.push(theQuestion.number);
          return `<section class ="js-questions answers" id="answer">
          <span>You are incorrect.</span>
          <span>The correct asnwer is ${theQuestion.answer}. ${theQuestion.Link} </span>`;
      };    
  };

  //run the GenerateAnswer and render it to the DOM, adding Next buttons or Final score button
  function renderAnswer(thisGuess, theQuestion){
      console.log('`renderAnswer` ran');
      const answerString = generateAnswer(thisGuess, theQuestion);

      //insert into DOM
      $('#answer').remove()
      $('.js-questions').prepend(answerString);
      const count = theQuestion.number;
      if(count < 10){
      $('.js-buttons').replaceWith(nextButton);
      } else {
       $('.js-buttons').replaceWith(finalScore); 
      };
      let nextId = (count + 1);
      console.log('print the next id');
      console.log(nextId);
      questionPrep(nextId); 
      
      
  }

  //attach the listener 
function questionPrep(nextId){
  $('#quizzlet').on('click', `#next`, event => {
    event.preventDefault();
    console.log('`questionPrep` ran');
    renderNextQuestion(nextId); 
    
    
  });
}

//calculate the correct score and percentage score the run them through render. 
function generateProgress(){
  const currentCorrect = RIGHT.length;
  const currentWrong = WRONG.length;
  
  console.log('`generateProgress` ran');
  return `<section class ="progress">
  <p>You currently have <span class="js-question-number">${currentCorrect}</span> and ${currentWrong}.</p>
  </section>`;
  
  
};

function renderProgress(){
  console.log('`renderProgress` ran');
  $('.progress').remove();
  const myProgress = generateProgress();
  $('#quizzlet').append(myProgress);
};

function nextButton(){
  return `<section class ="next-question">    
  <button type="submit" id="next">Next Question</button>
  </section>`;
};

function finalScore(){
  return `<section class="js-buttons next-question">
  <button type="submit" id="final">Check Your Final Score</button>
  </section>`;
};

function finalFeedback() { 
  $('#quizzlet').on('click', `#final`, event => {
    event.preventDefault();
    console.log('`finalFeedback` ran');
    $('.js-questions').remove();
    renderProgress(10); 
   }); 
}



//Don't let people change the answer after they are corrected. 
function disable() {
  document.getElementById("answerOption1").disabled = true;
  document.getElementById("answerOption2").disabled = true;
  document.getElementById("answerOption3").disabled = true;
  document.getElementById("answerOption4").disabled = true;
}

function undisable() {
  document.getElementById("answerOption").disabled = false;
}




function handleQuiz(){
    handleStart();
    
}

$(handleQuiz());