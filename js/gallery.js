// Создание и рендер разметки по массиву данных galleryItems из app.js
//  и предоставленному шаблону.

// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>

import images from './app.js';

console.log(images);

const makeCard = ({ preview, original, description }) => {
    const cardEl = document.createElement('li');
    cardEl.classList.add('gallery__item');

    const cardLink = document.createElement('a');
    cardLink.classList.add('gallery__link');
    cardLink.href = original;

    const cardImage = document.createElement('img');
    cardImage.classList.add('gallery__image');
    cardImage.src = preview;
    cardImage.dataset.source = original;
    cardImage.alt = description;
    


    cardEl.append(cardLink, cardImage);
    return cardEl;
  
};
const elements = images.map(makeCard);

console.log(elements);

const galleryContainer = document.querySelector('.js-gallery');
galleryContainer.append(...elements);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

galleryContainer.addEventListener('click', selectImage);

const modal = document.querySelector('.lightbox');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
 const bigImage = document.querySelector('.lightbox__image');
closeBtn.addEventListener('click', closeModal);

const overlay = document.querySelector('.lightbox__overlay');
overlay.addEventListener('click', closeModal);

const previousBtn = document.querySelector('.previous-btn');
previousBtn.addEventListener('click', scrollThroughPictures);
const nextBtn = document.querySelector('.next-btn');
nextBtn.addEventListener('click', scrollThroughPictures);


document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeModal();
    }
    return;
})

function selectImage(event) {
    if (!event.target.classList.contains('gallery__image')) {
        return;
    }
    const selectedImage = event.target;
    const linkOriginal = selectedImage.dataset.source;
    console.log(linkOriginal);
    console.log(event);
    openModal();
    openBigImage(linkOriginal);

}

// Открытие модального окна по клику на элементе галереи.

function openModal() {
    modal.classList.add('is-open');
}

// Подмена значения атрибута src элемента img.lightbox__image.

function openBigImage(link) {
    bigImage.src = link;
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].

function closeModal() {
    modal.classList.remove('is-open');
    removeLink();
};


// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того,
// чтобы при следующем открытии модального окна, пока грузится изображение,
//  мы не видели предыдущее.

function removeLink() {
    bigImage.src = '';
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
const imgArray = document.querySelectorAll('.gallery__image');
// массив всех ссылок
let sourceArr = [];
imgArray.forEach((img) => {
    sourceArr.push(img.dataset.source);
   return sourceArr; 
});
console.log(sourceArr);
// функция для проилистывания
