import { API_KEY } from "./key.js";

const apiLocalUrl = "http://api.openweathermap.org/geo/1.0/direct?limit=1&q=";
const apiTempoUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pt_br"

const buscaInput = document.querySelector(".busca input");
const buscaBtn = document.querySelector(".busca button");
const iconeTempo = document.querySelector(".tempo-icon");

async function checarTempo(cidade) {
    const responseLocal = await fetch(apiLocalUrl + cidade + `&APPID=` + API_KEY);

    try {
        var dataLocal = await responseLocal.json();

        var latitude = dataLocal[0].lat;
        var longitude = dataLocal[0].lon;

        const responseTempo = await fetch(apiTempoUrl + `&lat=` + latitude + `&lon=` + longitude + `&APPID=` + API_KEY);
        var dataTempo = await responseTempo.json();

        document.querySelector(".cidade").innerHTML = dataTempo.name;
        document.querySelector(".temp").innerHTML = Math.round(dataTempo.main.temp) + "°C";
        document.querySelector(".umidade").innerHTML = dataTempo.main.humidity + "%";
        document.querySelector(".vento").innerHTML = dataTempo.wind.speed + " km/h";
        iconeTempo.src = `https://openweathermap.org/img/wn/` + dataTempo.weather[0].icon + `@2x.png`;
        iconeTempo.alt = dataTempo.weather[0].description;

        document.querySelector(".tempo").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".tempo").style.display = "none";
    }
}

buscaBtn.addEventListener("click", () => {
    checarTempo(buscaInput.value);
});

