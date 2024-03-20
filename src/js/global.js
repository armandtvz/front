const global = globalThis;

const host = window.location.host;
const base_url = `${window.location.protocol}//${host}/`;
global.base_url = base_url;


global.select_everything_stays_checked = true;
