let main = (document =>{
const list = locate('.list')
const listItems = document.querySelectorAll('.list__item') // get all list items
const taskInput = locate('.task__input')
const addBtn = locate('.btn.btn--add')

function locate(selector) {
    let elementLocated = document.querySelector(selector)
    return elementLocated
}

function addToDoItem(event) {
    const listItem = createToDoItem(taskInput.value)
    event.preventDefault();
    if (taskInput.value === '')
        alert('Please, enter the value!')
    bindEvents(listItem)
    list.appendChild(listItem)
    taskInput.value = ''
}

function prepElement(obj) {
    let keys = Object.keys(obj)
    let values = Object.values(obj)
    let element = document.createElement(obj['element'])
    for (let i = 1; i < keys.length; i++) {
        element[keys[i]] = values[i]
    }
    return element
}

function appendElements(main, ...elems) {
    for (const item of elems) {
        main.appendChild(item)
    }
    return main
}

function createToDoItem(title) {
    let checkbox = prepElement({
        element: 'input',
        className: 'checkbox',
        type: 'checkbox'
    })

    let label = prepElement({
        element: 'label',
        className: 'title',
        innerText: title
    })

    let textfield = prepElement({
        element: 'input',
        className: 'textfield',
        type: 'text'
    })

    let deleteBtn = prepElement({
        element: 'button',
        className: 'btn btn--delete',
        innerText: 'Delete'
    })

    let editBtn = prepElement({
        element: 'button',
        className: 'btn btn--edit',
        innerText: 'Edit'
    })

    let listItem = prepElement({
        element: 'li',
        className: 'list__item'
    })


    return appendElements(listItem, checkbox, label, textfield, editBtn, deleteBtn)
}

function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox')
    const editBtn = todoItem.querySelector('.btn.btn--edit')
    const deleteBtn = todoItem.querySelector('.btn.btn--delete')

    checkbox.addEventListener('change', toggleToDoItem)
    editBtn.addEventListener('click', editToDoItem)
    deleteBtn.addEventListener('click', deleteToDoItem)
}

function toggleToDoItem() {
    const parent = this.parentNode;
    parent.classList.toggle('completed')
}

function editToDoItem(){
    const parent = this.parentNode;
    const title = parent.querySelector('.title')
    const input = parent.querySelector('.textfield')
    const isEditing = parent.classList.contains('editing')
    console.log(isEditing);
    if(isEditing){
        title.innerText = input.value
        this.innerText = 'Edit'
    }else{
        input.value = title.innerText
        this.innerText = 'Save'
    }
    parent.classList.toggle('editing')
}

function deleteToDoItem(){
    const parent = this.parentNode;
    list.removeChild(parent)
}

function init(){
    const form = locate('.task').addEventListener('submit', addToDoItem)
    listItems.forEach(elem =>{
        bindEvents(elem)
    })
}
return init

})(document)

main()