/** Date */

const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

function formatTime(date) {
    const hours12 = date.getHours()%12||12;
    const minutes = date.getMinutes();
    const isAM = date.getHours() <12;

    return `${hours12.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}${isAM? "AM":"PM"}`;
}

function formatDate(date) {
    const DAYS = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const MONTHS = [
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
      "December"
    ];
  
    date.getDay()
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

setInterval(() => {
    const now = new Date();
    timeElement.textContent = formatTime(now);
    dateElement.textContent = formatDate(now);
  }, 1000);


/** Read more function */

const readMore= document.querySelector(".readmorebutton");
const intro = document.querySelectoor(".intro");

readMore.addEventListener("click",(e)=>{
  intro.classList.toggle("showmore");
  if(readMore.innerText === "Welcome to my page, Click to read more."){
    readMore.innerText = "Click to read less.";
  }else{
    readMore.innerText = "Welcome to my page, Click to read more.";
  }
});
