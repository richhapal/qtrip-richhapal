import config from "../conf/index.js";
const cityUrl=config.backendEndpoint +`/cities`;
async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let dataCity= await (await fetch(cityUrl)).json();
    return dataCity;
  }catch(e){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES

// EXAMPLE
/* <div class=" mr-3 mt-3 mb-3 col-sm-12  col-md-6 col-lg-3 ">
        <div class="tile">
          <a href="pages/adventures/" target="_blank">
            <img src="./assets/singapore.jpg" alt="" width="100%" height="100%">
          </a>
      
          <div class="tilecontent">
            <p>Singapore</p>
            <p>100+Places</p>
          </div>
        </div> 
      </div>
    </div> */


  // 1. Populate the City details and insert those details into the DOM
  //create main div
  let maindiv=document.createElement('div');
  //SET CLASSESS
  maindiv.setAttribute('class',"col-12 col-md-6 col-lg-3 mb-4");
  maindiv.setAttribute('id',id);

 /* MEHTOD 1*/
  // CREATE DIV WITH TILE CLASS
  let tileDiv=document.createElement('div');
  tileDiv.setAttribute('class','tile');

  // create anchor tag
  let a = document.createElement('a');
  // a.setAttribute('target',"_blank")
  a.setAttribute('href',`pages/adventures/?city=${id}`)
  a.setAttribute('id',`${id}`)
  a.setAttribute('class', 'd-block h-100 w-100')
  let img=document.createElement('img');
  img.setAttribute('src',image);
  img.setAttribute('alt',id);
  // img.setAttribute('width',"100%");
  // img.setAttribute('height',"100%");
  a.append(img);
  // div for text
  let tileText=document.createElement('div');
  tileText.setAttribute('class','tile-text w-100 text-center');
  let cityname=document.createElement('p');
  cityname.textContent=city;
  let citydesc=document.createElement('p');
  citydesc.innerText=description;
  tileText.append(cityname);
  tileText.append(citydesc);
  tileDiv.appendChild(a);
  tileDiv.appendChild(tileText)
  // append tile in div
  maindiv.append(tileDiv);
document.getElementById('data').append(maindiv)

}

export { init, fetchCities, addCityToDOM };
