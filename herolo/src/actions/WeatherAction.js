
const updateCityNmae = (data) =>{
    console.log('weatherSuccess action ', data)
    return {
        type : 'UPDATE_CITY_NAME',
        playload : data
    }
}

const updateTemperateur = (data) =>{
    console.log('weatherSuccess action ', data)
    return {
        type : 'UPDATE_TEMPERATEUR',
        playload : data
    }
}

const nextFiveDays = (data) =>{
    console.log('weatherSuccess action ', data)
    return {
        type : 'NEXT_FIVE_DAYS',
        playload : data
    }
}

const weatherFialed = (data) =>{

    return {
        type : 'FORCAST_WEATHER_FAILED',
        playload : data
    }
}

const addFavories = (data) =>{

    return {
        type : 'IS_ADDED',
        playload : data
    }
}

const weatherForecastThunk = (value) => (dispatch)=>{
    console.log('asngfhgfhgasd', value)
    const API_Key = 'wCm3m5OA5VstnJDfSjcXUPP7lAKlNv7S'   //old :'lJG10Gw0RHA4bzBzipAGZ5fA5lGjA9ZE'
    const LOCATION_API = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${value}&apikey=${API_Key}&language=en-us`
    
    try{
        fetch(LOCATION_API)
        .then((response)=>{
            return response.json()  
        })
        .then((response)=>{
            console.log('first fetch city name:', response[0].LocalizedName)
            console.log('first fetch city name:', response[0].Key)
            dispatch(updateCityNmae(response[0].LocalizedName))
            fetch(`https://dataservice.accuweather.com/currentconditions/v1/${response[0].Key}?apikey=${API_Key}&language=en-us`)
                .then((res)=>{
                    return res.json()
                })
                .then((data)=>{
                    console.log('second fetch Temperateur :', data[0].Temperature.Metric.Value)
                    dispatch(updateTemperateur(data[0].Temperature.Metric.Value))
                    fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${response[0].Key}?apikey=${API_Key}&language=en-us`)
                        .then((res)=>{
                            return res.json()
                        })
                        .then((info)=>{
                            console.log('third fetch DailyForecasts', info.DailyForecasts)
                            dispatch(nextFiveDays(info.DailyForecasts))
                            
                        })
                        .catch((error)=>{ 
                            console.log('data from thunk', error.message)
                            dispatch(weatherFialed(error.message))
                        })
                })
                .catch((error)=>{ 
                    console.log('data from thunk', error.message)
                    alert(`response :${error.message}`)
                    dispatch(weatherFialed(error.message))
                })
        })
        .catch((error)=>{ 
            console.log('data from thunk', error.message)
            dispatch(weatherFialed(error.message))
        })
    }
    catch(error){
        console.log('data from thunk', error.message)
        
    }
}
export   {weatherForecastThunk, addFavories}