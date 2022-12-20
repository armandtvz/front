'use strict';

const modal = (function()
{
    function register(modal_element)
    {
        modal_element.addEventListener('click', (event) =>
        {
            if (event.target.classList.contains('modal'))
            {
                close(modal_element);
            }
        });

        const close_btns = modal_element.querySelectorAll('[data-close-modal]');
        close_btns.forEach((btn, count) =>
        {
            btn.addEventListener('click', (event) =>
            {
                close(modal_element);
            });
        });
    }

    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal_element, count) => {
        register(modal_element);
    });

    function open(modal_element)
    {
        modal_element.classList.add('is-showing');
    }

    function close(modal_element)
    {
        modal_element.classList.remove('is-showing');
    }

    function toggle(modal_element)
    {
        if (modal_element.classList.contains('is-showing'))
        {
            close(modal_element);
        }
        else
        {
            open(modal_element);
        }
    }

    return {
        open: open,
        close: close,
        toggle: toggle,
        register: register
    };
})();
