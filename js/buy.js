/* ==========================================================
   PRODUCT GALLERY
========================================================== */

const galleryData = {
    white: [
        "assets/gallery/white_front.png",
        "assets/gallery/white_angle.png",
        "assets/gallery/white_back.png",
    ],

    black: [
        "assets/gallery/black_front.png",
        "assets/gallery/black_angle.png",
        "assets/gallery/black_back.png",
    ],

    blue: [
        "assets/gallery/blue_front.png",
        "assets/gallery/blue_angle.png",
        "assets/gallery/blue_back.png",
    ],

    pink: [
        "assets/gallery/pink_front.png",
        "assets/gallery/pink_angle.png",
        "assets/gallery/pink_back.png",
    ],
};

/* ==========================================================
   ELEMENTS
========================================================== */

const galleryImage = document.querySelector(".product-gallery__image");
const thumbnails = document.querySelectorAll(".thumbnail");

const colorButtons = document.querySelectorAll(".color-dot");
const selectedColor = document.querySelector(".selected-color");

/* ==========================================================
   STATE
========================================================== */

let currentColor = "white";
let currentImage = 0;

/* ==========================================================
   GALLERY
========================================================== */

function updateGallery() {

    const images = galleryData[currentColor];

    galleryImage.style.opacity = "0";

    setTimeout(() => {

        galleryImage.src = images[currentImage];

        galleryImage.style.opacity = "1";

    }, 180);

}

/* ==========================================================
   ACTIVE THUMBNAIL
========================================================== */

function updateThumbnailState() {

    thumbnails.forEach((thumbnail, index) => {

        thumbnail.classList.toggle(
            "is-active",
            index === currentImage
        );

    });

}

/* ==========================================================
   THUMBNAIL EVENTS
========================================================== */

thumbnails.forEach((thumbnail, index) => {

    thumbnail.addEventListener("click", () => {

        currentImage = index;

        updateGallery();

        updateThumbnailState();

    });

});

/* ==========================================================
   INITIALIZE
========================================================== */

updateGallery();

updateThumbnailState();

/* ==========================================================
   COLOR SWITCHING
========================================================== */

function updateColorState() {

    colorButtons.forEach((button) => {

        button.classList.toggle(
            "active",
            button.dataset.color === currentColor
        );

    });

}

/* ==========================================================
   UPDATE THUMBNAIL IMAGES
========================================================== */

function updateThumbnailImages() {

    const images = galleryData[currentColor];

    thumbnails.forEach((thumbnail, index) => {

        const image = thumbnail.querySelector("img");

        if (image) {
            image.src = images[index];
        }

    });

}

/* ==========================================================
   UPDATE SELECTED COLOR LABEL
========================================================== */

function updateColorLabel() {

    const labels = {
        white: "Arctic White",
        black: "Midnight Black",
        blue: "Ocean Blue",
        pink: "Aurora Pink",
    };

    if (selectedColor) {
        selectedColor.textContent = labels[currentColor];
    }

}

/* ==========================================================
   COLOR EVENTS
========================================================== */

colorButtons.forEach((button) => {

    button.addEventListener("click", () => {

        currentColor = button.dataset.color;

        currentImage = 0;

        updateGallery();

        updateThumbnailImages();

        updateThumbnailState();

        updateColorState();

        updateColorLabel();

    });

});

/* ==========================================================
   INITIALIZE
========================================================== */

updateThumbnailImages();

updateColorState();

updateColorLabel();

/* ==========================================================
   QUANTITY SELECTOR
========================================================== */

const decreaseButton = document.getElementById("quantityMinus");
const increaseButton = document.getElementById("quantityPlus");
const quantityValue = document.getElementById("quantityValue");

let quantity = 1;

function updateQuantity() {

    if (quantityValue) {
        quantityValue.textContent = quantity;
    }

}

/* ==========================================================
   QUANTITY EVENTS
========================================================== */

if (decreaseButton) {

    decreaseButton.addEventListener("click", () => {

        if (quantity > 1) {
            quantity--;
            updateQuantity();
        }

    });

}

if (increaseButton) {

    increaseButton.addEventListener("click", () => {

        quantity++;
        updateQuantity();

    });

}

/* ==========================================================
   PURCHASE BUTTONS
========================================================== */

const buyNowButton = document.querySelector(".purchase-buy");
const addToCartButton = document.querySelector(".purchase-cart");

if (buyNowButton) {

    buyNowButton.addEventListener("click", () => {

        window.location.href = "order-success.html";

    });

}

/* ==========================================================
   INITIALIZE
========================================================== */

updateQuantity();

updateGallery();
updateThumbnailImages();
updateThumbnailState();

updateColorState();
updateColorLabel();

/* ==========================================================
   CUSTOMER REVIEWS
========================================================== */

const ratingBars = document.querySelectorAll(".rating-progress__fill");
const reviewCards = document.querySelectorAll(".review-card");
const helpfulButtons = document.querySelectorAll(".helpful-button");

/* ==========================================================
   RATING BAR ANIMATION
========================================================== */

function animateRatingBars() {

    ratingBars.forEach((bar) => {

        const width = bar.dataset.width;

        requestAnimationFrame(() => {

            bar.style.width = `${width}%`;

        });

    });

}

/* ==========================================================
   REVIEW CARD REVEAL
========================================================== */

const reviewObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

        });

    },

    {
        threshold:0.15
    }

);

reviewCards.forEach((card) => {

    reviewObserver.observe(card);

});

/* ==========================================================
   RATING SUMMARY REVEAL
========================================================== */

const summary = document.querySelector(".reviews-summary");

const summaryObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            animateRatingBars();

            observer.unobserve(entry.target);

        });

    },

    {
        threshold:0.3
    }

);

if (summary) {

    summaryObserver.observe(summary);

}

/* ==========================================================
   HELPFUL BUTTON
========================================================== */

helpfulButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (button.classList.contains("is-active")) return;

        button.classList.add("is-active");

        button.textContent = "✓ Helpful";

        button.setAttribute(
            "aria-pressed",
            "true"
        );

    });

});

/* ==========================================================
   KEYBOARD ACCESSIBILITY
========================================================== */

helpfulButtons.forEach((button) => {

    button.addEventListener("keydown", (event) => {

        if (
            event.key !== "Enter" &&
            event.key !== " "
        ) return;

        event.preventDefault();

        button.click();

    });

});

/* ==========================================================
   FAQ ACCORDION
========================================================== */

const faqItems = document.querySelectorAll(".faq-item");
const faqTriggers = document.querySelectorAll(".faq-trigger");

/* ==========================================================
   CLOSE ALL ITEMS
========================================================== */

function closeAllFaqItems() {

    faqItems.forEach((item) => {

        const trigger = item.querySelector(".faq-trigger");
        const content = item.querySelector(".faq-content");

        trigger.setAttribute("aria-expanded", "false");

        content.classList.remove("is-open");

        content.style.maxHeight = null;

    });

}

/* ==========================================================
   TOGGLE ITEM
========================================================== */

faqTriggers.forEach((trigger) => {

    trigger.addEventListener("click", () => {

        const item = trigger.closest(".faq-item");
        const content = item.querySelector(".faq-content");

        const isOpen =
            trigger.getAttribute("aria-expanded") === "true";

        closeAllFaqItems();

        if (isOpen) return;

        trigger.setAttribute("aria-expanded", "true");

        content.classList.add("is-open");

        content.style.maxHeight =
            content.scrollHeight + "px";

    });

});

/* ==========================================================
   INITIAL STATE
========================================================== */

const initialOpen = document.querySelector(
    ".faq-trigger[aria-expanded='true']"
);

if (initialOpen) {

    const content = initialOpen
        .closest(".faq-item")
        .querySelector(".faq-content");

    content.style.maxHeight =
        content.scrollHeight + "px";

}

/* ==========================================================
   SCROLL REVEAL
========================================================== */

const faqObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

        });

    },

    {
        threshold:0.15
    }

);

faqItems.forEach((item) => {

    faqObserver.observe(item);

});

/* ==========================================================
   KEYBOARD NAVIGATION
========================================================== */

faqTriggers.forEach((trigger, index) => {

    trigger.addEventListener("keydown", (event) => {

        switch (event.key) {

            case "ArrowDown":

                event.preventDefault();

                faqTriggers[
                    (index + 1) % faqTriggers.length
                ].focus();

                break;

            case "ArrowUp":

                event.preventDefault();

                faqTriggers[
                    (index - 1 + faqTriggers.length) %
                    faqTriggers.length
                ].focus();

                break;

            case "Home":

                event.preventDefault();

                faqTriggers[0].focus();

                break;

            case "End":

                event.preventDefault();

                faqTriggers[
                    faqTriggers.length - 1
                ].focus();

                break;

        }

    });

});

/* ==========================================================
   WARRANTY & SUPPORT
========================================================== */

const supportCards = document.querySelectorAll(".support-card");

/* ==========================================================
   SCROLL REVEAL
========================================================== */

const supportObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

        });

    },

    {
        threshold:0.15
    }

);

supportCards.forEach((card) => {

    supportObserver.observe(card);

});

/* ==========================================================
   KEYBOARD ACCESSIBILITY
========================================================== */

supportCards.forEach((card) => {

    card.setAttribute("tabindex", "0");

});

/* ==========================================================
   FINAL CTA
========================================================== */

const finalCtaSection = document.querySelector(".final-cta-section");
const finalCtaContent = document.querySelector(".final-cta-content");
const finalCtaVisual = document.querySelector(".final-cta-visual");
const trustItems = document.querySelectorAll(".cta-trust-item");

/* ==========================================================
   SCROLL REVEAL
========================================================== */

const finalCtaObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            finalCtaContent?.classList.add("is-visible");
            finalCtaVisual?.classList.add("is-visible");

            trustItems.forEach((item, index) => {

                setTimeout(() => {

                    item.classList.add("is-visible");

                }, index * 120);

            });

            observer.unobserve(entry.target);

        });

    },

    {
        threshold:0.2
    }

);

if (finalCtaSection){

    finalCtaObserver.observe(finalCtaSection);

}

/* ==========================================================
   KEYBOARD ACCESSIBILITY
========================================================== */

trustItems.forEach((item) => {

    item.setAttribute("tabindex","0");

});