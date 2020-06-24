'use strict'

const todoControl = document.querySelector('.todo-control'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    headerInput = document.querySelector('.header-input');


    let todoData = [];

    if(localStorage.getItem('affairUser')) {

    let affair = localStorage.getItem('affairUser');
        todoData = JSON.parse(affair);

    } else {
        console.log(false);
        
        localStorage.setItem('affairUser', JSON.stringify(todoData));
    };

const render = function() {
todoList.textContent ='';
todoCompleted.textContent ='';

    todoData.forEach(function(item){

        const li = document.createElement('li');
        li.classList.add('todo-item');

        
        li.innerHTML = '<span class="text-todo"  >' + item.value  + '</span>' +
        '<div class="todo-buttons">' + 
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';
        
        
        
        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function(){
        
        let indexElem = todoData.indexOf(item);
        
        todoData.splice(indexElem);
        
        localStorage.setItem('affairUser', JSON.stringify(todoData));

        render();
        
        });
        
        localStorage.setItem('affairUser', JSON.stringify(todoData));

    });

};


todoControl.addEventListener('submit', function(event){

    event.preventDefault();

    if(headerInput.value !== '') {
    
        const newTodo =  {
        value: headerInput.value,
        completed: false
    };

    todoData.push(newTodo);
    headerInput.value = '';
    render();
    }
});

render();



