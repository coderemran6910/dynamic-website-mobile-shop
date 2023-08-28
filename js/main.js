const phonData = async (searchText = "iphone") => {
    handleLoader(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    let phones = data.data
    displayData(phones)
    handleLoader(false)
}



// Display Data 
const displayData = (phones) => {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    // Show more button
    const showMoreBtn = document.getElementById('showMoreBtn');
    phones.length > 12 ? showMoreBtn.classList.remove('hidden') : showMoreBtn.classList.add('hidden')
    showMoreBtn.addEventListener('click', () => {

    })

    // show only 12  product 
    phones = phones.slice(0, 12)
    phones.forEach((phone) => {
        // console.log(phone);
        const productCard = document.createElement('div');

        productCard.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl');

        productCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">
               ${phone.phone_name}
                <div class="badge badge-secondary">${phone.brand}</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <div class="badge badge-outline cursor-pointer	">Mobile</div> 
                <div onclick="handleShowMore('${phone.slug}')" class="badge badge-outline cursor-pointer	">Show More</div>
              </div>
            </div>
        `;
        productsContainer.appendChild(productCard)
    });

}

// searchBtn 
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {

    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value;
    phonData(searchText);
})


// Loader
let handleLoader = (isLoadding) => {
    const loader = document.getElementById('loader')
    loader.classList.remove('hidden')
    isLoadding === true ?  loader.classList.remove('hidden') :  loader.classList.add('hidden')
    // if (isLoadding) {
    //     loader.classList.remove('hidden')
    // }else{
    //     loader.classList.add('hidden')
    // }

}



// handleShowMore Button for suingle product()
const handleShowMore = async (id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data =await res.json()
    const phone = data.data
    showSingleProductData(phone)  
}

// show data when click handleShowMore
const showSingleProductData = (phone)=>{
    console.log(phone);
    my_modal_5.showModal()
    const modalContainer = document.getElementById('modal-container');
   
    modalContainer.innerHTML = `
    <form  id="modal-container" method="dialog" class="modal-box">
              <div class=" w-48 mx-auto">
                  <img class="w-full" src="${phone.image}" alt="">
              </div>
              <h2 class="font-bold text-lg">${phone?.name}</h2>
              <p class="py-4">Press ESC key or click the button below to close</p>
              <hr>
              <h3 class="font-bold">storage <span class="font-normal"> ${phone?.mainFeatures?.storage} </span></h3>
              <h3 class="font-bold">Display size: <span class="font-normal"> ${phone?.mainFeatures?.displaySize} </span></h3>
              <h3 class="font-bold">Chipset: <span class="font-normal"> ${phone?.mainFeatures?.chipSet} </span></h3>
              <h3 class="font-bold">Memory: <span class="font-normal"> ${phone?.mainFeatures?.memory} </span></h3>
              <h3 class="font-bold">Slug: <span class="font-normal"> ${phone.slug} </span></h3>
              <h3 class="font-bold">Release Date:  <span class="font-normal"> ${phone?.releaseDate} </span></h3>
              <h3 class="font-bold"> Brand: <span class="font-normal"> ${phone?.brand} </span>
              <h3 class="font-bold"> GPS: <span class="font-normal"> ${phone?.others?.GPS || " GPS not Available "} </span> </h3>
              <h3 class="font-bold"> sensors: <span id="sensors" class="font-normal"> </span> </h3>
              <div class="modal-action">
                <button class="btn bg-red-500 text-white outline-none mx-auto mb-5 hover:bg-red-500">Close</button>
              </div>
            </form>
    `;
    const sensors_container = document.getElementById('sensors');
    const sensorsArray =  phone.mainFeatures.sensors;
    const sensorsStr = sensorsArray.join(" , ")
    const span = document.createElement('span');
    span.innerText = sensorsStr;
    sensors_container.appendChild(span)
   
}



phonData()

