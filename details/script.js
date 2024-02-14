const booksEndpoint = 'https://striveschool-api.herokuapp.com/books'

// Crea la pagina di show dell'artista, ma solo se l'URL contiene un parametro!
if(window.location.search) {
    let params = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    let bookId = params.get('bookId');
    console.log(bookId);
    fetch(`${booksEndpoint}/${bookId}`) // Emette una promise
    .then(res => res.json()) // Emette una promise...
    .then(json => console.log(json))
    .catch(error => {
        console.log(error);
    })
}