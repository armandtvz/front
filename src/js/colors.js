(function() {
    'use strict';

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const btn = document.getElementById('dark-light-toggle');

    if (! btn)
    {
        return;
    }

    const request_url = btn.dataset.toggleUrl;
    const csrftoken = btn.dataset.csrftoken;

    if (btn)
    {
        btn.addEventListener('click', () =>
        {
            document.body.classList.toggle('dark-theme');
            if (request_url)
            {
                const xhr = new XMLHttpRequest();
                xhr.addEventListener('load', handle_xhr_load);
                xhr.open('POST', request_url);
                if (csrftoken)
                {
                    xhr.setRequestHeader('X-CSRFToken', csrftoken);
                }
                xhr.send();
            }

            function handle_xhr_load(event)
            {
                // REVIEW: Do nothing for now
            }
        });
    }
}());
