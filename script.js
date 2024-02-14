// Endpoint of the API
const endpoint = "https://striveschool-api.herokuapp.com/books";

// Global variables
let searchInput = document.getElementById("searchInput");
let bookList = document.getElementById("book-list");
let cartList = document.getElementById("cart-list"); 
let addToCart = document.getElementById("add-to-cart");
let cartElements = document.getElementById("cart-elements");
let docTitle = document.title;

let cart = [];
let starredList = document.getElementById("starred");

window.addEventListener("blur", () => {
    document.title = "Come back!";
});

window.addEventListener("focus", () => {
    document.title = docTitle;
});

let ShowBooks = (data) => {
    data.forEach(item => {
        let card = document.createElement('div');
        card.classList.add("col-lg-3", "col-sm-4", "mb-4");
        card.innerHTML = `
            <div class="card">
                <div class="img-container">
                    <img src="${item.img}" alt="${item.title}" class="card-img-top rounded" width="25px" />
                </div>
                <div class="mt-1 mx-3">
                    <p>${item.title}</p>
                </div>
                <div class="d-flex justify-content-between mx-4">
                    <p>${item.price}</p>
                    <div>
                        <i class="bi-star pointer starred"></i>
                        <i class="bi bi-cart-plus pointer" data-id="${item.asin}"></i>
                    </div>
                </div>
            </div>
        `;
        // Aggiungi la card al contenitore dei risultati della ricerca
        bookList.appendChild(card);

        // Aggiungi l'evento al pulsante "Add to Cart" della carta appena creata
        let addToCartButton = card.querySelector('.bi-cart-plus');
        addToCartButton.addEventListener('click', (e) => {
            e.preventDefault();

            const bookId = e.target.getAttribute('data-id');
            console.log(`Add to Cart clicked for book with ID ${bookId}`);

            const selectedBook = data.find(book => book.asin === bookId);
            if (selectedBook) {
                cart.push(selectedBook);
                console.log(cart);
                ShowCartBooks(cart);
            }
        });
    }); 
};

// MOSTRAMI TUTTI I LIBRI
window.onload = () => {

    fetch(`${endpoint}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            ShowBooks(data);
        })
        .catch((err) => console.log(err));
};

searchInput.addEventListener("input", () => {
    // Pulisco il contenitore dei risultati
    bookList.innerHTML = "";
    
    // Recupera il valore inserito nell'input di ricerca, eliminando eventuali spazi vuoti iniziali e finali
    const value = searchInput.value.trim();
    fetch(`${endpoint}`)
        .then((res) => res.json())
        .then((data) => {
            // Filtra i dati in base alla parola cercata nell'input
            const filteredData = data.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
            
            // Mostra solo i libri che ricercati con l'input
            ShowBooks(filteredData);
        })
        .catch((err) => console.log(err));
});

let ShowCartBooks = (data) => {
    cartList.innerHTML = ""; // Pulisci il contenitore del carrello prima di visualizzare i nuovi libri

    data.forEach(item => {
        let card = document.createElement('div');
        card.classList.add("col-lg-3", "col-sm-4", "mb-4");
        card.innerHTML = `
            <div class="card" id="cart-card">
                <div class="delete-icon">
                    <i class="bi bi-x-circle pointer text-danger rounded" id="${item.asin}" onclick="deleteBook('${item.asin}')"></i>
                </div>
                
                <div class="img-container">
                    <img src="${item.img}" alt="${item.title}" class="card-img-top rounded" width="25px" />
                </div>
                <div class="mt-1 mx-3">
                    <p>${item.title}</p>
                </div>
                <div class="d-flex justify-content-between mx-4">
                    <p>${item.price}</p>
                    <div>
                        <i class="bi-star pointer starred"></i>
                        <i class="bi bi-cart-plus pointer" data-id="${item.asin}"></i>
                    </div>
                </div>
            </div>
        `;
        // Aggiungi la card al contenitore dei risultati della ricerca
        cartList.appendChild(card);

        let numberOfElCart = cart.length;

        if (numberOfElCart > 0) {
            cartElements.classList.add('active');
        }

        cartElements.innerText = numberOfElCart;
    }); 
};

function deleteBook(bookId) {
    const indexToDelete = cart.findIndex(book => book.asin === bookId);

    if (indexToDelete !== -1) {
        cart.splice(indexToDelete, 1);
        ShowCartBooks(cart);
    }
    
}