const searchInput = document.querySelector('#searchInput');
const submitBtn = document.querySelector('#submitBtn');
const displayWord = document.querySelector('.displayWord');
const meaningHeader = document.querySelector('#meaningHeader');
const mearningText = document.querySelector('#mearningText');
const exampleHeader = document.querySelector('#exampleHeader');
const exampleText = document.querySelector('#exampleText');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '23408bcd39msh088ced54605b515p101e99jsn6af5b8c840b1',
		'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
	}
};

document.addEventListener("DOMContentLoaded", function () {
    // Initially hide elements except header, searchContainer, and footer
    document.querySelectorAll(".main > *:not(.searchContainer)").forEach(function(element) {
        element.style.display = "none";
    });

    // Add event listener to the submit button
    submitBtn.addEventListener('click', submitWord);
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            submitWord();
        }
    });
});

function submitWord() {
    let word = searchInput.value;
    fetch('https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=' + word, options)
    .then(response => response.json())
    .then(response => 
        {
            let term = response.list[0]

            displayWord.innerHTML = word;

            meaningHeader.innerHTML = 'Definition';
            mearningText.innerHTML = term.definition;

            exampleHeader.innerHTML = 'Example';
            exampleText.innerHTML = term.example;

            // Show the hidden elements after hitting the button
            document.querySelectorAll(".main > *:not(.searchContainer)").forEach(function(element) {
                element.style.display = "block";
            });
        })
    .catch(err => console.error(err));
}