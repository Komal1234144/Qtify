import React from 'react'
import './HomePage.scss';
import Hero from '../../Components/HomePage/Hero/Hero';
import Grid from '../../Components/HomePage/Grid/Grid';
import FAQ from '../../Components/HomePage/FAQ/FAQ';
import SongPlayer from '../../Components/SongPlayer/SongPlayer';


const HomePage = () => {
    return (
        <div className='home'>
            <Hero />

            <Grid type="top" name="Top Albums"/>

            <hr/>

            <Grid type="new" name="New Albums"/>

            <hr/>

            <Grid type="songs" name="Songs"/>

            <hr/>

            <FAQ/>

            <SongPlayer/>

        </div>
    )
}

export default HomePage