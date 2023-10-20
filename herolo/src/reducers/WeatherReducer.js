
const reducer = (state, action) =>{
    
    switch(action.type){
        case 'UPDATE_CITY_NAME': 
        //console.log(action.playload)
            return {
                ...state,
                cityName : action.playload
            } 

        case 'UPDATE_TEMPERATEUR': 
        //console.log(action.playload)
            return {
                ...state,
                temperateur : action.playload
            }
        
        case 'NEXT_FIVE_DAYS': 
        //console.log(action.playload)
            return {
                ...state,
                nextFiveDays : action.playload
            } 
        case 'FORCAST_WEATHER_FAILED' : 
            return {
                ...state,
                error : action.playload
            }

        case 'IS_ADDED' : 
            let temp = [...state.favories]

            let ifExist = temp.filter((e) => e.name === action.playload.name )
            if(ifExist.length <= 0){
                temp.push(action.playload)
            }
            return {
                ...state,
                favories :  temp, addMsg : 'item added to favories successfully'
            }
        default :
            return state
    }
}

export {reducer}