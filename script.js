const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song titles
const songs = ['oldtownroad', 'moglii', 'vampireweekend']

// Keep track of songs
let songIndex = 2

// Initally load song into DOM
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
    title.innerText = song
    audio.src =`music/${song}.mp3`
    cover.src =`images/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong() {
    // when we click < we want to decrease the index by 1, aka go back a song
    songIndex--

    // if index is less than 0, aka past the first song, we want it to loop back around
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    songIndex++

    // if we're at the last song, set index to 0, aka loops back to the first song at [0]
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration * 100) // this gives us a decimal
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    // we click to get the total width
    const width = this.clientWidth
    // we want to get the width at where we click on the x-axis
    const clickX = e.offsetX
    const duration = audio.duration

    // set the current time to wherever we click
    audio.currentTime = (clickX / width) * duration
}

// Event Listeners
// check whether song is playing or not
playBtn.addEventListener('click', () =>{
    const isPlaying = musicContainer.classList.contains('play')

    // if it is playing, clicking will cause song to pause
    if(isPlaying) {
        pauseSong()
    // if it is not playing, clicking will cause song to play
    } else {
        playSong()
    }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)