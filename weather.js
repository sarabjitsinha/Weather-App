
//Creating Timer Function
setInterval(showTime, 1000);
function showTime () {
  let Sysdate = new Date()
  document.getElementById('time').innerHTML =
    'Time' + ' ' + Sysdate.toLocaleTimeString()
}


//Creating Evenetlistener for the Click event
document.getElementById('Weatherinfo').addEventListener(
  'click',
  function (e) {
    document.getElementById('geo_loc').style.display = 'none'
    document.getElementById('citycurr').style.display = 'none'
    document.getElementById('Weatherinfo').style.display = 'none'
    document.getElementById('Clear').classList.toggle('search')
    document.querySelector('.fun').classList.toggle('search')
    CurrentForecast()
    document
      .getElementById('citycurr')
      .addEventListener('beforeinput', function () {
        window.location.reload()
      })
  },
  { once: true }
)

//Creating Function for current weather

function CurrentForecast (possll=0) {
  setTimeout(() => {
    new Promise((resolve, reject) => {
      const Apikey = '485641ddb7034e1aa47160151241111'
      const CityVal = document.querySelector('input')
      let CityName = CityVal.value
      let apilink
      
       if (possll!=0 )  {
        CityName = possll
        apilink = `http://api.weatherapi.com/v1/current.json?key=${Apikey}&q=${CityName}&aqi=yes`
        document.getElementById('citycurr').style.display = 'none'
        document.getElementById('Weatherinfo').style.display = 'none'
        document.getElementById('geo_loc').style.display = 'none'
        document.getElementById('Clear').classList.toggle('search')
        document.querySelector('.fun').classList.toggle('search')
      }
       else 
       {
        apilink = `http://api.weatherapi.com/v1/current.json?key=${Apikey}&q=${CityName}&aqi=yes`
      }
      
      fetch(apilink)
        .then(resp => {
          if (resp.ok) {
            resolve(console.log('successful'))
            return resp.json()
          } 
          else {
            reject()
            {
              
             alert('Error!! Please check the name you have entered');
              
            }
          }
        })
        .then(resp1 => {
          const objofobj = resp1.current.condition
          let curcity = resp1.location.name
          let curloc = resp1.location.region
          document.querySelector(
            '#div2'
          ).innerHTML = `Current weather <br> ${curcity},<br> ${curloc}  `
          document
            .querySelector('#div2')
            .insertAdjacentHTML(
              'beforeend',
              `<li type="none">${objofobj['text']}</li>`
            )
          const icon = objofobj['icon']
          const weathericon = 'https:' + icon
          document
            .querySelector('#div2')
            .insertAdjacentHTML('beforeend', `<img src=${weathericon}></img>`)
          document
            .querySelector('#div2')
            .insertAdjacentHTML(
              'beforeend',
              `<li type="none">${resp1.current.temp_c} <sup>o</sup>C</li>`
            )
        })
        .catch(err =>{ 
          reject(err)
          document.querySelector('.fun').classList.toggle('search')
        })
          WeatherForecast(Apikey, CityName);     
    }); 
  }, 0)
}

//Creating window reload

document.querySelector('#Clear').addEventListener('click', function (e) {
  window.location.reload()
})

//Creating future prediction function

function WeatherForecast (Apikey, CityName) {
  
  const ForecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${Apikey}&q=${CityName}&days=3&aqi=yes&alerts=yes`
  fetch(ForecastUrl)
    .then(response => {
      if (response.ok) {
        SuccessData = response.json()
        return SuccessData
      } else {
        throw new Error('Unable to load data')
      }
    })
    .then(SuccessData => {
      document.getElementById('div1').style.backgroundColor="lime"
      document.getElementById('div1').innerHTML = 'Forecast for next 3 days'
      document.getElementById('div6').classList.toggle('search')  
    document.getElementById('div7').classList.toggle('search') 
    document.getElementById('div8').classList.toggle('search') 
    document.getElementById('div6').style.backgroundColor="indigo"
    document.getElementById('div7').style.backgroundColor="indigo"
    document.getElementById('div8').style.backgroundColor="indigo"  
      let countFd = SuccessData.forecast.forecastday.length
      let ForecastObj = SuccessData.forecast.forecastday
      let Forecast24hour
      let num = 3
      let num1 = 6
      for (let sd = 0; sd < countFd; sd++) {
        document.querySelector(`#div${num}`).style="border:2px solid orange;"
         document.querySelector(`#div${num}`).style.backgroundColor="darkslateblue"
        let FirstDay = SuccessData.forecast.forecastday[sd].date
        let ForeCondition =
          SuccessData.forecast.forecastday[sd].day.condition.text
        let Tempicon = SuccessData.forecast.forecastday[sd].day.condition.icon
        let icon = 'https:' + Tempicon
        let Maxtemp_c = SuccessData.forecast.forecastday[sd].day.maxtemp_c
        let Mintemp_c = SuccessData.forecast.forecastday[sd].day.mintemp_c
        document
          .querySelector(`#div${num}`)
          .insertAdjacentHTML('beforeend', `<div>Date: ${FirstDay}</div>`)
        document
          .querySelector(`#div${num}`)
          .insertAdjacentHTML(
            'beforeend',
            `<div style="color: lightgreen;">Condition: ${ForeCondition}</div>`
          )
        document
          .querySelector(`#div${num}`)
          .insertAdjacentHTML(
            'beforeend',
            `<div>Temperature: <br> <span style="color:Orange;">Max</span> ${Maxtemp_c} <sup>o</sup>C/<span style="color:violet;"> Min</span> ${Mintemp_c}<sup>o</sup>C </div>`
          )
        document
          .querySelector(`#div${num}`)
          .insertAdjacentHTML('beforeend', `<img src=${icon}> </img>`)
        document
          .querySelector(`#div${num}`)
          .insertAdjacentHTML('beforeend', `<div style="color:red;"> Air Quality </div>`)
        ForecastObj = SuccessData.forecast.forecastday[sd].day.air_quality
        Forecast24hour = SuccessData.forecast.forecastday[sd].hour

        let frct = 0
        for (frct in Forecast24hour) {
          if (frct % 8 == 0) {
            let icondata = 'https:' + Forecast24hour[frct].condition.icon
            document
              .querySelector(`#div${num1}`)
              .insertAdjacentHTML(
                'beforeend',
                `<li type="none"><span style="color:magenta;">Date/Time:</span> ${Forecast24hour[frct].time}</li>`
              )
            document
              .querySelector(`#div${num1}`)
              .insertAdjacentHTML(
                'beforeend',
                `<li type="none">Condition:<span style="color:lime;"> ${Forecast24hour[frct].condition.text}</span></li>`
              )
            document
              .querySelector(`#div${num1}`)
              .insertAdjacentHTML('beforeend', `<img src="${icondata}"> </img>`)
            document
              .querySelector(`#div${num1}`)
              .insertAdjacentHTML(
                'beforeend',
                `<li type="none"><span style="color:yellowgreen;"> Temp:</span> ${Forecast24hour[frct].temp_c}<sup>o</sup>c</li>`
              )
            document
              .querySelector(`#div${num1}`)
              .insertAdjacentHTML(
                'beforeend',
                `<li type="none"><span style="color:tan;">Rain:</span> ${Forecast24hour[frct].chance_of_rain} % chance</li>`
              )
          }
        }

        for (item in ForecastObj) {
          let Aqi = Math.round(ForecastObj[item])
          document
            .querySelector(`#div${num}`)
            .insertAdjacentHTML(
              'beforeend',
              `<li type="none">${item} : ${Aqi}</li>`
            )
        }
        num++
        num1++
      }
    })
}

//Getgeolocation.

document.getElementById('geo_loc').addEventListener(
  'click',
  function () {
    window.navigator.geolocation.getCurrentPosition(showPostion)
    function showPostion (position) {
      let lat = position.coords.latitude
      let long = position.coords.longitude
      let possll = lat + ',' + long
      CurrentForecast(possll)
    }
  },
  { once: true }
)
