const movieContainer = document.querySelector("#watchlist-container");




let watchListContainer = JSON.parse(localStorage.getItem("watchlist"))
let allMovieIds = watchListContainer

document.addEventListener('click', (e) => {
    if(e.target.dataset.movie) {
        deleteBtn(e.target.dataset.movie);
    }
    
})



function deleteBtn(movieID) {
    allMovieIds = allMovieIds.filter(movie =>  {
      return  movie.imdbID === movieID}
        )
        localStorage.removeItem("watchlist");
        console.log(allMovieIds)
    
    render()
}




let movieList = allMovieIds.map((movie) => {
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
                    <p data-movie="${movie.imdbID}" class="watchlist-add-btn"><span class="watchlist-icon"><i class="fa-solid fa-circle-minus"></i></span>Remove</p>
                </div>
                <div class="synopsis-container">
                     <p class="synopsis">${movie.Plot}</p>
                </div>
               
            </div>
        </div>`;

})

function render() {
movieContainer.innerHTML = movieList;
} 
render()