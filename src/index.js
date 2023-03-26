import { searchCardImg } from './searchForm';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('[name = searchQuery]');
const divRef = document.querySelector('.gallery');
const buttonRef = document.querySelector('.load-more');


let simpleLightBox;
let searchQueryInput = '';
let page = 1;
let per_page = 40;

function cleanInterface(ref) {
ref.innerHTML = '';
}

inputRef.addEventListener('input', (e) =>{
e.preventDefault();
  searchQueryInput = e.currentTarget.value;
  if(searchQueryInput === ''){
    cleanInterface(divRef);
  }
});

formRef.addEventListener('submit', getImgCardOnServ)

buttonRef.addEventListener('click', showNewPage);

function getImgCardOnServ(e) {
  e.preventDefault();
  page = 1;
  searchQueryInput = e.currentTarget.elements.searchQuery.value.trim();
  divRef.innerHTML = '';
  if( searchQueryInput === '') {
    cleanInterface(divRef)
    Notiflix.Notify.warning('The search string cannot be empty.');
    return;
  }
  searchCardImg(searchQueryInput, page, per_page)
  .then(({data}) => {
    if (data.totalHits === 0) {
      cleanInterface(divRef)
      buttonRef.classList.add('is-hidden');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',);
  } else {
    renderImgCard(data.hits);
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    buttonRef.className = 'is-active';
}})
  .catch(error => console.log(error))
  .finally(() => {
    formRef.reset();
  }); 
}

function showNewPage() {
   page += 1;
   simpleLightBox.destroy();
 
   searchCardImg(searchQueryInput, page, per_page)
     .then(({data}) => {
      const totalPages = Math.ceil(data.totalHits / per_page);
      if (page === totalPages) {
        buttonRef.classList.add('is-hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results.",
        );
        return;
      } else {
         renderImgCard(data.hits);
       simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      }
})
     .catch(error => console.log(error));
};

function renderImgCard(images){
  if (!divRef) {
    return;
  }
  const markup = images.map(image => {
    const{webformatURL, largeImageURL,tags,likes,views,comments, downloads} = image;
    return  `
    <a class="gallery__link" href="${largeImageURL}">
    <div class="photo-card">
    <img src="${webformatURL}" alt="${tags} width="70" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div>
  </a>
  `;
})
.join('');
  divRef.insertAdjacentHTML('beforeend', markup)
};
