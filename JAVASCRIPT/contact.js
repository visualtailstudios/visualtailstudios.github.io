document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contactForm form");
    if (!form || !form.querySelector("#fname")) return;

    const get = id => form.querySelector("#" + id);
    const storageKey = "contactFormSubmitted";

    const fields = [
        get("fname").parentElement,
        get("lname").parentElement,
        get("email").parentElement,
        get("number").parentElement,
        get("schedule").parentElement.parentElement,
        get("message").parentElement
    ];

    const actions = fields[5].nextElementSibling;
    const submit = form.querySelector('input[type="submit"]');
    const reset = form.querySelector('input[type="reset"]');

    if (reset) reset.remove();

    if (submit) {
        submit.value = "Send message";
        submit.classList.add("contact-submit");
        submit.remove();
    }

    const originalMessage = get("message");
    const message = document.createElement("textarea");

    message.id = originalMessage.id;
    message.name = originalMessage.name;
    message.required = originalMessage.required;
    message.placeholder = originalMessage.placeholder;
    message.rows = 5;

    originalMessage.replaceWith(message);

    get("fname").autocomplete = "given-name";
    get("lname").autocomplete = "family-name";
    get("email").autocomplete = "email";
    get("number").autocomplete = "tel";

    const sections = [
        {
            title: "Your details",
            description: "Let's start with the basics.",
            fields: fields.slice(0, 4)
        },
        {
            title: "Meeting preferences",
            description: "When works best for you?",
            fields: [fields[4]]
        },
        {
            title: "What can we help with?",
            description: "Tell us a little about your project.",
            fields: [fields[5]]
        }
    ];

    const progress = document.createElement("div");
    progress.className = "contact-progress";
    progress.setAttribute("aria-label", "Form progress");

    const bars = [];
    const steps = [];

    sections.forEach((section, index) => {
        const bar = document.createElement("span");
        bar.className = "contact-progress-step";
        progress.appendChild(bar);
        bars.push(bar);

        const panel = document.createElement("section");
        panel.className = "contact-step";
        panel.dataset.step = index;
        panel.hidden = true;

        const title = document.createElement("h4");
        title.textContent = section.title;

        const description = document.createElement("p");
        description.textContent = section.description;

        const content = document.createElement("div");
        content.className = "contact-fields";

        section.fields.forEach(field => content.appendChild(field));

        const navigation = document.createElement("div");
        navigation.className = "contact-nav";

        if (index > 0) {
            const back = document.createElement("button");
            back.type = "button";
            back.textContent = "Back";
            back.addEventListener("click", () => show(index - 1));
            navigation.appendChild(back);
        } else {
            navigation.appendChild(document.createElement("span"));
        }

        if (index < sections.length - 1) {
            const next = document.createElement("button");
            next.type = "button";
            next.className = "next";
            next.textContent = "Continue";

            next.addEventListener("click", function () {
                const controls = content.querySelectorAll(
                    "input:not([type=hidden]), textarea, select"
                );

                for (const control of controls) {
                    if (!control.checkValidity()) {
                        control.reportValidity();
                        control.focus();
                        return;
                    }
                }

                show(index + 1);
            });

            navigation.appendChild(next);
        } else {
            actions.classList.add("contact-actions");
            if (submit) navigation.appendChild(submit);
        }

        panel.append(title, description, content, navigation);
        form.appendChild(panel);
        steps.push(panel);
    });

    form.prepend(progress);
    form.querySelectorAll("br").forEach(br => br.remove());

    function show(index) {
        steps.forEach((step, i) => {
            step.hidden = i !== index;
            bars[i].classList.toggle("active", i <= index);
            bars[i].classList.toggle("current", i === index);
        });
    }

    function clearForm() {
        form.querySelectorAll(
            "input:not([type=hidden]), textarea, select"
        ).forEach(control => {
            if (control.type === "checkbox" || control.type === "radio") {
                control.checked = false;
            } else {
                control.value = "";
            }
        });

        show(0);
    }

    form.addEventListener("submit", function (event) {
        for (let i = 0; i < steps.length; i++) {
            const controls = steps[i].querySelectorAll(
                "input:not([type=hidden]), textarea, select"
            );

            for (const control of controls) {
                if (!control.checkValidity()) {
                    event.preventDefault();
                    show(i);
                    control.reportValidity();
                    control.focus();
                    return;
                }
            }
        }

        sessionStorage.setItem(storageKey, "true");
    });

    window.addEventListener("pageshow", function () {
        if (sessionStorage.getItem(storageKey) === "true") {
            clearForm();
            sessionStorage.removeItem(storageKey);
        }
    });

    show(0);
});