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
        ids: "2340|3301|9758|10410|193227|12565|3030|41410|215015|3713|209141|447|3298|10937|173077|2833|6255|4142'"
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
        ids: "3133|179860|272|9668|157185|9261274"
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

const RESULT_STOP = 4

function appendResults(i, currentResponse){
    let resultHtml = "<div class=result-item><item class='title-item'><h4 id='result-" + i + "-title'></h4></item><div class='result-content'><img id='result-" + i + "-img' src='' class='float'><p id='result-" + i + "-description' class='result-description'></p></div></div>"
    let resultTitleTarget = 'result-' + i + '-title'
    let resultTitle = currentResponse.results[i].original_title
    let resultImgTarget = 'result-' + i + '-img'
    let imgPath = currentResponse.results[i].poster_path
    let resultImg = imageBaseURL + imgPath
    let resultDescTarget = 'result-' + i + '-description'
    let resultDesc = currentResponse.results[i].overview
    
    $('#full-results').show();
    $('#full-results').append(resultHtml)
    $('#' + resultTitleTarget ).text(resultTitle)
    $('#' + resultImgTarget ).attr('src', resultImg)
    $('#' + resultDescTarget ).text(resultDesc)
}

function displayResults(currentResponse){
    $('#end-of-results').hide()
    var resultHeader = `<h3>Search Results</h3>`
    $('#full-results').append(resultHeader)
    if (currentResponse.total_results < RESULT_STOP){
        for(let i = 0; i < currentResponse.total_results; i++){
            appendResults(i, currentResponse)
        }
    }
    else if (currentResponse.total_results > RESULT_STOP){
        for (let i = 0; i <= RESULT_STOP; i++){
            appendResults(i, currentResponse)
        }
    } else {
            $('#js-error-message').hide();
            $('#full-results').show();
        }
}

function seeMoreClick(currentResponse){

    var amountOfClicks = 1
    $("#horror-results").on('click', '.see-more-button', function (){
        amountOfClicks++; 
        let startPoint = RESULT_STOP
        let totalClicks = amountOfClicks + startPoint
        var totalMovies = currentResponse.total_results
        if(totalClicks < totalMovies && totalClicks < 20){
            let newResultHtml = "<div class=result-item><item class='title-item'><h4 id='result-" + [amountOfClicks+RESULT_STOP] + "-title'></h4></item><div class='result-content'><img id='result-" + [amountOfClicks+RESULT_STOP] + "-img' src='' class='float'><p id='result-" + [amountOfClicks+RESULT_STOP] + "-description' class='result-description'></p></div></div>"
            let newTitleID = 'result-' + [amountOfClicks+RESULT_STOP] + '-title'
            let newTitle = currentResponse.results[amountOfClicks+RESULT_STOP].original_title
            let newImgID = 'result-' + [amountOfClicks+RESULT_STOP] + '-img'
            let newImg = imageBaseURL + currentResponse.results[amountOfClicks+RESULT_STOP].poster_path
            let newDescID = 'result-' + [amountOfClicks+RESULT_STOP] + '-description'
            let newDesc = currentResponse.results[amountOfClicks+RESULT_STOP].overview
            $('#full-results').append(newResultHtml);
            $('#' + newTitleID).text(newTitle)
            $('#' + newImgID).attr('src', newImg);
            $('#' + newDescID).text(newDesc);
        }else {
            if($(window).width() >= 769){
                amountOfClicks = 1
                $('button.see-more-button').hide()
                $('button.new-search-button').css('margin-left', '40%')
                $('#end-of-results').show();
            }else{
                amountOfClicks = 1
                $('button.see-more-button').hide()
                $('button.new-search-button').css('margin-left', '33%')
                $('#end-of-results').show();
            }
        }
    })
}


function tryNewSearch(){
    $('#horror-results').on('click', '.new-search-button', function (){
        delete currentResponse
        $('#full-results').empty();
        $('#js-error-message').empty();
        $('#end-of-results').hide();
        $('button.see-more-button').show()
        $('#horror-results').hide();
        $('#horror-subgenre').show();
        $('button.new-search-button').css('margin-left', '10%')
        });
};






//functions to build api url

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }


function getHorrorMovies(keywords, langCheck, before, after, lowMovie, highMovie){
  const PARAMS = {
    language: langCheck,
    'primary_release_date.gte': after,
    'primary_release_date.lte': before,
    'vote_average.gte': highMovie,
    'vote_average.lte': lowMovie,
    with_keywords: keywords,
    api_key: apiKey,
  };
  const queryString = formatQueryParams(PARAMS)
  const url = discoverURL + '?' + defaultHorrorSearch + '&' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
        let currentResponse = responseJson
        if (responseJson.total_results === 0) {
            throw new Error("We didn't find any movies, try a new search")
        }
        else if (currentResponse.total_results < 4){
            $('button.see-more-button').hide();
        }
        $("#horror-results").unbind('click');
        displayResults(currentResponse)
        seeMoreClick(currentResponse)
        tryNewSearch()
    })
    .catch(err => {
        if($(window).width() >= 769){
            $('#js-error-message').show();
            $('#js-error-message').css('text-align', 'center')
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
            $('#end-of-results').hide();
            $('button.see-more-button').hide();
            $('button.new-search-button').css('margin-left', '40%')
            $('#full-results').hide();
            tryNewSearch()
        }else{
            $('#js-error-message').show();
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
            $('#end-of-results').hide();
            $('button.see-more-button').hide();
            $('button.new-search-button').css('margin-left', '33%')
            $('#full-results').hide();
            tryNewSearch()
        }
            
    });
    
}


// functions that move from page to page

function startHorror(){
    $('#horror-subgenre').hide();
    $('#horror-results').hide();
    $('#full-results').hide();
    $('.horror-intro').on('click', '.start-button', function (event){
        event.preventDefault();
        $('#horror-intro').hide();
        $('#horror-subgenre').show();
        if($(window).width() >= 769){
            $('header').css('padding-bottom','10%')
            $('header').css('padding-top','1%')
            $('.logo').css('order','1')
            $('.logo').css('margin-top','0%')
            $('.logo').css('margin-left','1%')
            $('.logo').css('padding-right','auto')
            $('.logo').css('padding-left','1%')
            $('.logo').css('padding-top','0%')
            $('.logo').css('width','15%')
            $('.logo').css('height','15%')
            $('header').css('display','flex')
            $('header').css('flex-direction','row')
            $('header').css('align-content','space-between')
            $('header').css('margin','0%')
            $('.moon').css('display','flex')
            $('.moon').css('padding-left','33%')
            $('.moon').css('order','2')
            $('.moon').css('width','30%')
            $('.moon').css('height','30%')
        }
        console.log('startHorror ran')
    })
}

function revealOptions(){
    $("div.hidden").hide();
    $("button.hide,h3").click(function () {
    var target = $(this).is('h3') ? $(this).next("div.hidden") : $(this).parents("div.hidden");
    target.slideToggle("slow");
    console.log('revealOptions ran')
    });
}
        
function selectDetails(){
    $('#horror-subgenre').on('click', '.search-button', function (event){
        event.preventDefault();
        const subGenre = $("input[name='genre-choice']:checked").val()
        const langChoice = $("input[name='language-choice']:checked").val()
        const beforeOrAfter = $("input[name='before-after-choice']:checked").val()
        const movieYear = $('#movie-year').val()
        const movieRating = $("input[name='rating-choice']:checked").val();
        $('#horror-subgenre').hide();
        $('#horror-results').show();
        if($(window).width() >= 769){
            $('header').css('padding-bottom','5%')
            $('.see-more-button').css('margin-left','25%')
            $('.see-more-button').css('padding','1% 6%')
            $('.new-search-button').css('margin-left','10%')
            $('.new-search-button').css('padding','1% 6%')
            $('.moon').css('width','17%')
            $('.moon').css('height','17%')

        }
        console.log(subGenre,langChoice,beforeOrAfter,movieYear,movieRating)
        let keywords = checkGenreIds(subGenre)
        let langCheck = checkLanguage(langChoice);
        let before = checkMovieYear(beforeOrAfter, movieYear)[0];
        let after = checkMovieYear(beforeOrAfter, movieYear)[1];
        let lowMovie = checkMovieRating(movieRating)[0]
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
    return langChoice === 'en-US' ? 'en-US':''
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
        let low = 10
        let high =7
        return [low, high]
    }else if (movieRating === 'well-rated'){
        let low = 6.9
        let high = 4
        return [low, high]
    } else {
        let low = 3.9
        let high = 0
        return [low, high]
    }
}

// runs app
function runHorrorApp(){
    startHorror();
    revealOptions();
    selectDetails();
}

runHorrorApp();
