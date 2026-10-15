
document.addEventListener("DOMContentLoaded", function() {
    fetch("../bar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load navbar: " + response.status);
            }

            return response.text();
        })
        .then(html => {
            document.getElementById("navbar").innerHTML = html;
        })
        .catch(error => console.error(error));
});

document.addEventListener("click", function(e) {
    const appButton = e.target.closest("#app-button");

    if (appButton) {
        e.preventDefault();

        const isApple =
            /iPhone|iPad|iPod|Macintosh|MacIntel|MacPPC|Mac68K/i
            .test(navigator.userAgent);

        const destination = isApple
            ? "../SRC/mac/app.html"
            : "../SRC/andriod/app.html";

        location.href = new URL(destination, location.href).href;
        return;
    }
    /*
    const link = e.target.closest("a");

    if (!link ||
        link.target === "_blank" ||
        link.origin !== location.origin ||
        (link.pathname === location.pathname &&
         link.search === location.search &&
         link.hash === location.hash) ||
        e.ctrlKey || e.metaKey || e.shiftKey || e.altKey ||
        e.button !== 0
    ) return;

    if (!document.startViewTransition) return;

    e.preventDefault();

    document.startViewTransition(function() {
        location.href = link.href;
    }); */
});
