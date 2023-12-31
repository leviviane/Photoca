import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllReviewsThunk } from "../../store/review";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import CreateReview from "../CreateReview";
import UpdateReview from "../UpdateReview";
import "./PhotocardReview.css"

function PhotocardReview () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const photocard = useSelector((state) => state.photocards.singlePhotocard);
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.photocard);
  const [isLoaded, setIsLoaded] = useState(false);
  const [key, setKey] = useState(0);
  const reviewArr = Object.values(reviews);

  useEffect(() => {
    dispatch(getAllReviewsThunk(id)).then(() => setIsLoaded(true));
  }, [dispatch, id]);

  const createDate = (date) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const newDate = new Date(date);
    const month = months[newDate.getMonth()];
    const year = newDate.getFullYear();

    return `${month} ${year}`;
  };

  const sortedReviews = Array.isArray(reviewArr)
    ? [...reviewArr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const handleSubmit = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const hasUserPostedReview = sortedReviews.some((review) => review.user_id === sessionUser?.id);

  return isLoaded && (
    <div key={key}>
      <div>
        <div className="photocard-review-container">
          {photocard.review > 1 ? 'Reviews' : 'Reviews'}
          {sessionUser && !hasUserPostedReview && photocard.user_id !== sessionUser?.id && (
            <div className="post-button">
              <OpenModalButton
                styling='post-your-review-pop-up'
                className='post-your-review-modal'
                buttonText="Post Your Review"
                modalComponent={<CreateReview photocard={photocard} user={sessionUser} onReviewSubmitted={handleSubmit} />}
              />
            </div>
          )}
        </div>
        {sortedReviews.map((review) => (
          <div key={review.id}>
            <div className="review-container">
              <h3 className="user-name">{review?.User?.first_name}</h3>
              <h5 className="review-date">{createDate(review.createdAt)}</h5>
              <p className="review-description">{review.text}</p>
              {sessionUser && (
                <div className='update-review-button-container'>
                  <div className='update-review-button'>
                    {review.user_id === sessionUser.id && (
                      <OpenModalButton
                        buttonText='Update'l
                        styling='update-review-pop-up'
                        modalComponent={
                          <UpdateReview review={review} userId={photocard.id} photocardId={photocard.id} />
                        }
                      />
                    )}
                  </div>
                  <div className="delete-review-button">
                    {review.user_id === sessionUser.id && (
                      <OpenModalButton
                        buttonText="Delete"
                        styling='delete-review-pop-up'
                        modalComponent={
                          <DeleteReviewModal review={review} userId={photocard.id} />
                        }
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotocardReview;
