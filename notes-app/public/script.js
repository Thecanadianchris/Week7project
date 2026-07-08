var toDo = document.getElementById("toDo");
var saveNote = document.getElementById("savenote");

saveNote.addEventListener("click", onClickSaveNote);

document.addEventListener("DOMContentLoaded", function() {
  fetch("/api/notes")
    .then(function(res) {
      return res.json();
    })
    .then(function(notes) {
      notes.forEach(function(note) {
        addNoteToPage(note.id, note.text, note.createdAt);
      });
    });
});

function onClickSaveNote() {

  var taskText = toDo.value;

  if (taskText === "") {
    document.getElementById("voidentry").style.display = "block";
  } else {
    document.getElementById("voidentry").style.display = "none";

fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: taskText })
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(newNote) {
        addNoteToPage(newNote.id, newNote.text, newNote.createdAt);
      });

    toDo.value = "";
  }

}

function addNoteToPage(id, taskText, dateAdded) {
  var taskList = document.getElementById("taskList");


  var newTaskItem = document.createElement("li");


var checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.addEventListener("change", function() {
  fetch("/api/notes/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: checkbox.checked })
  });

  if (checkbox.checked) {
    taskLabel.style.textDecoration = "line-through";
  } else {
    taskLabel.style.textDecoration = "none";
  }
});
newTaskItem.appendChild(checkbox);


var taskLabel = document.createElement("span");
taskLabel.textContent = taskText;


  newTaskItem.appendChild(taskLabel);


  var dateLabel = document.createElement("span");
  dateLabel.textContent = " - " + dateAdded;
  dateLabel.style.marginLeft = "10px";
  newTaskItem.appendChild(dateLabel);


  var editButton = document.createElement("button");
  editButton.textContent = "Edit Note";
editButton.addEventListener("click", function() {
  var newText = prompt("Edit your task:", taskLabel.textContent);
  if (newText !== null && newText !== "") {

    fetch("/api/notes/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText })
    });

    taskLabel.textContent = newText;
  }
});
  newTaskItem.appendChild(editButton);
var deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.addEventListener("click", function() {
  fetch("/api/notes/" + id, { method: "DELETE"
  });
  newTaskItem.remove();
});
newTaskItem.appendChild(deleteButton);


  taskList.appendChild(newTaskItem);
}