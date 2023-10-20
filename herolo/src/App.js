import Navbar from './components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherForm from './components/WeatherForm';
import WeatherFavorites from './components/WeatherFavorites';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


function App() {
  return (
    <div className="cont">
      <BrowserRouter>
      <Navbar/>
        <div className='body'>
            <Routes >
                <Route exact path = '/' element = {<WeatherForm/>} />
                <Route path = '/favorites' element = {<WeatherFavorites/>} />
            </Routes>
        </div>  
      </BrowserRouter>
    </div>
  );
}

export default App;
library.add(fab, fas, far)
