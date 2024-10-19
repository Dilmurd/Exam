const BASE_URL = "https://fakestoreapi.com";
const categoryItems = document.querySelectorAll(".category");
const products = document.querySelector(".wrapper");
const loader = document.querySelector(".loader")
const btn = document.querySelector(".btn")
let count = 8;
let offset = 2

async function GetData(endpoint, count) {
    const response = await fetch(`${BASE_URL}/${endpoint}?limit=${count}`);
    response
        .json()
        .then(res => createProduct(res))
        .finally(()=>{
            loader.style.display = "none";
        })
        .catch(err => console.log(err));
}

function createProduct(data) {
    products.innerHTML = '';
    data.forEach(product => {
        let review = Math.ceil(product.rating.rate);
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="products__item__image">
            <img src="${product.image}" data-id="${product.id}">
            <div class="likes">
            </div>
            <div class="cart">
                <h2>Add To Cart</h2>
            </div>
        </div>
        <div class="products__text">
            <h3>${product.title}</h3>
            <div class="review">
                <p>${product.price}$</p>
                <div class="stars">
                    ${`<i class="fa-solid fa-star"></i>`.repeat(review)}
                    ${`<i class="fa-regular fa-star"></i>`.repeat(5 - review)}
                </div>
                <p style="color: grey;">(${product.rating.count})</p>
            </div>
        </div>
        `;

        const productImage = card.querySelector(".products__item__image img");
        productImage.addEventListener("click", () => {
            window.location.href = `pages/product.html?id=${product.id}`;
        });

        products.appendChild(card);
    });
}


categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        GetData(`products/category/${category}`, count);
        btn.disabled = true
    });
});

GetData("products", count);

btn.addEventListener("click", ()=>{
    count *= offset
    GetData("products", count);
})
