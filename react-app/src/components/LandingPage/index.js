import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllPhotocardThunk } from "../../store/photocard";
import './LandingPage.css';

function LandingPage() {
    const dispatch = useDispatch();
    const allPhotocardObj = useSelector((state) => state.photocards.allPhotocards)
    const photocardArr = Object.values(allPhotocardObj);

    useEffect(() => {
        dispatch(getAllPhotocardThunk());
    }, [dispatch]);

    if (!photocardArr || !photocardArr.length) {
        dispatch(getAllPhotocardThunk());
        return null;
    }

    return (
        <div className="main-landing-page">
            <div className='photocard-list-nav'>
                {photocardArr.map((photocard) => (
                    <NavLink className='photocard-nav-link' to={`/photocards/${photocard.id}`}>
                        <div className='photocard-card'>
                            <img className='photocard-img' src={photocard.photocard_image} alt={photocard.listing_name} />
                            <div className='photocard-info-box'>
                                <p className='photocard-name-box'>{photocard.listing_name}</p>
                                {/* <p className='photocard-price-box'>${photocard.price}</p> */}
                                {/* <p className='photocard-description-box'>{photocard.description}</p> */}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default LandingPage;
