// Endpoint of the api
const endpoint = "https://striveschool-api.herokuapp.com/books";

let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  fetch(`${endpoint}`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
