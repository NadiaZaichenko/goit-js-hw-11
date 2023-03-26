import axios from 'axios';
import Notiflix from 'notiflix';

export async function searchCardImg(searchQueryInput, page, per_page) {   

  const BASE_URL = `https://pixabay.com/api/?key=34679594-d1431b462dfbe95ceee8bf0ed&q=${searchQueryInput}`;
  const  params = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: `${page}`,
    per_page : `${per_page}`,
 };

 try {
  const responce = await axios.get(BASE_URL,{params});
  const data = await responce; 
      return data;
}
catch{
  Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
}
}













  
  // async function getImg(searchQueryInput) {
  //   try {
  //     // const response = await axios.get(BASE_URL,{params});
  //     console.log(response);
  //     return responce;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // return axios(`${BASE_URL}?${options}`)
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // });
