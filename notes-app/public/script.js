var toDo = document.getElementById("toDo");


var saveNote = document.getElementById("savenote");


saveNote.addEventListener("click", onClickSaveNote);


  
function onClickSaveNote() {


  var taskText = toDo.value;


 if (taskText === "") {
    document.getElementById("voidentry").style.display = "block";
  } else {
    document.getElementById("voidentry").style.display = "none";
   
     // New Code // 
    fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: taskText })
    });
    
  
    var taskList = document.getElementById("taskList");
    var newTaskItem = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    newTaskItem.appendChild(checkbox);
    var taskLabel = document.createTextNode(taskText);
    newTaskItem.appendChild(taskLabel);
    var dateAdded = new Date().toLocaleString();
    var dateLabel = document.createElement("span");
    dateLabel.textContent = " - " + dateAdded;
    dateLabel.style.marginLeft = "10px";
    newTaskItem.appendChild(dateLabel);
    var editButton = document.createElement("button");
    editButton.textContent = "Edit Note";
    editButton.addEventListener("click", function() {
      var newText = prompt("Edit your task:", taskText);
      if (newText !== null && newText !== "") {
        taskLabel.textContent = newText;
      }
    });
    newTaskItem.appendChild(editButton);
    taskList.appendChild(newTaskItem);
    toDo.value = "";
  }

}
