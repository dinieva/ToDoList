const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const todoData = [];
let exitData;

// render выводит задачи из массива todoData
const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    exitData.forEach(function (item, index) {
        const newTask = document.createElement('li');
        newTask.classList.add("todo-item");
        newTask.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div> ';
        if (item.completed) {
            todoCompleted.append(newTask);
        } else {
            todoList.append(newTask);
        }
        newTask.querySelector('.todo-complete').addEventListener('click', function () {
            //item.completed = true;
            item.completed = !item.completed;
            render();
        });
        newTask.querySelector('.todo-remove').addEventListener('click', function () {
            newTask.remove();
            todoData.splice(index, 1);
            console.log(todoData.length);
            //localStorage.setItem('data', JSON.stringify(todoData));
            fillDatainLocalStorage();

        });
    });
};

const fillDatainLocalStorage = function () {
    localStorage.setItem('data', JSON.stringify(todoData));
};

const takeDatafromLocalStorage = function () {
    exitData = JSON.parse(localStorage.getItem('data'));
};

const addNewTask = function () {
    todoControl.addEventListener('submit', function (event) {
        event.preventDefault();
        if (headerInput.value != '') {
            const newTodo = {
                text: headerInput.value,
                completed: false
            };
            todoData.push(newTodo);
            fillDatainLocalStorage();
            takeDatafromLocalStorage();
            render();
            headerInput.value = '';
        }
    });
};
window.addEventListener('load', function () {
    takeDatafromLocalStorage();
    if (exitData === null || exitData.length == 0) {
        console.log('массив пустой, нужно создать задачи');
        addNewTask();

    } else {
        console.log('задачи есть в localStorage');
        render();
        addNewTask();
    }
});