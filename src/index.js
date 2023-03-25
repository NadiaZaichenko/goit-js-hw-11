import { searchCardImg } from './searchForm';
import Notiflix from 'notiflix';
import axios from 'axios';



const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('[name = searchQuery]');
const divRef = document.querySelector('.gallery');
const buttonRef = document.querySelector('.load-more');

let searchQueryInput = '';

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

function getImgCardOnServ(e) {
  e.preventDefault();
  console.log(searchQueryInput)
  searchCardImg(searchQueryInput)
  .then(({data}) => {
      if(data.hits.length !== 0){
        renderImgCard(data.hits)
      }
      return;
  })
  .catch(
  Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'));
}
function renderImgCard(data){
  console.log(data)
const innerCard = addRenderImgCard(data);
divRef.innerHTML = innerCard;
};

function addRenderImgCard(data){
  console.log(data);
  return data.map(({webformatURL, largeImageURL,tags,likes,views,comments, downloads}) => 
    `<div class="photo-card">
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
  </div>`
  ).join('');
}