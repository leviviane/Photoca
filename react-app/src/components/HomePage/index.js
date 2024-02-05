import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllPhotocardThunk } from "../../store/photocard";
import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    const allPhotocardObj = useSelector((state) => state.photocards.allPhotocards)
    const photocardArr = Object.keys(allPhotocardObj);
    const currentSessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getAllPhotocardThunk());
    }, [dispatch]);

    if (!allPhotocardObj) return null;

    const shuffledPhotocards = [...photocardArr].sort(() => Math.random() - 0.5);

    const randomPhotocards = shuffledPhotocards.slice(0,3);

    return (
        <>
        <div className='main-homepage'>
            <div className='welcome-info'>
                <h1 className='welcome-line'>Welcome to Photoca</h1>
                <h2 className='one-stop-line'>Your one stop shop for all things Kpop photocards!</h2>
                <h4 className='highlight-line'>
                    Check out some of our favorite cards! Shop more{" "}
                    <NavLink id="these" exact to="/photocards">
                        photocards
                    </NavLink>
          </h4>
            </div>
        </div>
        <div className='main-highlight-photocards'>
            {randomPhotocards.map((photocardArr) =>(
                <div className='highlight-photocards'>
                    <NavLink
                    key={photocardArr}
                    to={`/photocards/${parseInt(photocardArr) + 1}`}>
                    <img
                    className='homepage-image'
                    src={allPhotocardObj[photocardArr].photocard_image}
                    />
                    <p className='homepage-title'>{allPhotocardObj[photocardArr].listing_name}</p>
                    </NavLink>
                </div>
            ))}
        </div>

        <div className='footer-info'>
            <h1 className='created-line'>Created by Viviane Le
            <span className='linkedin-icon'>
                <a style={{ color: '#0077b5' }} href='https://www.linkedin.com/in/leviviane/' target='_blank' rel='noopener noreferrer'>
                    <img src='/images/linkedin.svg' alt='Linkedin Icon' className='linkedin-icon' />
                </a>
            </span>
            <span>
                <a href='https://github.com/leviviane' target='_blank rel='noopener noreferrer>
                    <img src='/images/square-github.svg' atl='Github Icon' className='github-icon' />
                </a>
            </span>
            </h1>
        </div>

        </>
    )

}
export default HomePage;
