import React from 'react'
import './Header.scss';
import logo from '../../assets/logo.png';
import { AiOutlineSearch } from 'react-icons/ai';


const Header = () => {
    return (
        <>
            <div className='header'>

                <div className='header__logo'>
                    <img src={logo} alt="logo" />
                </div>

                <div className='header__searchbar'>
                    <input type="text" className='form-control' placeholder='Search an album of Your choice' />
                    <div className='header__searchbar__icon'>
                        <AiOutlineSearch className='icon' />
                    </div>
                </div>

                {
                    window.innerWidth > 600
                    &&
                        <div className='header__feedback'>
                            <button>Give Feedback</button>
                        </div>
                }
            </div>

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



        </>
    )
}

export default Header