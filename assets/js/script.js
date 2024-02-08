//test div for test achievement list
var testDivEl = document.querySelector("#test-div")

var gameSearchInput = document.querySelector("#game-search");
var searchBtn = document.querySelector("#search-button");
// our youtube key
const ytKey = "AIzaSyDLxdkAoPEq_7O3GIEVsz7vhGPmt1ffXtY";

// our RAWG key
const rawgKey = "3aa9c76d2f81440cb15bd3f113bf0db5";

// empty holder for game search. value is changed at the searchBtn event listener
var gameSearchKeyword = "";

var ytURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=skyrim%20how%20to%20get%20dragon%20rider%20achievement&key=AIzaSyDLxdkAoPEq_7O3GIEVsz7vhGPmt1ffXtY";


// this is where we search our game
function searchGame(){
fetch("https://api.rawg.io/api/games?key=3aa9c76d2f81440cb15bd3f113bf0db5&search=" + gameSearchKeyword).then(res => res.json()).then(data=> {
    console.log(data);
})
}

// when the search button is clicked it updates the value to enter into the url to search the game
searchBtn.addEventListener("click", function(event){
    event.preventDefault();

    gameSearchKeyword = gameSearchInput.value.trim()
    console.log (gameSearchKeyword)
    
    searchGame();
})

// get achievments from searched Game
function getAchievments(){
fetch("https://api.rawg.io/api/games/5679/achievements?key=3aa9c76d2f81440cb15bd3f113bf0db5&page=1&page_size=40").then(res => res.json()).then(data=> {
    console.log(data);
    console.log(data.results.length)
})
}

function createAchievementList(){
//demo array for testing the loop to dynamically create the achievment list
var demoArray = [
    {
        "name": "Dragonrider",
        "description": "Tame and ride 5 dragons",
        "image": "https://media.rawg.io/media/achievements/ad4/ad49fa1746d79f4c1bc905864d9e8e77.jpg",
        "percent": "7.52"
    },
    {
        "name": "Legend",
        "description": "Defeat a Legendary Dragon",
        "image": "https://media.rawg.io/media/achievements/326/326280dad53e5abe61a9e0e16cdc9f73.jpg",
        "percent": "8.40"
    }
]

// loop to append achievements to the page
for(var i = 0; i < demoArray.length; i++){
    var achievementBoxEl = document.createElement('div')
    achievementBoxEl.classList = "box has-background-dark has-text-warning-dark";

    testDivEl.appendChild(achievementBoxEl)

    var articleEl = document.createElement('article')
    articleEl.classList = "media"
    //create button add button id achievbutton[i]
    
    achievementBoxEl.appendChild(articleEl)

    var divMediaLeft = document.createElement('div')
    divMediaLeft.classList = "media-left"

    articleEl.appendChild(divMediaLeft)

    var imgHolder = document.createElement('figure')
    imgHolder.classList = "image is-64x64"

    divMediaLeft.appendChild(imgHolder)

    var achievementImg = document.createElement('img')
    //gets the image from the results
    achievementImg.src = demoArray[i].image

    imgHolder.appendChild(achievementImg)

    var contentHolder = document.createElement('div')
    contentHolder.classList = "media-content"

    articleEl.appendChild(contentHolder)

    var contentDiv = document.createElement('div')
    contentDiv.classList = "content"

    contentHolder.appendChild(contentDiv)

    var achievementInfo = document.createElement('p')

    contentDiv.appendChild(achievementInfo)

    var achievementName = document.createElement('strong')
    achievementName.classList = "has-text-warning-dark"
    //gets the achievement name
    achievementName.textContent = demoArray[i].name

    achievementInfo.appendChild(achievementName)

    var spacing = document.createElement('br')
    achievementName.appendChild(spacing)

    var achievementPercent = document.createElement('small')
    //get achievement percentage
    achievementPercent.textContent = demoArray[i].percent + "% of players have completed"
    
    achievementInfo.appendChild(achievementPercent)

    var spacing = document.createElement('br')
    achievementPercent.appendChild(spacing)

    var achievementDescription = document.createElement('small')
    //get achievement description
    achievementDescription.textContent = "Achievement Description: " + demoArray[i].description

    achievementInfo.appendChild(achievementDescription)

    
}
}

createAchievementList()
// search youtube for how to's on selected achievment
var ytAltURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&part=player&maxResults=25&q=surfing&videoEmbeddable=true&key=[YOUR_API_KEY]"

function searchYoutube(){
fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=skyrim%20how%20to%20get%20dragon%20rider%20achievement&key=AIzaSyDLxdkAoPEq_7O3GIEVsz7vhGPmt1ffXtY").then(res => res.json()).then(data=> {
    console.log(data);
})
}


document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(e.key === "Escape") {
        closeAllModals();
      }
    });
  });