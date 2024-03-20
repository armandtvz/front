'use strict';
const modal = (function() {
    const close_modal_event = new CustomEvent(
        'close', {
            detail: {},
        },
    );
    const open_modal_event = new CustomEvent(
        'open', {
            detail: {},
        },
    );

    function register(modal_element) {
        modal_element.addEventListener('click', (event) => {
            if (modal_element.classList.contains('close-buttons-only')) {
                return;
            }
            if (event.target.classList.contains('modal')) {
                close(modal_element);
            }
        });
    }

    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal_element, count) => {
        register(modal_element);
    });


    function open(modal_element) {
        modal_element.classList.add('is-showing');
        modal_element.dispatchEvent(open_modal_event);
    }


    function close(modal_element) {
        modal_element.classList.remove('is-showing');
        modal_element.dispatchEvent(close_modal_event);
    }


    function toggle(modal_element) {
        if (modal_element.classList.contains('is-showing')) {
            close(modal_element);
        } else {
            open(modal_element);
        }
    }

    document.addEventListener('keyup', (event) => {
        if(event.key === 'Escape') {
            modals.forEach((element, i) => {
                close(element);
            });
        }
    });


    // Initialize a mutation observer
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Handle new open buttons
                        if (node.matches('[data-open-modal]')) {
                            attach_open_event(node);
                        }

                        // Handle new close buttons
                        if (node.matches('[data-close-modal]')) {
                            attach_close_event(node);
                        }

                        // Handle new modal elements
                        if (node.matches('.modal')) {
                            register(node);
                        }
                    }
                });
            }
        });
    });


    function attach_open_event(btn) {
        const selector = btn.dataset.openModal;
        const modal_for_btn = document.getElementById(selector);
        if (! modal_for_btn) {
            console.warn('Modal not found');
            return;
        }
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            open(modal_for_btn);
        });
    }


    function attach_close_event(btn) {
        const selector = btn.dataset.closeModal;
        const modal_for_btn = document.getElementById(selector);
        if (! modal_for_btn) {
            console.warn('Modal not found');
            return;
        }
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            close(modal_for_btn);
        });
    }


    const open_btns = document.querySelectorAll('[data-open-modal]');
    open_btns.forEach((btn, i) => {
        attach_open_event(btn);
    });


    const close_btns = document.querySelectorAll('[data-close-modal]');
    close_btns.forEach((btn, i) => {
        attach_close_event(btn);
    });


    // Start observing the body and its descendants
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });


    return {
        open: open,
        close: close,
        toggle: toggle,
        register: register
    };
})();








// const Modals = (function() {
//
//     function add() {
//
//     }
//
//
//     function open() {
//
//     }
//
//
//     function close() {
//
//     }
//
//
//     function toggle() {
//
//     }
//
//
//     return {
//         add: add,
//         open: open,
//         close: close,
//         toggle: toggle,
//     }
// })();
//
// /**
//  * @class
//  *
//  *
//  *
//  * @throws {NewKeywordError} - When the new keyword is not used to instantiate
//  * a new `Modal` instance.
//  */
// function Modal({
//     element=undefined,
// }) {
//
//     if (! new.target) {
//         throw new NewKeywordError();
//     }
//
//
//     return
// };
//
//
//
//
//
//
//
//
// // (function() {
// //     'use strict';
// //
// //     const modals = document.querySelectorAll('.modal');
// //     modals.forEach((modal_element, count) => {
// //         register(modal_element);
// //     });
// // }());
