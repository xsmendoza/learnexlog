/*=============== SHOW SIDEBAR ===============*/
/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById("sidebar"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// Mostrar el sidebar
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-sidebar");
  });
}

// Cerrar el sidebar
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-sidebar");
  });
}

/*=============== SKILLS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
  tabContent = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target)

    tabContent.forEach(tabContents => {
      tabContents.classList.remove("skills__active")
    })

    target.classList.add('skills__active');


    tabs.forEach(tab => {
      tab.classList.remove("skills__active");
    })

    tab.classList.add('skills__active');
  })
})

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
  selectors: {
    target: '.work__card'
  },
  animation: {
    duration: 300
  }
});

/*===== Link Active Work =====*/
const linkWork = document.querySelectorAll('.work__items')

function activeWork() {
  linkWork.forEach(L=> L.classList.remove('active-work'))
  this.classList.add('active-work')
}

linkWork.forEach(L=> L.addEventListener("click", activeWork))
/*===== Work Popup =====*/
document.addEventListener("click", (e) => {
  // Verifica si el elemento clickeado tiene la clase "work_button"
  if(e.target.classList.contains("work__button")) {
    togglePortfolioPopup(); // Llama correctamente a la función
    portfolioItemDetails(e.target.parentElement); // Pasa el elemento padre como argumento
  }
});

// Función para mostrar/ocultar el popup
function togglePortfolioPopup() {
  document.querySelector(".portfolio__popup").classList.toggle("open");

  // Evento para cerrar el popup
  document.querySelector(".portfolio__popup-close").addEventListener("click", togglePortfolioPopup);
}

// Función para mostrar los detalles del elemento del portafolio
function portfolioItemDetails(portfolioItem) {
  // Actualiza la imagen del thumbnail en el popup
document.querySelector(".pp__thumbnail img").src = portfolioItem.querySelector(".work__img").src;

// Actualiza el subtítulo del popup
document.querySelector(".portfolio__popup-subtitle span").innerHTML = portfolioItem.querySelector(".work__title").innerHTML;

// Actualiza el cuerpo del popup con los detalles del portafolio
document.querySelector(".portfolio__popup-body").innerHTML = portfolioItem.querySelector(".portfolio__item-details").innerHTML;
}

/*=============== SERVICES MODAL ===============*/
// Selecciona todos los elementos necesarios
const modalViews = document.querySelectorAll('.services__modal'),
  modalBtns = document.querySelectorAll('.services__button'),
  modalCloses = document.querySelectorAll('.services__modal-close');

// Función para abrir un modal
let modal = function(modalClick) {
  modalViews[modalClick].classList.add('active-modal');
};

// Añade eventos a los botones para abrir el modal
modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener('click', () => {
    modal(i);
  });
});

// Añade eventos a los botones para cerrar el modal
modalCloses.forEach((modalClose) => {
  modalClose.addEventListener('click', () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove('active-modal');
    });
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove('active-modal'); // Clase corregida
    });
  });
});

/*=============== SWIPER TESTIMONIAL ===============*/
let swiper = new Swiper(".testimonials__container", {
  spaceBetween: 24,// Espacio entre las diapositivas
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination", // Selector de la paginación
    clickable: true, // Permite que la paginación sea interactiva
  },
   breakpoints: {
 576: {
   slidesPerView: 2, // 2 diapositivas visibles a partir de 640px
 },
 768: {
   slidesPerView: 2, // 4 diapositivas visibles a partir de 768px
   spaceBetween: 48,
 },
 },
});

/*=============== INPUT ANIMATION ===============*/
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// Selecciona todas las secciones con un atributo ID
const sections = document.querySelectorAll("section[id]");

// Agrega un event listener para escuchar el evento de scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // Obtiene la posición actual del scroll
  let scrollY = window.pageYOffset;

  // Recorre cada sección para calcular su posición y altura
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight; // Altura de la sección
    const sectionTop = current.offsetTop - 50; // Posición superior ajustada
    const sectionId = current.getAttribute("id"); // ID de la sección

    // Verifica si el scroll actual está dentro de los límites de la sección
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      // Agrega la clase 'active-Link' al enlace correspondiente
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      // Remueve la clase 'active-Link' si no está en la sección
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

/*=============== SHOW SCROLL UP ===============*/