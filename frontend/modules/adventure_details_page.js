import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let advId=search.split('=');
    return advId[1];

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let advRes= await fetch(config.backendEndpoint+ `/adventures/detail/?adventure=${adventureId}`);
    let advData= await advRes.json();
    return advData;

  }
  catch{
    return null;
  }
   

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  const {name,subtitle,content,images}=adventure;
  document.getElementById("adventure-name").textContent=name;
  document.getElementById("adventure-subtitle").textContent=subtitle;

  images.forEach((x)=>{
    let img=`<img src=${x} alt="img"  class="activity-card-image"  />`
    document.getElementById('photo-gallery').innerHTML+=img;
  })
  document.getElementById('adventure-content').textContent=content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById('photo-gallery').innerHTML="";

  let crousel=`
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner" id="carousel_inner">
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>`

        document.getElementById('photo-gallery').innerHTML =crousel;
        const carouselInner=document.getElementById('carousel_inner');    
        // images loops
        images.forEach((img,index)=>{
            let crouselItem=document.createElement('div');
            index===0?crouselItem.setAttribute('class',"carousel-item activity-card active"):crouselItem.setAttribute('class',"carousel-item activity-card");
            let image=document.createElement('img');
            image.setAttribute('src',img);    
            image.setAttribute("class"," activity-card-image  d-block w-100 h-100")
            crouselItem.append(image);
            carouselInner.append(crouselItem);
      });

       

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
    
  const {available,costPerHead} =adventure;
  document.getElementById('reservation-person-cost').textContent=costPerHead;
    let reservationPannelSoldout=document.getElementById('reservation-panel-sold-out');
    let reservationPannelAvailable =document.getElementById("reservation-panel-available")
    if(available) {
      reservationPannelSoldout.style.display="none";
      reservationPannelAvailable.style.display="block";
    }else{
      reservationPannelSoldout.style.display="block";
      reservationPannelAvailable.style.display="none";
    }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById('reservation-cost').textContent=adventure.costPerHead*persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation

  let tempurl ="https://jsonplaceholder.typicode.com/posts"

    console.log(adventure.name)
    const url= config.backendEndpoint+ `/reservations/new`;
    console.log(url);
    const submitForm=document.getElementById('myForm');

    

      submitForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        let userData={
          "name":submitForm.elements['name'].value,
          "date":submitForm.elements['date'].value,
          "person":submitForm.elements['person'].value,
          "adventure":adventure.id
        };


        async function makeRequest(data1){
          let promise=await fetch(url,
            {
              method:"POST",
              headers: {
                'Content-Type': 'application/json',
                },        
              body:JSON.stringify(data1)
            }
            );
            let result=await promise.json()
            if(result.message){
              alert('Failed!')
            }
            else{
              alert('Success!');
              window.location.reload();
            }
        }
        console.log(userData)
        makeRequest(userData);

    });
    
    
    

  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't


  let reservationBanner=document.getElementById("reserved-banner");
  let {reserved}=adventure;
  if(reserved){
    reservationBanner.style.display="block";
  }
  else{
    reservationBanner.style.display="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
