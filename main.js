(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const movieList = document.querySelector('#movie-list')
  const showMovie = document.querySelector('.show-movie')
  const data = []
  const GENRES = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  function displayMovielist(data) {

    for (var prop in data) {
      movieList.innerHTML += `<li>
      <a class="nav-link text-secondary text-center border border-dark mt-2" data-toggle="pill" id="${prop}"href="" >${data[prop]}</a>
  </li > `
    }
  }

  axios.get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results)
      displayMovielist(GENRES)
      displayDataList(data)
    }).catch((err) => console.log(err))

  movieList.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav-link')) {
      let movieGenres = event.target.id
      // console.log(movieGenres)
      var reaults = []
      reaults = data.filter(item => {
        if (item.genres.includes(parseInt(movieGenres))) {
          return item
        }
      })
      // console.log(reaults)
      displayDataList(reaults)
    }
  })

  function getGenre(movieGenres) {
    Genre = movieGenres.map(genre => `<p class="badge badge-primary text-wrap ml-2" >${GENRES[genre]}</p>`).join('')
    // console.log(Genre)
    return Genre
  }

  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      const Genres = item.genres
      // console.log(Genres)
      htmlContent += `
        <div class="col-sm-4">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer d-flex flex-row flex-wrap ">
              ${getGenre(Genres)}
            </div>
          </div>
        </div>
      `
    })
    showMovie.innerHTML = htmlContent

  }
})()