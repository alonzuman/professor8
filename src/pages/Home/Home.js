import React from 'react'
import './Home.css'
import SchoolsSwiper from './components/SchoolsSwiper'
import HomeHero from './components/HomeHero'
import LatestReviews from './components/LatestReviews'

const Home = () => {
  return (
    <div className='home_content__container' dir='rtl'>
      <HomeHero />
      <SchoolsSwiper />
      <LatestReviews />
    </div>
  )
}

export default Home
