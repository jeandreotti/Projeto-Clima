document.querySelector('.busca').addEventListener('submit', async(event)=>{
    event.preventDefault();

    let input =document.querySelector('#searchInput').value;
    if(input!==''){
        showWarning('Carregando...')
    }

//let url =`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(input)},&limit=1&appid=bf866371d57cbfdba200dde031558ce2&units=metric&lang=pt_br`

let url =`http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=bf866371d57cbfdba200dde031558ce2&units=metric&lang=pt_br`

let results = await fetch(url);
let json = await results.json();

if(json.cod == 200){
    clearInfo();
    showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
    });

}else{
    clearInfo();
    showWarning('não encontrada localização')
}

console.log(encodeURI('rio de janeiro')) ;
});

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';

}

function showInfo(json){
    showWarning('');
    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').innerHTML = ('src' , `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

