var removeSVG = '<svg id="removetodo" fill="#c0cecb" x="0px" y="0px" viewBox="0 0 22 22"><g><g><path class="st0" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="st0" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="st0" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="st0" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg fill="#2ecc71" id="addtodo" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
var completeList = document.getElementById('complete');
var todo = document.getElementById('todo');
var file = document.getElementById('preview');

time();

// Basically a clock
function time () {
  var date = new Date();
  var hours = date.getHours();
  var minute = date.getMinutes();
  if (minute < 10) {
    minute = '0' + minute;
}

  console.log(hours + ":" + minute);
}

var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  complete: []
};

// Generates Todo List on Startup
function generateTodoList() {
  if (!data.todo.length && !data.complete.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItem(value);
  }

  for (var j = 0; j < data.complete.length; j++) {
    var value = data.complete[j];
    addItem(value, true);
  }
}

// Gets the Local Storage Array and Generates the todo and complete list
generateTodoList();
progress();

// Grabs the value and then pushes it to dom and local storage
// Checks if there is a value and if the value is not a space, if there is a space it alerts the user that that's invalid.
function createItem() {
  var value = document.getElementById('item').value;
      if (value && value.replace(/\s/g, "")) {
        addItem(value.trim());
        document.getElementById('item').value = "";
        data.todo.push(value.trim());
        dataObject();
      } else {
        document.getElementById('item').value = "";
        alert('Error: Invalid entry, please add text to your entry!');
    }
}

// Event Listner For The Button Click
document.getElementById('add').addEventListener('click', function () {
  createItem();
  previewFileOff();
})

// Event Listner For Enter
document.addEventListener('keypress', function(event)  {
    if (event.keyCode == '13') {
      createItem();
      previewFileOff();
    }
});


// Upload file system
document.getElementById('upload').onchange = function uploadFile() {
  var upload = document.getElementById('upload');
  var fileType = this.files[0]['type'];
  var fileValue = fileType.split('/')[0];

// Changes the file to base64 information
  var fileReader = new FileReader();
  fileReader.readAsDataURL(this.files[0]);
  fileReader.onload = function() {
    base64 = fileReader.result;
    file.src = base64;
  }

// If the file is an image is previews the image like how the image should be previewed
  if(fileValue == 'image'){
      previewFileOff();
    //  var url = URL.createObjectURL(this.files[0]);
    //  file.src = url;
      previewImage();
    } else {
      previewFileOff();
  //    file.src = "Icons/file.svg";
      previewFile();
  }

  // Remove the previewed file
  file.addEventListener('click', function () {
      previewFileOff();
      console.log('Removed file!');
  })
}

function dataObject() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

// Add List Object To the DOM
function addItem(text, complete) {
  var todo = (complete) ? document.getElementById('complete'):document.getElementById('todo');

  var newItem = document.createElement('li');
  newItem.innerHTML = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var complete = document.createElement('svg');
  complete.innerHTML = completeSVG;

  var remove = document.createElement('svg');
  remove.innerHTML = removeSVG;

// Checks if preview has an image attached, if yes then it creates an image, div and link to download said image
  if (document.getElementById('preview').src) {
    var fileName = document.getElementById('upload').value.split('\\')[2];

    var newImage = new Image();
    newImage.src = document.getElementById('preview').src;
    newImage.setAttribute('id', 'img-file');

    var container = document.createElement('div');
    container.setAttribute('id', 'img-container');

    var link = document.createElement('a');
    link.href = newImage.src;
    link.setAttribute('download', fileName);

    link.appendChild(newImage);
    container.appendChild(link);
    newItem.appendChild(container);
  }


// Append Child of parent nodes
  buttons.appendChild(complete);
  buttons.appendChild(remove);
  newItem.appendChild(buttons);

  todo.prepend(newItem);

// Tell Js to remove item
  remove.addEventListener('click', removeItem);

// Tell Js to complete Item
  complete.addEventListener('click', completeItem);

  progress();
}

// Remove Item
function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;
// Remove item from local storage
  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.complete.splice(data.complete.indexOf(value), 1);
  }
  dataObject();
// Remove Item From DOM
  item.remove();

  progress();
}

function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

// Remove from current array / list and move to the other array / list
if (id === 'todo') {
  data.todo.splice(data.todo.indexOf(value), 1);
  data.complete.push(value);
} else {
  data.complete.splice(data.complete.indexOf(value), 1);
  data.todo.push(value);
}
  dataObject();

  // Complete Toggle
  var target = (id === 'todo') ? completeList:todo;
  item.remove();
  target.insertBefore(item, target.childNodes[0]);
  progress();
}


// Gets progress of your todo list with some math
function progress() {
  var todoItems = todo.children.length;
  var completedItems = completeList.children.length;
  var progress = Math.round((completedItems/(completedItems + todoItems)*100))

  function mathStuff() {
    var r = 146.5;
    var circumference = r * 2 * Math.PI;
    var percentage = (progress / 100);
    var bar = document.getElementById('progress-bar');
    var barPercentage = Math.round(circumference * (1 - percentage));
    bar.setAttribute("stroke-dashoffset", barPercentage);
    document.getElementById('progress-percentage').innerHTML = progress + "%";
  }

  if (todoItems === 0 & completedItems === 0) {
    progress = 0;
    mathStuff();
  } else {
    mathStuff();
  }
}

// Navigation Button Event Listener
document.getElementById('navButton').addEventListener('click', function () {
  document.getElementById('navigation').style = "width: 400px;";
  document.getElementById('container').style = "filter:blur(5px);";
  document.getElementById('overlay').style = "position: absolute; z-index: 80; width: 100%; height: 100%; background-color: #000; opacity: 0.2;"
})

// Close navigation Button Event Listener
document.getElementById('close').addEventListener('click', function () {
  close();
})

document.getElementById('overlay').addEventListener('click', function() {
  close();
})

function close() {
  document.getElementById('navigation').style = "";
  document.getElementById('container').style = "";
  document.getElementById('overlay').style = "";
}


// Change styling stuff
function previewImage() {
    file.style = "visibility: visible; display:block;";
    document.getElementById('upload-contain').style = "width:calc(100% - 34px); float: right;";
    document.getElementById('header').style = "height:190px;";
    document.getElementById('item').style = "padding: 20px 0px 131px 0px;";
    document.getElementById('todo').style = "top: 200px;";
    document.getElementById('complete').style = "top:200px;";
    document.getElementById('upload-label').style = "mix-blend-mode: difference;"
  }

function previewFile() {
    file.style = "visibility: visible; display: block; width: 30px; height: 30px;";
    document.getElementById('upload-contain').style = "visibility: visible; display: block; width: 30px; height: 30px; bottom: 25pt; float: right; margin-right:0;";
  }

// Reseting changed styling
function previewFileOff() {
  file.style = "";
  file.removeAttribute('src');
  document.getElementById('upload-contain').style = "";
  document.getElementById('header').style = "";
  document.getElementById('item').style = "";
  document.getElementById('todo').style = "";
  document.getElementById('complete').style = "";
  document.getElementById('upload-label').style = "";
}



/* Old file system that will probably be used for files other than images

if(fileValue == 'image'){
    previewFileOff();
    var url = URL.createObjectURL(this.files[0]);
    file.src = url;
    previewImage();
  } else {
    previewFileOff();
    file.src = "Icons/file.svg";
    previewFile();
}
*/

// The coloured labels
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.38 99"><defs><style>.cls-1{stroke:#231f20;stroke-miterlimit:10;}</style></defs><title>Asset 2</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M20.5.5a20.06,20.06,0,0,0-20,20v58a20.06,20.06,0,0,0,20,20H60.88V.5Z"/></g></g></svg>

// BUG: Local Storage Redesign for more than just text values

// BUG: Forgot to add a remove option for todo lists lol.

// BUG: When adding image then removing that image and trying to add it again, it won't work. You have to select a different image for some reason.
// Suggestion: CLick anywhere that's blurred to close the menu, this is better for the user.

/* Requires a expand option when clicking on a list item itself. This shows more options
including notes and addition information, uploading a file otption and more.*/

/* Requires a way to clear the completed items after 24 hours of real time. This value
should be able to be changed by the user, in app settings and should be able to be turned off. */
