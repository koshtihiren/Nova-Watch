n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("current-date").innerHTML = d + "/" + m + "/" + y;

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       LUCIDE
    ========================================================== */

    if (window.lucide) {
        lucide.createIcons();
    }

    /* ==========================================================
       FLOATING PARALLAX
    ========================================================== */

    const watch = document.querySelector(".success-watch");

    if (watch) {

        window.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5) * 16;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 16;

            watch.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }

    /* ==========================================================
       SCROLL REVEAL
    ========================================================== */

    const revealElements = document.querySelectorAll(
        ".order-summary-card, .timeline-item, .next-steps-card"
    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.15
        }

    );

    revealElements.forEach((element) => {

        element.classList.add("reveal");

        observer.observe(element);

    });

    /* ==========================================================
       BUTTON RIPPLE
    ========================================================== */

    document.querySelectorAll(".button").forEach((button) => {

        button.addEventListener("click", (event) => {

            const ripple = document.createElement("span");

            const rect = button.getBoundingClientRect();

            const size =
                Math.max(rect.width, rect.height);

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            ripple.className = "button-ripple";

            button.appendChild(ripple);

            ripple.addEventListener("animationend", () => {

                ripple.remove();

            });

        });

    });

    /* ==========================================================
       ORDER NUMBER
    ========================================================== */

    const orderElement = document.querySelector(
        ".summary-item strong"
    );

    if (orderElement) {

        const number =
            Math.floor(
                100000 + Math.random() * 900000
            );

        orderElement.textContent =
            `#NW${number}`;

    }

});