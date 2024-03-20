'use strict';
(function() {
    const data_attr = 'data-lazy-src';

    document.addEventListener('DOMContentLoaded', (event) => {
        const images = [].slice.call(document.querySelectorAll(`img[${data_attr}]`));

        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            let lazy_img_observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    // Check if the image is in the viewport
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.src = lazyImage.getAttribute(data_attr);
                        lazyImage.removeAttribute(data_attr);
                        lazy_img_observer.unobserve(lazyImage);
                    }
                });
            });
            images.forEach((image, i) => {
                lazy_img_observer.observe(image);
            });

        } else {
            // Fallback for browsers that do not support IntersectionObserver.
            // Immediately load all images if not supported.
            images.forEach((image, i) => {
                image.src = image.getAttribute(data_attr);
                image.removeAttribute(data_attr);
            });
        }
    });
}());
