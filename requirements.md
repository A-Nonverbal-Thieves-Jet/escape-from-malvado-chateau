## Domain Model

### Each Page:

- userData in form(items: [] keys: []), connects to getItems on page load, and is added to by addItem(itemTitle)

- picture grid for event listeners, which handle events via text prompts and displays

- eventListeners/selectors which check status of inventory and have divergent behaviors based on the resulthi

- page data: 
  * hints list (array) 
  * text (string arrays) 
  * grid references (for photo grid) 

### Global Functions:

- displayHints(hintArray) that displays hints on hint display 

- displayText(text) that places text in the textbox element

- displayPrompt(text) that places text with a continue prompt

- audioControl that handles mute control clicks