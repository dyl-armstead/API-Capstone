const apiKey = '61b50801d9a76594727d80c82c3096ec'; 
const discoverURL = 'https://api.themoviedb.org/3/discover/movie'
const defaultHorrorSearch = 'sort_by=vote_average.desc&include_adult=false&vote_count.gte=500&with_genres=27'
const imageBaseURL = 'https://image.tmdb.org/t/p/w500/'

const STORE = [
    {
        class: 'Phobia',
        ids: "12617|11116|155372|221272|2147|158241|1533|7172|206704|206219|3199|191327|5859|235354"
    },
    {
        class: 'Madness & Paranoia',
        ids: "2340|3301|9758|10410|193227|12565|3030|13073|41410|215015|3713|209141|447|3298|10937|173077|2833|6255|4142'"
    },
    {
        class: 'Survival',
        ids: "223198|14903|199600|6511|18029|1562|10226|18035|238752|1437|3305"
    },
    {
        class: 'Disturbing',
        ids: "13006|14624|14707|10292|14819|14901|191564|5569|179564|3597|570|184352|3260|2376|4426|5919|14895|208048"
    },
    {
        class: 'Slasher',
        ids: "12339|17987|10333|11040|14805|207159|6844|11546|12394"
    },
    {
        class: 'Crime',
        ids: "33699|6149|703|10941|5340|10714|1562|6259|1583|7281|17987|570"
    },
    {
        class: 'Strange People & Outsiders',
        ids: "209568|198141|3189|10041|14895|208048"
    },
    {
        class: 'Zombies & Infected',
        ids: "17995|12377|155561|186565|167085|188957|188959"
    },
    {
        class: 'Vampire',
        ids: "3133|11221|179860|272|9668|157185|9261274"
    },
    {
        class: 'Werewolf',
        ids: "12564|1994|4550|11155|228001"
    },
    {
        class: 'Mythological & Giant Monsters',
        ids: "207003|10310|179101|10308|173386|11100|166958|7035|196425|12616"
    },
    {
        class: 'Sci-Fi & Aliens',
        ids: "9951|14909|15250|235513|4862|183787|1852|252937|9882|1612"
    },
    {
        class: 'Ghosts & Spirits',
        ids: "256908|162846|210530|6155"
    },
    {
        class: 'Haunted House',
        ids: "10224|3358|10541|15043|163186"
    },
    {
        class: 'Demons and Possesion',
        ids: "3684|9712|15001|161261|8685|2626|3649|10093|10138|9649"
    },
    {
        class: 'Witches & the Occult',
        ids: "156174|163055|4720|6158|10864|11083"
    },
    {
        class: 'Supernatural',
        ids: "10112|11627|250461|6152|256183"
    }
];

//accessing data from responseJson
// title - responseJson.results[i].title
// overview - responseJson.results[i].overview
// picture - responseJson.results[i].poster_path

function displayResults(responseJson){
    var resultHeader = `<h3>Search Results</h3>`
    $('#full-results').append(resultHeader)
    for (let i = 0; i <= 4; i++){
        let checkImgResult = responseJson.results[i].poster_path
        let checkDescResult = responseJson.results[i].overview
        if (checkImgResult !== 'undefined' && checkDescResult !== 'undefined'){
            let resultHtml = "<img id='result-" + i + "-img' src=''><p id='result-" + [i] + "-description'></p>"
            let resultImgTarget = 'result-' + i + '-img'
            let imgPath = responseJson.results[i].poster_path
            let resultImg = imageBaseURL + imgPath
            let resultDescTarget = 'result-' + i + '-description'
            let resultDesc = responseJson.results[i].overview
            $('#full-results').removeClass('hidden')
            $('#full-results').append(resultHtml)
            $('#' + resultImgTarget ).attr('src', resultImg)
            $('#' + resultDescTarget ).text(resultDesc)
        }
        else {
            $('#js-error-message').addClass('hidden')
            $('#full-results').removeClass('hidden');
            break;
        }
    }
}



/*function displayResults(responseJson){
    $('#full-results').removeClass('hidden')
    for (let i = 0; i <= 4; i++){
        let resultImgTarget = 'result-' + [i] + '-img'
        let resultImg = imageBaseURL + responseJson.results[i].poster_path
        let resultDescTarget = 'result-' + [i] + '-description'
        let resultDesc = responseJson.results[i].overview
        $('#' + resultImgTarget ).attr('src', resultImg)
        $('#' + resultDescTarget ).text(resultDesc)
    }
}*/

function seeMoreClick(responseJson){

        let amountOfClicks = 0
    $('#horror-results').on('click', '.see-more-button', function (){ 
        ++amountOfClicks;
        var totalMovies = responseJson.total_results
        let startPoint = 4
        let totalClicks = amountOfClicks + startPoint
        if(totalClicks < totalMovies){
            let newResultHtml = "<img id='result-" + [amountOfClicks+4] + "-img' src=''><p id='result-" + [amountOfClicks+4] + "-description'></p>"
            let newImgID = 'result-' + [amountOfClicks+4] + '-img'
            let newImg = imageBaseURL + responseJson.results[amountOfClicks+4].poster_path
            let newDescID = 'result-' + [amountOfClicks+4] + '-description'
            let newDesc = responseJson.results[amountOfClicks+4].overview
            $('#full-results').append(newResultHtml)
            $('#' + newImgID).attr('src', newImg)
            $('#' + newDescID).text(newDesc)
        }else if (totalClicks = totalMovies){
            amountOfClicks = 0
            $('button.see-more-button').hide()
            $('#end-of-results').removeClass('hidden')
            }
        })
    }

/*
function removeSeeMore(responseJson){
    if(responseJson.results.length < 4){
        $('#see-more-button').empty();
    }
}
*/

function tryNewSearch(){
    $('#horror-results').on('click', '.new-search-button', function (event){
        $('#full-results').empty();
        $('#js-error-message').empty();
        $('#end-of-results').addClass('hidden')
        $('button.see-more-button').show()
        $('#horror-results').addClass('hidden');
        $('#horror-subgenre').removeClass('hidden');
        });
};






//functions to build api url

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }


function getHorrorMovies(keywords, langCheck, before, after, lowMovie, highMovie){
  const params = {
    language: langCheck,
    'primary_release_date.gte': after,
    'primary_release_date.lte': before,
    'vote_average.gte': highMovie,
    'vote_average.lte': lowMovie,
    with_keywords: keywords,
    api_key: apiKey,
  };
  const queryString = formatQueryParams(params)
  const url = discoverURL + '?' + defaultHorrorSearch + '&' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
        if (responseJson.total_results === 0) {
            throw new Error("We didn't find any movies, try a new search")
        }
        else if (responseJson.total_results < 4){
            $('button.see-more-button').hide();
        }
        displayResults(responseJson)
        seeMoreClick(responseJson)
    })
    .catch(err => {
      $('#js-error-message').removeClass('hidden');
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
      $('#full-results').addClass('hidden');
    });
}


// functions that move from page to page

function startHorror(){
    $('.horror-intro').on('click', '.start-button', function (event){
        event.preventDefault();
        $('#horror-intro').addClass('hidden');
        $('#horror-subgenre').removeClass('hidden');
        console.log('startHorror ran')
    })
}

function revealOptions(){
    $('.sub-genre-box').on('click', '.sub-button', function (event){
        event.preventDefault();
        $(event.currentTarget).next('div')
        .toggleClass('hidden')
        console.log('revealOptions ran')
    })
}

function selectDetails(){
    $('#horror-subgenre').on('click', '.search-button', function (event){
        event.preventDefault();
        const subGenre = $("input[name='genre-choice']:checked").val()
        const langChoice = $("input[name='language-choice']:checked").val()
        const beforeOrAfter = $("input[name='before-after-choice']:checked").val()
        const movieYear = $('#movie-year').val()
        const movieRating = $("input[name='rating-choice']:checked").val();
        $('#horror-subgenre').addClass('hidden');
        $('#horror-results').removeClass('hidden');
        console.log(subGenre)
        console.log(langChoice)
        console.log(beforeOrAfter)
        console.log(movieYear)
        console.log(movieRating)
        let keywords = checkGenreIds(subGenre)
        let langCheck = checkLanguage(langChoice);
        let before = checkMovieYear(beforeOrAfter, movieYear)[0];
        let after = checkMovieYear(beforeOrAfter, movieYear)[1];
        let lowMovie = checkMovieRating(movieRating)[0];
        let highMovie = checkMovieRating(movieRating)[1];
        getHorrorMovies(keywords, langCheck, before, after, lowMovie, highMovie)
    })
    
}

//functions that will take input to create api fetch

function checkGenreIds(subGenre){
    let keywords = ''
    for (let i=0; i < STORE.length; i++){
        if(subGenre === STORE[i].class){
            keywords += STORE[i].ids
        }
    }
    return keywords
}

function checkLanguage(langChoice){
    if (langChoice === 'en-US'){
        let langCheck = 'en-US'
        return langCheck 
    }
    else{
        let langCheck = ''
        return langCheck
    }
}

function checkMovieYear(beforeOrAfter, movieYear){
    let date = movieYear + '-01-01'
    if (beforeOrAfter === 'before'){
        let before = date
        let after = ''
        return [before, after]
    }
    else{
        let before = ''
        let after = date
        return [before, after]
    }
}

function checkMovieRating(movieRating){
    if (movieRating === 'highly-rated'){
        let lowMovie = 10;
        let highMovie = 7;
        return [lowMovie, highMovie]
    }else if (movieRating === 'well-rated'){
        let lowMovie = 6.9
        let highMovie = 4
        return [lowMovie, highMovie]
    } else {
        let lowMovie = 3.9
        let highMovie = 0
        return [lowMovie, highMovie]
    }
}

// runs app
function runHorrorApp(){
    startHorror();
    revealOptions();
    selectDetails();
    tryNewSearch();
}

runHorrorApp();
