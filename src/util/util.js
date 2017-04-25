export function isObj(data) {
    return Object.prototype.toString.call(data) === '[object Object]';
}