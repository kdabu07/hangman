"use strict";
let words = ["COMMITTEE", "CIVILIZED", "COMMUNITY", "GRAPEFRUIT", "GRIFFIN", "ORANGUTAN", "TECHNIQUE", "UNCHARTED", "ELIMINATE", "LAMBORGHINI", "TATTOO", "ELECTRICITY"];
let description = ["A group of people appointed for a specific function, typically consisting of members of a larger group.",
    "Polite and well-mannered.",
    "a feeling of fellowship with others, as a result of sharing common attitudes, interests, and goals.",
    "A large round yellow citrus fruit with an acid juicy pulp.",
    "A mythical creature with the head and wings of an eagle and the body of a lion",
    "Red-haired apes that live in the tropical rainforests of Sumatra and Borneo",
    "A way of carrying out a particular task",
    "An area of land or sea that is not mapped or surveyed.",
    "Completely remove or get rid of (something).",
    "Amir's favorite car brand",
    "A form of body modification where a design is made by inserting ink.",
    "The set of physical phenomena associated with the presence of physichal "];
let score = 0;
let guesses = 0;
let ranks = [];
let displayed, word, desc;
let selector = randomGen(0, 12);


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
    document.getElementById("buttons").appendChild(this.button)
}

function alphaButton(){
    for(let i = 0; i < 26; i++){
        let letter = String.fromCharCode(65 + i);
        new Button(letter);
    }
}

//checks if letter is inside word, increases score if it is, disables button
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
        displayLetter(displayed, letter, word);
    }
}

// Replace blanks with correct letter and calls win condition function
function displayLetter(myword, letter, word){ // by jaguar
    let display = "";
    let mywordarr = myword.split("")
    for(let i = 0; i < myword.length; i++){
        if(i != myword.length){
            if(letter === word.charAt(i)){
                display = display + letter + " ";
                mywordarr[i] = letter
            } else {
                display += myword.charAt(i) + " ";
            }
        } else {
            display += myword.charAt(i);
        }
    }
    displayed = mywordarr.join("")
    document.getElementById("display").innerHTML = display;
    checkWincondition(display, word)
}
// Checks win and lose condition, prompt name, display score and hides buttons.
function checkWincondition(display, word){ // by jaguar
    let currentdisplay = display.split(" ")
    currentdisplay = currentdisplay.join("")
    if (currentdisplay == word || guesses >= 7){
        name = prompt("Please enter your name")
        document.getElementById("desc").innerHTML = name + ", your score is " + score
        document.getElementById("buttons").style.display = "none"
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
    selector = randomGen(0, 12);
    resetGame();
}

//reset button
function resetGame(){
    let resetButton = document.getElementById('resetButton');
    document.getElementById("buttons").style.display = "block";
    resetButton.onclick = initialize;
}

//display hangman image
function hangmanDisplay(level){
    let hangman = document.getElementById('hangman_display');
    hangman.src = "img/h" + level + ".jpg"
}


document.body.onload = initialize;
