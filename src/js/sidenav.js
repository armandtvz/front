'use strict';
(function ()
{
    // const open_buttons = document.querySelectorAll('.sidenav-btn.open');
    const open_buttons = document.querySelectorAll('[data-open-sidenav]');
    open_buttons.forEach( function (open_button, count)
    {
        const sidenav = document.getElementById(
            open_button.dataset.openSidenav
        );
        open_button.addEventListener('click', function(event)
        {
            event.preventDefault();
            toggle_nav(sidenav);
            // event.stopPropagation();
        });
    });


    // const close_buttons = document.querySelectorAll('.sidenav-btn.close');
    const close_buttons = document.querySelectorAll('[data-close-sidenav]');
    close_buttons.forEach( function (close_button, count)
    {
        const sidenav = document.getElementById(
            close_button.dataset.closeSidenav
        );
        close_button.addEventListener('click', function(event)
        {
            event.preventDefault();
            toggle_nav(sidenav);
            // event.stopPropagation();
        });
    });


    let sidenavs = document.querySelectorAll('.sidenav'); // TODO REVIEW This is almost useless.
    sidenavs.forEach( function (sidenav, count)
    {
        if (sidenav.classList.contains('fade-links'))
        {
            sidenav.addEventListener('transitionend', function(event)
            {
                if (event.target.id === sidenav.id)
                {
                    fade_in_links(sidenav);
                }
            });
        }
    });


    // document.querySelector('main').addEventListener('click', (event) =>
    // {
    //     sidenavs.forEach( function (sidenav, count)
    //     {
    //         toggle_nav(sidenav, true);
    //     });
    // });


    function fade_in_links(sidenav)
    {
        /*
        For now, instead of using the JS Web Animations API,
        use CSS animations and handle any delay with the CSS
        animation-delay property.

        Browser support for the Web Animations API is
        still a bit lacking and I don't really want
        to use a polyfill.

        Only problem is that the animation-delay has to be
        set manually for each element in the sidenav. This
        would, of course, be a problem sometimes.

        Also, using setTimeout() to delay adding the show-link
        class is slower than using the CSS solution.
        */

        const link_containers = sidenav.querySelectorAll('.sidenav li');
        link_containers.forEach( function(link_container, count)
        {
            /*
            Make sure that the sidenav is, in fact, closed before removing
            the show-link class would prevent unexpected behaviour from
            occuring.
            */
            if (sidenav.classList.contains('nav-is-open') === false)
            {
                link_container.classList.remove('show-link');
            }
            else
            {
                link_container.classList.add('show-link');
            }
        });
    }


    /**
    If `close` arg is true then the toggle will only close the nav not toggle to open.
    */
    function toggle_nav(sidenav, close = false)
    {
        if (sidenav)
        {
            // TODO REVIEW Maybe move this to some sort of "checks" section.
            if (! sidenav.hasAttribute('aria-hidden'))
            {
                throw 'Sidenav / responsive navbar must have aria-hidden attribute';
            }

            if (sidenav.classList.contains('nav-is-open') || close)
            {
                // Close
                sidenav.classList.remove('nav-is-open');
                sidenav.setAttribute('aria-hidden', 'true');
            }
            else
            {
                // Open
                sidenav.classList.add('nav-is-open');
                sidenav.setAttribute('aria-hidden', 'false');
            }
        }
        else
        {
            /*
            Some make-shift error-handling. This would happen when a
            data-attribute on an open or close button is pointing to
            a sidenav ID that does not exist.
            */
            console.error(
                'Sidenav config error: Make sure that sidenav open and close '
                + 'button data-attributes point to a sidenav ID that exists.'
            );
        }
    }


    // TODO REVIEW Do we still need fixed navs?
    const fixed_navs = document.querySelectorAll('.sidenav.is-fixed');
    function handle_fixed_navs(media_query)
    {
        if (media_query.matches)
        {
            fixed_navs.forEach( function(fixed_nav, count)
            {
                if (fixed_nav.classList.contains('is-fixed'))
                {
                    fixed_nav.classList.remove('is-fixed');
                }
            });
        }
        else
        {
            fixed_navs.forEach( function(fixed_nav, count)
            {
                if (fixed_nav.classList.contains('is-fixed') === false)
                {
                    fixed_nav.classList.add('is-fixed');
                }
            });
        }
    }

    // TODO make the breakpoint a setting
    const media_query = window.matchMedia('(max-width: 768px)');
    handle_fixed_navs(media_query);
    media_query.addListener(handle_fixed_navs);


















    /**
        TODO REVIEW
        What is a responsive nav?
        It is a navbar that can become a sidenav when the viewport is made smaller.
    */
    // TODO REVIEW Should data-resp-nav not be data-resp-nav-breakpoint or
    // something clearer?
    // const open_btn_wrapper = document.querySelectorAll('[]');
    // const close_btn_wrapper =
    const resp_navs = document.querySelectorAll('[data-resp-nav]');
    function set_resp_nav_breakpoints()
    {
        // Responsive navs need to have breakpoints set individually.
        // Can't have one breakpoint for all of them.
        resp_navs.forEach((resp_nav, count) =>
        {
            const breakpoint = resp_nav.getAttribute('data-resp-nav');
            breakpoint.replace('px', '');
            if (isNaN(breakpoint))
            {
                // Don't use a throw statement so that other navs that are
                // properly configured can still continue working.
                console.error('data-resp-nav value is not a number');
            }
            const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
            handle_resize(mq); // Need to do this otherwise things will be broken with initial load

            if (! mq.addEventListener)
            {
                mq.addListener(handle_resize);
            }
            else
            {
                mq.addEventListener('change', handle_resize);
            }

            function handle_resize(mq)
            {
                if (mq.matches)
                {
                    resp_nav.style.setProperty('--navbar-x-li-display', 'block'); // TODO REVIEW

                    if (resp_nav.classList.contains('y'))
                    {
                        resp_nav.style.setProperty('--nav-y-width', '100vw'); // TODO REVIEW Should this be here and make this a setting.
                    }

                    if (resp_nav.classList.contains('sidenav') === false)
                    {
                        resp_nav.classList.add('sidenav');
                        // TODO REVIEW the needed-ness of this line
                        resp_nav.setAttribute('aria-hidden', 'true');
                    }
                }
                else
                {
                    resp_nav.style.setProperty('--navbar-x-li-display', 'inline'); // TODO REVIEW

                    if (resp_nav.classList.contains('y'))
                    {
                        resp_nav.style.removeProperty('--nav-y-width'); // TODO REVIEW Should this be here and make this a setting.
                    }

                    if (resp_nav.classList.contains('sidenav') === true)
                    {
                        resp_nav.classList.remove('sidenav');
                        resp_nav.classList.remove('nav-is-open');
                        resp_nav.setAttribute('aria-hidden', 'false');
                    }
                }
            }
        });
    }
    set_resp_nav_breakpoints();








    // Be able to close the sidenav using the escape key
    sidenavs = document.querySelectorAll('.sidenav, [data-resp-nav]'); // TODO REVIEW Should data-resp-nav be included here?
    document.addEventListener('keydown', (event) =>
    {
        if (event.keyCode === 27)
        {
            sidenavs.forEach((sidenav, count) =>
            {
                if (sidenav.classList.contains('nav-is-open'))
                {
                    console.log(sidenav);
                    toggle_nav(sidenav, true);
                }
            });
        }
    });












    // TODO REVIEW
    function handle_animation_delay()
    {

    }





    // TODO
    // - [ ] Open and close buttons should automatically show and hide
    //       on responsive navs.
})();
