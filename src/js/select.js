/*


automatic blank search
get 100 results
add "showing max 100 results; refine search for better results"
focus on input
show initial results

click away
close results = display=none
focus on input
show results

user searches
update results
click away
close results = display=none

if no selection



*/



'use strict';
(function() {
    let current_index = -1; // To track the currently focused item in search results




    function hide_results(results_container) {
        results_container.innerHTML = '';
        // results_container.style.display = 'none';
    }




    function prep_multiple_select(select, dropdown) {
        let multi_container = undefined;
        let has_many_container = false;
        const dropdown_sibling = dropdown.nextElementSibling;
        if (dropdown_sibling) {
            if (
                dropdown_sibling.tagName.toLowerCase() === 'div'
                && dropdown_sibling.classList.contains('many-items')
            ) {
                has_many_container = true;
                multi_container = dropdown_sibling;
            }
        }
        if (! has_many_container) {
            // <div id="many-items" class="mt-1"></div>
            multi_container = document.createElement('div');
            multi_container.classList.add('many-items');
            front_utils.insert_after(dropdown, multi_container);
        }
        return multi_container;
    }




    function add_multi_option(select, multi_container, id, name) {
        if (! id || ! name) {
            return;
        }

        let span = document.createElement('span');

        span.classList.add('chip');
        span.classList.add('close-chip');
        span.textContent = name;
        span.setAttribute('data-id', id);

        multi_container.appendChild(span);

        span.addEventListener('click', (event) => {
            for (let i = 0; i < select.selectedOptions.length; i++) {
                const option = select.selectedOptions[i];
                if (option.value === span.dataset.id) {
                    try {
                        select.remove(i);
                        break;
                    } catch (e) {}
                }
            }
            span.remove();
        });
    }




    function update_select(
        id,
        name,
        dropdown,
        search_input,
        results_container,
        select,
    ) {
        const is_multiple = select.getAttribute('multiple');
        let multi_container = undefined;

        if (is_multiple) {
            // Add container if not already added to keep selected
            // "tags" or options.
            multi_container = prep_multiple_select(select, dropdown);
        } else {
            // Clear existing select-options
            select.innerHTML = '';
        }

        // Create a new option and select it
        let option = new Option(name, id, true, true);
        select.appendChild(option);

        select.dispatchEvent(new Event('change'));

        // Multiple select
        if (is_multiple) {
            add_multi_option(select, multi_container, id, name);
            search_input.value = '';
            hide_results(results_container);
        }
    }




    async function add_text_to_results(text, results_container) {
        const div = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = text;
        div.appendChild(span);
        div.style.padding = '12px 16px';
        results_container.appendChild(div);
    }



    async function add_no_results(results_container) {
        await front_utils.stall(200);
        hide_results(results_container);
        add_text_to_results('No results found.', results_container);
    }




    async function add_max_results_text(results_container, max_results) {
        add_text_to_results(`*Showing maximum ${max_results} results.`, results_container);
    }




    function add_loader(results_container) {
        let add_loader = true;
        if (results_container.children.length === 1) {
            const loader = results_container.querySelector('.loading-indicator');
            if (loader) {
                add_loader = false;
            }
        }
        if (add_loader) {
            hide_results(results_container);
            const loading_indicator = document.createElement('div');
            loading_indicator.classList.add('loading-indicator');
            loading_indicator.textContent = 'Loading...';
            loading_indicator.style.padding = '12px 16px';
            results_container.appendChild(loading_indicator);
        }
    }




    function json_to_querystring(json) {
        return Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
        }).join('&');
    }




    function search(dropdown, search_input, results_container, select) {
        let query = search_input.value;
        const search_param = dropdown.dataset.searchParam;
        const uri = dropdown.dataset.uri;
        let max_results = dropdown.dataset.maxResults;
        if (! max_results) {
            max_results = 100;
        }
        max_results = parseInt(max_results);
        current_index = -1;

        // Dependent fields
        let parent_dropdowns = {};
        let parents = dropdown.dataset.chained;
        if (parents) {
            parents = JSON.parse(parents);
            for (let i = 0; i < parents.length; i++) {
                const parent = parents[i];
                const parent_dropdown = document.getElementById(parent);
                const parent_select = parent_dropdown.querySelector('select');
                const parent_option = parent_select.selectedOptions[0];
                if (parent_option) {
                    parent_dropdowns = {
                        [parent_select.name]: parent_option.getAttribute('value'),
                        ...parent_dropdowns,
                    }
                }
            }
        }

        const query_obj = {
            [search_param]: query,
            ...parent_dropdowns,
        }
        // console.log(query_obj);
        const querystring = '?' + json_to_querystring(query_obj);
        // console.log(querystring);

        fetch(uri + querystring)
            .then(response => response.json())
            .then(data => {
                if (data.results.length === 0) {
                    add_no_results(results_container);
                } else {
                    // Clear previous results
                    hide_results(results_container);
                }
                // Add new results
                const results = data.results.slice(0, max_results);
                results.forEach(function(obj) {
                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    span.textContent = obj.text || obj.name || obj.label;
                    div.appendChild(span);
                    div.setAttribute('data-id', obj.id);
                    div.classList.add('dropdown-result');
                    div.setAttribute('tabindex', '-1');
                    div.role = 'option';

                    div.onclick = function() {
                        search_input.value = this.textContent;
                        hide_results(results_container);
                        update_select(
                            obj.id,
                            obj.text,
                            dropdown,
                            search_input,
                            results_container,
                            select,
                        );
                    };

                    results_container.appendChild(div);
                });
                if (results.length === max_results) {
                    add_max_results_text(results_container, max_results);
                }
                if (document.activeElement === search_input) {
                    results_container.style.display = 'block';
                } else {
                    hide_results(results_container);
                }
            })
            .catch(error => console.error('Error:', error));
    }
    const debounced_search = front_utils.debounce(search, 250);
    function _search(dropdown, search_input, results_container, select) {
        add_loader(results_container);
        debounced_search(dropdown, search_input, results_container, select);
    }




    function highlight_item(items, index, results_container) {
        // Remove highlight from all items
        Array.from(items).forEach(item => item.classList.remove('highlight'));
        // Highlight the new item
        if (items[index]) {
            items[index].classList.add('highlight');
            if (items[index]) {
                // Scrolling
                let item_top = items[index].offsetTop;
                let item_bottom = item_top + items[index].offsetHeight;
                let container_scroll_top = results_container.scrollTop;
                let container_height = results_container.offsetHeight;
                if (item_bottom > (container_scroll_top + container_height)) {
                    // Scroll down
                    results_container.scrollTop = item_bottom - container_height;
                } else if (item_top < container_scroll_top) {
                    // Scroll up
                    results_container.scrollTop = item_top;
                }
            }
        }
    }




    function clear_input(event, dropdown, select, search_input, results_container) {
        const is_multiple = select.getAttribute('multiple');
        if (select.selectedOptions[0]) {
            // Clear the input field
            search_input.value = '';
            // Optionally, you can also hide the results and reset the hidden select
            // results_container.style.display = 'none';
            select.innerHTML = '';

            if (event) {
                event.preventDefault(); // Prevent the default backspace key action
            }
            _search(dropdown, search_input, results_container, select);
            hide_results(results_container);
        }
    }



    const state = {}
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach((dropdown, i) => {
        if (dropdown.id) {
            state[dropdown.id] = false;
        } else {
            console.warning('No ID attribute set on searchable select.');
        }

        let search_input = dropdown.querySelector('input[type=text]');
        if (! search_input) {
            search_input = dropdown.querySelector('input[type=search]');
        }
        if (! search_input) {
            // TODO REVIEW warning message
            console.warn('No search input found for dropdown.');
            return;
        }
        const sibling = search_input.nextElementSibling;
        if (sibling) {
            if (sibling.tagName.toLowerCase() === 'button' && sibling.classList.contains('clear-selection')) {
                search_input.nextElementSibling.addEventListener('click', (event) => {
                    clear_input(event, dropdown, select, search_input, results_container);
                });
            }
        }

        const results_container = dropdown.querySelector('div[role=listbox]');
        const select = dropdown.querySelector('select');
        const is_multiple = select.getAttribute('multiple');
        if (! is_multiple) {
            // TODO REVIEW
            search_input.required = select.required;
        }
        if (select.selectedOptions[0] && ! is_multiple) {
            // Initial value
            search_input.value = select.selectedOptions[0].innerHTML;
        }
        if (select.selectedOptions.length > 0 && is_multiple) {
            // Initial values for multiple select
            const multi_container = prep_multiple_select(select, dropdown);
            for (let i = 0; i < select.selectedOptions.length; i++) {
                const option = select.selectedOptions[i];
                const name = option.innerHTML;
                const id = option.value;
                add_multi_option(select, multi_container, id, name);
            }
        }
        search_input.addEventListener('input', (event) => {
            _search(dropdown, search_input, results_container, select);
        });
        search_input.addEventListener('keydown', (event) => {
            let items = results_container.getElementsByClassName('dropdown-result');
            let item_count = items.length;
            if (event.key === 'ArrowDown') {
                current_index = (current_index + 1) % item_count;
                highlight_item(items, current_index, results_container);
                event.preventDefault(); // Prevent the cursor from moving in the input field

            } else if (event.key === 'ArrowUp') {
                current_index = (current_index - 1 + item_count) % item_count;
                highlight_item(items, current_index, results_container);
                event.preventDefault();

            } else if (event.key === 'Enter') {
                if (current_index > -1 && items[current_index]) {
                    items[current_index].click();
                    event.preventDefault();
                }
            }
        });
        search_input.addEventListener('focus', (event) => {
            results_container.style.display = 'block';
            hide_results(results_container);
            if (! select.selectedOptions[0]) {
                search_input.value = '';
            }
            _search(dropdown, search_input, results_container, select);
        });
        dropdown.addEventListener('mousedown', (event) => {
            if (dropdown.id) {
                state[dropdown.id] = true;
            }
        });
        dropdown.addEventListener('mouseup', (event) => {
            if (dropdown.id) {
                state[dropdown.id] = false;
            }
        });
        search_input.addEventListener('focusout', (event) => {
            if (dropdown.id) {
                if (! state[dropdown.id]) {
                    // HACK:
                    // For now, check the screen size to determine
                    // whether or not to hide the results.
                    // The problem on phones is that you can't
                    // close the keyboard and then scroll through
                    // the results: doing so also closes the results.
                    // Hence this hack.
                    if (window.innerWidth > 768) {
                        hide_results(results_container);
                        state[dropdown.id] = false;
                    }
                }
            }
            if (! select.selectedOptions[0]) {
                search_input.value = '';
            }
        });
        search_input.addEventListener('keydown', (event) => {
            if (
                event.key === 'Backspace'
                || event.key === 'Delete'
                // && search_input.selectionStart === 0
                || event.key === 'Escape'
            ) {
                clear_input(event, dropdown, select, search_input, results_container);
            }
        });
    });




    document.addEventListener('click', function(event) {
        // Check if the click is outside of the search input
        // and results container
        dropdowns.forEach((dropdown, i) => {
            let search_input = dropdown.querySelector('input[type=text]');
            if (! search_input) {
                search_input = dropdown.querySelector('input[type=search]');
            }
            if (! search_input) {
                // TODO REVIEW warning message
                console.warn('No search input found for dropdown.');
                return;
            }
            const select = dropdown.querySelector('select');
            const results_container = dropdown.querySelector('div[role=listbox]');
            if (
                ! search_input.contains(event.target)
                && ! results_container.contains(event.target)
            ) {
                hide_results(results_container);
                // clear_input(event, dropdown, select, search_input, results_container);
            }
        });
    });
}());
