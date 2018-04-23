var removeSVG = '<svg id="removetodo" fill="#c0cecb" x="0px" y="0px" viewBox="0 0 22 22"><g><g><path class="st0" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="st0" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="st0" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="st0" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg fill="#2ecc71" id="addtodo" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
var completeList = document.getElementById('complete');
var todo = document.getElementById('todo');

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

// Gets the Local Storage Array and Generates the todo and complete list
generateTodoList();
console.log(data);

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
        alert('Error: Invalid entry, please add text to your entry!')
    }
}

var file = document.getElementById('preview');

document.getElementById('upload').onchange = function uploadFile() {
  var img = document.getElementById('preview');
  var upload = document.getElementById('upload');
  var fileType = this.files[0]['type'];
  var fileValue = fileType.split('/')[0];

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

  // Remove the previewed file
  file.addEventListener('click', function () {
      previewFileOff();
      console.log('Removed file!');
  })
}

// Change styling stuff
function previewImage() {
    file.style.visibility = "visible";
    file.style.display = "block";
    document.getElementById('upload-contain').style.width = "100%";
    document.getElementById('header').style.height = "190px";
    document.getElementById('item').style.padding = "20px 0px 131px 0px";
    document.getElementById('todo').style.top = "200px";
    document.getElementById('complete').style.top = "200px";
  }

function previewFile() {
    file.style.visibility = "visible";
    file.style.display = "block";
    document.getElementById('upload-contain').style.width = "10%";
    document.getElementById('upload-contain').style.float = "right";
    document.getElementById('upload-contain').style.top = "-57px";
    document.getElementById('upload-contain').style.left = "10px";
    file.style.width = "30px";
    file.style.height = "30px";
    file.style.bottom = "-30px";
    file.style.float = "right";
    file.style.marginRight = "0pt";
    file.style.right = "5px";
  }

// Reseting changed styling
function previewFileOff() {
  file.style.visibility = "";
  file.style.display = "";
  file.style.width = "";
  file.style.height = "";
  file.style.float = "";
  file.style.marginRight = "";
  file.style.top = "";
  file.style.bottom = "";
  file.src = "";
  file.style.right = "";

  document.getElementById('upload-contain').style.float = "";
  document.getElementById('upload-contain').style.top = "";
  document.getElementById('upload-contain').style.left = "";
  document.getElementById('upload-contain').style.width = "";

  document.getElementById('header').style.height = "";
  document.getElementById('item').style.padding = "";
  document.getElementById('todo').style.top = "";
  document.getElementById('complete').style.top = "";
}

// Event Listner For The Button Click
document.getElementById('add').addEventListener('click', function () {
  createItem();
})

// Event Listner For Enter
document.addEventListener('keypress', function(event)  {
    if (event.keyCode == '13') {
      createItem();
    }
});

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

function dataObject() {
  localStorage.setItem('todoList', JSON.stringify(data));
  console.log(data);
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


// Append Child of parent nodes
  buttons.appendChild(complete);
  buttons.appendChild(remove);
  newItem.appendChild(buttons);

  todo.prepend(newItem);

// Tell Js to remove item
  remove.addEventListener('click', removeItem);

// Tell Js to complete Item
  complete.addEventListener('click', completeItem);

// Add item to local storage
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
}

// Multiple Files

// Requires a working navigation button

// file should be able to be downloaded by the user when clicking on the item. */

/* Requires a expand option when clicking on a list item itself. This shows more options
including notes and addition information, uploading a file otption and more.*/

/* Requires a way to clear the completed items after 24 hours of real time. This value
should be able to be changed by the user, in app settings and should be able to be turned off. */
