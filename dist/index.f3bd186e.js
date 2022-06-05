//---------------=========== SIDEBAR NAVIGATION JS ========------------------------//
// ---------- CODE REFERENCE: https://www.codinglabweb.com/2022/03/admin-dashboard-panel-html-css-javascript.html ----- //
const body = document.querySelector("body"), modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") body.classList.toggle("dark");
let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") sidebar.classList.toggle("close");
modeToggle.addEventListener("click", ()=>{
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) localStorage.setItem("mode", "dark");
    else localStorage.setItem("mode", "light");
});
sidebarToggle.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) localStorage.setItem("status", "close");
    else localStorage.setItem("status", "open");
});
//-----------================ KANBAN JS =============---------------------------//
// --------------CODE REFERENCE: https://github.com/Basir-PD/100-Projects-HTML-CSS-JavaScript/tree/master/10%20-%20Create%20Todo%20App%20(Drag%20&%20Drop)------//
const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;
todos.forEach((todo)=>{
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
});
function dragStart() {
    draggableTodo = this;
    setTimeout(()=>{
        this.style.display = "none";
    }, 0);
    console.log("dragStart");
}
function dragEnd() {
    draggableTodo = null;
    setTimeout(()=>{
        this.style.display = "block";
    }, 0);
    console.log("dragEnd");
}
all_status.forEach((status)=>{
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
});
function dragOver(e) {
    e.preventDefault();
//   console.log("dragOver");
}
function dragEnter() {
    this.style.border = "1px dashed #ccc";
    console.log("dragEnter");
}
function dragLeave() {
    this.style.border = "none";
    console.log("dragLeave");
}
function dragDrop() {
    this.style.border = "none";
    this.appendChild(draggableTodo);
    console.log("dropped");
}
/* modal */ const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");
btns.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        document.querySelector(btn.dataset.targetModal).classList.add("active");
        overlay.classList.add("active");
    });
});
close_modals.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        const modal = btn.closest(".modal");
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
});
window.onclick = (event)=>{
    if (event.target == overlay) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal)=>modal.classList.remove("active")
        );
        overlay.classList.remove("active");
    }
};
/* create todo  */ const todo_submit = document.getElementById("todo_submit");
todo_submit.addEventListener("click", createTodo);
function createTodo() {
    const todo_div = document.createElement("div");
    const input_val = document.getElementById("todo_input").value;
    const txt = document.createTextNode(input_val);
    todo_div.appendChild(txt);
    todo_div.classList.add("todo");
    todo_div.setAttribute("draggable", "true");
    /* create span */ const span = document.createElement("span");
    const span_txt = document.createTextNode("\u00D7");
    span.classList.add("close");
    span.appendChild(span_txt);
    todo_div.appendChild(span);
    no_status.appendChild(todo_div);
    span.addEventListener("click", ()=>{
        span.parentElement.style.display = "none";
    });
    //   console.log(todo_div);
    todo_div.addEventListener("dragstart", dragStart);
    todo_div.addEventListener("dragend", dragEnd);
    document.getElementById("todo_input").value = "";
    todo_form.classList.remove("active");
    overlay.classList.remove("active");
}
const close_btns = document.querySelectorAll(".close");
close_btns.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        btn.parentElement.style.display = "none";
    });
});
/*---------========= STOPWATCH JS ======-----------------------*/ /* -------===== CODE REFERENCE: https://github.com/TylerPottsDev/yt-js-stopwatch ======----------- */ // Global variables
const time_el = document.querySelector('.watch .time');
const start_btn = document.getElementById('start');
const stop_btn = document.getElementById("stop");
const reset_btn = document.getElementById("reset");
let seconds = 0;
let interval = null;
// Event listeners
start_btn.addEventListener('click', start);
stop_btn.addEventListener("click", stop);
reset_btn.addEventListener("click", reset);
// Update the timer
function timer() {
    seconds++;
    // Format our time
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - hrs * 3600) / 60);
    let secs = seconds % 60;
    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = "0" + mins;
    if (hrs < 10) hrs = "0" + hrs;
    time_el.innerText = `${hrs}:${mins}:${secs}`;
}
function start() {
    if (interval) return;
    interval = setInterval(timer, 1000);
}
function stop() {
    clearInterval(interval);
    interval = null;
}
function reset() {
    stop();
    seconds = 0;
    time_el.innerText = '00:00:00';
}
//-----========== MUSIC PLAYER JS ======-------------//
//-------------- CODE REFERENCE: https://github.com/kaizhelam/Music-Player -------------//
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
const music_list = [
    {
        img: 'public/images/darari.jpeg',
        name: 'DARARI',
        artist: 'TREASURE',
        music: 'public/music/darari.mp3'
    },
    {
        img: 'public/images/dynamite.jpeg',
        name: 'DYNAMITE',
        artist: 'BTS',
        music: 'public/music/dynamite.mp3'
    },
    {
        img: 'public/images/polaroidlove.jpeg',
        name: 'Polaroid Love',
        artist: 'ENHYPHEN',
        music: 'public/music/polaroidlove.mp3'
    },
    {
        img: 'public/images/shivers.jpeg',
        name: 'Shivers',
        artist: 'Ed Sheeran',
        music: 'public/music/shivers.mp3'
    }
];
loadTrack(track_index);
function loadTrack(track_index1) {
    clearInterval(updateTimer);
    reset();
    curr_track.src = music_list[track_index1].music;
    curr_track.load();
    track_art.style.backgroundImage = "url(" + music_list[track_index1].img + ")";
    track_name.textContent = music_list[track_index1].name;
    track_artist.textContent = music_list[track_index1].artist;
    now_playing.textContent = "Playing music " + (track_index1 + 1) + " of " + music_list.length;
    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}
function random_bg_color() {
    let hex = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e'
    ];
    let a1;
    function populate(a) {
        for(let i = 0; i < 6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';
    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) track_index += 1;
    else if (track_index < music_list.length - 1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    } else track_index = 0;
    loadTrack(track_index);
    playTrack();
}
function prevTrack() {
    if (track_index > 0) track_index -= 1;
    else track_index = music_list.length - 1;
    loadTrack(track_index);
    playTrack();
}
function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
        if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
        if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
        if (durationMinutes < 10) durationMinutes = "0" + durationMinutes;
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}
//--------============== POMODORO JS =======-------------//
//-------------- CODE REFERENCE: https://codepen.io/dcode-software/pen/XWgyOpg --------------//
class Timer {
    constructor(root){
        root.innerHTML = Timer.getHTML();
        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset")
        };
        this.interval = null;
        this.remainingSeconds = 0;
        this.el.control.addEventListener("click", ()=>{
            if (this.interval === null) this.start();
            else this.stop();
        });
        this.el.reset.addEventListener("click", ()=>{
            const inputMinutes = prompt("Enter number of minutes:");
            if (inputMinutes < 60) {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
            }
        });
    }
    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds1 = this.remainingSeconds % 60;
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds1.toString().padStart(2, "0");
    }
    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }
    start() {
        if (this.remainingSeconds === 0) return;
        this.interval = setInterval(()=>{
            this.remainingSeconds--;
            this.updateInterfaceTime();
            if (this.remainingSeconds === 0) this.stop();
        }, 1000);
        this.updateInterfaceControls();
    }
    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
    }
    static getHTML() {
        return `
              <span class="timer__part timer__part--minutes">00</span>
              <span class="timer__part">:</span>
              <span class="timer__part timer__part--seconds">00</span>
              <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                  <span class="material-icons">play_arrow</span>
              </button>
              <button type="button" class="timer__btn timer__btn--reset">
                  <span class="material-icons">timer</span>
              </button>
          `;
    }
}
new Timer(document.querySelector(".timer"));

//# sourceMappingURL=index.f3bd186e.js.map
