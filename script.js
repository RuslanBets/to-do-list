const ul = document.getElementById('tasks')
const form = document.getElementById('new-task-form')
const input = form.querySelector('input')
const tasks = JSON.parse(localStorage.tasks || '[]')


form.onsubmit = function () {
  appendTask(input.value)
  tasks.push(input.value)
  saveToLocalStorage()
  input.value = ''
}

ul.onclick = (e) => {
  if (e.target.localName === 'button') handleRemoving(e)
}

tasks.forEach(appendTask)

saveToLocalStorage()

function appendTask(text) {
  const li = document.createElement('li')
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${text}</span>
    </label>
    <button>X</button>
  `
  ul.append(li)
}



function deleteTask(li) {
  li.remove()
}

function handleRemoving(e) {
  deleteTask(e.target.parentElement)
  const lis = Array.from(ul.children)
  const i = lis.indexOf(e.target.parentElement)
  tasks.splice(i,1) 
  saveToLocalStorage()
}

function saveToLocalStorage() {
  localStorage.tasks = JSON.stringify(tasks)
}
