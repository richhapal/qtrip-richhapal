
import config from "../conf/index.js";

// basic work
/* 
(async function(){
  let cityResponse= await fetch(config.backendEndpoint+`/adventures?city=${getCityFromURL(window.location.search)}`)
    let citydata=await cityResponse.json();
    console.log(citydata)
})()
*/ 


// all function are calling from index.html script tag

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
    let city=search.split('=');
    return city[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // let cityname=getCityFromURL(window.location.search)
  try{
    let cityResponse= await fetch(config.backendEndpoint+`/adventures?city=${city}`)
    let citydata=await cityResponse.json();
    return citydata;
  }
  catch(e){
    return null;
  }
 
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((data)=>{

    let {id, category, image, name, costPerHead,duration}=data;

    let advenHTML=`<div class="col-sm-6 col-md-6 mb-4 col-lg-3" style="position:relative">
                 <div class="category-banner">${category}</div>
                 <a href="detail/?adventure=${id}"  id=${id} class="d-block" >
                   <div class="activity-card">
                    <img src=${image} alt=${name}>
                    <div class="d-flex flex-row justify-content-between px-3 w-100">
                        <p>${name}</p>
                        <p>${costPerHead}</p>
                    </div>
                    <div class="d-flex flex-row justify-content-between px-3 w-100 ">
                        <p>Duration</p>
                        <p>${duration} Hours</p>
                    </div>
                    </div>
                  </a> 
              </div>
              `
  /*            
    let advenHTML=`
    <div class=" col-xs-12 col-sm-6 col-md-6 mb-4 col-lg-3 ">
    <a href="pages/adventures/detail/?adventure=${id}" target="_blank" id=${id} >
      <div class="activity-card">  
            <img src=${image} alt=${name}  >
            <div class="d-flex "> 
              <p>${name}<p>
              <p>${costPerHead}</p>
            </div>
            <div class="d-flex ">
              <p>Duration</p>
              <p>${duration} Hours<p>
            </div>
        </div> 
    </a>
  </div>
    `*/

    let parent=document.getElementById('data');
    parent.innerHTML+=advenHTML;
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(list.filter((value)=> value.duration>low && value.duration<=high))
  return list.filter((value)=> value.duration>low && value.duration<=high)
  // list.filter((x)=>   )
 

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  return   list.filter((value)=> categoryList.includes(value.category))

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList;
      // let low=parseInt(filters.duration.split("-")[0]);
      // let high=parseInt(filters.duration.split("-")[1]);
      const duration = filters.duration.split('-').map(x => parseInt(x))
      // console.log(duration,1,2)

      if(filters.duration.length>0 && filters.category.length>0 ){
        // filterByCategory(list,filters.category);
        return filterByDuration(filterByCategory(list,filters.category),...duration)
      }
      else if(filters.duration.length>0 && filters.category.length==0){
        // only filterByDuration
        console.log(filterByDuration(list,...duration))
        return filterByDuration(list,duration[0],duration[1])
      
      }else if(filters.duration.length==0 && filters.category.length>0){
        // only return filterByCategory
        return filterByCategory(list,filters.category);
      }
// { duration: "", category: [] }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  
  try{
    localStorage.setItem('filters', JSON.stringify(filters))
    // return true;
  }catch(e){
    return e;
  } 
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filteredOutput=JSON.parse(localStorage.getItem('filters'));
  if(filteredOutput){
    return filteredOutput;
  }else{
    return null;
  }
  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

   let categorylist=document.getElementById("category-list");
  
  filters.category.forEach((ele)=>{
    let pill=document.createElement('div');
    pill.setAttribute('class',"category-filter");
    pill.textContent=ele;
    categorylist.append(pill);
  });
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
