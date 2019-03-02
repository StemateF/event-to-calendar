// export function queryString(obj, prefix) {
//     var str = [],
//         p;
//     for (p in obj) {
//         if (obj.hasOwnProperty(p)) {
//             var k = prefix ? prefix + "[" + p + "]" : p,
//                 v = obj[p];
//             str.push((v !== null && typeof v === "object") ?
//                 queryString(v, k) :
//                 encodeURIComponent(k) + "=" + encodeURIComponent(v));
//         }
//     }
//     return str.join("&");
// }

/**
 *
 * @param htmlString
 * @returns {Element}
 */
export function stringToHtml(htmlString) {
    let dummyTemplate = document.createElement('template');
    htmlString.trim();
    dummyTemplate.innerHTML = htmlString;

    return dummyTemplate.content.firstElementChild
}

function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2)
}

export function generateRandomId(len) {
    var arr = new Uint8Array((len || 16) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('')
}