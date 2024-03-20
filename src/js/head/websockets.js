'use strict';
window.location.websocket_scheme = 'ws://';
if (window.location.protocol === 'https:') {
    window.location.websocket_scheme = 'wss://';
}
