/* <li>
<input type="checkbox" name="" id="" class = "input-checkbox">
<p>learn Dom</p>
<span class = "span">X</span>
</li> */

/*write anything in the input and as you press eneter, the input value should be stored as the list content
 Create an sst which will be an array of objects which have two keys, a text with a list content and a isDone key which checks if the checkbox is checked or not.
 Always think of performing two things while doing any task 1. how to update your sst for that particular task 2.how to create your UI for that task
 Let's go step by step.
 */

let inputText = document.querySelector(".text-input");
let ul = document.querySelector("ul");
let item = document.querySelector(".item");
let All = document.querySelector(".All");
let Completed = document.querySelector(".Completed");
let Active = document.querySelector(".Active");
let Clear = document.querySelector(".Clear");

let sst = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

function addTodo(event) {
  if (event.keyCode === 13) {
    if (event.target.value.trim()) {
      let text = event.target.value;
      let todo = {
        text: text,
        isDone: false
      };
      sst.push(todo);
      localStorage.setItem("todos", JSON.stringify(sst));
      createUI();
      inputText.value = "";
    }
  }
}

function createUI(data = sst, root = ul) {
  root.innerHTML = "";
  data.forEach((todo, index) => {
    let li = document.createElement("li");

    let input = document.createElement("input");
    input.classList.add("input-checkbox");
    input.type = "checkbox";
    input.setAttribute("data-id", index);
    input.checked = todo.isDone;

    let p = document.createElement("p");
    if (todo.isDone) {
      p.classList.add("strike");
    }
    p.innerText = todo.text;
    p.setAttribute("data-id", index); //n
    p.classList.add("para-target");

    let span = document.createElement("span");
    span.innerText = "X";
    span.setAttribute("data-id", index);
    span.classList.add("span");

    li.append(input, p, span);
    root.append(li);
    // p.addEventListener('dblclick', createInputEditor);//n
  });
  item.innerText = `${sst.filter(e => !e.isDone).length} items left`;
}

function createInputEditor(event) {
  if (event.target.classList.contains("para-target")) {
    let paraInput = document.createElement("input");
    paraInput.type = "text";
    paraInput.autofocus = true;
    paraInput.classList.add("para-input");

    let parent = event.target.parentElement;
    console.log(event.target.parentElement);
    let p = event.target;
    parent.replaceChild(paraInput, p);
    paraInput.value = event.target.innerText;
    paraInput.addEventListener("blur", event => {
      let id = p.dataset.id;
      sst[id].text = event.target.value;
      console.log(sst);
      parent.replaceChild(p, paraInput);
      localStorage.setItem("todos", JSON.stringify(sst));
      createUI();
    });
  }
}

function toggleTodo(event) {
  if (event.target.classList.contains("input-checkbox")) {
    let id = event.target.dataset.id;
    sst[id].isDone = !sst[id].isDone;

    createUI();
  }
}

function deleteTodo(event) {
  if (event.target.classList.contains("span")) {
    let id = event.target.dataset.id;
    sst.splice(id, 1);
    localStorage.setItem("todos", JSON.stringify(sst));
    createUI();
  }
}

function handleAll(event) {
  createUI();
}

function handleCompleted(event) {
  let completed = sst.filter(e => e.isDone);
  createUI(completed);
}
function handleActive() {
  let active = sst.filter(e => !e.isDone);
  createUI(active);
}
function handleClear() {
  let updatedSST = sst.filter(e => !e.isDone);
  sst = updatedSST;
  createUI();
}

let counter = 0;
let dropDown = document.querySelector(".drop-down-menu");
function selectAll(event) {
  if (counter == 0) {
    sst.forEach(todo => {
      if (!todo.isDone) {
        todo.isDone = true;
        console.log(sst);
      }
    });
    counter++;
    console.log(counter);
  } else {
    sst.forEach(todo => {
      todo.isDone = !todo.isDone;
    });
    console.log(sst);
    counter = 0;
    console.log(counter);
  }

  createUI();
}

createUI();
inputText.addEventListener("keyup", addTodo);
All.addEventListener("click", handleAll);
Completed.addEventListener("click", handleCompleted);
Active.addEventListener("click", handleActive);
Clear.addEventListener("click", handleClear);
ul.addEventListener("click", deleteTodo);
ul.addEventListener("click", toggleTodo);
dropDown.addEventListener("click", selectAll);
ul.addEventListener("dblclick", createInputEditor); //n
