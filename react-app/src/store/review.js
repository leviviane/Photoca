//ACTION TYPE
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
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

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})


//THUNKS
export const getAllReviewsThunk = (photocardId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${photocardId}`);

    if (res.ok) {
        const reviews = await res.json();
        dispatch(getAllReviews(reviews));
        return reviews;
    }
};

export const createReviewThunk = (review, photocardId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${photocardId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

export const updateReviewThunk = (review) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const updatedReview = await res.json();
        dispatch(updateReview(updatedReview));
        return updatedReview;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
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


//Reducer
const initialState = {
    photocard: {},
    user: {}
}

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS:
            newState = { ...state, photocard: {} };
            action.reviews.forEach((review) => {
                newState.photocard[review.id] = review;
            });
            return newState;
        case CREATE_REVIEW:
            newState = {
                ...state,
                photocard: { ...state.photocard },
                user: { ...state.user },
            };
            newState.photocard[action.review.id] = action.review;
            return newState;
        case UPDATE_REVIEW:
            newState = { ...state };
            newState.photocard[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            const reviewsObj = { ...state.photocard };
            delete reviewsObj[action.reviewId];
            return {
                ...state,
                photocard: { ...reviewsObj },
            };
        default:
            return state;
    }
};

export default reviewReducer;
