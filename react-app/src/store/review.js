//ACTION TYPE
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
// const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

//ACTION CREATORS
const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

// const updateReview = (review) => ({
//     type: UPDATE_REVIEW,
//     review
// });

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})


//THUNKS
export const GetAllReviewsThunk = (photocardId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${photocardId}`);

    if (res.ok) {
        const reviews = await res.json();
        dispatch(getAllReviews(reviews));
        return reviews;
    }
};

export const createReviewThunk = (review, photocardId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/photocards/${photocardId}`, {
        method: "POST",
        headers: { "ContentType": "application/json" },
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const reviewPhotocard = await res.json();
        dispatch(createReview(reviewPhotocard));
        return reviewPhotocard;
    } else {
        const errors = await res.json();
        return errors;
    }
};

// export const updateReviewThink = (review, reviewId) => async (dispatch) => {
//     const res = await fetch(`api/reviews/${reviewId}/update`, {
//         method: "PUT",
//         headers: { "ContentType": "application/json" },
//         body: JSON.stringify(review)
//     });

//     if (res.ok) {
//         const updatedReview = await res.json();
//         dispatch(updateReview(updatedReview))
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// };

export const deleteReviewThink = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(deleteReview(reviewId));
    } else {
        const errors = await res.json();
        return errors;
    }
}

//REDUCERS
const initialState = {
    allReviews: {}
  };

  const reviewReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALL_REVIEWS:
            newState = { ...state, allReviews: {} };
            action.review.forEach((review) => (newState.allReviews[review.id] = review));
            return newState;
        case CREATE_REVIEW:
            newState = { ...state, allReviews: { ...state.allReviews }};
            newState.allReviews[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            newState = { ...state, allRevoews: { ...state.allReviews }};
            delete newState.allReviews[action.id];
            return newState;
        default:
            return state;
    }
};

export default reviewReducer;
