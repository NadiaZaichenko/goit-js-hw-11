import { searchCardImg } from './searchForm';
import Notiflix from 'notiflix';
import axios from 'axios';



const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('[name = searchQuery]');
const divRef = document.querySelector('.gallery');
const buttonRef = document.querySelector('.load-more');

let searchQueryInput = '';

inputRef.addEventListener('input', (e) =>{
e.preventDefault();
  searchQueryInput = e.currentTarget.value;
});

formRef.addEventListener('submit', getImgCardOnServ)


function getImgCardOnServ(e) {
  e.preventDefault();
  console.log(searchQueryInput)
  searchCardImg(searchQueryInput)
  .then(({data}) => renderImgCard(data))
  .catch(error => console.log(error));
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
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${likes}</b>
      </p>
      <p class="info-item">
        <b>${views}</b>
      </p>
      <p class="info-item">
        <b>C${comments}</b>
      </p>
      <p class="info-item">
        <b>${downloads}</b>
      </p>
    </div>
  </div>`
  ).join('');
}