'use strict';
/*
TODO:
- [ ] Allow template literals.

*/
const components = {};
const component_array = [];

/**
 * @class
 * @since 2.0.0
 *
 * @param {String} element_id
 * @param {String} template_id
 *
 * @example
 *
 * async function handler(event) {
 *     await front_utils.stall(0);
 *     console.log('Click');
 * }
 * const component = new Component({
 *     element_id: 'test-btn',
 *     click: handler,
 *     lock_click: true,
 *     busy_on_click: true,
 *     busy: (comp) => {
 *         comp.element.textContent += ' ...';
 *     },
 *     available: (comp) => {
 *         comp.element.textContent = comp.element.textContent.replace(' ...', '');
 *     },
 * });
 */
function Component({
    element_id=undefined,
    template_id=undefined,
    click=undefined,
    lock_click=false,
    busy_on_click=false,

    busy=undefined,
    available=undefined,

    onrender=undefined,

    loader_id=undefined,
}) {
    if (! new.target) {
        throw new NewKeywordError();
    }
    if (component_array.includes(element_id)) {
        throw new DuplicateComponent(element_id);
    }
    component_array.push(element_id);


    ///////////////
    /// LOCKING ///
    ///////////////

    let locked = false;
    let lock_count = 0;
    /**
     * Acquire/release a lock on the component. This can be used to wait
     * for the click handler to finish executing before accepting new
     * clicks.
     */
    const lock = (function() {

        function acquire() {
            if (! locked) {
                locked = true;
                lock_count += 1;
                if (lock_count > 1) {
                    return false;
                }
                return true;
            }
            return false;
        }


        function release() {
            lock_count = 0;
            locked = false;
        }


        return {
            acquire: acquire,
            release: release,
        };
    })();


    /////////////////
    /// VARIABLES ///
    /////////////////

    const element = document.getElementById(element_id);
    if (! element) {
        throw new ElementNotFound(element_id);
    }

    let template_element = undefined;
    let template = undefined;
    if (template_id) {
        const template_element = document.getElementById(template_id);
        if (! template_element) {
            throw new TemplateNotFound(template_id);
        }
        template = Handlebars.compile(template_element.innerHTML);
    }

    let loader = undefined;
    if (loader_id) {
        loader = document.getElementById(loader_id);
        if (! loader) {
            throw new ElementNotFound(loader_id);
        }
    }


    /////////////////
    /// FUNCTIONS ///
    /////////////////

    function render(context) {
        if (! template) {
            return;
        }
        element.classList.remove('skeleton');

        let rendered = undefined;
        rendered = front_utils.render(template, context);
        paint(rendered);

        if (onrender) {
            onrender(element);
        }

        return rendered;
    }


    function paint(rendered) {
        element.innerHTML = rendered;
    }


    const comp = {
        element: element,
        render: render,
        paint: paint,
        template: template,
        loader: loader,
    };


    function set_busy(args=undefined) {
        if (args === undefined) {
            args = {};
        }
        if (busy) {
            busy(comp, args);
        }
    }


    function set_available(args=undefined) {
        if (args === undefined) {
            args = {};
        }
        if (available) {
            available(comp, args);
        }
    }
    set_available();


    async function _click(event) {
        if (busy_on_click) {
            await set_busy();
        }
        try {
            await click(event);

        } catch (e) {
            throw e;

        } finally {
            if (busy_on_click) {
                // Always reset state to "available"
                // whether or not there was an error
                // or not.
                await set_available();
            }
        }
    }


    async function click_handler(event) {
        if (! click) {
            return;
        }
        if (locked) {
            return;
        }
        if (lock_click) {
            const acquired = lock.acquire();
            if (acquired) {
                await _click(event);
                lock.release();

            } else {
                console.log('Lock could not be acquired.');
            }
        } else {
            _click(event);
        }
    }
    element.addEventListener('click', click_handler);


    function remove() {
        element.remove();
    }


    return {
        render: render,
        paint: paint,
        lock: lock,

        remove: remove,

        set_busy: set_busy,
        set_available: set_available,

        locked: locked,
        lock_count: lock_count,
        element: element,
        template: template,
        loader: loader,
    };
}
