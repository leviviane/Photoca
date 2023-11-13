import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSinglePhotocardThunk } from "../../store/photocard";
import CreateReview from "../CreateReview";
// import PhotocardReview from "../PhotocardReview";
import PhotocardReview from "../PhotocardReview";
import './SinglePhotocardPage.css';


function SinglePhotocardPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    // const allPhotocardObj = useSelector((state) => state.photocards.allPhotocards)
    const photocard = useSelector((state) => state.photocards.singlePhotocard)
    // const sessionUser = useSelector((state) => state.photocards.userId)
    const currentUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getSinglePhotocardThunk(id))
    }, [dispatch, id]);

    if (!photocard || Object.keys(photocard).length === 0) {
        return null;
    }

    // if (!sessionUser) {
    //     return null;
    // }

    return (
        <div className='main-single-card-page'>
            <div className='name-container'>
                <h3 className='photocard-name-line'>{photocard.listing_name}</h3>
            </div>
            <div className='single-page-img-container'>
                <div className='single-img-line'>
                    <img className='photocard-img-line' src={photocard.photocard_image} alt={photocard.listing_name} />
                </div>
            </div>
            <div className='price-description-container'>
                <div className='price-card-container'>
                    <p className='price-card'>Price:</p>
                    <p className='single-price-line'>${photocard.price}</p>
                    </div>
                    <div className='description-card-container'>
                        <p className='price-card'>Card Details:</p>
                        <p className='single-description-line'>{photocard.description}</p>
                    </div>
            </div>
            <PhotocardReview />
            {/* <CreateReview /> */}
            {/* <div className='single-page-delete'>
                <OpenModalButton
                buttonText="Delete"
                modalComponent={
                <DeletePhotocardModal photocardId={photocard.id} ownerId={photocard.ownerId} />
                } />
                <NavLink className='nav-link-2' to={`/photocards/${id}/update`}>
				<span>Update photocard</span>
                </NavLink>
            </div> */}
        </div>
    )

}

export default SinglePhotocardPage;
