import React from 'react'
import './HomePage.scss';
import Hero from '../../Components/HomePage/Hero/Hero';
import Grid from '../../Components/HomePage/Grid/Grid';


const HomePage = () => {
    return (
        <div className='home'>
            <Hero />

            <Grid type="top" name="Top Albums"/>

            <hr/>

            <Grid type="new" name="New Albums"/>

        </div>
    )
}

export default HomePage