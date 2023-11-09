import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllReviewsThunk } from "../../store/review";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import CreateReview from "../CreateReview";
import UpdatePhotocard from "../UpdatePhotocard";
import UpdateReview from "../UpdateReview";

function PhotocardReview () {
    const dispatch = useDispatch();
    const { id } = useParams();
    const photocard = useSelector((state) => state.photocards.singlePhotocard);
    const user = useSelector((state) => state.session.user.id);
    const reviews = useSelector((state) => state.reviews.photocard);
    const [isLoaded, setIsLoaded] = useState(false);
    const [key, setKey] = useState(0);
    const reviewArr = Object.values(reviews);

    useEffect(() => {
        dispatch(getAllReviewsThunk(id)).then(() => setIsLoaded(true));
        console.log('HELLOOOOO', id)
    },  [dispatch, id]);

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
      ? [...reviewArr].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
      : [];

      const handleSubmit = () => {
        setKey((prevKey) => prevKey + 1);
      };

      return isLoaded && (
        <div key={key}>
          <div>
            {console.log('HELLLOOOOOO', sortedReviews)}
            {/* {!sortedReviews.length ? ( */}
              <div>
                <div className="photocard-review-container">
                  {photocard.review > 1 ? 'Reviews' : 'Review'}
                  <div className="post-button">
                    {/* {user && !sortedReviews.find((review) => review.userId === user.id) && photocard.UserId !== user?.id && ( */}
                      <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<CreateReview photocard={photocard} user={user} onReviewSubmitted={handleSubmit} />}
                      />
                  </div>
                </div>
                {sortedReviews.map((review) => (
                  <div key={review.id}>
                    <div className="review-container">
                      <h3 className="user-name">{review?.User?.first_name}</h3>
                      <h4 className="review-date">{createDate(review.createdAt)}</h4>
                      <p className="review-description">{review.text}</p>
                      <div className='update-review-button'>
                        {review.user_id === user && (
                          <OpenModalButton
                          buttonText='Update'
                          modalComponent={
                            <UpdateReview review={review} userId={photocard.id} photocardId={photocard.id} />
                          }
                          />
                        )}
                      </div>
                      <div className="delete-review-button">
                        {review.user_id === user && (
                          <OpenModalButton
                            buttonText="Delete"
                            modalComponent={
                              <DeleteReviewModal review={review} userId={photocard.id} />
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="new-container">
                  <div className="post-review-button">
                    {user && !sortedReviews.find((review) => review.userId === user.id) && photocard.userId !== user?.id && (
                      <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<CreateReview photocard={photocard} user={user} onReviewSubmitted={handleSubmit} />}
                      />
                    )}
                  </div>
                </div>
                {user && !sortedReviews.find((review) => review.userId === user.id) && photocard.userId !== user?.id && (
                  <h3 className="be-the-first-review">
                    Be the first to post a review!
                  </h3>
                )}
              </div>
          </div>
        </div>
      );
}

export default PhotocardReview;
