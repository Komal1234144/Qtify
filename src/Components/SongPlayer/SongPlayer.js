import React from 'react'
import song from '../../assets/album.png';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs'
import './SongPlayer.scss'

const SongPlayer = () => {

    const [play, setPlay] = React.useState(false)

    return (
        <div className='player'>
            <div className='player__cover'>
                <img src={song} alt="" />
                <div>
                    <h5>Song Name</h5>
                    <h6>Album name</h6>
                </div>
            </div>

            <div className='player__play'>
                {
                    play === false ? <BsFillPlayCircleFill className='icon' onClick={()=>setPlay(true)}/> : <BsFillPauseCircleFill className='icon' onClick={()=>setPlay(false)}/>
                }

                <div className='player__play__bar'>
                    <span>0.38</span>
                    <div className='bar'>
                        <div className='bar__playing'></div>
                    </div>
                    <span>3:38</span>
                </div>
            </div>
        </div>
    )
}

export default SongPlayer