const selects = document.querySelectorAll("select");
const container = document.querySelector(".content-box");
const span = document.getElementById("mostrar-hora");
const btnAlarme = document.getElementById("alarme");

let alarmTime;
(isAlarmeSet = false),
  (ringtone = new Audio("/ringtone/alarm_clockwav-14477.mp3"));

for (let i = 24; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selects[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selects[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 1; i >= 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${ampm}">${ampm}</option>`;
  selects[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(function time() {
  let today = new Date();
  let hrs = today.getHours();
  let mnts = today.getMinutes();
  ampm = "AM";

  hrs = hrs < 10 ? "0" + hrs : hrs;
  mnts = mnts < 10 ? "0" + mnts : mnts;

  if (hrs >= 12) {
    ampm = "PM";
  }

  let total = `${hrs}:${mnts} ${ampm}`;
  span.innerText = total;

  if (alarmTime == `${hrs}:${mnts} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

function startAlarme() {}

btnAlarme.addEventListener("click", () => {
  if (isAlarmeSet) {
    alarmTime = "";
    ringtone.pause();
    container.classList.remove("disable");
    btnAlarme.innerText = " set alarme";
    return isAlarmeSet = false;
  }

  let time = `${selects[0].value}:${selects[1].value} ${selects[2].value}`;
  if (
    time.includes("Horas") ||
    time.includes("Minutos") ||
    time.includes("AM/PM")
  ) {
    return alert("Por favor, insira um horário!");
  }
  isAlarmeSet = true;
  alarmTime = time;
  container.classList.add("disable");
  btnAlarme.innerText = " Limpar alarme";
});
