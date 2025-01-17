console.log("welcome to Spotify");

//Initialize the variables
let songIndex = 1;
let audioElement = new Audio(`songs/${songIndex}.mp3`);
let masterPlay = document.getElementById("master-play");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.querySelector("#gif");
let songItems = document.querySelectorAll(".songItem");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let songInfo = document.querySelector(".songInfo");
let songItemPlay = document.querySelectorAll(".songItemPlay");
let masterSong = document.querySelector(".masterSong");
let durationspan = document.getElementsByClassName("end-time");
let playIndex;
//Array of songs
let songs = [
    { songName: "Sahiba", songPath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Angaaron", songPath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Haan ke haan", songPath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Millionaire", songPath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Kissik", songPath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabb varga", songPath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Tainu khabar nahi", songPath: "songs/7.mp3", coverPath: "covers/7.webp" },
    { songName: "Feelings", songPath: "songs/8.mp3", coverPath: "covers/8.jpg" },
];

// function for formate song duration
function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

let audio = new Audio(`songs/${songIndex}.mp3`);
audio.addEventListener("loadedmetadata", () => {
    // Update the duration once metadata is loaded
    durationspan[0].innerText = formatDuration(audio.duration);
});

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song-title")[0].innerText = songs[i].songName;
    let audio = new Audio(`songs/${i + 1}.mp3`);
    audio.addEventListener("loadedmetadata", () => {
        // Update the duration once metadata is loaded
        element.getElementsByClassName("songlistplay")[0].innerText = formatDuration(audio.duration);
    });
});

//handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        document.getElementById(`${songIndex}`).classList.remove("fa-circle-play");
        document.getElementById(`${songIndex}`).classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        let audio = new Audio(`songs/${songIndex}.mp3`);
        audio.addEventListener("loadedmetadata", () => {
            // Update the duration once metadata is loaded
            durationspan[0].innerText = formatDuration(audio.duration);
        });
    } else {
        audioElement.pause();
        document.getElementById(`${songIndex}`).classList.remove("fa-circle-pause")
        document.getElementById(`${songIndex}`).classList.add("fa-circle-play")
        document.getElementById("1").classList.remove("fa-circle-pause");
        document.getElementById("1").classList.add("fa-circle-play");
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        gif.style.opacity = 0;
    }
});

//Listen to events
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("input", () => {
    const duration = audioElement.duration;
    audioElement.currentTime = (myProgressBar.value * duration) / 100;

});
let xyz ="fa-circle-play";

const makeAllPlay = () => {
    songItemPlay.forEach((element) => {
       
        if (audioElement.play || audioElement.currentTime != 0 ){
            if (element) {
                let idValue = element.id;
                let idAsInt = parseInt(idValue, 10); 
                if (songIndex !=idAsInt) {
                    playIndex=songIndex;
                    element.classList.remove("fa-circle-pause");
                    element.classList.add("fa-circle-play");
                    console.log(playIndex,songIndex);
                    
                }
            }
            
        }

    })
}


songItemPlay.forEach((element) => {
    element.addEventListener("click", (e) => {
        songIndex = parseInt(e.target.id);
        console.log(songIndex);
        
        
        makeAllPlay();
        if (audioElement.paused && audioElement.currentTime <= 0) {

            console.log("true",songIndex);
            audioElement.src = `songs/${songIndex}.mp3`;
            
            audioElement.play();
            audioElement.currentTime = 0;
            masterSong.innerText = songs[songIndex - 1].songName;
            gif.style.opacity = 1;
            e.target.classList.add("fa-circle-pause");
            e.target.classList.remove("fa-circle-play");
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            let audio = new Audio(`songs/${songIndex}.mp3`);
            audio.addEventListener("loadedmetadata", () => {
                // Update the duration once metadata is loaded
                durationspan[0].innerText = formatDuration(audio.duration);
            });
        } else if( audioElement.currentTime > 0){
            if (e.target.classList[3]===xyz) {
                console.log("playindex = songindex",songIndex,playIndex);
                console.log(e.target.classList[3]);
                
                audioElement.src = `songs/${songIndex}.mp3`;
                audioElement.play();
                audioElement.currentTime = 0;
                masterSong.innerText = songs[songIndex - 1].songName;
                gif.style.opacity = 1;
                e.target.classList.add("fa-circle-pause");
                e.target.classList.remove("fa-circle-play");
                masterPlay.classList.remove("fa-circle-play");
                masterPlay.classList.add("fa-circle-pause");
                let audio = new Audio(`songs/${songIndex}.mp3`);
                audio.addEventListener("loadedmetadata", () => {
                    // Update the duration once metadata is loaded
                    durationspan[0].innerText = formatDuration(audio.duration);
                });
            } else {
                console.log("playindex != songindex");
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.pause();
            gif.style.opacity = 0;
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            masterPlay.classList.add("fa-circle-play");
            masterPlay.classList.remove("fa-circle-pause");
            }
            
        }else{
            audioElement.pause();
            console.log("false");
            
            gif.style.opacity = 0;
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            masterPlay.classList.add("fa-circle-play");
            masterPlay.classList.remove("fa-circle-pause");

        }

    });
});

next.addEventListener("click", (e) => {
    // Safely handle the current song element
    const currentElement = document.getElementById(`${songIndex}`);
    if (currentElement) {
        currentElement.classList.remove("fa-circle-pause");
        currentElement.classList.add("fa-circle-play");
    }

    let nextIndex = songIndex + 1;
    if (nextIndex > 8) {
        nextIndex = 1;
        songIndex = 0;
    } else {
        nextIndex = songIndex + 1;
    }
    const nextElement = document.getElementById(`${nextIndex}`);
    if (nextElement) {
        nextElement.classList.remove("fa-circle-play");
        nextElement.classList.add("fa-circle-pause");
    }

    // Update master song text

    masterSong.innerText = songs[songIndex].songName;
    songIndex = nextIndex;

    //Play the audio
    audioElement.src = `songs/${nextIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;

    if (masterPlay.classList.contains("fa-circle-play")) {
        masterPlay.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
    }
    let audio = new Audio(`songs/${songIndex}.mp3`);
    audio.addEventListener("loadedmetadata", () => {
        // Update the duration once metadata is loaded
        durationspan[0].innerText = formatDuration(audio.duration);
    });
});

previous.addEventListener("click", (e) => {
    // Safely handle the current song element
    const currentElement = document.getElementById(`${songIndex}`);
    if (currentElement) {
        currentElement.classList.add("fa-circle-play");
        currentElement.classList.remove("fa-circle-pause");
    }

    let previousIndex = songIndex - 1;
    if (previousIndex <= 0) {
        previousIndex = 8;
        const previousElwmwnt = document.getElementById(`${previousIndex}`);
        if (previousElwmwnt) {
            previousElwmwnt.classList.remove("fa-circle-play");
            previousElwmwnt.classList.add("fa-circle-pause");
        }
        songIndex = 1;

    } else {
        const previousElwmwnt = document.getElementById(`${previousIndex}`);
        if (previousElwmwnt) {
            previousElwmwnt.classList.remove("fa-circle-play");
            previousElwmwnt.classList.add("fa-circle-pause");
        }


    }


    // // Update master song text

    songIndex = previousIndex;

    masterSong.innerText = songs[songIndex - 1].songName;
    //Play the audio
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    if (masterPlay.classList.contains("fa-circle-play")) {
        masterPlay.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
    }
    let audio = new Audio(`songs/${songIndex}.mp3`);
    audio.addEventListener("loadedmetadata", () => {
        // Update the duration once metadata is loaded
        durationspan[0].innerText = formatDuration(audio.duration);
    });
});



