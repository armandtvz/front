'use strict';
(function() {
    const show_select_everything_event = new Event('front:show_select_everything');
    const hide_select_everything_event = new Event('front:hide_select_everything');

    const select_everything = document.getElementById('select-everything');
    const select_all = document.getElementById('select-all');
    if (! select_all) {
        return;
    }
    const checkboxes = document.querySelectorAll('.row-select');
    let last_clicked = undefined;
    let count = 0;


    /*
    states:
    - all selected
    - everything selected
    - some selected
    - none selected
    */


    function _select_all(event) {
        count = 0;
        if (event.target.checked) {
            checkboxes.forEach((box, i) => {
                box.checked = true;
                count += 1;
            });
            select_all.checked = true;
            select_all.indeterminate = false;
            document.dispatchEvent(show_select_everything_event);

        } else {
            checkboxes.forEach((box, i) => {
                box.checked = false;
            });
            select_all.checked = false;
            select_all.indeterminate = false;
            select_everything.checked = false;
            document.dispatchEvent(hide_select_everything_event);
        }
    }


    function is_all_checked() {
        for (let i = 0; i < checkboxes.length; i++) {
            const box = checkboxes[i];
            if (! box.checked) {
                return false;
            }
        }
        return true;
    }


    function is_nothing_checked() {
        for (let i = 0; i < checkboxes.length; i++) {
            const box = checkboxes[i];
            if (box.checked) {
                return false;
            }
        }
        return true;
    }


    function select_everything_change(event) {
        select_all.checked = event.target.checked;
        _select_all(event);
    }


    function select_all_change(event) {
        if (! event.target.checked) {
            if (select_everything && ! global.select_everything_stays_checked) {
                select_everything.checked = false;
            }
        }
        _select_all(event);
    }


    function checkbox_change(checked) {
        if (checked) {
            count += 1;
            if (is_all_checked()) {
                select_all.checked = true;
                select_all.indeterminate = false;
                document.dispatchEvent(show_select_everything_event);
            } else {
                select_all.checked = false;
                select_all.indeterminate = true;
            }
        } else {
            if (count > 0) {
                count -= 1;
            }
            const nothing_is_checked = is_nothing_checked();
            if (nothing_is_checked) {
                select_all.checked = false;
                if (select_everything.checked) {
                    select_all.indeterminate = true;
                } else {
                    select_all.indeterminate = false;
                }
            }
            if (select_all.checked) {
                select_all.checked = false;
                select_all.indeterminate = true;
            }
            if (select_everything) {
                if (! global.select_everything_stays_checked) {
                    if (select_everything.checked) {
                        select_everything.checked = false;
                    }
                    document.dispatchEvent(hide_select_everything_event);
                } else {
                    if (! select_everything.checked && nothing_is_checked) {
                        document.dispatchEvent(hide_select_everything_event);
                    }
                }
            }
        }
    }


    if (select_everything) {
        select_everything.addEventListener('change', (event) => {
            select_everything_change(event);
        });
    }
    select_all.addEventListener('change', (event) => {
        select_all_change(event);
    });
    checkboxes.forEach((box, i) => {
        box.addEventListener('change', (event) => {
            checkbox_change(event.target.checked);
        });
    });
    checkboxes.forEach((box, i) => {
        checkbox_change(box.checked);
    });
}());
