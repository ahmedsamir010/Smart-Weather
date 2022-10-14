var searchInput = document.getElementById("searchInput");
let htmlCode="";
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let d = new Date();
let day = days[d.getDay()];
let tomorrow = d.getDay()+1;
let last = d.getDay()+2;
if(d.getDay()==5)
{
   last = 0;
}
if(d.getDay()==6)
{
    tomorrow=0;
    last=1
}
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const D = new Date();
let month = months[D.getMonth()];

getData();
async function getData(country="cairo")
{

    let link = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=a64de2fe537640f1b4f14236221410&q=${country}&days=3`)
    let data = await link.json();   
    let nextDay = data.forecast.forecastday[1];
    let lastDay = data.forecast.forecastday[2];
            htmlCode =` 
            <div class="col-lg-4 mt-3" >
            <div class="weather h-100" id="item-one">
              <div class="weather-header d-flex justify-content-between">
                <div class="today">${day}</div>

                <div class="date">${(d.getDate())}  ${month}</div>
              </div>

              <div class="weather-content">
                <div class="city">${data.location.name}  -  ${data.location.country}</div>

                <div class="degree">${data.current.temp_c}<sup>°</sup>C</div>

                <div class="weather-icon">
                  <img src="https:${data.current.condition.icon}" alt="" />
                </div>

                <div class="edit pb-3">${data.current.condition.text}</div>

                <span
                  ><img
                    src="images/icon-umberella.png"
                    alt=""
                    class="p-1"
                  />20%</span
                >
                <span>
                  <img
                    src="images/icon-wind.png"
                    alt=""
                    class="p-1"
                  />18km/h</span
                >
                <span
                  ><img
                    src="images/icon-compass.png"
                    alt=""
                    class="p-1"
                  />East</span
                >
              </div>
            </div>
          </div>
`

            htmlCode += `
            <div class="col-lg-4 mt-3">
            <div class="weather h-100 two">
              <div class="weather-header" id="weather-two">
                <div class="today text-center">${days[tomorrow]}</div>
              </div>

              <div class="weather-content" id="item-two">
                <div class="weather-icon text-center">
                  <img src="https:${nextDay.day.condition.icon}" alt="" />
                </div>

                <div class="degree-two text-center">${nextDay.day.maxtemp_c}<sup>°</sup>C</div>
                <div class="text-center">
                  <small>${nextDay.day.mintemp_c}<sup>°</sup></small>
                </div>

                <div class="edit text-center mt-3">${nextDay.day.condition.text}</div>
              </div>
            </div>
          </div>
            `            
            htmlCode += ` 
            <div class="col-lg-4 mt-3">
            <div class="weather h-100 three">
              <div class="weather-header">
                <div class="today text-center">${days[last]}</div>
              </div>

              <div class="weather-content">
                <div class="weather-icon text-center">
                  <img src="https:${lastDay.day.condition.icon}" alt="" />
                </div>

                <div class="degree-two text-center">${lastDay.day.maxtemp_c}<sup>°</sup>C</div>
                <div class="text-center">
                  <small>${lastDay.day.mintemp_c}<sup>o</sup></small>
                </div>

                <div class="edit text-center mt-3">${lastDay.day.condition.text}</div>
              </div>
            </div>
          </div>

            `            
        document.querySelector("#myRow").innerHTML=htmlCode;
}

searchInput.addEventListener("input",function(){
    let nameCountry = searchInput.value;
    getData(nameCountry);
})




