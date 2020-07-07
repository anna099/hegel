window.onload = function() {
    smallCaps(); // sections begin with a few words in small caps.
    wordCount(); // a wordcount appears at the end of the page.

    document.onkeypress = function(e) {
        let s = String.fromCharCode(e.keyCode || e.which);
        if (s === 'j') {
            nextColor();
        }
    };
}

let v = null;
function smallCaps() {
    const ps = document.querySelectorAll('h3 + p, h4 + p, h3 + blockquote + p');
    for (var i = 0; i < ps.length; i++) {
        let p = ps[i];
        // store first 4 words, and remove them
        let four = p.innerHTML.split(' ').slice(0, 4).join(' ');
        p.innerHTML = p.innerHTML.replace(four, '');
        // reinsert the first 4 words in small-caps
        let sc = '<span class=sc>';
        sc += four + '</span>';
        p.insertAdjacentHTML('afterbegin', sc);
    }
}

function wordCount() {
    let words = 0;
    let x = document.createElement('p');
    x.id = 'wordcount';
    let content = document.getElementsByClassName('content')[0];
    content.querySelectorAll('p').forEach(x => words += x.innerText.split(' ').length);
    x.innerText = words + ' words';
    document.body.appendChild(x);
}
