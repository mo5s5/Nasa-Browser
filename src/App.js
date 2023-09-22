import './App.scss';
import logo from './logo.png'
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import NavBar from './components/navBar/NavBar';
import TodayPhoto from './components/today-photo/TodayPhoto';
import NearbyAsteroids from './components/nearby-asteroids/NearbyAsteroids';
import { Context } from './context';
import { useState } from 'react';
import axios from 'axios';
import SubmitNewPlanet from './components/submit-planet/SubmitPlanet';
import { useTranslation } from 'react-i18next';


function App() {
  const api_key = 'MtDVfVzogac40FHNBAwfDreQemZFD0qixGD6wOEk';
  const [responseOk, setResponseOk] = useState(false);
  const [asteroidData, setAsteroidData] = useState({});
  const [photoData, setPhotoData] = useState();
  const [t, i18n] = useTranslation("global");
  const handleLanguage = (lang) => { i18n.changeLanguage(lang) }

  async function fetchPhoto(date) {
    try {
      const day = date.toISOString().slice(0, 10);
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${day}`);
      const data = await response.data;
      setPhotoData(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  async function getNearbyAsteroids(startDayIso, endDayIso) {
    try {
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDayIso}&end_date=${endDayIso}&api_key=${api_key}`);
      const dt = response.data.near_earth_objects;
      if (dt) {
        const valuesObjectData = Object.values(dt);
        setAsteroidData({ ...valuesObjectData });
        setResponseOk(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (

    <Context.Provider value={{ photoData, fetchPhoto, getNearbyAsteroids, responseOk, asteroidData }}>
      <div >
        <div className='top'>
          <img src={logo} className='logo' alt='logo'></img>
          <h1>{t("header.title")}</h1></div>
        <div className='lang'>
          <span onClick={() => handleLanguage("en")}>En</span>
          <span onClick={() => handleLanguage("ru")} >Ru</span>
          <span onClick={() => handleLanguage("hy")}>Hy</span>
        </div>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<TodayPhoto />} path='/nasa_photo' />
          <Route path='/nearby_asteroids' element={<NearbyAsteroids />} />
          <Route path='/submit_new_planet' element={<SubmitNewPlanet />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
