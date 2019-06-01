'use strict';

const QUESTIONS = [

  {number: 1,  name: "Q: Andoria", answer: "Star Trek", Link: "<a href='https://memory-alpha.fandom.com/wiki/Andoria'target='_blank'> Want proof? </a>"},
  {number: 2,  name: "Q: Salacious Crumb ", answer: "Star Wars", Link: "<a href='https://starwars.fandom.com/wiki/Salacious_B._Crumb' target='_blank'> Want proof? </a>"},
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

const WRONG =[  
];

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
    const myProgress =generateProgress();
    //insert into DOM
   $('#quizzlet').removeClass('next-question');
   $('.js-questions').replaceWith(questionString);
   $('.js-questions').append(verifyButton);
   //$('.js-questions').append(myProgress);
   checkAnswer(id);
}

//function that checks the answer and shows button to select the next question then posts the status. 
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
     renderProgress(theQuestion.number); 
    }); 
 }

//Post the answer, add to the RIGHT array if correct, and WRONG array if incorrectand next button
function generateAnswer(thisGuess, theQuestion){
    console.log('`generateAnswer` ran'); 
      if(thisGuess === theQuestion.answer){
      RIGHT.push(theQuestion.number); 
      return `<section class ="js-questions questions answers" id="answer">
      <span>You Are correct!</span>`;
      }
      else {
         
          return `<section class ="js-questions questions answers" id="answer">
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
      if(count < 11){
      $('.js-buttons').replaceWith(nextButton);
      } else {
       $('.js-buttons').replaceWith(finalScore); 
      };
      const nextId = count + 1;
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
function generateProgress(number){
  $('.progress').remove();
  const currentCorrect = RIGHT.length;
  const total = number;
  console.log('correct =' )
  console.log(currentCorrect);
  console.log('total =')
  console.log(total);
  const percentage = currentCorrect/total * 100;
  console.log('`generateProgress` ran');
  return `<section class ="progress">
  <p>Question <span class="js-question-number">${currentCorrect}</span> of 10.</p>
  <p>So far you have gotten <span class="js-question-percentage">${percentage}</span>% correct.</p>
  </section>`;

};

function renderProgress(number){
  console.log('`renderProgress` ran');
  console.log(generateProgress());
  const myProgress = generateProgress(number);
  $('#quizzlet').after(myProgress);
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

$(handleQuiz);