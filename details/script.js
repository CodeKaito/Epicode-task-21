let detailsContainer = document.getElementById('details-container');

const booksEndpoint = 'https://striveschool-api.herokuapp.com/books'

// Crea la pagina di show dell'artista, ma solo se l'URL contiene un parametro!
if(window.location.search) {
    let params = new URLSearchParams(window.location.search);
    let queryValue = params.get('q');
    console.log(window.location.search)
    fetch(`${booksEndpoint}/${queryValue}`) // Emette una promise
        .then((res) => res.json()) // Emette una promise...
        .then((data) => {
            console.log(data);
            showDetails(data);
            })
        .catch(error => {
            console.log(error);
        })
}

let showDetails = ({ title, img, price, category}) => {
    let detailsHtml = `
        <div class="card details">
            <img src="${img}" alt="${title} class="card-img-top" />
            <div class="card-body">
                <h1>${title}</h1>
                <p>Price: ${price}</p>
                <p>Category: ${category}</p>
            </div>
        </div>
    `;
    detailsContainer.innerHTML = detailsHtml;
};