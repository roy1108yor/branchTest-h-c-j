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
            if (steps.style.display === 'none' || steps.style.display === '') {
                steps.style.display = 'block';
            } else {
                steps.style.display = 'none';
            }
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
    document.getElementById('btn-白菜').addEventListener('click', function() {
        alert('Recipe for 开水白菜: Ingredients: Napa cabbage, water, salt. Steps: Boil water, add cabbage, cook until tender.');
    });
    document.getElementById('btn-汉堡包').addEventListener('click', function() {
        alert('Recipe for 汉堡包: Ingredients: Bun, beef patty, lettuce, tomato, cheese. Steps: Grill patty, assemble ingredients in bun.');
    });
});