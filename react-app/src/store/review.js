//ACTION TYPE
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS'

//ACTION CREATORS
const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
});


//THUNKS
export const GetAllReviewsThunk = (photocardId) => async (dispatch) => {
    const res = await fetch(`/api/reviews`);

    if (res.ok) {
        const reviews = await res.json();
        dispatch(getAllReviews(reviews));
        return reviews;
    }
};

//REDUCERS
const initialState = {
    photocard: {},
    user: {},
  };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS:
            return { ...state.photocard}

    }
};

export default reviewReducer;
