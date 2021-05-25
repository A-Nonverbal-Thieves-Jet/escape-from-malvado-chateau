'use strict'

const textBox = document.getElementById('textContent');
const textContainer = document.getElementById('textContainer');
const muteButton = document.getElementById('muteButton');
const muteImg = document.getElementById('muteImg');
// var audio = document.getElementById("audio"); 
// var playPauseBTN = document.getElementById('playPauseBTN');
// var count =0;
let audio = true;
const hintButton = document.getElementById('hintButton');
const hintBox = document.getElementById('taskbox');
let hints = false;
const item1 = document.getElementById('slot1');
const item2 = document.getElementById('slot2');
const item3 = document.getElementById('slot3');
const slotArray = [item1, item2, item3];
let currentInventory = [];
let roomText = '';
let nextRoom = '';


//Define constructor to store text for interactable objects on each room page
function Interactable(name,textArray){
this.name = name;
this.text = textArray;
}

//and one more for collectable item data
function Tool(name,imgpath){
  this.name = name;
  this.imgpath = imgpath;
  this.used = false;
}
//method to render tool image to inventory display
Tool.prototype.render = function(slot) {
  imgElem = document.createElement('img');
  imgElem.setAttribute('src',this.imgpath);
  if(this.used === true){
    imgElem.setAttribute('class','faded');
  }
  slot.appendChild(imgElem);
}

//update localStorage with current information
function updateStorage(){
  const stringInventory = JSON.stringify(currentInventory);
  localStorage.setItem('inventory', stringInventory);
}


//retrieve localStorage with inventory on each page, and display each inventory item. 
function initialize() {
  let playerInventory = localStorage.getItem('inventory');
  if(playerInventory) {
    currentInventory = JSON.parse(playerInventory);
    for (let i=0; i<currentInventory.length; i++){
      currentInventory[i].render(slotArray[i]);
    }
  } 
}

//add item to currentInventory on pickup
function addItem(tool) {
  currentInventory.push(tool);
  tool.render(slotArray[currentInventory.length-1]);
}

//toggle hint list display
  function displayHints(hintArray) {
      hintBox.innerHTML = '';
        if(hints == false){
          const ulElem = document.createElement('ul');
          hintBox.appenChild(ulElem);

          for(let i = 0; i < hintArray.length; i++){
            const liElem = document.createElement('li');
            liElem.textContent = hintArray[i];
            ulElem.appendChild(liElem);
          }
          hints = true;
    }
    else{
      hints = false;
    }
  }


//take text and put it in text box
function displayText(text) {
  textBox.textContent = text;
  const okButton = document.createElement('button');
  okButton.setAttribute('id','okButton');
  okButton.textContent = 'Ok';
  textContainer.appendChild(okButton);
  okButton.addEventListener('click',okClick);
}

// To remove the button
function okClick(){
  const okButton = document.getElementById('okButton');
  okButton.remove();
  textBox.textContent = roomText;
}

//display progression prompt in text box
function displayPrompt(text) {
  textBox.textContent = text;
  const continueButton = document.createElement('button');
  continueButton.setAttribute('id','continueButton');
  continueButton.textContent = 'Continue';
  textContainer.appendChild(continueButton);
  continueButton.addEventListener('click',continueClick);
  updateStorage();
}

//to redirect it to next page
function continueClick(){
  window.replace('nextRoom');
}


//toggle audio mute
function audioControl() {

}

// function playPause() { 
//   if(count == 0){
//     count = 1;
//     audio.play();
//   }else{
//     count=0;audio.pause();
//   }
// } 

function playAudioAndDisplayMuteButton() {
  // To play audio
  document.getElementById('audioplayer').play();

  // Display Pause and hide play button
  let pauseButton = document.getElementById('pauseButton');
  let playButton = document.getElementById('playButton');
  pauseButton.style.display = 'block';
  playButton.style.display = 'None';
}

function pauseAudioAndDisplayPlayButton() {
  // To play pause
  document.getElementById('audioplayer').pause();

  // Display Play and hide Pause button
  let pauseButton = document.getElementById('pauseButton');
  let playButton = document.getElementById('playButton');
  pauseButton.style.display = 'None';
  playButton.style.display = 'block';
}