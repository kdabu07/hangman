"use strict";
let words = ["COMMITTEE", "CIVILIZED", "COMMUNITY", "GRAPEFRUIT", "GRIFFIN", "ORANGUTAN", "TECHNIQUE", "UNCHARTED", "ELIMINATE", "LAMBORGHINI"];
let score = 0;
let ranks = [];
let word;
let displayed;
let guesses = 0;

//TODO Display the letters within the word when guessed correctly
// Clear previous buttons if game resets

//random number generator from min to max exclusive
function randomGen(min, max){
    return Math.floor(Math.random() * max - min) + min;
}

//Generates all buttons dynamically
function alphaButton(){
    for(let i = 0; i < 26; i++){
        let letter = String.fromCharCode(65 + i);
        let btn = document.createElement("BUTTON");
        btn.innerHTML = letter;
        btn.onclick = checkIn(letter, word, btn);
        btn.className = "button";
        document.body.appendChild(btn);
    }
}

//checks if letter is inside word, increases score if it is, disables button TODO
function checkIn(letter, myword, btn){
    return function (){
        guesses += 1;
        let check = false;
        for(let i = 0; i < myword.length; i++){
            if(letter === myword.charAt(i)){
                score++;
                check = true;
            }
        }
        if(check){
            alert("Correct!");
            //document.getElementById("image").src = "img/nice.jpg";
            //document.getElementById("image").style.display = "inline-block";
        } else {
            score--;
            alert("Wrong");
            //document.getElementById("image").src = "img/wrong.jpg";
            //document.getElementById("image").style.display = "inline-block";
        }
        btn.style.display = "none";
        displayWord(displayed);
        if(guesses == 7){
            initialize();
        }
    }
}

//Generates a new word
function newWord(){
    let myword = words[randomGen(0, 10)];
    return myword;
}

function displayWord(myword){
    let display = "";
    for(let i = 0; i < myword.length; i++){
        if(i != myword.length - 1){
            display += myword.charAt(i) + " ";
        } else {
            display += myword.charAt(i);
        }
    }
    document.getElementById("display").innerHTML = display;
}

function hideWord(myword){
    let hide = "";
    for(let i = 0; i < myword.length; i++){
        hide += "_";
    }
    return hide;
}

function initialize(){
    word = words[0];
    displayed = hideWord(word);
    displayWord(displayed);
    alphaButton();
    score = 0;
    guesses = 0;
}

document.body.onload = initialize;