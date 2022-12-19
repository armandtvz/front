(function()
{
    'use strict';
    const open_dropups = document.querySelectorAll('[data-open-dropup]');
    for (let i = 0; i < open_dropups.length; i++)
    {
        const btn = open_dropups[i];
        const dropup_id = btn.dataset.openDropup;
        const dropup = document.getElementById(dropup_id);
        btn.addEventListener('click', (event) =>
        {
            dropup.classList.toggle('open');
            dropup.toggleAttribute('aria-hidden');
            event.stopPropagation();
        });

        document.addEventListener('click', (event) =>
        {
            dropup.classList.remove('open');
            dropup.setAttribute('aria-hidden', true);
        })
    }
}());
