const keyApi = "531f4c6467b70805775b834bd9065c0f";

 async function getDataApi(city , units) {
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}&units=${units}`;
     const data = await fetch(url)
     .then((res) => res.json())
     .then((res) => res)
     const {
          weather ,
          main : {temp , feels_like , temp_min , temp_max , pressure , humidity},
          wind : {speed},
          sys : {country},
          name
     } = data ;

     const {description , icon} = weather[0]

     return {
          description,
          icon,
          temp,
          feels_like,
          temp_max,
          temp_min,
          pressure,
          humidity,
          speed,
          country,
          name
     }
}

export {getDataApi};