window.onload = function () {
    smallCaps();  // sections begin with a few words in small caps.
    wordCount();  // a wordcount appears at the end of the page.
    hoverNotes(); // hover over a footnote number to see the note.
    pageTitle();  // set the page title to something appropriate.
    numbering();  // add decimal numbering ('4.1.1' etc) to H4's.
};

function smallCaps() {
    const ps = document.querySelectorAll("h3 + p, h4 + p, h3 + blockquote + p");
    for (var i = 0; i < ps.length; i++) {
        let p = ps[i];
        // store first 4 words, and remove them
        let four = p.innerHTML.split(" ").slice(0, 4).join(" ");
        p.innerHTML = p.innerHTML.replace(four, "");
        // reinsert the first 4 words in small-caps
        let sc = "<span class=sc>";
        sc += four + "</span>";
        p.insertAdjacentHTML("afterbegin", sc);
    }
}

function wordCount() {
    let words = 0;
    let x = document.createElement("p");
    x.id = "wordcount";
    let content = document.getElementsByClassName("content")[0];
    content
        .querySelectorAll("p")
        .forEach((x) => (words += x.innerText.split(" ").length));
    x.innerText = words + " words";
    document.body.appendChild(x);
}

function hoverNotes() {
    let hov = document.createElement("div");
    hov.id = "hover-note";
    document.body.appendChild(hov);

    let ns = document.querySelectorAll(".footnote-ref");
    ns.forEach((n) => {
        n.onmouseenter = (e) => {
            hov.style.opacity = "1";
            hov.style.top = e.clientY;
            hov.style.left = e.clientX;
            let t = document.querySelector(n.attributes.href.value).innerHTML;
            t = t.replace("↩", "");
            hov.innerHTML = t;
        };
        n.onmouseleave = (e) => {
            hov.style.opacity = "0";
            hov.style.top = -900;
            hov.style.left = -900;
        };
    });
}

function pageTitle() {
    let contents = document.querySelectorAll("#contents a");
    contents.forEach((c) => {
        let url = withoutAnchor(c.href);
        let current_url = withoutAnchor(document.URL);

        if (current_url === url) {
            var at = c;
            var parents = [];
            while (at) {
                parents.unshift(at);
                at = at.parentNode;
            }
            document.title = 'Hegel / ' + parents[4].firstChild.data;
        }
    });
}

// Taking 'page.html#section', returns 'page.html'
function withoutAnchor(url) {
    if (url.indexOf("#") >= 0) {
        return url.slice(0, url.indexOf("#"));
    } else {
        return url;
    }
}

function numbering() {
    let subheads = document.querySelectorAll("h4:not(#author):not(.subtitle)");
    subheads.forEach((s) => {
        s.setAttribute('js-number', getContentsIndex(s.id));
    });
}

// Takes an ID (used as an href) and returns the decimal place in the contents
function getContentsIndex(id) {
    let items = document.querySelectorAll("#contents a");
    let x = undefined;

    items.forEach((i) => {
        if (i.href.substr(i.href.indexOf("#") + 1) === id) {
            x = i;
        }
    });

    let p = parentsOf(x);
    let io = Array.prototype.indexOf;
    return (io.call(p[3].children, p[4]) + 1) + "." +
           (io.call(p[5].children, p[6]) + 1) + "." +
           (io.call(p[7].children, p[8]) + 1);
}

function parentsOf(elem) {
    var parents = [];
    while (elem) {
        parents.unshift(elem);
        elem = elem.parentNode;
    }
    return parents;
}
