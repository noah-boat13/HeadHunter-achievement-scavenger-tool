//test div for test achievement list
var achievementDivEl = document.querySelector("#achievement-div")
//test div for game cards
var gameSearchCards = document.querySelector(".gameSearch")
var loadMoreDiv = document.querySelector("#loadMore")
var selectedGameDiv = document.querySelector(".selectedGame")
var loadMoreAchievsDiv = document.querySelector(".loadMoreAchievs")
var searchGameBoxDiv = document.querySelector("#search-game-box")
var searchBoxHolderDiv = document.querySelector("#search-box-holder")
const ourmodal = document.querySelector(".our-modal")

var gameCardsEl = document.querySelectorAll(".mycard")


var gameSearchInput = document.querySelector("#game-search");
var searchBtn = document.querySelector("#search-button");

//holds the selected games information
var selectedGameImg = ""
var selectedGameName = ""
var selectedGameId = ""
var selectedAchievementId = ""
var achievementCount = 1
var achievementIdCount = 0

//holds the selected achievement name
var selectedAchievment = ""

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
      var count = 0
      var countLimiter = 4
    function createGameCards (){

      var gameCardsHolder = document.createElement('div')
      gameCardsHolder.classList = "columns is-centered"
      gameSearchCards.appendChild(gameCardsHolder);
      
      for(i=count; i < countLimiter; i++){
        var gameCard = document.createElement('div')
        gameCard.classList = "column achievement-box is-one-fifth mycard hover-action"
        gameCardsHolder.appendChild(gameCard)
        //
        // gameCard.setAttribute("data-gameID", data.results[i].id)

        let loopCard = data.results[i]
        gameCard.addEventListener("click", function(){
          
          selectedGameImg = loopCard.background_image
          selectedGameName = loopCard.name
          selectedGameId = loopCard.id
          populateLocalStorage();

          createCurrentGameCard();


          getAchievments();
        })

        
    
        var outterGameImgHolder = document.createElement('div')
        outterGameImgHolder.classList = "card-iamge"
        gameCard.appendChild(outterGameImgHolder)
    
        var gameImgHolder = document.createElement('figure')
        gameImgHolder.classList = "image is-4by3"
        outterGameImgHolder.appendChild(gameImgHolder)
    
        var gameImg = document.createElement('img')
        gameImg.classList = "game-img"
        gameImg.src = data.results[i].background_image
        gameImgHolder.appendChild(gameImg)
    
        var gameNameHolder = document.createElement('div')
        gameCard.appendChild(gameNameHolder)
    
        var gameName = document.createElement('p')
        gameName.classList = "game-title has-text-centered py-1 mt-2"
        gameName.textContent = data.results[i].name
        gameNameHolder.appendChild(gameName)
        
      }


      

      
    }




    createGameCards();

    var loadMoreBtn = document.createElement('btn')
    loadMoreBtn.classList = "game-search-btn button is-light is-large py-5 my-7 ml-6 mr-6"
    loadMoreBtn.style = "background-color: black; color: #74cc2b;"
    loadMoreBtn.textContent = "Load More"
    loadMoreBtn.addEventListener ("click", function(){
      count = count + 4;
      countLimiter = countLimiter + 4;
      createGameCards()
    })
    loadMoreDiv.appendChild(loadMoreBtn)

})
}

// when the search button is clicked it updates the value to enter into the url to search the game
searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    gameSearchCards.innerHTML = ""
    loadMoreDiv.innerHTML = ""
    achievementDivEl.innerHTML = ""
    selectedGameDiv.innerHTML = ""
    selectedGameName = ""
    selectedGameImg = ""
    selectedGameId = ""
    loadMoreAchievsDiv.innerHTML = ""
    achievementIdCount = 0
    achievementCount = 1
    gameSearchKeyword = gameSearchInput.value.trim()



    
    searchGame();
  
})

// get achievments from searched Game
function getAchievments(){
fetch("https://api.rawg.io/api/games/" + selectedGameId + "/achievements?key=3aa9c76d2f81440cb15bd3f113bf0db5&page=" + achievementCount + "&page_size=40").then(res => res.json()).then(data=> {
    console.log(data);

    // Add an if statement 
    

    function createAchievementList(){
      
      // loop to append achievements to the page
      for(var i = 0; i < data.results.length; i++){
          var achievementBoxEl = document.createElement('div')
          achievementBoxEl.classList = "achievement-box";
      
          achievementDivEl.appendChild(achievementBoxEl)


      
          var articleEl = document.createElement('article')
          articleEl.classList = "media"
          
          
          //create button add button id achievbutton[i]
          
          achievementBoxEl.appendChild(articleEl)
      
          var divMediaLeft = document.createElement('div')
          divMediaLeft.classList = "media-left"
      
          articleEl.appendChild(divMediaLeft)
      
          var imgHolder = document.createElement('figure')
          imgHolder.classList = "image is-64x64 mt-2 mx-2"
      
          divMediaLeft.appendChild(imgHolder)
      
          var achievementImg = document.createElement('img')
          
          //gets the image from the results
          achievementImg.src = data.results[i].image
          imgHolder.appendChild(achievementImg)
      
          var contentHolder = document.createElement('div')
          contentHolder.classList = "media-content"
      
          articleEl.appendChild(contentHolder)
      
          var contentDiv = document.createElement('div')
          contentDiv.classList = "content", "is-vcentered"
          contentHolder.appendChild(contentDiv)
          
      
          var achievementInfo = document.createElement('p')
          contentDiv.appendChild(achievementInfo)
      
          var achievementName = document.createElement('strong')
          achievementName.classList = "achievement-name"
          //gets the achievement name
          achievementName.textContent = data.results[i].name
      //
          achievementInfo.appendChild(achievementName)
      
          var spacing = document.createElement('br')
          achievementName.appendChild(spacing)
      
          var achievementPercent = document.createElement('small')
          //get achievement percentage
          achievementPercent.textContent = data.results[i].percent + "% of players have completed"
          
          achievementInfo.appendChild(achievementPercent)
      //
          var spacing = document.createElement('br')
          achievementPercent.appendChild(spacing)
      
          var achievementDescription = document.createElement('small')
          //get achievement description
          achievementDescription.textContent = "Achievement Description: " + data.results[i].description
      
          achievementInfo.appendChild(achievementDescription)
      //
          var playDiv = document.createElement("div");
          playDiv.classList ="media-right mt-5 mx-2 hover-action-2"
          articleEl.appendChild(playDiv);

          var playBtn = document.createElement('i');
          playBtn.classList = "fa-brands fa-youtube fa-2xl";
          playBtn.style = "color: #74cc2b;";
          playDiv.appendChild(playBtn);

          var playBtnTxt = document.createElement('p')
          playBtnTxt.textContent = "How to achieve"
          playBtnTxt.style = "color: #74cc2b;";
          playBtnTxt.style = "font-family: 'Orbitron', sans-serif;"
          playDiv.appendChild(playBtnTxt)

          let youtubeCardsHolder = document.createElement('div')
          youtubeCardsHolder.classList = "columns is-centered my-2 py-1"
          youtubeCardsHolder.style = "background-color: black;"
          youtubeCardsHolder.id = "achievement-" + achievementIdCount
          achievementBoxEl.appendChild(youtubeCardsHolder);

          let loopAchieve = data.results[i]
          let loopId = achievementIdCount
          achievementIdCount++
          playDiv.addEventListener("click", function(){
            selectedAchievment = loopAchieve.name
            selectedAchievementId = loopId
            console.log(selectedAchievementId)
            resetYoutubeCards()
            currentYoutubeDiv = youtubeCardsHolder
            searchYoutube();
          })
       
        
      }
      }

      
      if (data.next !== null) {
        var loadMoreAchievsBtn = document.createElement('btn')
        loadMoreAchievsBtn.classList = "game-search-btn button is-light is-large py-5 my-7 ml-6 mr-6"
        loadMoreAchievsBtn.style = "background-color: black; color: #74cc2b;"
        loadMoreAchievsBtn.textContent = "Load More Achievements"
        loadMoreAchievsDiv.appendChild(loadMoreAchievsBtn)

        loadMoreAchievsBtn.addEventListener ("click", function(){
          loadMoreAchievsDiv.innerHTML = ""
          achievementCount = achievementCount + 1
          getAchievments()
        })

      } else {
        loadMoreAchievsDiv.innerHTML = ""
      }
      
      
      createAchievementList()
})
}
var currentYoutubeDiv = null;
function resetYoutubeCards(){
  if (currentYoutubeDiv !== null){
    currentYoutubeDiv.innerHTML = ""
  }
} 


const testVideoSearch = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=UnwNdenlVak&key=AIzaSyDLxdkAoPEq_7O3GIEVsz7vhGPmt1ffXtY'

const finishedVideoSearch = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q="+ selectedGameName + "%20how%20to%20get%20" + selectedAchievment + "%20achievement&key=AIzaSyDLxdkAoPEq_7O3GIEVsz7vhGPmt1ffXtY"


function searchYoutube(){
fetch(testVideoSearch).then(res => res.json()).then(data=> {
    console.log(data);
    console.log(data.items.length)

    console.log(achievementIdCount)
    var selectedYoutubeCardsHolder = document.querySelector("#achievement-" + selectedAchievementId)
    console.log(selectedYoutubeCardsHolder)

    for(i=0; i<data.items.length; i++){
      var youtubeCard = document.createElement('div')
      youtubeCard.classList = "column achievement-box is-one-fifth mycard"
      selectedYoutubeCardsHolder.appendChild(youtubeCard)

      var outterYoutubeImgHolder = document.createElement('div')
        outterYoutubeImgHolder.classList = "card-image"
        youtubeCard.appendChild(outterYoutubeImgHolder)
    
      var youtubeImgHolder = document.createElement('figure')
        //youtubeImgHolder.classList = "image is-4by3"
        outterYoutubeImgHolder.appendChild(youtubeImgHolder)
    
      var youtubeImg = document.createElement('img')
        youtubeImg.classList = "game-img"
        youtubeImg.style = "width='320' height='180';"
        youtubeImg.src = data.items[i].snippet.thumbnails.medium.url
        youtubeImgHolder.appendChild(youtubeImg)

      var spacing = document.createElement('br')
        youtubeCard.appendChild(spacing)
    
      var youtubeNameHolder = document.createElement('div')
        youtubeCard.appendChild(youtubeNameHolder)
    
      var youtubeName = document.createElement('p')
        youtubeName.classList = "game-title has-text-centered py-1 mt-2"
        youtubeName.textContent = data.items[i].snippet.title
        youtubeNameHolder.appendChild(youtubeName)

      let loopYoutubeId = data.items[i].id
      youtubeCard.addEventListener("click", function(){
        ourmodal.innerHTML = '<div class="modal"></div>  <iframe class="modal-video" src="https://www.youtube.com/embed/' + loopYoutubeId + '"frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>';
        console.log(ourmodal)
        ourmodal.style.display = "flex"

        setTimeout(function(){
          ourmodal.style.opacity = "1";
        }, 50);
        

        ourmodal.addEventListener("click", function(){
          ourmodal.innerHTML = '';
          ourmodal.style.opacity = "0";
          setTimeout(function(){
            ourmodal.style.display = "none";
          },450);

        })
      })

    }


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
      if(event.key === "Escape") {
        closeAllModals();
      }
    });
  });

 pullLocalStorage();
  // function to set up local storage 
  function populateLocalStorage() {
    localStorage.setItem("gameImg", selectedGameImg);
    localStorage.setItem("gameName", selectedGameName);
    localStorage.setItem("gameId", selectedGameId);
  }

    function pullLocalStorage() {
     var storedGameImg = localStorage.getItem("gameImg");
     var storedGameName = localStorage.getItem("gameName");
     var storedGameId = localStorage.getItem("gameId");
     
     if (storedGameId === null) {
      return;
     }
     selectedGameImg = storedGameImg;
     selectedGameName = storedGameName;
     selectedGameId = storedGameId;
     createCurrentGameCard();
     getAchievments();
    }

     
    function createCurrentGameCard (){
      var gameCardsHolder = document.createElement('div')
          gameCardsHolder.classList = "columns is-centered ml-1"
          selectedGameDiv.appendChild(gameCardsHolder);
        

          var gameCard = document.createElement('div')
          gameCard.setAttribute("date-gameID", selectedGameId)
          gameCard.classList = "column achievement-box mycard"
          gameCardsHolder.appendChild(gameCard)

          var outterGameImgHolder = document.createElement('div')
          outterGameImgHolder.classList = "card-iamge"
          gameCard.appendChild(outterGameImgHolder)
      
          var gameImgHolder = document.createElement('figure')
          gameImgHolder.classList = "image is-4by3"
          outterGameImgHolder.appendChild(gameImgHolder)
      
          var gameImg = document.createElement('img')
          gameImg.classList = "game-img"
          gameImg.src = selectedGameImg
          gameImgHolder.appendChild(gameImg)
      
          var gameNameHolder = document.createElement('div')
          gameCard.appendChild(gameNameHolder)
      
          var gameName = document.createElement('p')
          gameName.classList = "game-title has-text-centered py-1 mt-2"
          gameName.textContent = selectedGameName
          gameNameHolder.appendChild(gameName)

          var currentGameTag = document.createElement('p')
          currentGameTag.textContent = "Current Game"
          currentGameTag.classList = "game-search-btn"
          currentGameTag.style = "color: #74cc2b"
          selectedGameDiv.appendChild(currentGameTag)

          searchBoxHolderDiv.classList.add("columns", "is-vcentered")
          searchGameBoxDiv.classList.add("column")
          
          loadMoreDiv.innerHTML = ""
          gameSearchCards.innerHTML = ""
    }
     
