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

let showDetails = (book) => {
    let detailsHtml = `
        <div>
            <img src="${book.img}" alt="${book.title}" />
                <h1>${book.title}</h1>
                <p>Price: ${book.price}</p>
            <p>Category: ${book.category}</p>
        </div>
    `;
    detailsContainer.innerHTML = detailsHtml;
};