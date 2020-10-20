// Constants

//TODO: remove the '=6' and make a variable to represent the number of questions a user wants
const BASE_URL = 'https://opentdb.com/api.php?amount=';

// Variables
let triviaData, userInput;


// Cached Element References
const $form = $('form');
const $input = $('input[type="text"]');
const $cardsEl = $('#cards');
const $question = $('#question');
const $answers = $('#answers');
const $correct = $('#correct');
const $modal = $('#modal');
const $result = $('#result');

// Event Listeners
$form.on('submit', getData);
$cardsEl.on('click', 'article', handleClick);
$modal.on('click', handleGuess);

// Functions
function getData(event) {
    event.preventDefault();
    userInput = $input.val();
    
    if (userInput === '') {
        alert('Please enter a number of questions.');
    } else {
        $.ajax(BASE_URL + userInput)
        .then(function (data) {
            triviaData = data;
            render();

        }, function (error) {
            alert('Error');
            console.log('Error: ', error);
        });

    }
    
   }

function handleClick() {
    $result.html("");
    const quest = this.dataset.question;
    const index = this.dataset.index;
    render(quest, index);
}

function generateUI() {
    return triviaData.results.map(function (trivia, index) {
        return `
            <article data-index="${index}" data-question="${trivia.question}"class="card flex-ctr outline">
                <h3>${trivia.category}</h3>
            </article>`;
    });
}

function handleGuess(event) {
    const choice = event.target.dataset.choice;
    const correct = event.target.dataset.correct;
    if (choice === correct) {
        $result.html("Congratulations! You chose the correct answer.");
    } else {
        $result.html("Incorrect.  The correct answer is: " + correct);
    }

}


function generateAnswerUI(questionIndex) {
    // return a html form with answer widgets
    const question = triviaData.results[questionIndex];
    const answersArray = triviaData.results[questionIndex].incorrect_answers;
    const correctAnswer = triviaData.results[questionIndex].correct_answer;
    answersArray.push(correctAnswer);
    const randomAnsArr = randomizeAnswers(answersArray);

    return randomAnsArr.map(function (choice) {
        return `<button data-correct="${correctAnswer}" data-choice="${choice}">${choice}</button>`

    });
    
}

function randomizeAnswers(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



function render(question, index) {
    if (question && index) {
        $question.text(question);
        $('#answers').html(`<div>${generateAnswerUI(index).join("")}</div>`);
        $modal.modal();

    } else {
        $cardsEl.html(generateUI());


    }
}