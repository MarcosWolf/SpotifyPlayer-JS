const title = document.getElementById('song-title');
const artist = document.getElementById('song-artist');
const album = document.getElementById('player-albumTop')
const music = document.querySelector('audio');
const image = document.getElementById('player-albumPortrait');
const favorite = document.getElementById('song-favorite');

const progressContainer = document.getElementById('song-trackbar');
const progress = document.getElementById('song-currentProgress');
const currentTimeEl = document.getElementById('song-currentTime');
const durationEl = document.getElementById('song-duration');

const previousTrack = document.getElementById('previousTrack');
const playTrack = document.getElementById('playTrack');
const nextTrack = document.getElementById('nextTrack');
const repeatTrack = document.getElementById('repeatTrack');

var sourceImage = document.getElementById("player-albumPortrait");
var sourceBg = document.getElementById("player-container");
var sourcePage = document.getElementById("page-container");

function checkTitleLenght() {
    var sourceMarquee = document.querySelector(".marquee span");
    
    if (title.innerHTML.length < 15) {
        sourceMarquee.style.animation = 'paused';
    } else {
        sourceMarquee.style.animation = 'marquee 15s linear infinite';
    }
    
}

function checkFavorite() {
    if (isFavorited == false) {
        favorite.src = `../assets/img/favorite.svg`;
    } else {
        favorite.src = `../assets/img/favoriteMarked.svg`;
    }
}

function toggleFavorite() {
    if (isFavorited == false) {
        favorite.src = `../assets/img/favoriteMarked.svg`;
        songs[songIndex].favorite = true;
        isFavorited = true;
    } else {
        favorite.src = `../assets/img/favorite.svg`;
        songs[songIndex].favorite = false;
        isFavorited = false;
    }
}

function changeBgColor() {
    if (sourceImage.complete) {
        var colorThief = new ColorThief();
        console.log(sourceBg.style.background = 'linear-gradient(0deg, rgba(42,42,42,1) 0%, rgba(' + colorThief.getColor(sourceImage) + ',1) 100%)');
        console.log(sourcePage.style.background = 'linear-gradient(0deg, rgba(42,42,42,0.3) 0%, rgba(' + colorThief.getColor(sourceImage) + ',0.3) 100%)');
    } else {
        console.log("Erro");
    }
}

function checkImagesLoaded() {
        changeBgColor();
}

async function loadImage(imageUrl) {
    let img;
    const imageLoadPromise = new Promise(resolve => {
        img = new Image();
        img.onload = resolve;
        img.src = imageUrl;
    });

    await imageLoadPromise;
    checkImagesLoaded();
    return img;
}

let songs = [
    {
        name: 'cartoon_whywelose',
        displayName: 'Why We Lose (feat. Coleman Trapp',
        artist: 'Cartoon, Coleman Trapp',
        album: 'NCS (NoCopyrightSounds) 2017',
        favorite: true,
    },
    {
        name: 'elektronomia_limitless',
        displayName: 'Limit Less',
        artist: 'Elektronomia',
        album: 'NCS (NoCopyrightSounds) 2017',
        favorite: false,
    },
    {
        name: 'annayvette_redline',
        displayName: 'Red Line',
        artist: 'Anna Yvette',
        album: 'NCS (NoCopyrightSounds) 2019',
        favorite: false,
    },
    {
        name: 'deafkev_invincible',
        displayName: 'Invincible',
        artist: 'DEAF KEV',
        album: 'NCS (NoCopyrightSounds) 2015',
        favorite: false,
    },
    {
        name: 'differentheaven_myheart',
        displayName: 'My Heart',
        artist: 'Different Heaven, EH!DE',
        album: 'NCS (NoCopyrightSounds) 2014',
        favorite: false,
    }
];

let isPlaying = false;
let isFavorited = false;

/*
 0 = false
 1 = repeat all
 2 = repeat 1 song
*/
let repeatState = 0;

function playSong(){
    isPlaying = true;
    playTrack.src = `../assets/img/pause.svg`;
    music.play();
}

function pauseSong(){
    isPlaying = false;
    playTrack.src = `../assets/img/play.svg`;
    //playBtn.setAttribute('title', 'Play');
    music.pause();
}

playTrack.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    album.textContent = song.album;
    music.src = `../assets/musics/${song.name}.mp3`;
    image.src = `../assets/covers/${song.name}.jpg`;
    loadImage(`../assets/covers/${song.name}.jpg`);
    isFavorited = song.favorite;
    checkFavorite();
    checkTitleLenght();
}

let songIndex = 0;

// Previous Song
function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(x) {
    if (repeatState != 2) {
        songIndex++;
        
        if (repeatState != 1) {
            if (songIndex > songs.length -1){
                songIndex = 0;
                loadSong(songs[songIndex]);
                pauseSong();
            } else {
                loadSong(songs[songIndex]);
                playSong();
            }
        } else {
            if (songIndex > songs.length -1){
                songIndex = 0;
            }

            loadSong(songs[songIndex]);
            playSong();
        }
    } else {
        if (music.ended) {
            loadSong(songs[songIndex]);
            playSong();
        } else {
            songIndex++;
            loadSong(songs[songIndex]);
            playSong();
            repeatState = 1;
            repeatTrack.src = `../assets/img/repeatAll.svg`;
        }
    }
}

// Repeat Track
function checkRepeatState() {
    repeatState++;

    if (repeatState == 0) {
        repeatTrack.src = `../assets/img/repeat.svg`;
    } else if (repeatState == 1) {
        repeatTrack.src = `../assets/img/repeatAll.svg`;
    } else {
        repeatTrack.src = `../assets/img/repeatOne.svg`;
    }

    if (repeatState > 2) {
        repeatState = 0;
        repeatTrack.src = `../assets/img/repeat.svg`;
    }
}


loadSong(songs[songIndex]);

function updateProgressBar(e) {
    const{duration, currentTime} = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

previousTrack.addEventListener('click', prevSong);
nextTrack.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

favorite.addEventListener('click', toggleFavorite);
repeatTrack.addEventListener('click', checkRepeatState);