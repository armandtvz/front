'use strict';
const Toaster = function()
{
    const animate_css_class = 'animate';
    let toaster = document.getElementById('toaster');
    const toaster_markup = `<div class="toaster" id="toaster" role="alert" aria-live="polite"></div>`;
    if (! toaster)
    {
        toaster = front_utils.string_to_html(toaster_markup);
        const main_element = document.querySelector('main');
        if (! main_element)
        {
            document.body.prepend(toaster);
        }
        else
        {
            main_element.prepend(toaster);
        }
    }

    const toast_markup = (
        `<div class="toast" role="alert" aria-live="assertive" data-delay="5000">
                <span class="toast-text">
                </span>
                <button class="btn close-toast-btn" name="button" type="button">
                        <svg aria-hidden="true" fill="none" focusable="false" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
                        <span class="sr-only">Close message</span>
                </button>
        </div>`
    );


    function init()
    {
        const toast_elements = document.querySelectorAll('.toast');
        toast_elements.forEach((toast, i) => {
            add(toast);
        });
    }
    init();


    function add({
        css_class = 'info',
        autoclose = true,
        animate = true,
        delay = 5000,
        toast = undefined,
        text = undefined,
    })
    {
        if (! toast && text)
        {
            toast = front_utils.string_to_html(toast_markup);
            toast.classList.add(css_class);
            if (animate)
            {
                toast.classList.add(animate_css_class);
            }
            if (! autoclose)
            {
                toast.dataset.delay = '-1';
            }
            else
            {
                toast.dataset.delay = delay;
            }
            const toast_text = toast.querySelector('.toast-text');
            toast_text.textContent = text;
            toaster.prepend(toast);
        }
        else
        {
            return;
        }

        const close_btn = toast.querySelector('.close-toast-btn');
        close_btn.addEventListener('click', (event) =>
        {
            remove(toast, 0);
        });

        // Setting the delay to -1 will disable autoclosing
        delay = toast.dataset.delay;
        if (delay != -1)
        {
            window.setTimeout(() =>
            {
                remove(toast, 300);
            }, delay);
        }
    }


    function remove(toast, delay=0)
    {
        toast.classList.add('remove');
        window.setTimeout(() =>
        {
            toast.remove();
        }, delay);
    }


    return {
        add: add,
    }
}();
