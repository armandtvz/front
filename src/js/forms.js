(function()
{
    'use strict';
    var targets = document.querySelectorAll("[data-maxlength-counter]");

    function count_chars(target, max_length, counter)
    {
        var current_length = target.value.length;
        counter.textContent = `${current_length} / ${max_length}`;
    }

    document.addEventListener('DOMContentLoaded', function()
    {
        for (var i = 0; i < targets.length; i++)
        {
            var target = targets[i];
            var counter = document.getElementById(
                target.getAttribute('data-maxlength-counter')
            );
            const max_length = target.getAttribute('maxlength');
            counter.textContent = `0 / ${max_length}`;
            target.addEventListener('keyup', function()
            {
                count_chars(target, max_length, counter);
            });
        }
    });
})();




/**
 * Makes sure to add a `before-addon` class to any input preceding an addon.
 * This is to fix things like for example incorrect `border-radius` values
 * for the input.
 */
(function()
{
    'use strict';
    document.addEventListener('DOMContentLoaded', () =>
    {
        const addons = document.querySelectorAll('.input-addon');
        addons.forEach((addon, i) =>
        {
            const previous_sibling = addon.previousElementSibling;
            if (previous_sibling.tagName.toLowerCase() === 'input')
            {
                previous_sibling.classList.add('before-addon');
            }
        });
    });
}());
