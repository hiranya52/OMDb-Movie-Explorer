console.log("JS Loaded!");

let searchInput = document.getElementById("search-navbar");
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    callApi(searchInput.value);
  }
});

async function callApi(name) {

  fetch(`http://www.omdbapi.com/?apikey=733393f5&s=${name}`)
    .then(responce => responce.json())
    .then(data => {
      setMovieDetails(data);
    });
}

function setMovieDetails(data) {
  let div = document.getElementById("searchRes");
  div.innerHTML = "";

  if (data.Search && data.Search.length > 0) {
    data.Search.forEach(movie => {
      let card = document.createElement("div");
      card.className = "movie-card flex-shrink-0 w-56 bg-[#151a23] border border-black rounded-lg";

      card.innerHTML = `
        <a href="#">
          <img src="${movie.Poster !== "N/A" ? movie.Poster : './assets/img/no-poster.png'}" 
               class="w-full h-auto object-cover rounded-t-lg"
               alt="${movie.Title}" />
        </a>
        <div class="p-2 text-center">
          <h1 class="text-white">${movie.Title}</h1>
          <h1 class="text-white">${movie.Year}</h1>
        </div>
      `;
      div.appendChild(card);
    });
  } else {
    div.innerHTML = `<p>No movies found</p>`;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const movieCards = document.querySelectorAll(".movie-card");


  movieCards.forEach(card => card.style.display = "block");

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");


      categoryButtons.forEach(b => {
        b.classList.remove("bg-red-800", "text-white");
        b.classList.add("bg-gray-800", "text-gray-300");
      });


      btn.classList.remove("bg-gray-800", "text-gray-300");
      btn.classList.add("bg-red-800", "text-white");


      movieCards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
