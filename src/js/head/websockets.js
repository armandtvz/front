'use strict';
const ws = {};
(function() {
    if (window.location.protocol === 'https:') {
        ws.scheme = 'wss://';
    } else {
        ws.scheme = 'ws://';
    }
}());
Object.freeze(ws);
