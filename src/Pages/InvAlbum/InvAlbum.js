import React, { useEffect, useState } from 'react'
import './InvAlbum.scss'
import { BsFillArrowLeftCircleFill, BsShuffle } from 'react-icons/bs';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai'
import { MdLibraryAdd } from 'react-icons/md';
import axios from 'axios';
import { BASE_URL } from '../../utils/url'
import { useParams } from 'react-router-dom';
import SongPlayer from '../../Components/SongPlayer/SongPlayer';

const InvAlbum = () => {

    const slug = useParams().slug;
    const [album, setAlbum] = useState({});
    const [totalDuration, setTotalDuration] = useState('');
    const [type, setType] = useState('inc');
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesArray, setPagesArray] = useState([]);
    const [songsArray, setSongsArray] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/album/${slug}`, {
            headers: {
                Accept: 'application/json',
            }
        })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    setAlbum(response.data)
                    songDuration(response.data.songs)
                    let pg = Math.floor(response.data.songs.length / 10)
                    setPages(pg)

                    fillPagesArray(pg)
                } else {
                    setAlbum({})
                }
            })
    }, [])

    useEffect(() => {

        if (!album?.songs) return;

        // console.log(album.songs.length)

        let songs = album.songs.slice((currentPage - 1) * 10, currentPage * 10)

        setSongsArray(songs)

    }, [album, currentPage])

    const fillPagesArray = (pg) => {
        let arr = [];
        if (pg <= 2) {
            for (let i = 1; i <= 2; i++) {
                arr.push(i)
            }
        } else {
            for (let i = 1; i <= 2; i++) {
                arr.push(i)
            }

            arr.push('. . .')

            arr.push(pg)
        }

        setPagesArray(arr)
        console.log(arr)
    }


    const songDuration = (songs) => {

        let timeInMs = 0;

        songs.forEach((song) => {
            timeInMs += song.durationInMs;
        })

        // console.log(timeInMs)
        let hrs = timeInMs / (1000 * 60 * 60);
        let min = (hrs - Math.floor(hrs)) * 60;
        hrs = Math.floor(hrs);
        let sec = (min - Math.floor(min)) * 60;
        min = Math.floor(min);
        sec = Math.floor(sec);
        // console.log(hrs , min , sec)

        if (hrs > 0) {
            setTotalDuration(`${hrs} hr ${min} min`)
        } else {
            setTotalDuration(`${min} min ${sec} sec`)
        }

    }

    const formatDuration = (duration) => {
        // return duration;
        let min = (duration / 3600);
        let sec = (min - Math.floor(min)) * 60;
        min = Math.floor(min);
        sec = Math.floor(sec);
        return `${min}:${sec}`
    }

    const formatArtist = (artists) => {
        let res = '';

        artists.forEach((artist, index) => {
            if (index === 0) {
                res += artist
            } else {
                res += `, ${artist}`
            }
        })

        return res;
    }

    const shuffle = (songs) => {

        if (type === 'inc') {
            setType('dec')
            songs.sort((a, b) => a.title.localeCompare(b.title))
        }
        else {
            setType('inc')
            songs.sort((a, b) => b.title.localeCompare(a.title))
        }

        setAlbum({ ...album, songs })
    }

    const setToPreviousPage = () => {

        if ( pages - (currentPage - 1) < 2) {
            setCurrentPage(currentPage - 1);
            return;
        }

        if(currentPage - 1 <= 1){
            let arr = [];
            arr = [1, 2, '. . .', pages]

            setPagesArray(arr)
            setCurrentPage(currentPage - 1);
            return;
        }

        let arr = [];
        let firstEl = pagesArray[0];
        arr = [firstEl - 1, firstEl, '. . .', pages]

        setPagesArray(arr)
        setCurrentPage(currentPage - 1);

    }

    const setToNextPage = () => {

        if (pages - (currentPage + 1) < 2) {
            let arr = [pages-2 , pages-1 , pages]
            setPagesArray(arr)
            setCurrentPage(currentPage + 1);
            return;
        }

        let arr = [];

        if (pages - (currentPage + 1) === 2) {
            let firstEl = pagesArray[1];
            arr = [firstEl, firstEl + 1, pages]
        } else {
            let firstEl = pagesArray[1];
            arr = [firstEl, firstEl + 1, '. . .', pages]
        }

        setPagesArray(arr)
        setCurrentPage(currentPage + 1);

    }

    return (
        <div className='inv-album'>
            <BsFillArrowLeftCircleFill className='icon'
                onClick={() => window.location.href = '/'}
            />

            <div className='inv-album__details'>
                <div className='inv-album__details__cover'>
                    <img src={album?.image} alt="album cover" />
                </div>

                <div className='inv-album__details__info'>
                    <h1>{album?.title}</h1>
                    <p>{album?.description}</p>

                    <p>{album?.songs?.length} songs &#x2022; {totalDuration} &#x2022; {album?.follows} Follows</p>

                    <div className='d-flex'>
                        <button
                            onClick={() => shuffle(album?.songs)}
                        ><BsShuffle /> Shuffle</button>
                        <button className='library-btn'><MdLibraryAdd /> Add to library</button>
                    </div>
                </div>
            </div>

            <div className='inv-album__pagination'>
                <AiOutlineLeftCircle className='icon'
                    onClick={() => {
                        if (currentPage === 1) return;
                        if (pages > 2) {
                            setToPreviousPage()
                        } else {
                            setCurrentPage(currentPage - 1)
                        }
                    }}
                />

                {
                    pages <= 5
                        ?
                        pagesArray?.map((page, index) => {
                            return <div key={index} className={`${currentPage === page ? 'inv-album__pagination__page-active' : 'inv-album__pagination__page'}`}
                                onClick={() => setCurrentPage(page)}
                            >{page}</div>
                        })
                        :
                        pagesArray?.map((page, index) => {
                            return <div key={index} className={`${currentPage === page ? 'inv-album__pagination__page-active' : 'inv-album__pagination__page'}`}
                                onClick={() => setCurrentPage(page)}
                            >{page}</div>
                        })
                }

                <AiOutlineRightCircle className='icon'
                    onClick={() => {
                        if (currentPage === pages) return;
                        if (pages > 2) {
                            setToNextPage()
                        } else {
                            setCurrentPage(currentPage + 1)
                        }
                    }}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th className='text-left'>Song</th>
                        <th className='text-center'>Artist</th>
                        <th className='text-end'>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        songsArray?.map((song, index) => {
                            return <tr key={index}>
                                <td className='text-left'>
                                    <img src={song?.image} alt="" />
                                    {song.title}</td>
                                <td className='text-center'>{formatArtist(song.artists)}</td>
                                <td className='text-end'>{formatDuration(song.durationInMs)}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

            <SongPlayer />


        </div>
    )
}

export default InvAlbum