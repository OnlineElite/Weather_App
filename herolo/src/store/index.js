import {createStore, applyMiddleware} from 'redux'
import {reducer} from '../reducers/WeatherReducer'
import thunk from 'redux-thunk'
const initialState = {
    cityName : '',
    temperateur : '0',
    nextFiveDays : [],
    favories : [],
    error : null,
    addMsg : null
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk))