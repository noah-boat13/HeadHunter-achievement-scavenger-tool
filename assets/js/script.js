const ytKey = "AIzaSyDLxdkAoPEq_7O3GIEVsz7vhGPmt1ffXtY"

const rawgKey = "3aa9c76d2f81440cb15bd3f113bf0db5"

var ytURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=skyrim%20how%20to%20get%20dragon%20rider%20achievement&key=AIzaSyDLxdkAoPEq_7O3GIEVsz7vhGPmt1ffXtY"

fetch("https://api.rawg.io/api/games?key=3aa9c76d2f81440cb15bd3f113bf0db5&search=skyrim").then(res => res.json()).then(data=> {
    console.log(data);
})

fetch("https://api.rawg.io/api/games/5679/achievements?key=3aa9c76d2f81440cb15bd3f113bf0db5&page=1&page_size=40").then(res => res.json()).then(data=> {
    console.log(data);
})

