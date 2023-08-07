const POPULARAPIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieContainer = document.querySelector('.movie-container');
const search = document.querySelector('.search-bar')

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let page = 1;
// console.log(search);

// console.log(movieContainer);

// let popular = POPULARAPIURL + page; 
const getMovies = async function(url){

    const response = await axios.get(url);
    const data = response.data.results;
    console.log(data);

    showMovies(data);
}


getMovies(POPULARAPIURL+page);


let showMovies = function(data){

    // console.log(data);

    movieContainer.innerHTML = "";

    for(let movie of data){
        // console.log(movie);
        const imgPath = `${IMGPATH + movie.poster_path}`
        const movieBox = document.createElement('div');
        movieBox.classList ='movie-box';

        movieBox.innerHTML = `
        
        <div class="thumb">
            <img src="${imgPath}" />
        </div>

        <div class="overlay">
            <div class="title">
                <h2>${movie.original_title}</h2>
                <span class="rating">${movie.vote_average}</span>
             </div>

            <div class="overview">
                <h3>Overview :</h3>
            </div>

            <div class="desc">
                <p>
                    ${movie.overview}
                </p>
            </div>
        </div>

        `
        movieContainer.appendChild(movieBox);
        // console.log(movieBox);
    }
}

search.addEventListener(

    'keyup',
    function(e){
        if(e.target.value !== ""){
            // console.log(e.target.value);
            getMovies(SEARCHAPI + e.target.value)
            document.querySelector('.pagination').style.display = 'none';
        }
        else{
            getMovies(POPULARAPIURL);
            document.querySelector('.pagination').style.display = 'flex';
        }
    }
)

search.addEventListener(

    'submit',
    function(e){
        e.preventDefault();

        if(e.target.value !== ""){
            // console.log(e.target.value);

            getMovies(SEARCHAPI + e.target.value)
        }
        else{
            getMovies(POPULARAPIURL);
        }

    }

)

prev.addEventListener(

    'click',
    function(){
        if(page>1){
            page--;
            getMovies(POPULARAPIURL + page);
        }
    }
)

next.addEventListener(

    'click',
    function(){
        if(page<500){
            page++;
            // console.log(page);
            getMovies(POPULARAPIURL + page);
        }
    }
)