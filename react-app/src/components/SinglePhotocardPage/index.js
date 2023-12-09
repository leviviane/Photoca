import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSinglePhotocardThunk } from "../../store/photocard";
import CreateReview from "../CreateReview";
import PhotocardReview from "../PhotocardReview";
import './SinglePhotocardPage.css';

function SinglePhotocardPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const photocard = useSelector((state) => state.photocards.singlePhotocard);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSinglePhotocardThunk(id));
  }, [dispatch, id]);

  if (!photocard || Object.keys(photocard).length === 0) {
    return null;
  }

  return (
    <div className='main-single-card-page'>
      <div className='title-photocard-container'>
        <div className='name-container'>
          <h3 className='photocard-name-line'>{photocard.listing_name}</h3>
        </div>
        <div className='single-page-img-container'>
          <div className='single-img-line'>
            <img className='photocard-img-line' src={photocard.photocard_image} alt={photocard.listing_name} />
          </div>
        </div>
      </div>
      <div className='price-description-container'>
        <div className='price-card-container'>
          <p className='price-card'><span className='bold-text'>Price:</span> ${photocard.price}</p>
        </div>
        <div className='description-card-container'>
          <p className='details-card'><span className='bold-text'>Card Details:</span> {photocard.description}</p>
          {/* <p className='single-description-line'>{photocard.description}</p> */}
        </div>
        <div className='description-line'></div>
      </div>
      <PhotocardReview />
    </div>
  );
}

export default SinglePhotocardPage;
