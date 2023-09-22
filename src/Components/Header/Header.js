import React, { useEffect } from 'react'
import './Header.scss';
import logo from '../../assets/logo.png';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GrFormClose } from 'react-icons/gr'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    color: 'black',
    fontSize: '20px',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};


const Header = () => {

    const [keyword, setKeyword] = React.useState('')
    const [albums, setAlbums] = React.useState([])
    const [artist, setArtist] = React.useState('')
    const [open, setOpen] = React.useState(false)

    useEffect(() => {

        if (keyword === '') return

        axios.get(`${BASE_URL}/album/${keyword}`,
            {
                Content: 'application/json',
            })
            .then((response) => {
                console.log(response)
                if (Object.keys(response?.data).length > 0) {
                    setAlbums(response?.data)
                    let songs = response.data.songs.slice(0, 2);
                    let artistList = []
                    songs.forEach((song) => {
                        artistList.push(...song.artists)
                    })

                    console.log(artistList)
                    setArtist(artistList.join(', '))
                } else {
                    setAlbums({})
                    setArtist('')
                }

            })
    }, [keyword])



    return (
        <>
            <div className='header'>

                <div className='header__logo'>
                    <img src={logo} alt="logo" />
                </div>

                <div className='header__searchbar'>
                    <input type="text" className='form-control' placeholder='Search an album of Your choice'
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value)
                        }}
                    />
                    <div className='header__searchbar__icon'>
                        <AiOutlineSearch className='icon' />
                    </div>
                </div>

                {
                    window.innerWidth > 600
                    &&
                    <div className='header__feedback'>
                        <button
                            onClick={() => setOpen(true)}
                        >Give Feedback</button>
                    </div>

                }
            </div>

            {
                Object.keys(albums).length > 0
                &&
                <div className='search-items'>
                    <div className='search-items__item'>
                        <div className='search-items__item__cover'>
                            <img src={albums?.image} alt="" />
                        </div>

                        <div className='search-items__item__title'>
                            <span>{albums?.title}</span>
                            <span className='artist-names'>{artist}</span>
                        </div>

                        <div className='search-items__item__follows'>
                            <span>{albums?.follows} Follows</span>
                        </div>
                    </div>
                </div>
            }

            {/* {
                window.innerWidth <= 600
                &&
                <>
                    <br /> <br />

                    <div className='header__feedback'>
                        <button>Give Feedback</button>
                    </div>
                </>
            } */}

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='row justify-content-center'>
                        <div className='col-10 text-center'>
                            <h1>Feedback</h1>
                        </div>

                        <div className='col-2 text-center'>
                            <GrFormClose onClick={()=>setOpen(false)} className='icon'/>
                        </div>
                    </div>

                    <div className='row flex-column justify-content-center form'>
                        <div className='col-12 mt-3'>
                            <input type="text" className='form-control' placeholder='Full name' />
                        </div>

                        <div className='col-12 mt-3'>
                            <input type="email" className='form-control' placeholder='Email Id' />
                        </div>

                        <div className='col-12 mt-3'>
                            <input type="text" className='form-control' placeholder='Subject' />
                        </div>

                        <div className='col-12 mt-3'>
                            <textarea type="text" className='form-control' rows="4" placeholder='Description' />
                        </div>

                        <div className='col-12 text-center mt-3'>
                            <button
                            onClick={()=>setOpen(false)}
                            >Submit Feedback</button>
                        </div>
                    </div>
                </Box>
            </Modal>

        </>
    )
}

export default Header