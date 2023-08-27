const phonData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data
    displayData(phones)
}

const displayData = (phones) => {
    console.log(phones);
    const productsContainer = document.getElementById('products-container');
    phones.forEach((phone) => {
        console.log(phone);
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
                <div class="badge badge-outline">Fashion</div> 
                <div class="badge badge-outline">Products</div>
              </div>
            </div>
        `;
        productsContainer.appendChild(productCard)
    })
}


phonData()