(function()
{
    'use strict';




    const utils = (function()
    {
        // Copied from Underscore.js
        // Returns a function, that, as long as it continues to be invoked, will not
        // be triggered. The function will be called after it stops being called for
        // N milliseconds. If `immediate` is passed, trigger the function on the
        // leading edge, instead of the trailing.
        function debounce(func, wait, immediate)
        {
            let timeout;
            return function()
            {
                const context = this;
                const args = arguments;
                const later = function()
                {
                    timeout = null;
                    if (! immediate)
                    {
                        func.apply(context, args);
                    }
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow)
                {
                    func.apply(context, args);
                }
            };
        }

        return {
            debounce: debounce,
        };
    })();




    function count_decimals(value)
    {
        if (Math.floor(value.valueOf()) === value.valueOf()) return 0;

        var str = value.toString();
        if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1)
        {
            return str.split("-")[1] || 0;
        }
        else if (str.indexOf(".") !== -1)
        {
            return str.split(".")[1].length || 0;
        }
        return str.split("-")[1] || 0;
    }




    function update_slider(element, element_to_update)
    {
        const slider_value = element_to_update;
        const slider_for_update = element;
        let value = Number(slider_for_update.value);
        let step_value = slider_for_update.step;

        if (isNaN(value) || step_value === 'any')
        {
            slider_value.textContent = value.toFixed(0);
            slider_for_update.value = value.toFixed(0);
        }
        else
        {
            const number_of_decimals = count_decimals(value);
            slider_value.textContent = value.toFixed(number_of_decimals);
            slider_for_update.value = value.toFixed(number_of_decimals);
        }
    }




    const sliders = document.querySelectorAll('input[type="range"]');

    for (var i = 0; i < sliders.length; i++)
    {
        const slider = sliders[i];
        const slider_value = document.createElement('span');

        const min_label_element = document.createElement('span');
        const max_label_element = document.createElement('span');

        min_label_element.textContent = slider.min || 0;
        max_label_element.textContent = slider.max || 100;

        min_label_element.classList.add('range-label', 'range-label-min');
        max_label_element.classList.add('range-label', 'range-label-max');

        slider_value.classList.add('range-value');

        slider.insertAdjacentElement('beforebegin', min_label_element);
        slider.insertAdjacentElement('afterend', max_label_element);
        max_label_element.insertAdjacentElement('afterend', slider_value);

        update_slider(slider, slider_value);


        const debounced_slider_update = utils.debounce((event) =>
        {
            update_slider(event.target, slider_value);
        }, 0);
        slider.oninput = debounced_slider_update;
    }
}());
