'use strict';
const body = document.querySelector('body');
const current_theme = body.dataset.theme;
if (current_theme === 'system' || ! current_theme) {
    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    const light = window.matchMedia('(prefers-color-scheme: light)');
    const body = document.querySelector('body');

    if (dark.matches) {
        body.classList.add('dark-theme');
    }
    if (light.matches) {
        body.classList.remove('dark-theme');
    }
}
