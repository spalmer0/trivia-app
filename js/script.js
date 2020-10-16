// Constants

//TODO: remove the '=6' and make a variable to represent the number of questions a user wants
const BASE_URL = 'https://opentdb.com/api.php?amount=6';
const CATEGORY_URL = 'https://opentdb.com/api_category.php';


// Variables
let triviaData;


// Cached Element References
const $cardsEl = $('#cards');
const $randBtnEl = $('#randBtn');
const $question = $('#question');
const $answers = $('#answers');
const $solveBtnEl = $('#solveBtn');
const $correct = $('#correct');


// Event Listeners
$cardsEl.on('click', 'article', handleClick);

// Functions
init();

function init() {
    getData();
}

function getData() {
    $.ajax(BASE_URL)
    .then(function(data) {
        triviaData = data;
        render();
    }, function(error) {
        console.log('Error: ', error);
    });
}
function handleClick() {
    
}

function generateUI() {
    return triviaData.results.map(function(trivia) {
        return `
            <article class="card flex-ctr outline">
                <h3>${trivia.category}</h3>
            </article>`;
    });
}

function render() {
    $cardsEl.html(generateUI());
}

