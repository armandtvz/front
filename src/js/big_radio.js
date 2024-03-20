'use strict';
(function() {
    const big_radios = document.querySelectorAll('.big-radio input');
    big_radios.forEach((radio, i) => {
        let wrapper = front_utils.get_closest_parent(radio, '.big-radio');
        if (radio.checked) {
            wrapper.classList.add('selected');
        }
        radio.addEventListener('change', (event) => {
            if (radio.checked) {
                wrapper.classList.add('selected');
            }
            const other_radios_in_group = document.querySelectorAll(`input[name="${radio.name}"]`);
            console.log(other_radios_in_group);
            other_radios_in_group.forEach((radio, i) => {
                wrapper = front_utils.get_closest_parent(radio, '.big-radio');
                if (radio.checked) {
                    wrapper.classList.add('selected');
                } else {
                    wrapper.classList.remove('selected');
                }
            });
        });
    });
}());
