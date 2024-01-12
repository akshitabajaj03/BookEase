import React from 'react'
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Featured from '../Featured/Featured';
import FeaturedProperties from '../featuredProperties/featuredProperties';
import "./Home.css";
import PropertyList from '../propertyList/propertyList';

const Home = () => {
  return (
    <div>
    <Navbar/>
    <Header/>
    <div className='homeContainer'> 
      <Featured/>
      <h1 className='homeTitle'>Browse by property type</h1>
      <PropertyList/>
      <h1 className='homeTitle'>Homes Guests Love</h1>
      <FeaturedProperties/>
    </div>
    </div>
  )
}

export default Home