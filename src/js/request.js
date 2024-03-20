'use strict';
const request = (function() {


    async function send({
        method='get',
        url=undefined,
        payload=undefined,
        headers={},

        json=true,

        // Convenience to add CSRF header
        csrf_token=undefined,

        // Whether or not this was triggered automatically
        // or by direct user action.
        is_auto=false,
    }) {
        const fetch_network_error_event = new CustomEvent(
            'fetch_network_error', {
            detail: {
                is_auto: is_auto,
                url: url,
            },
        });
        let status = undefined;
        let response = undefined;
        let data = {};

        const fetch_args = {
            method: method,
            headers: headers,
        };
        if (payload) {
            payload = JSON.stringify(payload);
            Object.assign(fetch_args, {
                body: payload,
            });
        }
        if (csrf_token) {
            Object.assign(headers, {
                'X-CSRFToken': csrf_token,
            });
        }
        if (json) {
            Object.assign(headers, {
                'Content-Type': 'application/json',
            });
        }

        try {
            response = await fetch(url, fetch_args);

        } catch (e) {
            document.dispatchEvent(fetch_network_error_event);
            return {
                obj: response,
                status: 0,
                data: data,
                done: false,
                failed: true,
            };
        }
        try {
            data = await response.json();

        } catch (e) {
            // response.json is not a function
            if (! e instanceof TypeError) {
                console.warn('TypeError');
                throw e;
            }
        }
        return {
            obj: response,
            status: response.status,
            data: data,
            done: true,
            failed: false,
        };
    }


    async function get(url, args) {
        if (! args) {
            args = {};
        }
        args = Object.assign(args, {
            url: url,
            method: 'get',
        });
        const response = await send(args);
        return response;
    }


    async function post(url, args) {
        if (! args) {
            args = {};
        }
        args = Object.assign(args, {
            url: url,
            method: 'post',
        });
        const response = await send(args);
        return response;
    }


    async function put(url, args) {
        if (! args) {
            args = {};
        }
        args = Object.assign(args, {
            url: url,
            method: 'put',
        });
        const response = await send(args);
        return response;
    }


    async function patch(url, args) {
        if (! args) {
            args = {};
        }
        args = Object.assign(args, {
            url: url,
            method: 'patch',
        });
        const response = await send(args);
        return response;
    }


    async function head(url, args) {
        if (! args) {
            args = {};
        }
        args = Object.assign(args, {
            url: url,
            method: 'head',
        });
        const response = await send(args);
        return response;
    }


    async function del(url, args) {
        if (! args) {
            args = {};
        }
        args = Object.assign(args, {
            url: url,
            method: 'delete',
        });
        const response = await send(args);
        return response;
    }


    return {
        get: get,
        post: post,
        put: put,
        patch: patch,
        head: head,
        del: del,
    }
})();
