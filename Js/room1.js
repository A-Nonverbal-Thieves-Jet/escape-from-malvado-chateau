'use strict'

//--------------- Global Vars -----------------//
roomText = "You find yourself in a dingy bedroom that smells faintly of mold. The fireplace offers no warmth, and a decrepit chair looms as if occupied. The dim light does little to calm your anxiety as the shadows seem to cling to you."

nextRoom = "room2.html"
let hall = '../images/hall.png';

let fireplaceText = [
  `You search the inside of the fireplace and spot a charred lever in the corner.`,
  `You give the lever a cautious pull and hear the nearby door click.`,
  `There fireplace holds only long-deserted ashes now.`,
];

let doorText = [
  `There is a door in the corner of the room. The door won't budge, but there is no discernable lock either.`,
  `The door swings open of its own volition, as if inviting you to proceed.`
];

let lightText = [
  `An old chandelier hangs from the ceiling, giving off a weak veridian glow.`
];
  
let chairText = [
`A lone chair rests in front of the fireplace, it looks like it hasn't been used in a long time.`
];

let shadowText = [
  `There are shadows all around you, filling you with a sense of dread. The foul specters don't seem to react to your presence, but you are unable to trace their source.`
];

let escapeText = `You proceed down a dark hallway, pushing past your fear. You know only one truth: You must escape.`

const hintArray = ['Check the fireplace?', 'Can you leave through the door?','Inspect the chandelier'];
let extraHint = 'Try the lever in the fireplace.';

const fireplaceDiv = document.getElementById('fireplace');
const doorDiv = document.getElementById('door');
const lightDiv = document.getElementById('light');
const chairDiv = document.getElementById('chair');
const shadowDiv = document.getElementById('shadows');

const room1Div = document.getElementById('room1');

//----------- Functions ------------//
function clickFireplace() {
  if (roomObjects[0].status1 == false) {
    displayText(roomObjects[0].text[0]);
    roomObjects[0].status1 = true;
    hintArray.push(extraHint);
  } else if (roomObjects[0].status2 == false) {
    displayText(roomObjects[0].text[1]);
    roomObjects[0].status2 = true;
  } else {
    displayText(roomObjects[0].text[2]);
  }
}

function clickDoor() {
  if (roomObjects[0].status2 == true) {
    displayText(roomObjects[1].text[1]);
    const shiftOk = document.getElementById('okButton');
    shiftOk.removeEventListener('click',okClick);
    shiftOk.addEventListener('click', function(){transition(room1Div, hall, escapeText, nextRoom)});
  } else {
    displayText(roomObjects[1].text[0]);
  }
}

function clickLights() {
  displayText(roomObjects[2].text[0]);
}

function clickChair() {
  displayText(roomObjects[3].text[0]);
}

function clickShadow() {
  displayText(roomObjects[4].text[0]);
}

//--------- objects ----------//
const fireplace = new Interactable ('fireplace', fireplaceText);
const door = new Interactable ('door', doorText);
const lights = new Interactable ('lights', lightText);
const chair = new Interactable ('chair', chairText);
const shadow = new Interactable ('shadows', shadowText);

roomObjects = [
  fireplace,
  door,
  lights,
  chair,
  shadow
];

fireplaceDiv.addEventListener('click', clickFireplace);
doorDiv.addEventListener('click', clickDoor);
lightDiv.addEventListener('click', clickLights);
chairDiv.addEventListener('click', clickChair);
shadowDiv.addEventListener('click', clickShadow);



initialize('room1');