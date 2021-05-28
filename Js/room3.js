'use strict'
console.log('the chateau breaths');
//--------------- Global Vars -----------------//
roomText = 'The dark hallways of the Malvado Chateau have deposited you in a lounge crowded with furniture and inhabited by a lonely doll. A door stands in the corner, barring your path.'

nextRoom = 'victory.html'
const room3Div = document.getElementById('room3');
const stairs = '../images/hall.png';
const creepyKid = '../images/hall.png';
const room = 'room3';
const hintArray = ['hint1','hint2','hint3','hint4','hint5','hint6','hint7','hint8'];

let escape1 = 'You emerge from the lounge, and see a faint glimpse of light ahead. Rounding the corner reveals a curved staircase and hope: A door to the outside.'

let escape2 = 'Just as you reach for the door, you feel frozen in place. To your left, a mysterious figure robed in black seems to stare into your very soul. A young voice snickers, "Run while you can!"'


let dollText = [
  'There is a note in the hair of the doll. I bears a cryptic message: "I have a face that does not smile or frown. I have no mouth, but I make a familiar sound."',
  'The ominous doll sits on the table staring at you with knowing eyes.'
];

let clockText = [
  'A grandfather clock with a large golden pendulum haunts the corner of the lounge',
  'You wrest open the old door of the grandfather clock, and find another note: "I am the guardian of the Chateau\'s wall, my heart is its treasure."',
  'The clock remains open, but you don\'t spot any other oddities'
];

let drawerText = [
  'The table protecting the wall is littered with books and other oddities. An old lock seals the drawer',
  'The table must be the guardian, but the drawer is locked. Perhaps there is a way to open it hidden in the room.',
  'You fumble with the lockpicks for several minutes, at first to little effect. After some effort and a broken hook pick, the lock spirings free.',
  'With the drawer open, it is revealed to be filled with doll heads. Another message is jammed between the heads: "I capture memories on my face. The people I know can only watch as the ages pass them by."',
  'You find the prospect of searching the dollheads further to be quite unsettling'
];

let rugText = [
  'You notice a lump in the rug as step around it. Pulling up at the corner of the rug reveals a set of picks and wrenches in a small leather pouch'
];

let portraitText = [
  'A painting looms on the wall, its grim inhabitants stare down at you.',
  'You stop and consider the painting... it looks heavy, but there can be only one answer... You remove the painting from the wall, and find a shining key hidden behind it.',
  'Having replaced the painting on the wall, you glance back at it once more. The men in the painting seem impressed somehow.'
];

let doorText = [
  'Where could this door lead? The lock seems to have no intention of imparting that information.',
  'You try your newfound lockpicks on the door\'s lock, but none of the pins find any purchase within.',
  'As soon as the key is inserted, the lock clicks open without your turning it, clearing the way forward.'
];

let mirrorText = [
  'You search the mirror for any secrets, only to find your own face staring back at you, looking rather worse for wear.'
];

let sofaText = [
  'You take a moment to sit, and find that you have joined a stack of old documents. Their faded print offers no guidance.'
];


const dollDiv = document.getElementById('doll');
const clockDiv = document.getElementById('clock');
const drawerDiv = document.getElementById('drawer');
const rugDiv = document.getElementById('rug');
const portraitDiv = document.getElementById('portrait');
const doorDiv = document.getElementById('door');
const mirrorDiv = document.getElementById('mirror');
const sofaDiv = document.getElementById('sofa');

//----------- Puzzle Functions ------------//

function clickDoll() {
  console.log('clicked doll!');
  if (roomObjects[1].status1 == true) {
    displayText(roomObjects[0].text[1]);
  } else {
    displayText(roomObjects[0].text[0]);
    roomObjects[0].status1 = true;
  }
} 

function clickClock() {
  console.log('(tick tock) clicked clock!');
  if (roomObjects[0].status1 == false) {
    displayText(roomObjects[1].text[0]);
  } else if (roomObjects[2].status1 == false) {
    displayText(roomObjects[1].text[1]); 
    roomObjects[1].status1 = true;
  } else {
    displayText(roomObjects[1].text[2]);
  }
}

function clickDrawer() {
  console.log('clicked drawer!');
  if (roomObjects[1].status1 == false) {
    displayText(roomObjects[2].text[0])
  } else if (roomObjects[4].status1 == true){
    displayText(roomObjects[2].text[4]);
  } else if (roomObjects[2].status2 == true) {
    displayText(roomObjects[2].text[3]);
    roomObjects[2].status1 = true;
  } else {
    if (checkInventory('Lockpicks')) {
      displayText(roomObjects[2].text[2]);
      roomObjects[2].status2 = true;
    } else {
      displayText(roomObjects[2].text[1]);
    }
  }
}

function clickRug(){
  if (!checkInventory('Lockpicks')) {
  displayText(roomObjects[3].text[0]);
  addItem(lockpick);
  rugDiv.removeEventListener('click',clickRug);
  }
}
function clickPortrait(){
  console.log('clicked portrait!');
  if (roomObjects[2].status1 == false) {
    displayText(roomObjects[4].text[0]);
  } else if (roomObjects[4].status1 == false) {
    displayText(roomObjects[4].text[1]);
    addItem(key); 
    roomObjects[4].status1 = true;
  } else {
    displayText(roomObjects[4].text[2]);
  }
}
function clickDoor(){
  if (checkInventory('Lounge Key')) {
    displayPrompt(roomObjects[5].text[2],'room3');
  } else if (checkInventory('Lockpicks')){
    displayText(roomObjects[5].text[1]);
  } else {
    displayText(roomObjects[5].text[0]);
  }
}

function clickMirror(){
  displayText(roomObjects[6].text[0]);
}

function clickSofa(){
  displayText(roomObjects[7].text[0]);
}
//---------Ending Sequence-------//
function endTransition(div, image) {
  div.innerHTML = '';
  const newImage = document.createElement('img');
  newImage.setAttribute('id', 'transition');
  newImage.setAttribute('src', image);
  div.appendChild(newImage);

  textBox.textContent = escape1;
  const notOk = document.getElementById('okButton');
  if (notOk) {
    notOk.remove();
  }
  const endButton = document.createElement('button');
  endButton.setAttribute('id','continueButton');
  endButton.textContent = 'Descend the Stairs';
  textContainer.appendChild(endButton);
  endButton.addEventListener('click', endClick);
}

function endClick() {
  transition(room3Div,creepyKid,escape2);
  let finButton = document.getElementById('continueButton');
  finButton.textContent = 'Escape the Chateau';
  localStorage.clear();
}


//--------- objects ----------//
const lockpick = new Tool ('Lockpicks','../images/interface-vectors/lockPick-vector.png');
const key = new Tool ('Lounge Key', '../images/interface-vectors/key-vector.png');

const doll = new Interactable ('doll',dollText);
const clock= new Interactable ('clock',clockText);
const drawer= new Interactable ('drawer',drawerText);
const rug = new Interactable ('rug',rugText);
const portrait = new Interactable ('portrait',portraitText);
const door = new Interactable ('door',doorText);
const mirror= new Interactable ('mirror',mirrorText);
const sofa = new Interactable ('sofa',sofaText);

roomObjects = [
  doll,
  clock,
  drawer,
  rug,
  portrait,
  door,
  mirror,
  sofa
];


//Event Listeners
dollDiv.addEventListener('click',clickDoll);
clockDiv.addEventListener('click',clickClock);
drawerDiv.addEventListener('click',clickDrawer);
rugDiv.addEventListener('click',clickRug);
portraitDiv.addEventListener('click',clickPortrait);
doorDiv.addEventListener('click',clickDoor);
mirrorDiv.addEventListener('click',clickMirror);
sofaDiv.addEventListener('click',clickSofa);

initialize('room3')

