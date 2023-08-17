const movieContainer = document.querySelector("#movie-container");
const inputValue = document.getElementById("search-bar");
const searchBtn = document.querySelector("#search-btn");

let movieListArray = [];
document.addEventListener("click", (e) => {
  if (e.target.dataset.movie) {
    addToWatchList(e.target.dataset.movie);
  }
});

function addToWatchList(movie) {
  let watchlist = localStorage.getItem("watchlist");

  const tempMovie = movieListArray.find(
    (movieItem) => movieItem.imdbID === movie
  );

  if (!watchlist) {
    localStorage.setItem("watchlist", JSON.stringify([tempMovie]));
  } else {
    watchlist = JSON.parse(watchlist);
    watchlist.push(tempMovie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }

  /*
  const array =
   localStorage.setItem("watchlist", JSON.stringify(movieListArray))
   */
}

// const addToWatchList = (e) => {
//    console.log(JSON.parse(e));
// //    const movieData = e.target["data-movie"];
// //    const curentWatchlist = JSON.parse(localStorage.getItem("watchList")) || [];
// //    localStorage.setItem(
// //      "watchList",
// //      JSON.stringify([...curentWatchlist, movieData])
// //    );
// };

searchBtn.addEventListener("click", () => {
  let input = inputValue.value;
  fetch(`http://www.omdbapi.com/?apikey=abad75d5&t=${input}`)
    .then((res) => res.json())
    .then((data) => {
      movieListArray.unshift(data);

      let movies = movieListArray.map((movie) => {
        return `<div class="movie-list-container" >
            <div class="movie-poster">
                <img src="${movie.Poster}" alt="the movie poster for this movie" class="poster-img">
            </div>

            <div class="movie-information">
                <div class="movie-header">
                    <h4 class="movie-title">${movie.Title}</h4>
                    <div class="rating">⭐${movie.imdbRating}</div>
                </div>
                <div class="movie-details">
                    <p class="run-time">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                    <p data-movie="${movie.imdbID}" class="watchlist-add-btn"><span class="watchlist-icon"><i class="fa-solid fa-circle-plus"></i></span>Watchlist</p>
                </div>
                <div class="synopsis-container">
                     <p class="synopsis">${movie.Plot}</p>
                </div>
               
            </div>
        </div>`;
      });

      movieContainer.innerHTML = movies;

      inputValue.value = "";

      //   const watchListButtons = document.querySelectorAll(".watchlist-add-btn");
      //       console.log(watchListButtons, "BUTTONS >>>>>>>>>>>>>>>>>>>");
      //   watchListButtons.forEach((selector) => {
      //     console.log(selector)
      //     selector.addEventListener("click", addToWatchList);
      //   });
    });
});

// export {movieListArray}
