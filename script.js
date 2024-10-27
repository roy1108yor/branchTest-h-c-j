
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
});