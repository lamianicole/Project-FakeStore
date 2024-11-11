const URLProducts = "https://fakestoreapi.com/products";

const searchInput = document.querySelector("#searchInput") as HTMLInputElement
const selectInput = document.querySelector("#selectInput") as HTMLSelectElement
const electronicsBtn = document.querySelector("#electronicsBtn") as HTMLButtonElement
const jewelleryBtn = document.querySelector("#jewelleryBtn") as HTMLButtonElement
const mensClothingBtn = document.querySelector("#mensClothingBtn") as HTMLButtonElement
const womensClothingBtn = document.querySelector("#womensClothingBtn") as HTMLButtonElement
const cardWrapper = document.querySelector("#cardWrapper") as HTMLDivElement

console.log(searchInput);
console.log(selectInput);
console.log(electronicsBtn);
console.log(jewelleryBtn);
console.log(mensClothingBtn);
console.log(womensClothingBtn);
console.log(cardWrapper);

type TProduct = {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
}

fetch(URLProducts)
        .then((response: Response) => {
            if (!response.ok) {
                console.error("Response does not work");
                throw new Error("Netzwerkantwort negativ")
            }
            return response.json();
        })
        .then((products: TProduct[]) => {
            console.log(products);
            displayProducts(products)
        })
        .catch((error: Error) => {
            console.error("Fetch Fehler gemeldet", error);
        });


const displayProducts = (products: TProduct[]): void => {
    if (!cardWrapper) return;
    cardWrapper.innerHTML = " ";
    products.forEach((product: TProduct) => {
        const productCard = document.createElement("div");
        productCard.className="cardstyle"
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>€ ${product.price.toFixed(2)}</p>
                <button>Add to cart</button>
                `;
                cardWrapper.appendChild(productCard);
            });
        };

const filteredByCategory = (category: string): void => {
    fetch(URLProducts)
    .then(response => response.json())
    .then(products => {
        const filteredProducts = products.filter((product: TProduct) => product.category === category);
        displayProducts(filteredProducts);
    }).catch(err => console.error("fetching products failed", err));
};

electronicsBtn?.addEventListener('click', () => filteredByCategory('electronics'));
jewelleryBtn?.addEventListener('click', () => filteredByCategory('jewelery'));
// category 'jewelery' muss mit falscher Schreibung aus Datenbank übernommen werden, sonst wird es nicht erkannt
mensClothingBtn?.addEventListener('click', () => filteredByCategory("men's clothing"));
womensClothingBtn?.addEventListener('click', () => filteredByCategory("women's clothing"));
// "women's und men's clothing": auf single und double quotes achten, sonst wird es nicht erkannt
    






