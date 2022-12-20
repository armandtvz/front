'use strict';
const front_utils = function()
{


    /**
     * Converts a string into an HTMLElement.
     * @param {string} str - The string to convert.
     * @returns {HTMLElement}
     */
    function string_to_html(str)
    {
    	const div = document.createElement('div');
    	div.innerHTML = str;
        const element = div.firstElementChild;
        return element;
    }




    function get_closest_parent(elem, selector)
    {
        // From here: https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/
    	// Element.matches() polyfill
    	if (!Element.prototype.matches)
        {
    	    Element.prototype.matches =
    	        Element.prototype.matchesSelector ||
    	        Element.prototype.mozMatchesSelector ||
    	        Element.prototype.msMatchesSelector ||
    	        Element.prototype.oMatchesSelector ||
    	        Element.prototype.webkitMatchesSelector ||
    	        function(s)
                {
    	            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
    	                i = matches.length;
    	            while (--i >= 0 && matches.item(i) !== this) {}
    	            return i > -1;
    	        };
    	}

    	// Get the closest matching element
    	for ( ; elem && elem !== document; elem = elem.parentNode )
        {
    		if ( elem.matches( selector ) ) return elem;
    	}
    	return null;
    };




    return {
        string_to_html: string_to_html,
        get_closest_parent: get_closest_parent,
    }
}();
