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

document.querySelectorAll('.carousel').forEach(carousel => {
            const track = carousel.querySelector('.products.track');
            const prev = carousel.querySelector('.nav-btn.prev');
            const next = carousel.querySelector('.nav-btn.next');

            if (!track || !prev || !next) return;

            const getScrollAmount = () => Math.max(200, Math.round(carousel.clientWidth - 120));

            prev.addEventListener('click', () => {
                track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            });

            next.addEventListener('click', () => {
                track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            });

            function updateButtons() {
                // tolerancia para evitar fallo por sub-pixel
                const tolerance = 2;
                prev.disabled = track.scrollLeft <= tolerance;
                next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - tolerance;
            }

            track.addEventListener('scroll', updateButtons);
            window.addEventListener('resize', updateButtons);
            // llamado inicial
            updateButtons();
        });

        // Añadir icono de corazón a cada card y manejador de toggle
        (function addLikeIcons() {
            const INACTIVE = 'img/corazon.png';
            const ACTIVE = 'img/corazon_rojo.png';

            function toggleLike(ev) {
                const el = ev.currentTarget || this;
                const pressed = el.getAttribute('aria-pressed') === 'true';
                el.src = pressed ? el.dataset.inactive : el.dataset.active;
                el.setAttribute('aria-pressed', String(!pressed));
                el.classList.toggle('active', !pressed);
            }

            document.querySelectorAll('.card').forEach(card => {
                // evitar duplicados si se ejecuta varias veces
                if (card.querySelector('.like')) return;

                const like = document.createElement('img');
                like.src = INACTIVE;
                like.alt = 'Me gusta';
                like.className = 'like';
                like.setAttribute('role', 'button');
                like.setAttribute('aria-pressed', 'false');
                like.tabIndex = 0;
                like.dataset.active = ACTIVE;
                like.dataset.inactive = INACTIVE;

                like.addEventListener('click', toggleLike);
                like.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleLike.call(this, e);
                    }
                });

                card.appendChild(like);
            });
        })();

        // Añadir botón circular de carrito a la derecha del precio en cada card
        (function addCartButtons() {
            document.querySelectorAll('.card').forEach(card => {
                 // si ya existe, no duplicar
                 if (card.querySelector('.add-cart')) return;
 
                 const price = card.querySelector('.price');
                 if (!price) return;
 
                 // si ya está envuelto en .price-wrap, usarlo; si no, envolver
                 let wrap = price.closest('.price-wrap');
                 if (!wrap) {
                     wrap = document.createElement('div');
                     wrap.className = 'price-wrap';
                     price.parentNode.insertBefore(wrap, price);
                     wrap.appendChild(price);
                 }
 
                 const btn = document.createElement('button');
                 btn.type = 'button';
                 btn.className = 'add-cart';
                 btn.setAttribute('aria-label', 'Añadir al carrito');
 
                 // evitar cualquier efecto visual o acción al pulsar
                 btn.addEventListener('pointerdown', e => e.preventDefault());
                 btn.addEventListener('touchstart', e => e.preventDefault());
                 btn.addEventListener('mousedown', e => e.preventDefault());
 
                 // usar la imagen cart.png dentro del círculo
                 const img = document.createElement('img');
                 img.src = 'img/cart.png';
                 img.alt = 'Carrito';
                 // tamaño visual (se ajusta por CSS .add-cart img)
                 img.width = 18;
                 img.height = 18;
                 btn.appendChild(img);
 
                 // NO se añade handler de click — el botón no hace nada
                 wrap.appendChild(btn);
             });
         })();

        // Toggle visual de la nav: marcar un único enlace como "activo"
        (function navActiveToggle(){
            const links = Array.from(document.querySelectorAll('.header nav a'));
            if (!links.length) return;

            // prevenir salto por href="#" y establecer comportamiento
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    links.forEach(l => {
                        l.classList.remove('active');
                        l.removeAttribute('aria-current');
                    });
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                });
            });

            // estado inicial: si no hay ninguno activo, marcar el primero
            const anyActive = links.some(l => l.classList.contains('active'));
            if (!anyActive) {
                links[0].classList.add('active');
                links[0].setAttribute('aria-current','page');
            }
        })();