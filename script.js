document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("section").forEach(section => {
        const title = section.querySelector("#CourseTitle");
        if (!title) return;

        const details = document.createElement("details");
        const summary = document.createElement("summary");

        summary.appendChild(title.cloneNode(true));
        details.appendChild(summary);

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "accordion-content";

        while (section.childNodes.length > 0) {
            if (section.firstChild.id !== "CourseTitle") {
                contentWrapper.appendChild(section.firstChild);
            } else {
                section.removeChild(section.firstChild);
            }
        }

        details.appendChild(contentWrapper);
        section.appendChild(details);
    });
});
