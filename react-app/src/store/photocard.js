//ACTION TYPE
const GET_ALL_PHOTOCARDS = 'photocards/GET_ALL_PHOTOCARDS';
const GET_SINGLE_PHOTOCARD = 'photocards/GET_SINGLE_PHOTOCARD';


//ACTION CREATORS
const getAllPhotocard = (photocards) => ({
    type: GET_ALL_PHOTOCARDS,
    photocards
});

const getSinglePhotocard = (photocard) => ({
    type: GET_SINGLE_PHOTOCARD,
    photocard
})


//THUNKS
export const getAllPhotocardThunk = () => async (dispatch) => {
    const res = await fetch('/api/photocards');

    if (res.ok) {
        const photocards = await res.json();
        dispatch(getAllPhotocard(photocards));
        return photocards;
    } else {
        const errors = await res.json()
        return errors;
    }
};

export const getSinglePhotocardThunk = (photocardId) => async (dispatch) => {
    const res = await fetch(`/api/photocards/${photocardId}`);

    if (res.ok) {
        const listing = await res.json();
        dispatch(getSinglePhotocard(listing));
        return listing;
    } else {
        const errors = await res.json()
        return errors;
    }
};

//REDUCERS
const initialState = {
    allPhotocards: {},
    singlePhotocard: {},
};

const photocardReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALL_PHOTOCARDS:
            newState = { ...state };
            newState.allPhotocards = action.photocards;
            return newState;
        case GET_SINGLE_PHOTOCARD:
            newState = { ...state };
            newState.singlePhotocard = action.photocard;
            return newState;
        default:
            return state;
    }
}

export default photocardReducer;
