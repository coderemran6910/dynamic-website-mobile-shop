const phonData = async (searchText) => {
    handleLoader(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    displayData(phones)
    handleLoader(false)
}

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
                <div class="badge badge-outline">Mobile</div> 
                <div class="badge badge-outline">Products</div>
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