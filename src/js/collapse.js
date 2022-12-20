// TODO DOCUMENT
// TODO DOCUMENT: Show example of tree
// TODO tabindex?
// TODO set focus?
// TODO data-collapse-show state for adding elements dynamically open or closed?
// TODO accordion?
// TODO elements that cant be collapsibles.
// TODO collapsible groups
// TODO collapse all-expand all

'use strict';
const collapsible = (function() {
    // Collapsers are buttons that expand and collapse their immediate
    // sibling element.
    let collapsers = undefined;
    let collapsers_array = new Array();


    function _find_and_add_collapsers() {
        collapsers = document.querySelectorAll('.collapse');
        collapsers.forEach((collapser, i) => {
            register_new_collapser(collapser);
        });
    }
    _find_and_add_collapsers();


    function _collapse(e)
    {
        e.preventDefault();
        const btn = this;

        // TODO DOCUMENT: The collapser will always hide/show its sibling element.
        let panel = btn.nextElementSibling;

        if (panel.style.display === 'block') {
            panel.style.display = 'none';
            panel.hidden = true; // TODO REVIEW
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');

        } else {
            panel.style.display = 'block';
            panel.hidden = false; // TODO REVIEW
            btn.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
            btn.focus();
        }
        return;
    }


    function register_new_collapser(element) {
        const collapser = element;

        // Make sure this isn't an existing collapser.
        if (! collapsers_array.includes(collapser)) {
            // Don't do anything if the ".collapse" class convention is broken.
            if (collapser.classList.contains('collapse')) {
                collapser.addEventListener('click', _collapse);
            }
            collapsers_array.push(collapser);
        }
        return;
    }


    // MutationObserver for new collapsers that are added to the DOM dynamically
    // This can be useful in some forms where fieldsets, inputs, etc are added.
    // TODO DOCUMENT data-watch-collapsers

    const mutation_target_node = document.querySelector('[data-watch-collapsers]');
    if (mutation_target_node) {
        const config = {
            attributes: true,
            childList: true,
            subtree: true,
        };
        const callback = (mutationsList, observer) => {
            // Use traditional 'for loops' for IE 11
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // A child node has been added or removed
                    mutation.addedNodes.forEach((element, i) => {
                        if (element instanceof Element) {
                            // TODO DRY: Why is this here?
                            // if (element.tagName.toLowerCase() === 'form')
                            // {
                            //     element.addEventListener('click', (event) =>
                            //     {
                            //         event.preventDefault();
                            //     });
                            // }

                            // Handle new collapsers
                            const collapsers = element.querySelectorAll('.collapse');
                            collapsers.forEach((collapser, i) => {
                                collapsible.register_new_collapser(collapser);
                            });
                        }
                    });
                }
            }
        }
        const observer = new MutationObserver(callback);
        observer.observe(mutation_target_node, config);
    }


    return {
        register_new_collapser: register_new_collapser,
    }
})();
