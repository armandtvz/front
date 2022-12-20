'use strict';
(function() {
    const open_dropups = document.querySelectorAll('[data-open-dropup]');
    open_dropups.forEach((btn, i) => {
        const dropup_id = btn.dataset.openDropup;
        const dropup = document.getElementById(dropup_id);
        btn.addEventListener('click', (event) => {
            dropup.classList.toggle('open');
            dropup.toggleAttribute('aria-hidden');
            event.stopPropagation();
        });

        document.addEventListener('click', (event) => {
            dropup.classList.remove('open');
            dropup.setAttribute('aria-hidden', true);
        })
    });
}());
