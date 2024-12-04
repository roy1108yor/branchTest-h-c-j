
function openModal() {
    var modal = document.getElementById('recipeModal');
    modal.style.display = 'block';
    setTimeout(function() {
        modal.style.display = 'none';
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Toggling detailed steps
    var stepsToggleButtons = document.querySelectorAll('.toggle-steps');
    stepsToggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var steps = button.nextElementSibling;
            steps.style.display = (steps.style.display === 'none' || steps.style.display === '') ? 'block' : 'none';
        });
    });

    // Ingredient tooltips
    var ingredients = document.querySelectorAll('.ingredient');
    ingredients.forEach(function(ingredient) {
        ingredient.addEventListener('mouseenter', function() {
            var tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = ingredient.getAttribute('data-tooltip');
            ingredient.appendChild(tooltip);
        });

        ingredient.addEventListener('mouseleave', function() {
            var tooltip = ingredient.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Event listeners for new buttons
    var recipes = {
        'btn-白菜': 'Recipe for 开水白菜: Ingredients: Napa cabbage, water, salt. Steps: Boil water, add cabbage, cook until tender.',
        'btn-汉堡包': 'Recipe for 汉堡包: Ingredients: Bun, beef patty, lettuce, tomato, cheese. Steps: Grill patty, assemble ingredients in bun.'
    };

    for (var btnId in recipes) {
        document.getElementById(btnId).addEventListener('click', (function(recipe) {
            return function() {
                alert(recipe);
            };
        })(recipes[btnId]));
    }

    // Todo application logic
    var addTaskButton = document.getElementById('add-task-button');
    var taskInput = document.getElementById('new-task-input');
    var taskList = document.getElementById('task-list');

    function saveTasks() {
        var tasks = [];
        taskList.querySelectorAll('li').forEach(function(taskItem) {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(function(task) {
            addTaskToList(task.text, task.completed);
        });
    }

    function addTaskToList(taskText, completed) {
        var taskItem = document.createElement('li');
        var taskTextElem = document.createElement('span');
        taskTextElem.className = 'task-text';
        taskTextElem.textContent = taskText;
        taskItem.appendChild(taskTextElem);

        var editButton = document.createElement('button');
        editButton.textContent = '编辑';
        editButton.className = 'edit-task';
        taskItem.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.className = 'delete-task';
        taskItem.appendChild(deleteButton);

        var completeButton = document.createElement('button');
        completeButton.textContent = '完成';
        completeButton.className = 'complete-task';
        taskItem.appendChild(completeButton);

        if (completed) {
            taskItem.classList.add('completed');
        }

        taskList.appendChild(taskItem);
    }

    addTaskButton.addEventListener('click', function() {
        var taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToList(taskText, false);
            taskInput.value = '';
            saveTasks();
        }
    });

    taskList.addEventListener('click', function(e) {
        var target = e.target;
        if (target.classList.contains('edit-task')) {
            var taskItem = target.parentElement;
            var taskTextElem = taskItem.querySelector('.task-text');
            var newTaskText = prompt('编辑任务', taskTextElem.textContent);
            if (newTaskText !== null) {
                taskTextElem.textContent = newTaskText;
                saveTasks();
            }
        } else if (target.classList.contains('delete-task')) {
            var taskItem = target.parentElement;
            taskList.removeChild(taskItem);
            saveTasks();
        } else if (target.classList.contains('complete-task')) {
            var taskItem = target.parentElement;
            taskItem.classList.toggle('completed');
            saveTasks();
        }
    });

    loadTasks();
});