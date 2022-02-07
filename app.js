"use strict";

//Select all the elements

const $toDoInput = document.querySelector(".toDo-input");
const $toDoInputBtn = document.querySelector(".toDoInput-btn");
const $toDosContainer = document.querySelector(".toDos-container");
const $toDosList = document.querySelector(".toDos-list");
const $filterOption = document.querySelector(".filter-todos");
const $markCompleted = document.querySelectorAll(".markAsDone-btn");
const $markForDeletion = document.querySelectorAll(".deleteToDo-Btn");

// Functions

const newToDoItem = () => {
  const $newItem = document.createElement("li");
  $newItem.classList.add("toDo-item");
  const $toDoContent = document.createElement("span");
  $toDoContent.classList.add("toDo-text");
  $toDoContent.textContent = $toDoInput.value;
  saveToDoToLocalStorage($toDoInput.value);
  const $markAsDone = document.createElement("button");
  $markAsDone.classList.add("markAsDone-btn");
  $markAsDone.textContent = "✔";
  const $deleteToDo = document.createElement("button");
  $deleteToDo.classList.add("deleteToDo-Btn");
  $deleteToDo.textContent = "🚮";
  $newItem.append($toDoContent, $markAsDone, $deleteToDo);
  $toDosList.append($newItem);
  $toDoInput.value = "";
};

function saveToDoToLocalStorage(toDo) {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  const toDoSet = new Set(toDos);
  toDoSet.add(toDo);
  toDos = Array.from(toDoSet);
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function recreateFromLocalStorage($toDoInput) {
  let toDos;

  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
    toDos.map((toDo) => {
      $toDoInput.value = toDo;
      newToDoItem();
    });
  }
}

//Events

$toDoInputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  newToDoItem(e);
});

$toDosList.addEventListener("click", (e) => {
  const item = e.target;
  if (item.textContent === "🚮") {
    item.parentNode.remove();
  }
  if (item.textContent === "✔") {
    item.parentNode.classList.toggle("completed");
  }
});

$filterOption.addEventListener("change", (e) => {
  const $toDos = document.querySelectorAll(".toDo-item");
  $toDos.forEach((toDo) => {
    console.log(e.target.value);
    switch (e.target.value) {
      case "all":
        toDo.style.display = "flex";
        break;
      case "done":
        if (toDo.classList.contains("completed")) {
          toDo.style.display = "flex";
        } else {
          toDo.style.display = "none";
        }
        break;
      case "notDone":
        if (!toDo.classList.contains("completed")) {
          toDo.style.display = "flex";
        } else {
          toDo.style.display = "none";
        }
        break;
    }
  });
});

document.addEventListener(
  "DOMContentLoaded",
  recreateFromLocalStorage($toDoInput)
);
