import React, { useState } from 'react'
import '../WeatherStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux'
import {weatherForecastThunk, addFavories} from '../actions/WeatherAction'

function WeatherForm(props){

    const [value, setValue] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    function handelChange(e){
        let inpvalue = e.target.value;
        console.log(inpvalue)
        setValue(inpvalue)
    }

    function hundellInput(e){
        e.preventDefault();
        props.next(value)
        document.getElementById('searchinp').value = '';
    }

    function getDayName(date = new Date(), locale = 'en-US') {
        return date.toLocaleDateString(locale, {weekday: 'long'});
    }

    function addToFavories(e){
        e.preventDefault()
        props.favories({name :props.name, temp : props.temperateur})
        if (props.addMsg) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        } 
    }

    return(
        <div className='main'>
            {showAlert && <div class="alert text-white bg-black alert-warning  border-white px-5" role="alert"> {props.addMsg} </div>}
            <div className='formi'>
                <input id='searchinp' type='text' name='search' placeholder='Enter a city name' onChange={handelChange}/>
                <button onClick={hundellInput}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
            </div>
            {props.name.length > 0 ? (
            <div className='display'>
                <div className='header'>
                    <div className='left'>
                        <span className='logoWeather'><FontAwesomeIcon className='icon' icon="fa-solid fa-cloud" /></span>
                        <span className='info'>
                            <p> {props.name} </p>
                            <p> {props.temperateur} ℃ </p>
                        </span>
                    </div>
                    <div className='right'>
                        
                        <button onClick={addToFavories} ><FontAwesomeIcon className='icon2' icon="fa-solid fa-heart" /> ADD TO FAVORIES</button>
                    </div>
                </div>
                <h1>Scottered Clouds</h1>
                <div className='nextDaysCards'>
                    {props.nextFiveDays.map((day)=>(
                        <div className='cards' key={day.Date}>
                            <p className='day'> {getDayName(new Date(day.Date))} </p>
                            <p className='weather_status'> {day.Day.IconPhrase} </p>
                            <p> Max : <span className='max'>{ (((day.Temperature.Maximum.Value) - 32) * 5/9).toFixed(1)}  ℃</span> </p>
                            <p> Min : <span className='min'>{ (((day.Temperature.Minimum.Value) - 32) * 5/9).toFixed(1)}  ℃</span> </p>
                        </div>
                    ))}
                </div>
            </div> ) : <div className='display'></div> } 
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        name : state.cityName,
        temperateur : state.temperateur,
        nextFiveDays : state.nextFiveDays,
        favories : state.favories,
        error : state.error,
        addMsg : state.addMsg
    }
}

const mapDispatchToProps = (dispatch) =>{

    return {
        next: (value) =>{
            dispatch(weatherForecastThunk(value))
        },
        favories: (value) =>{
            dispatch(addFavories(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherForm)
