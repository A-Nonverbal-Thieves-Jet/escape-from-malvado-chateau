'use strict'

const textBox = document.getElementById('textContent');
const muteButton = document.getElementById('muteButton');
const hintButton = document.getElementById('hintButton');
const item1 = document.getElementById('slot1');
const item2 = document.getElementById('slot2');
const item3 = document.getElementById('slot3');
const slotArray = [item1, item2, item3];
let currentInventory = [];

//Define constructor to store text for interactable objects on each room page
function Interactable(name,textArray){
this.name = name;
this.text = textArray;
}

//and one more for collectable item data
function Tool(name,imgpath){
  this.name = name;
  this.imgpath = imgpath;
}
//method to render tool image to inventory display
Tool.prototype.render = function(slot) {
  imgElem = document.createElement('img');
  imgElem.setAttribute('src',this.imgpath);
  slot.appendChild(imgElem);
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

}

//take text and put it in text box
function displayText(text) {

}

//display progression prompt in text box
function displayPrompt(text) {

}

//toggle audio mute
function audioControl() {

}