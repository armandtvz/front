'use strict';




class Response {
    constructor({ obj, status, ok, done, failed, is_json }) {
        this.response_obj = obj; // The original fetch Response object
        this.status = status;    // HTTP status code
        this.ok = ok;            // True if status is 2xx
        this.is_json = is_json;
        this._text = undefined;
        this._json = undefined;
        this.done = done;        // True if the request completed
        this.failed = failed;    // True if the request failed

        this.data = undefined;
    }


    is_success() {
        return this.ok;
    }


    headers() {
        if (this.response_obj) {
            return this.response_obj.headers;
        }
        return null;
    }


    get_header(name) {
        if (this.response_obj && this.response_obj.headers) {
            return this.response_obj.headers.get(name);
        }
        return null;
    }


    async text() {
        if (this._text) {
            return this._text;
        }
        if (this.response_obj) {
            try {
                this._text = await this.response_obj.text();
            } catch (e) {}

            return this._text;
        }
        return null;
    }


    async json() {
        if (this._json) {
            return this._json;
        }
        if (this.response_obj) {
            try {
                this._json = await this.response_obj.json();
            } catch (e) {}

            return this._json;
        }
        return null;
    }


    async _data() {
        if (! this.is_json) {
            try {
                await this.text();
            } catch (e) {}
        }

        try {
            await this.json();
        } catch (e) {}

        this.data = this._json || this._text;
        return this.data;
    }
}




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
            const resp_obj = new Response({
                obj: response,
                status: 0,
                done: false,
                failed: true,
                is_json: json,
            })
            await resp_obj._data();
            return resp_obj;
        }
        let ok = false;

        if (response.status >= 200 && response.status < 300) {
            ok = true;
        }
        const resp_obj = new Response({
            obj: response,
            status: response.status,
            ok: ok,
            done: true,
            failed: false,
            is_json: json,
        })
        await resp_obj._data();
        return resp_obj;
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
