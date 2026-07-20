document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("watch-color-image");
  const name = document.getElementById("selected-color-name");
  const description = document.getElementById("selected-color-description");
  const options = document.querySelectorAll(".color-option");

  if (!image || !name || !description || options.length === 0) return;

  const updateSelection = (button) => {
    options.forEach((option) => {
      option.classList.remove("is-active");
      option.setAttribute("aria-checked", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-checked", "true");

    image.classList.add("is-changing");

    const nextImage = new Image();

    nextImage.src = button.dataset.image;

    nextImage.onload = () => {
      setTimeout(() => {
        image.src = button.dataset.image;
        image.alt = `Nova Watch ${button.dataset.name}`;

        name.textContent = button.dataset.name;
        description.textContent = button.dataset.description;

        image.classList.remove("is-changing");
      }, 150);
    };
  };

  options.forEach((button) => {
    button.addEventListener("click", () => {
      updateSelection(button);
    });

    button.addEventListener("keydown", (event) => {
      const current = [...options].indexOf(button);

      let next = current;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          event.preventDefault();
          next = (current + 1) % options.length;
          break;

        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          next = (current - 1 + options.length) % options.length;
          break;

        case " ":
        case "Enter":
          event.preventDefault();
          updateSelection(button);
          return;

        default:
          return;
      }

      options[next].focus();
      updateSelection(options[next]);
    });
  });
});