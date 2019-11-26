"use strict";
let words = ["COMMITTEE", "CIVILIZED", "COMMUNITY", "GRAPEFRUIT", "GRIFFIN", "ORANGUTAN", "TECHNIQUE", "UNCHARTED", "ELIMINATE", "LAMBORGHINI"];
let description = ["A group of people appointed for a specific function, typically consisting of members of a larger group.",
    "Polite and well-mannered.",
    "a feeling of fellowship with others, as a result of sharing common attitudes, interests, and goals.",
    "A large round yellow citrus fruit with an acid juicy pulp.",
    "A mythical creature with the head and wings of an eagle and the body of a lion",
    "Red-haired apes that live in the tropical rainforests of Sumatra and Borneo",
    "A way of carrying out a particular task",
    "An area of land or sea that is not mapped or surveyed.",
    "Completely remove or get rid of (something).",
    "Amir's favorite car brand"];
let score = 0;
let guesses = 0;
let ranks = [];
let displayed, word, desc;
let selector = randomGen(0, 10);

//TODO Display the letters within the word when guessed correctly
// Clear previous buttons if game resets

//random number generator from min to max exclusive
function randomGen(min, max){
    return Math.floor(Math.random() * max - min) + min;
}

//Generates all buttons dynamically
function Button(letter){ //BUTTON OBJECT CONSTRUCTOR -JAGUAR
    this.button = document.createElement("BUTTON")
    this.button.innerHTML = letter
    this.button.onclick = checkIn(letter, word, this.button)
    this.button.className = "button"
    document.body.appendChild(this.button)
}

function alphaButton(){
    for(let i = 0; i < 26; i++){
        let letter = String.fromCharCode(65 + i);
        new Button(letter);
    }
}

//checks if letter is inside word, increases score if it is, disables button TODO
function checkIn(letter, myword, btn){
    return function (){
        let check = false;
        for(let i = 0; i < myword.length; i++){
            if(letter === myword.charAt(i)){
                score++;
                document.getElementById("score").innerHTML = "SCORE: " + score;
                check = true;
            }
        }
        if(check){
        } else {
            score--;
            guesses += 1;
            hangmanDisplay(guesses);
            document.getElementById("guesses").innerHTML = "LIVES: " + (7 - guesses);
            document.getElementById("score").innerHTML = "SCORE: " + score;
        }
        btn.style.display = "none";
        displayWord(displayed, desc);
        if(guesses == 7){
            initialize();
        }
    }
}

//Generates a new word
function newWord(){
    let myword = words[selector];
    return myword;
}

//Generates a description
function newDescription(){
    let mydescription = description[selector];
    return mydescription
}

// displays word with spaces between each letter
function displayWord(myword, desc){
    let display = "";
    for(let i = 0; i < myword.length; i++){
        if(i != myword.length - 1){
            display += myword.charAt(i) + " ";
        } else {
            display += myword.charAt(i);
        }
    }
    document.getElementById("display").innerHTML = display;
    document.getElementById("desc").innerHTML = desc;
}

// Converts each letter in word to an _
function hideWord(myword){
    let hide = "";
    for(let i = 0; i < myword.length; i++){
        hide += "_";
    }
    return hide;
}

//initialize game
function initialize(){
    word = newWord();
    desc = newDescription();
    displayed = hideWord(word);
    displayWord(displayed, desc);
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("guesses").innerHTML = "LIVES: 7";
    document.getElementById("score").innerHTML = "SCORE: 0";
    alphaButton();
    score = 0;
    guesses = 0;
    hangmanDisplay(guesses);
    selector = randomGen(0, 10);
}

function hangmanDisplay(level){
    let hangman = document.getElementById('hangman_display');
    hangman.src = "img/h" + level + ".jpg"
}

//TODO Check if word is complete! (possibly check if each character is now a character)
//TODO Display letters when user guesses correctly
//TODO ANIMATIONS AND CSS MAKE THIS S*** NICE?

document.body.onload = initialize;
