const question=[
    {
        question:"Which type of programming language is JavaScript?",
        answer:[
            
                {text:"Procedural",correct:false},
                {text:"Object-Oriented",correct:false},
                {text:"Functional",correct:false},
                {text:"Scripting",correct:true}
            
        ]
    },
    {
        question:"What type of loop is the 'for...of' loop in JavaScript?",
        answer:[
            
                {text:"Preprocessor",correct:false},
                {text:"Conditional",correct:false},
                {text:"Iterative",correct:true},
                {text:"Asynchronous",correct:false},
            
        ]
    },
    {
        question:"Which keyword is used to declare a constant variable in JavaScript?",
        answer:[
            
                {text:"let",correct:false},
                {text:"var",correct:false},
                {text:"def",correct:false},
                {text:"const",correct:true},
            
        ]
    },
    {
        question:"What does the acronym 'DOM' stand for in the context of web development with JavaScript?",
        answer:[
            
                {text:"Document Object Model",correct:true},
                {text:"Data Object Model",correct:false},
                {text:"Document Oriented Markupdef",correct:false},
                {text:" Dynamic Object Management",correct:false},
            
        ]
    }
];
const questionElement=document.querySelector('#question');
const answerButtons=document.querySelector('.answer-btn');
const nextButton=document.querySelector('#next-btn');

let  currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next"
    showQuestion()
}
function showQuestion(){
    resetState()
    let currentQuestion=question[currentQuestionIndex];
    let questionNumber=currentQuestionIndex +1;
    questionElement.innerHTML=questionNumber + "."+currentQuestion.question;// question display from the question listed above

    currentQuestion.answer.forEach(answer=>{
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);//to display answers
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener('click',(e)=>{
            const selectedBtn=e.target;
            const isCorrect=selectedBtn.dataset.correct==="true";
            if(isCorrect){
                selectedBtn.classList.add("correct");
                score++;
            }
            else{
                selectedBtn.classList.add('incorrect')
            }
            Array.from(answerButtons.children).forEach(button=>{
                if(button.dataset.correct==="true"){
                    button.classList.add("correct");
                }
                button.disabled=true;
                nextButton.style.display="block";
            })
        })
    });
}
 function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
 }

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }
    else{
         showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<question.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${question.length} !`
    nextButton.innerHTML="Play Again"
    nextButton.style.display="block"
}
startQuiz();
