// Endpoint of the api-----------------------------------------------------------
const endpoint = "https://striveschool-api.herokuapp.com/books";

// Global variables--------------------------------------------------------------
let searchInput = document.getElementById("searchInput");

let bookList = document.getElementById("book-list");

let cartList = document.getElementById("cart-list");

let addToCart = document.getElementById("add-to-cart");

let cart = [];

let starredList = document.getElementById("starred");

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
                                        <i class="bi-star pointer" id="starred"></i>
                                        <i class="bi bi-cart-plus pointer" id="add-to-cart"></i>
                                    </div>
                                </div>
                            </div>
                            `;
        // Aggiungi la card al contenitore dei risultati della ricerca
        bookList.appendChild(card);
    });

    
};

// MOSTRAMI TUTTI I LIBRI--------------------------------------------------------------
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

addToCart.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("ciao");
});