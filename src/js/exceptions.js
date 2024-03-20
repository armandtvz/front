'use strict';
class NewKeywordError extends TypeError {
    constructor(message) {
        message = 'Object cannot be created without the new keyword';
        super(message);
        this.name = 'NewKeywordError';
    }
}


class NotImplementedError extends Error {
    constructor(message) {
        message = 'Function not implemented';
        super(message);
        this.name = 'NotImplementedError';
    }
}


class ElementNotFound extends Error {
    constructor(element_id) {
        const message = `Element with ID "${element_id}" not found.`;
        super(message);
        this.name = 'ElementNotFound';
    }
}


class TemplateNotFound extends Error {
    constructor(template_id) {
        const message = `Template with ID "${template_id}" not found.`;
        super(message);
        this.name = 'TemplateNotFound';
    }
}


class DuplicateComponent extends Error {
    constructor(element_id) {
        const message = (
            `Component with ID "${element_id}" has already been created.`
        );
        super(message);
        this.name = 'DuplicateComponent';
    }
}
