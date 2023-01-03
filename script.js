const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const currTime = document.querySelector(".currTime");
const durTime = document.querySelector(".durTime");

const songs = [
  ["Ferris Wheel", "Imagine Dragon"],
  ["Wild", "Monogem"],
  ["Believer", "Imagine Dragon"],
];

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song[0];
  artist.innerText = song[1];
  audio.src = `music/${song[0]}.mp3`;
  cover.src = `image/${song[0]}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPresent = (currentTime / duration) * 100;
  progress.style.width = `${progressPresent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
  let min = Math.floor(time / 60);
  min = min < 10 ? `0${min}` : min;
  let sec = Math.floor(time % 60);
  sec = sec < 10 ? `0${sec}` : sec;

  return `${min} : ${sec}`;
}

function updateTime(e) {
  const {duration, currentTime} = e.srcElement;
  currTime.innerHTML = isNaN(currentTime) === true? '00:00' : formatTime(currentTime);
  durTime.innerHTML = isNaN(duration) === true? '00:00' : formatTime(duration);
  console.log(durTime);
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

audio.addEventListener("timeupdate", updateTime);
