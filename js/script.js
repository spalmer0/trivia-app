// Constants

//TODO: remove the '=6' and make a variable to represent the number of questions a user wants
const BASE_URL = 'https://opentdb.com/api.php?amount=6';


// Variables
let triviaData;


// Cached Element References
const $randBtnEl = $('#randBtn');
const $question = $('#question');
const $answers = $('#answers');
const $solveBtnEl = $('#solveBtn');
const $correct = $('#correct');


// Event Listeners
$randBtnEl.on('click', handleGetTrivia);
$solveBtnEl.on('click', handleGetSolution);

// Functions
function handleGetTrivia() {
    
    $.ajax(BASE_URL)
    .then(function(data) {
        triviaData = data;
        render();    
    }, function(error) {
        console.log('Error: ', error);
    })
}

function handleGetSolution() {
    $correct.text('Correct Answer: ' + triviaData.results[0].correct_answer);
}

function render() {
    $correct.text('');
    $question.text('Question: ' + triviaData.results[0].question);
    $answers.text('Choices: ' + triviaData.results[0].correct_answer + ', ' +triviaData.results[0].incorrect_answers);
}

// function getData(startURL){
//     const url = startURL ? startURL : BASE_URL;

//     $.ajax(url)
//     .then(function(data) {
//         if(startURL) {
//             triviaQuestion = data;
//             render(true);
//         } else {
//             triviaData = data;
//             render();
//         }
//     }, function(error) {
//         console.log('Error: ', error);
//     });
// }

// function handleClick(event) {
//     // const url = this.dataset.url; 
//     // getData(url);
//     const category = this.dataset.name;
//     console.log(event.target);
// }

// function generateUI() {
//     return triviaData.results.map(function(trivia) {
//         return `
//         <article data-url=${trivia.url}" class=card flex-ctr outline">
//             <h3>${trivia.category}</h3>
//             </article>`;
//     })
// }

// function render() {
//     $cardsEl.html(generateUI());
//     $question.text('Question: ' + triviaData.results[0].question);
// }

