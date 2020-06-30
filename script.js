window.onload = function() {
    resume(); // restore the previous light/dark mode.
    smallCaps(); // sections begin with a few words in small caps.
    wordCount(); // a wordcount appears at the end of the page.

    const ls = document.getElementById('lightswitch');
    ls.onclick = darkToggle;
}

function resume() {
    if (localStorage['darkmode']) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark')
    }
}

function darkToggle() {
    if (localStorage['darkmode']) {
        document.body.classList.remove('dark');
        localStorage.removeItem('darkmode');
    } else {
        document.body.classList.add('dark')
        localStorage.setItem('darkmode', true);
    }
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
        let sc = '<span style="text-transform:lowercase;font-variant:small-caps">';
        sc += four + '</span>';
        p.insertAdjacentHTML('afterbegin', sc);
    }
}

function wordCount() {
    let words = 0;
    let x = document.createElement('p');
    x.id = 'wordcount';
    document.querySelectorAll('p').forEach(x => words += x.innerText.split(' ').length);
    x.innerText = words + ' words';
    document.body.appendChild(x);
}
