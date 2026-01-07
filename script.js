function openfeature() {
  var allelemss = document.querySelectorAll(".elem");
  var fullelempage = document.querySelectorAll(".fullelems");
  var allfullelemsbackbtn = document.querySelectorAll(".fullelems .back");

  allelemss.forEach(function (elem, index) {
    elem.addEventListener("click", function () {
      // console.log("hello");
      // console.log(allfullelems[elem.id]);
      fullelempage[elem.id].style.display = "block";
    });
  });

  allfullelemsbackbtn.forEach(function (back, index) {
    back.addEventListener("click", function () {
      // console.log(back.id);
      fullelempage[back.id].style.display = "none";
    });
  });
}
openfeature();

function todofunction() {
  let form = document.querySelector(".addtask form");
  let taskinput = document.querySelector(".addtask #task-input");
  let taskdetailsinput = document.querySelector(".addtask textarea");
  let taskcheckbox = document.querySelector(".addtask form #check");

  var Currenttask = [];
  // var abc= localStorage.getItem("Currenttask");

  if (localStorage.getItem("Currenttask")) {
    // console.log("task list is full");
    Currenttask = JSON.parse(localStorage.getItem("Currenttask"));
  } else {
    console.log("task list is empty");
  }

  function rendertask() {
    var alltask = document.querySelector(".alltask");

    var sum = "";
    Currenttask.forEach(function (elem, indx) {
      // console.log(elem);
      sum =
        sum +
        `<div class="task">
                    <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
                    <button id=${indx}>Mark as Completed</button>
                </div>`;
    });

    // console.log(sum);

    alltask.innerHTML = sum;
    localStorage.setItem("Currenttask", JSON.stringify(Currenttask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        // console.log("clicked");
        Currenttask.splice(btn.id, 1);
        rendertask();
      });
    });
  }

  rendertask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // console.log("hello");
    // console.log(taskinput.value);
    // console.log(taskdetailsinput.value);

    // console.log(taskcheckbox.checked);
    // let newtask = document.createElement("div");
    // newtask.classList.add("task");
    // Currenttask.push({task:taskinput.value,details:taskdetailsinput.value,imp:taskcheckbox.checked})
    // console.log(Currenttask);
    Currenttask.push({
      task: taskinput.value,
      details: taskdetailsinput.value,
      imp: taskcheckbox.checked,
    });
    // taskcheckbox.checked = false;
    // taskinput.value = "";
    // taskdetailsinput.value = "";

    form.reset();
    rendertask();
    //   location.reload();
  });

  // localStorage.clear();
}
todofunction();

function dayplanner() {
  var dayplandata = JSON.parse(localStorage.getItem("dayplandata")) || {};

  var hours = Array.from(
    { length: 18 },
    (elem, indx) => `${6 + indx}:00 - ${7 + indx}:00`
  );

  var wholedaysum = "";
  hours.forEach(function (elem, index) {
    var savedata = dayplandata[index] || "";

    wholedaysum =
      wholedaysum +
      `<div class="day-planner-time">
                <p>${elem}</p>
                <input id="${index}" type="text" placeholder="..." value = ${savedata}>
            </div>`;
  });

  document.querySelector(".day-planner").innerHTML = wholedaysum;
  var dayplannerinput = document.querySelectorAll(".day-planner input");

  dayplannerinput.forEach(function (elem) {
    // console.log(elem);
    elem.addEventListener("input", function () {
      // console.log(elem.id);
      dayplandata[elem.id] = elem.value;
      // console.log(dayplandata);
      localStorage.setItem("dayplandata", JSON.stringify(dayplandata));
    });
  });
}
dayplanner();

function motivation() {
  var motivationalquote = document.querySelector(".motivation2 h2");
  var motivationauthor = document.querySelector(".motivation3 h2");

  async function fetchquote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    // console.log( await response.json());
    let data = await response.json();
    // console.log(data.content);
    motivationalquote.innerHTML = data.quote;
    motivationauthor.innerHTML = data.author;
  }

  fetchquote();
}
motivation();

function pomodoro() {
  let totalseconds = 1490;
  // console.log(totalseconds);

  let timer = document.querySelector(".pomodo-timer h3");
  var start = document.querySelector(".pomodo-timer .start-time");
  var pause = document.querySelector(".pomodo-timer .pause-time");
  var reset = document.querySelector(".pomodo-timer .reset-time");
  var session = document.querySelector(".Pomodo-full-page .session");

  var isworksession = true;
  let timerintervel;

  function updatetime() {
    let minutes = Math.floor(totalseconds / 60);
    // console.log(minutes);
    let seconds = totalseconds % 60;
    // console.log(seconds);
    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
      seconds
    ).padStart("2", "0")}`;
  }

  function starttimer() {
    clearInterval(timerintervel);

    if (isworksession) {
      timerintervel = setInterval(() => {
        if (totalseconds > 0) {
          totalseconds--;
          updatetime();
        } else {
          isworksession = false;
          clearInterval(timerintervel);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break ";
          session.style.backgroundColor = "blue";
          totalseconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerintervel = setInterval(() => {
        if (totalseconds > 0) {
          totalseconds--;
          updatetime();
        } else {
          isworksession = true;
          clearInterval(timerintervel);
          session.innerHTML = "Break Timing";
          session.style.backgroundColor = "green";
          timer.innerHTML = "25:00";
          totalseconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pausetimer() {
    clearInterval(timerintervel);
  }

  function resettimer() {
    clearInterval(timerintervel);
    totalseconds = 1490;
    updatetime();
  }

  start.addEventListener("click", starttimer);
  pause.addEventListener("click", pausetimer);
  reset.addEventListener("click", resettimer);
}
pomodoro();

function weatherapi() {
  var header1date = document.querySelector(".header1 h1");
  var hearderdatey = document.querySelector(".header1 h2");
  var header2temp = document.querySelector(".header2 h2");
  var header2weat = document.querySelector(".header2 h4");
  var header2pre = document.querySelector(".header2 .pree");
  var header2humi = document.querySelector(".header2 .humi");
  var header2wind = document.querySelector(".header2 .wind");

  let apikey = "a543bae9cff244788b6190500260501";
  let city = "new delhi";

  var data = null;

  async function weatherapicall() {
    let response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`
    );
    data = await response.json();
    // console.log(data.current.temp_c);
    let weath = data.current.condition.text;
    let humidity = data.current.humidity;
    let wind = data.current.wind_kph;
    let pressure = data.current.pressure_mb;

    let temp = data.current.temp_c;
    // console.log(temp);

    header2temp.innerHTML = `${temp}°C`;
    header2weat.innerHTML = `${weath}`;
    header2pre.innerHTML = `Preciption: ${pressure}`;
    header2humi.innerHTML = `Humidity: ${humidity}%`;
    header2wind.innerHTML = `Wind ${wind} km/h`;
  }

  weatherapicall();

  function timedate() {
    const totaldayofweek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];
    const totalmonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes().toString().padStart(2, "0");
    var seconds = date.getSeconds().toString().padStart(2, "0");
    var dayofweek = totaldayofweek[date.getDay()];
    var datee = date.getDate();
    var month = totalmonth[date.getMonth()];
    var year = date.getFullYear();

    hearderdatey.innerHTML = `${datee} ${month} ${year}`;

    if (hours >= 12) {
      var displayHours = hours > 12 ? hours - 12 : 12;
      header1date.innerHTML = ` ${dayofweek} , ${displayHours}:${minutes}:${seconds} PM `;
    } else {
      var displayHours = hours === 0 ? 12 : hours;
      header1date.innerHTML = ` ${dayofweek} , ${displayHours}:${minutes}:${seconds} AM `;
    }
  }

  setInterval(() => {
    timedate();
  }, 1000);
}
weatherapi();

var theme = document.querySelector(".theme i");
var roott = document.documentElement;

var flag = 0;
theme.addEventListener("click", function () {
  if (flag == 0) {
    roott.style.setProperty("--bg-main", "rgb(2, 15, 58)");
    roott.style.setProperty("--bg-nav", "#060771");
    flag = 1;
  } else if (flag == 1) {
    roott.style.setProperty("--bg-main", "#76153C");
    roott.style.setProperty("--bg-nav", "#5A0E24");
    flag = 2;
  } else if (flag == 2) {
    roott.style.setProperty("--bg-main", "#57595B");
    roott.style.setProperty("--bg-nav", "#452829");
    flag = 3;
  } else if (flag == 3) {
    roott.style.setProperty("--bg-main", "#A1BC98");
    roott.style.setProperty("--bg-nav", "#778873");
    flag = 4;
  } else if (flag == 4) {
    roott.style.setProperty("--bg-main", "#D35823");
    roott.style.setProperty("--bg-nav", "#814906");
    flag = 0;
  }
});
