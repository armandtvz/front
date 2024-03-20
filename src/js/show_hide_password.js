'use strict';
(function() {
    const show_password_buttons = document.querySelectorAll('[data-toggle-show-password-input]');
    show_password_buttons.forEach((btn, i) => {
        let event_name = undefined;
        if (btn.tagName === 'button') {
            event_name = 'click';

        } else if (btn.tagName === 'input') {
            event_name = 'change';

        } else {
            event_name = 'click';
        }
        const input_id = btn.dataset.toggleShowPasswordInput;
        const input = document.getElementById(input_id);

        btn.addEventListener(event_name, (event) => {
            if (! input) {
                console.warning('No input found for toggle show/hide password.');
                return;
            }
            if (input.type === 'password') {
                input.type = 'text';
                btn.ariaPressed = true;
                btn.classList.add('showing-password');
                if (btn.textContent) {
                    btn.textContent = 'Hide';
                }
            } else {
                input.type = 'password';
                btn.ariaPressed = false;
                btn.classList.remove('showing-password');
                if (btn.textContent) {
                    btn.textContent = 'Show';
                }
            }
        });
    });
}());
