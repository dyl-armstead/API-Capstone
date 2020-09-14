const apiKey = '61b50801d9a76594727d80c82c3096ec'; 
const discoverURL = 'https://api.themoviedb.org/3/discover/movie'
const defaultHorrorSearch = 'sort_by=vote_average.desc&include_adult=false&vote_count.gte=500&with_genres=27'
const imageBaseURL = 'https://image.tmdb.org/t/p/w500/'
const detailsURL = 'https://api.themoviedb.org/3/movie/'

//check README for keyword ID names

const STORE = [
    {
        class: 'Phobia',
        ids: '12617|11116|155372|221272|2147|158241|1533|7172|206704|206219|3199|191327|5859|235354',
        subgenre: 'Psychological',
        identifier: 'phobia'
    },
    {
        class: 'Madness and Paranoia',
        ids: '2340|3301|9758|10410|193227|12565|3030|41410|215015|3713|209141|447|3298|10937|173077|2833|6255|4142',
        subgenre: 'Psychological',
        identifier: 'madness-paranoia'
    },
    {
        class: 'Survival',
        ids: '223198|14903|199600|6511|18029|1562|10226|18035|238752|1437|3305',
        subgenre: 'Psychological',
        identifier: 'survival'
    },
    {
        class: 'Disturbing',
        ids: '13006|14624|14707|10292|14819|14901|191564|5569|179564|3597|570|184352|3260|2376|4426|5919|14895|208048',
        subgenre: 'Psychological',
        identifier: 'disturbing'
    },
    {
        class: 'Slasher',
        ids: '12339|17987|10333|11040|14805|207159|6844|11546|12394',
        subgenre: 'Killer',
        identifier: 'slasher'
    },
    {
        class: 'Crime',
        ids: '33699|6149|703|10941|5340|10714|1562|6259|1583|7281|17987|570',
        subgenre: 'Killer',
        identifier: 'crime'
    },
    {
        class: 'Strange People and Outsiders',
        ids: '209568|198141|3189|10041|14895|208048',
        subgenre: 'Killer',
        identifier: 'outsider-strange-people'
    },
    {
        class: 'Zombies and Infected',
        ids: '17995|12377|155561|186565|167085|188957|188959',
        subgenre: 'Monster',
        identifier: 'zombie-infected'
    },
    {
        class: 'Vampire',
        ids: '3133|179860|272|9668|157185|9261274',
        subgenre: 'Monster',
        identifier: 'vampire'
    },
    {
        class: 'Werewolf',
        ids: '12564|1994|4550|11155|228001',
        subgenre: 'Monster',
        identifier: 'werewolf'
    },
    {
        class: 'Mythological and Giant Monsters',
        ids: '207003|10310|179101|10308|173386|11100|166958|7035|196425|12616',
        subgenre: 'Monster',
        identifier: 'mythological-giant'
    },
    {
        class: 'Sci-Fi and Aliens',
        ids: '9951|14909|15250|235513|4862|183787|1852|252937|9882|1612',
        subgenre: 'Monster',
        identifier: 'sci-fi-alien'
    },
    {
        class: 'Ghosts and Spirits',
        ids: '256908|162846|210530|6155',
        subgenre: 'Paranormal',
        identifier: 'ghosts-spirits'
    },
    {
        class: 'Haunted House',
        ids: '10224|3358|10541|15043|163186',
        subgenre: 'Paranormal',
        identifier: 'haunted-house'
    },
    {
        class: 'Demons and Possesion', 
        ids: '3684|9712|15001|161261|8685|2626|3649|10093|10138|9649', 
        subgenre: 'Paranormal',
        identifier: 'demon-possession'
    },
    {
        class: 'Witches and the Occult',
        ids: '156174|163055|4720|6158|10864|11083',
        subgenre: 'Paranormal',
        identifier: 'witch-occult'
    },
    {
        class: 'Supernatural',
        ids: '10112|11627|250461|6152|256183',
        subgenre: 'Paranormal',
        identifier: 'supernatural'
    }
];

//accessing data from responseJson
// title - responseJson.results[i].title
// overview - responseJson.results[i].overview
// picture - responseJson.results[i].poster_path

const RESULT_STOP = 4

function appendResults(i, getMoviesResponse, getDetailsResponse){
    var resultHtml = "<div class=result-item><item class='title-item'><h4 id='result-" + i + "-title'></h4></item><div class='result-content'><img id='result-" + i + "-img' src='' class='float'><a id='result-" + i + "-home' href='' target='_blank'>Movie Website</a><p id='result-" + i + "-release' class='result-date'>Release Date: </p><p id='result-" + i + "-runtime' class='result-runtime'>Run Time: </p><p id='result-" + i + "-description' class='result-description'></p></div></div>"
    var resultTitleTarget = 'result-' + i + '-title'
    var resultTitle = getMoviesResponse.results[i].original_title
    var resultImgTarget = 'result-' + i + '-img'
    var imgPath = getMoviesResponse.results[i].poster_path
    var resultImg = imageBaseURL + imgPath
    var resultDescTarget = 'result-' + i + '-description'
    var resultDesc = getMoviesResponse.results[i].overview
    var resultHomeTarget = 'result-' + i + '-home'
    var resultHome = getDetailsResponse.homepage
    var resultDateTarget = 'result-' + i + '-release'
    var resultDate = getDetailsResponse.release_date
    var resultTimeTarget = 'result-' + i + '-runtime'
    var resultTime = getDetailsResponse.runtime + ' minutes'
    $('#full-results').append(resultHtml)
    $('#' + resultTitleTarget ).text(resultTitle)
    $('#' + resultImgTarget ).attr('src', resultImg)
    $('#' + resultDescTarget ).text(resultDesc)
    $('#' + resultDateTarget ).append(resultDate)
    $('#' + resultTimeTarget ).append(resultTime)
    if(resultHome != ''){
        $('#' + resultHomeTarget ).attr('href', resultHome)
    }else{
        $('#' + resultHomeTarget ).hide();
    }
}

function displayResults(getMoviesResponse){
    $('#end-of-results').hide()
    var resultHeader = `<h3>Search Results</h3>`
    $('#full-results').append(resultHeader)
    if (getMoviesResponse.total_results < RESULT_STOP){
        for(let i = 0; i < getMoviesResponse.total_results; i++){
            getHorrorDetails(i, getMoviesResponse)
        }
    }
    else if (getMoviesResponse.total_results > RESULT_STOP){
        for (let i = 0; i <= RESULT_STOP; i++){
            getHorrorDetails(i, getMoviesResponse)
        }
    } else {
            $('#js-error-message').hide();
        }
    $('#full-results').show();
}

function seeMoreClick(getMoviesResponse){
    var amountOfClicks = 1
    $("#horror-results").on('click', '.see-more-button', function (){
        amountOfClicks++; 
        let startPoint = RESULT_STOP
        let totalClicks = amountOfClicks + startPoint
        var totalMovies = getMoviesResponse.total_results
        if(totalClicks < totalMovies && totalClicks < 20){
            getMoreDetails(getMoviesResponse, amountOfClicks, totalClicks)
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

function appendMoreResults(getMoviesResponse, getDetailsResponse, amountOfClicks){
    var newResultHtml = "<div class=result-item><item class='title-item'><h4 id='result-" + [amountOfClicks+RESULT_STOP] + "-title'></h4></item><div class='result-content'><img id='result-" + [amountOfClicks+RESULT_STOP] + "-img' src='' class='float'><a id='result-" + [amountOfClicks+RESULT_STOP] + "-home' href='' target='_blank'>Movie Website</a><p id='result-" + [amountOfClicks+RESULT_STOP] + "-release' class='result-date'>Release Date: </p><p id='result-" + [amountOfClicks+RESULT_STOP] + "-runtime' class='result-runtime'>Run Time: </p><p id='result-" + [amountOfClicks+RESULT_STOP] + "-description' class='result-description'></p></div></div>"
    var newTitleID = 'result-' + [amountOfClicks+RESULT_STOP] + '-title'
    var newTitle = getMoviesResponse.results[amountOfClicks+RESULT_STOP].original_title
    var newImgID = 'result-' + [amountOfClicks+RESULT_STOP] + '-img'
    var newImg = imageBaseURL + getMoviesResponse.results[amountOfClicks+RESULT_STOP].poster_path
    var newDescID = 'result-' + [amountOfClicks+RESULT_STOP] + '-description'
    var newDesc = getMoviesResponse.results[amountOfClicks+RESULT_STOP].overview
    var newHomeID = 'result-' + [amountOfClicks+RESULT_STOP] + '-home'
    var newHome = getDetailsResponse.homepage
    var newDateID = 'result-' + [amountOfClicks+RESULT_STOP] + '-release'
    var newDate = getDetailsResponse.release_date
    var newTimeID = 'result-' + [amountOfClicks+RESULT_STOP] + '-runtime'
    var newTime = getDetailsResponse.runtime + ' minutes'
    $('#full-results').append(newResultHtml);
    $('#' + newTitleID).text(newTitle)
    $('#' + newImgID).attr('src', newImg);
    $('#' + newDescID).text(newDesc);
    $('#' + newDateID).append(newDate)
    $('#' + newTimeID).append(newTime)
    if(newHome != ''){
        $('#' + newHomeID).attr('href', newHome)
    }else{
        $('#' + newHomeID).hide();
    }
}


function tryNewSearch(){
    $('#horror-results').on('click', '.new-search-button', function (){
        delete getMoviesResponse
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
        let getMoviesResponse = responseJson
        if (responseJson.total_results === 0) {
            $('#new-search-button').addClass('center-button')
            throw new Error("We didn't find any movies, try a new search")
        }
        else if (getMoviesResponse.total_results < 4){
            $('button.see-more-button').hide();
            $('#new-search-button').addClass('center-button')
        }
        $("#horror-results").unbind('click');
        displayResults(getMoviesResponse)
        seeMoreClick(getMoviesResponse)
        tryNewSearch()
    })
    .catch(err => {
        if($(window).width() >= 769){
            $('#js-error-message').show();
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
            $('#end-of-results').hide();
            $('button.see-more-button').hide();
            $('#new-search-button').addClass('center-button')
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

function getHorrorDetails(i, getMoviesResponse){
    let movieID = getMoviesResponse.results[i].id
    const PARAMSTWO = {
    api_key: apiKey,
    };
    const queryStringTwo = formatQueryParams(PARAMSTWO)
    const urlTwo = detailsURL + movieID + '?' + queryStringTwo
    
    fetch(urlTwo)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            let getDetailsResponse = responseJson
            appendResults(i, getMoviesResponse, getDetailsResponse)
        })
}

function getMoreDetails(getMoviesResponse, amountOfClicks, totalClicks){
    let movieID = getMoviesResponse.results[totalClicks].id
    const PARAMSTWO = {
    api_key: apiKey,
    };
    const queryStringTwo = formatQueryParams(PARAMSTWO)
    const urlTwo = detailsURL + movieID + '?' + queryStringTwo
    
    fetch(urlTwo)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            let getDetailsResponse = responseJson
            appendMoreResults(getMoviesResponse, getDetailsResponse, amountOfClicks)
        })
}




// functions that move from page to page

function startHorror(){
    $('#horror-subgenre').hide();
    $('#horror-results').hide();
    $('#full-results').hide();
    $('.horror-intro').on('click', '.start-button', function (event){
        event.preventDefault();
        addSubGenreOptions();
        $('#horror-intro').hide();
        $('#horror-subgenre').show();
        revealOptions();
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
    })
}

function revealOptions(){
    $('form').find("div.hidden").hide();
    $("button.hide,h3").click(function () {
    var target = $(this).is('h3') ? $(this).next("div.hidden") : $(this).parents("div.hidden");
    target.slideToggle("slow");
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
        }
        let keywords = checkGenreIds(subGenre)
        let langCheck = checkLanguage(langChoice);
        let before = checkMovieYear(beforeOrAfter, movieYear)[0];
        let after = checkMovieYear(beforeOrAfter, movieYear)[1];
        let lowMovie = checkMovieRating(movieRating)[0]
        let highMovie = checkMovieRating(movieRating)[1];
        getHorrorMovies(keywords, langCheck, before, after, lowMovie, highMovie)
    })
    
}

// to build html 

                
function addSubGenreOptions(){
    const subExplanation = "<p class='sub-genre-exp'>Click a sub-genre and select one drop-down option. Then select additional details below to find the horror you are looking for.</p>"
    const subGenreForm = `<form id='movie-details'>
                        <div class='sub-genre-selection'>
                            <div class='psycho-horror-main sub-genre-box'>
                                <h3>Psychological</h3>
                                    <div class='psycho-horror-options options-box hidden'></div>
                            </div>
                            <div class='killer-horror-main sub-genre-box'>
                                <h3>Killers</h3>
                                    <div class='killer-horror-options options-box hidden'></div>
                            </div>
                            <div class='monster-horror-main sub-genre-box'>
                                <h3>Monsters</h3>
                                    <div class='monster-horror-options options-box hidden'></div>
                            </div>
                            <div class='para-horror-main sub-genre-box'>
                                <h3>Paranormal</h3>
                                    <div class='para-horror-options options-box hidden'></div>
                            </div>
                        </div>`   
    const endForm = `<div class="details-selection">
                        <div class="language-select sub-details-box">
                            <item>
                                <h3 class="detail-header">English-Only or All Languages?</h3>
                            </item>
                            <item class="option-item">
                                <input type='radio' id="en-only" name="language-choice" value='en-US' checked> 
                                <label for="en-only">English</label><br>
                                <input type='radio' id="all-languages" name="language-choice" value='null'> 
                                <label for="all-languages">All</label><br>
                            </item>
                        </div>
                        <div class="year-select sub-details-box">
                            <item>
                                <h3 class="detail-header">When was the movie made?</h3>
                            </item>
                            <item class="option-item">
                                <label for="movie-year">Year:</label>
                                <input type="number" id="movie-year" name="movie-year" min=1920 max=2020 value=2020 required><br>
                                <input type='radio' id="before" name="before-after-choice" value='before' checked> 
                                <label for="before">Before</label><br>
                                <input type='radio' id="after" name="before-after-choice" value='after'> 
                                <label for="after">After</label><br>
                            </item>
                        </div>
                        <div class="rating-select sub-details-box">
                            <item>
                                <h3 class="detail-header">How was its quality rated?</h3>
                            </item>
                            <item class="option-item">
                                <input type='radio' id="highly-rated" name="rating-choice" value='highly-rated'> 
                                <label for="highly-rated">Highly</label><br>
                                <input type='radio' id="well-rated" name="rating-choice" value='well-rated' checked> 
                                <label for="well-rated">Well</label><br>
                                <input type='radio' id="poorly-rated" name="rating-choice" value='poorly-rated'> 
                                <label for="poorly-rated">Poorly</label><br>
                            </item>
                        </div>
                    </div>
                </div>
                </form>
                <item class="search-button-container">
                <button type="submit" id="search-button" class="search-button button">Find my Horror</button>
                </item>`
    $('#horror-subgenre').append(subExplanation)
    $('#horror-subgenre').append(subGenreForm)
    $('#horror-subgenre').append(endForm)
    for (let i=0; i < STORE.length; i++){
        let newIdentifier = STORE[i].identifier
        let newClass = STORE[i].class
        let subGenreOption = `<input type='radio' id='` + newIdentifier + `' name='genre-choice' value='` + newClass + `' required><label for='` + newIdentifier + `' >` + newClass + `</label><br>`    
        if (STORE[i].subgenre === 'Psychological'){
            $('.psycho-horror-options').append(subGenreOption)
        }
        else if (STORE[i].subgenre === 'Killer'){
            $('.killer-horror-options').append(subGenreOption)
        }
        else if (STORE[i].subgenre === 'Monster'){
            $('.monster-horror-options').append(subGenreOption)
        }
        else if (STORE[i].subgenre === 'Paranormal'){
            $('.para-horror-options').append(subGenreOption)
        }
    }
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
    selectDetails();
}

runHorrorApp();