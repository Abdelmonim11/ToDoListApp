// localStorage.clear()
// declering
let input = document.querySelector(".input");
let addTask = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//  array of tasks
let arrayOfTasks = [];

// check if there is data on localstorage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// get Tasks from Localstorage
getTasksfromLocal();

// Add task
addTask.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = ""; // clear input
  }
};
document.onkeyup = function (e) {
  if (e.key == "Enter") {
    if (input.value !== "") {
      addTaskToArray(input.value);
      input.value = ""; // clear input
    }
  }
}
// delete task
tasksDiv.addEventListener("click", (e) => {
  if (e.target.className == "delete") {
    e.target.parentElement.remove();
    deleteTask(e.target.parentElement.getAttribute("data-id"));
  }
  // update task status
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    toggleTaskStatus(e.target.getAttribute("data-id"));
  }
});
// add Tasks to the Array
function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    TaskStatue: false,
  };
  // push task to array
  arrayOfTasks.push(task);
  // add Tasks to the page
  addTasksToPage(arrayOfTasks);
  // add Tasks to localstorage
  addTasksToLocal(arrayOfTasks);
}
// add Tasks to the page
function addTasksToPage(arrayOfTasks) {
  // clear tasks div
  tasksDiv.innerHTML = "";

  arrayOfTasks.forEach((task) => {
    // create main Task div
    let div = document.createElement("div");
    div.classList.add("task");
    // check if task is done
    if (task.TaskStatue) {
      div.classList.add("done");
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    tasksDiv.appendChild(div);
    // create Delete Button
    let span = document.createElement("span");
    span.innerHTML = "Delete";
    span.classList.add("delete");
    div.appendChild(span);
  });
}
// add tasks to localstorage
function addTasksToLocal(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
// get tasks from localstorage
function getTasksfromLocal() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPage(tasks);
  }
}
// delete task
function deleteTask(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => {
    return task.id != taskId;
  });
  addTasksToLocal(arrayOfTasks);
}
// toggle task status
function toggleTaskStatus(taskId) {
  arrayOfTasks.forEach((task) => {
    if (task.id == taskId) {
      task.TaskStatue == false ? (task.TaskStatue = true): (task.TaskStatue = false);
    }
  });
  addTasksToLocal(arrayOfTasks);
}
// clear All button
let clearAll = document.createElement("div");
clearAll.classList.add("clearAll");
clearAll.appendChild(document.createTextNode("Clear All"));
tasksDiv.after(clearAll);

clearAll.onclick = function () {
  tasksDiv.innerHTML = "";
  window.localStorage.removeItem("tasks");
};
