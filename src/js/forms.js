'use strict';
(function() {
    const targets = document.querySelectorAll("[data-maxlength-counter]");

    function count_chars(target, max_length, counter) {
        const current_length = target.value.length;
        counter.textContent = `${current_length} / ${max_length}`;
    }

    document.addEventListener('DOMContentLoaded', (event) => {
        targets.forEach((target, i) => {
            let counter = document.getElementById(
                target.getAttribute('data-maxlength-counter')
            );
            const max_length = target.getAttribute('maxlength');
            counter.textContent = `0 / ${max_length}`;
            target.addEventListener('keyup', (event) => {
                count_chars(target, max_length, counter);
            });
        });
    });
})();




/**
 * Makes sure to add a `before-addon` class to any input preceding an addon.
 * This is to fix things like for example incorrect `border-radius` values
 * for the input.
 */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const addons = document.querySelectorAll('.input-addon');
        addons.forEach((addon, i) => {
            const previous_sibling = addon.previousElementSibling;
            if (previous_sibling.tagName.toLowerCase() === 'input') {
                previous_sibling.classList.add('before-addon');
            }
        });
    });
}());




const forms = (function() {


    function find_label(input) {
        const label_selector = `label[for="${input.id}"]`;
        let label = document.querySelector(label_selector);
        const parent = input.parentElement;

        if (! label) {
            console.warn(
                `Label was not found using selector: ${label_selector}. "for" `
                + `attribute might be incorrect for the label of input `
                + `"${input.id}". Attempting to find the label.`
            );
            if (
                parent.classList.contains('inline-form-group')
                && parent.previousElementSibling
            ) {
                if (parent.previousElementSibling.tagName.toLowerCase() === 'label') {
                    label = parent.previousElementSibling;
                }
            }
            const sibling = input.previousElementSibling;
            if (sibling) {
                if (sibling.tagName.toLowerCase() === 'label') {
                    label = sibling;
                }
            }
        }
        if (! label) {
            console.warn('Label not found when trying to add form field error.');
            return;
        }
        return label;
    }


    function add_form_errors({
        form=undefined,
        errors=[],
    }) {
        let list_items_arr = [];
        let already_exists = false;
        let errorlist = document.querySelector('.errorlist.nonfield');
        if (errorlist) {
            already_exists = true;
            errorlist.classList.add('shake');
            setTimeout(() => {
                errorlist.classList.remove('shake');
            }, 2000);

        } else {
            errorlist = document.createElement('ul');
            errorlist.classList.add('errorlist');
            errorlist.classList.add('nonfield');
        }

        const list_items = errorlist.querySelectorAll('li');
        list_items.forEach((item, i) => {
            list_items_arr.push(item.textContent);
        });

        errors.forEach((error, i) => {
            const list_item = document.createElement('li');
            list_item.textContent = error;
            if (! list_items_arr.includes(error)) {
                errorlist.appendChild(list_item);
            }
        });

        if (! already_exists) {
            form.insertBefore(errorlist, form.firstChild);
        }
    }


    function add_errors({
        input=undefined,
        errors=[],
    }) {
        let errorlist = undefined;
        let new_errors = [];
        let list_items_arr = [];
        let already_exists = false;

        const label = find_label(input);
        const sibling = input.previousElementSibling;

        const label_sibling = label.nextElementSibling;
        let label_sibling_is_errorlist = false;
        if (label_sibling) {
            if (label_sibling.classList.contains('errorlist')) {
                label_sibling_is_errorlist = true;
            }
        }

        if (label_sibling_is_errorlist) {
            // Error list already exists
            errorlist = label.nextElementSibling;
            const list_items = errorlist.querySelectorAll('li');

            list_items.forEach((item, i) => {
                list_items_arr.push(item.textContent);
            });
            new_errors = errors;

            // TODO REVIEW
            errorlist.classList.add('shake');
            setTimeout(() => {
                errorlist.classList.remove('shake');
            }, 2000);

            already_exists = true;

        } else {
            // Error list does not yet exist in DOM
            errorlist = document.createElement('ul');
            errorlist.classList.add('errorlist');
            new_errors = errors;
        }

        new_errors.forEach((error, i) => {
            const list_item = document.createElement('li');
            list_item.textContent = error;
            if (! list_items_arr.includes(error)) {
                errorlist.appendChild(list_item);
            }
        });

        if (label && ! already_exists) {
            front_utils.insert_after(label, errorlist);
        }
    }


    function clear_errors({
        form=undefined,
        input=undefined,
    }) {
        let errorlists = [];
        if (form) {
            errorlists = form.querySelectorAll('.errorlist');
        }
        if (input) {
            const label = find_label(input);
            if (label) {
                const label_sibling = label.nextElementSibling;
                if (label_sibling) {
                    if (label_sibling.classList.contains('errorlist')) {
                        label_sibling.remove();
                    }
                }
            }
        }
        errorlists.forEach((errorlist, i) => {
            errorlist.remove();
        });
    }


    return {
        add_errors: add_errors,
        add_form_errors: add_form_errors,
        clear_errors: clear_errors,
    };
})();
