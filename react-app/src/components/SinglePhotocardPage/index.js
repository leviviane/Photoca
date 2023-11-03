import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePhotocardThunk } from "../../store/photocard";
import "./SinglePhotocardPage.css";

function SinglePhotocardPage() {
    const dispatch = useDispatch();
    const { photocardId } = useParams();
    // const allPhotocardObj = useSelector((state) => state.photocards.allPhotocards)
    const photocard = useSelector((state) => state.photocards.singlePhotocard)

    useEffect(() => {
        dispatch(getSinglePhotocardThunk(photocardId))
    }, [dispatch, photocardId]);

    if (!photocard || Object.keys(photocard).length === 0) {
        return null;
    }

    return (
        <div className='main-single-card-page'>
            <div className='name-container'>
                <h3 className='photocard-name-line'>{photocard.listing_name}</h3>
            </div>
            <div className='single-page-img-container'>
                <div className='single-img-line'>
                    <img src={photocard.photocard_image} alt={photocard.listing_name} />
                </div>
            </div>
            <div className='price-description-container'>
                <p className='single-price-line'>{photocard.price}</p>
                <p className='single-description-line'>{photocard.description}</p>
            </div>
        </div>
    )

}

export default SinglePhotocardPage;
