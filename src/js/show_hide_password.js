'use strict';
(function() {
    const show_password_btn = document.getElementById('show_password_btn');
    const password_input = document.querySelector('input[type="password"]');

    if (show_password_btn && password_input) {
        show_password_btn.addEventListener('click', (event) => {
            if (password_input.type === 'password') {
                password_input.type = 'text';
                show_password_btn.ariaPressed = true;
                show_password_btn.textContent = 'Hide password';
            } else {
                password_input.type = 'password';
                show_password_btn.ariaPressed = false;
                show_password_btn.textContent = 'Show password';
            }
        });
    }
}());
