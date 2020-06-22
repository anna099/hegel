window.onload = function() {
    resume();
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
