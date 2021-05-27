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
let roomObjects = [];
let roomText = '';
let nextRoom = '';

//Define constructor to store text for interactable objects on each room page
function Interactable(name,textArray){
this.name = name;
this.text = textArray;
this.status1 = false;
this.status2 = false;
}

//and one more for collectable item data
function Tool(name,imgPath){
  this.name = name;
  this.imgPath = imgPath;
  this.used = false;
}
//method to render tool image to inventory display
Tool.prototype.render = function(slot) {
  let imgElem = document.createElement('img');
  imgElem.setAttribute('src',this.imgPath);
  if(this.used === true){
    imgElem.setAttribute('class','faded');
  }
  slot.appendChild(imgElem);
}

//update localStorage with current information
function updateStorage(roomNumber){
  const stringInventory = JSON.stringify(currentInventory);
  localStorage.setItem('inventory', stringInventory);
  const stringObjects = JSON.stringify(roomObjects);
  localStorage.setItem(roomNumber, stringObjects);
}


//retrieve localStorage with inventory on each page, and display each inventory item. 
function initialize(roomNumber) {
  let playerInventory = localStorage.getItem('inventory');
  if(playerInventory) {
    let slotCount = 0;
    let rawInventory = JSON.parse(playerInventory);
    for (let rawTool of rawInventory) {
      let newTool = new Tool(rawTool.name, rawTool.imgPath);
      newTool.used = rawTool.used;
      currentInventory.push(newTool)
      newTool.render(slotArray[slotCount]);
      slotCount++;
    }
  } 
  let stringRoom = localStorage.getItem(roomNumber);
  if (stringRoom) {
    roomObjects = JSON.parse(stringRoom);
  }
}
//build a tool
function makeTool(name, imgPath) {
  let tool = new Tool(name, imgPath);
  currentInventory.push(tool);
}

//add item to currentInventory on pickup
function addItem(tool) {
  currentInventory.push(tool);
  tool.render(slotArray[currentInventory.length-1]);
}

//check currentInventory for toolName
function checkInventory(toolName) {
  for (let tool of currentInventory) {
    if (tool.name == toolName) {
      return true
    }
  }
return false
}

//toggle hint list display
  function displayHints() {
      hintBox.innerHTML = '';
        if(hints == false){
          const ulElem = document.createElement('ul');
          hintBox.appendChild(ulElem);

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
  const notOk = document.getElementById('okButton');
  if (notOk) {
    notOk.remove();
  }
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
function displayPrompt(text, roomNumber) {
  const notOk = document.getElementById('okButton');
  if (notOk) {
    notOk.remove();
  }
  const notContinue = document.getElementById('continueButton');
  if (notContinue) {
    notContinue.remove();
  }
  textBox.textContent = text;
  const continueButton = document.createElement('button');
  continueButton.setAttribute('id','continueButton');
  continueButton.textContent = 'Continue';
  textContainer.appendChild(continueButton);
  continueButton.addEventListener('click',continueClick);
  updateStorage(roomNumber);
}

//to redirect it to next page
function continueClick(){
  window.location = nextRoom;
}

//--------- Transition to Hall ---------//
function transition(div, image, text, room) {
  div.innerHTML = '';
  const newImage = document.createElement('img');
  newImage.setAttribute('id', 'transition');
  newImage.setAttribute('src', image);
  room1Div.appendChild(newImage);
  displayPrompt(text, room);
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
  pauseButton.style.display = 'contents';
  playButton.style.display = 'none';
}

function pauseAudioAndDisplayPlayButton() {
  // To play pause
  document.getElementById('audioplayer').pause();

  // Display Play and hide Pause button
  let pauseButton = document.getElementById('pauseButton');
  let playButton = document.getElementById('playButton');
  pauseButton.style.display = 'None';
  playButton.style.display = 'contents';
}

hintButton.addEventListener('click', displayHints);