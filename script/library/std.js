/*
    A collection of helper functions. What you can expect everywhere.
*/

function getById(id){
    return document.getElementById(id)
}

function makeRequest(method, url) {
    console.log("Requesting " + url)
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            console.log("Retrieved " + url)
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

// A lil EJS helper function, for if we need to render from a non-stored file
async function renderNewFile(url, data, options = {}){
    options.async = true
    return await ejs.render(await makeRequest("GET", url), data, options);
}

// Another EJS helper, but this time more flexible.
function render(file, data = {}, options = {}){
    data.templates = templates
    return ejs.render(file, data, options)
}