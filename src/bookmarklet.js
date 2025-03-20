// ==Bookmarklet==
// @name Localstorage Manager
// @author some-du6e
// ==/Bookmarklet==
var PROD = false;

function exportLocalStorage() {
    // get localstorage
    var data = JSON.stringify(localStorage);
    // add tspmo for shit and giggles
    var tspmoData = 'TSPMO' + data;
    // encode it into base64 for no reason
    var base64Data = btoa(tspmoData);
    // add "https://github.com/some-du6e/localstorage-manager#" for self promo and if someone puts their data into the browser
    var selfpromo =
        'https://github.com/some-du6e/localstorage-manager?tab=readme-ov-file&' +
        base64Data +
        '#How-to-import';
    return selfpromo;
}

function importLocalStorage(luhData) {
    // get rid off self promo
    var nopromo = luhData
        .split('?tab=readme-ov-file&')[1]
        .split('#How-to-import')[0];
    // decode base64
    var decoded = atob(nopromo);
    // remove TSPMO
    var noTspmo = decoded.substring(5);
    // parse JSON
    var data = JSON.parse(noTspmo);

    // import to localStorage
    for (var key in data) {
        localStorage.setItem(key, data[key]);
    }

    return Object.keys(data).length;
}
function die(why) {
    // fucking die
    if (!why | (why === null)) {
        // die nonchalantly
        document.body.innerHTML = '';
        window.onkeydown = window.onkeyup = window.onkeypress = () => false;
        window.onmousedown = window.onmouseup = window.onclick = () => false;
        console.clear();
        console.log(
            '%c ',
            "font-size: 1px; padding: 100px 150px; line-height: 0; background-image: url('https://http.cat/404'); background-size: contain; background-repeat: no-repeat;"
        );
        return;
    }
    // die wit a reason
    
}
let menu = {
    importWithPrompt: function () {
        // ask fo data
        let data = prompt(
            'Enter ur data into the thingamajig thats in the bottom'
        );
        // check if data is deadass
        if (data === null) {
            alert('dude wtf theres no data');
            let choice = confirm('do u want to try again');
            if (choice) {
                menu.importWithPrompt();
            } else {
                // TODO
            }
        }
    },
    exportWithPrompt: function () {
        let data = exportLocalStorage();
        prompt('Here is ur data', data);
    },
    exit: function () {
        run();
    },
    init: function () {
        // TODO
    },
    debug: function () {
        if (PROD) {
            alert('no');
        }
    },
};

function run(acctualyRun) {
    if (!acctualyRun | (acctualyRun === null)) {
        die();
    }

    // do some manuvers to get acctualy allow alert() to work for some pages
    // credits: https://github.com/Blookettaker/blooket-hacks-lmafo/blob/37e2ac3fc610c26901cd71b90a756c251fad274e/unobfuscated/gui.js#L636
    let sigmaIframe = document.createElement('iframe');
    document.body.append(sigmaIframe);
    window.alert = sigmaIframe.contentWindow.alert.bind(window);
    window.confirm = sigmaIframe.contentWindow.confirm.bind(window);
    window.prompt = sigmaIframe.contentWindow.prompt.bind(window);

    // TODO: check for updates

    // check if its already ran on this page
    if (!window.lsmran | (window.lsmran === null)) {
        // set it as already ran
        window.lsmran = true;
    } else {
        // TODO: add a more staightfoward menu flow system
        // * TEMP * //
        menu.init();
    }
}
