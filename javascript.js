document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach(carousel => {
        const track = carousel.querySelector(".track");
        const cards = carousel.querySelectorAll(".card");

        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");

        let index = 0;

        const visible = 6; 
        const cardWidth = cards[0].offsetWidth + 20;
        const maxIndex = cards.length - visible;

        function update() {
            track.style.transform = `translateX(${-index * cardWidth}px)`;
        }

        nextBtn.addEventListener("click", () => {
            if (index < maxIndex) {
                index++;
                update();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (index > 0) {
                index--;
                update();
            }
        });
    });
});
