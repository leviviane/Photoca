//ACTION TYPE
const GET_ALL_PHOTOCARDS = 'photocards/GET_ALL_PHOTOCARDS';
const GET_SINGLE_PHOTOCARD = 'photocards/GET_SINGLE_PHOTOCARD';
const CREATE_PHOTOCARD = '/photocards/CREATE_PHOTOCARD'


//ACTION CREATORS
const getAllPhotocard = (photocards) => ({
    type: GET_ALL_PHOTOCARDS,
    photocards
});

const getSinglePhotocard = (photocard) => ({
    type: GET_SINGLE_PHOTOCARD,
    photocard
})

const createPhotocard = (photocard) => ({
    type: CREATE_PHOTOCARD,
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
        const photocard = await res.json();
        dispatch(getSinglePhotocard(photocard));
        return photocard;
    } else {
        const errors = await res.json()
        return errors;
    }
};

export const createPhotCardThunk = (photocard) => async (dispatch) => {
    const res = await fetch(`/api/photocards/create`, {
        method: "POST",
        body: photocard,
    });

    if (res.ok) {
      const newPhotocard = await res.json();
      dispatch(createPhotocard(newPhotocard));
      console.log('HELLOOOOOOO', newPhotocard)
      return newPhotocard;
    } else {
      const errors = await res.json();
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
        case CREATE_PHOTOCARD:
            newState = { ...state };
            newState.allPhotocards[action.photocard.id] = action.photocard;
            return newState;
        default:
            return state;
    }
}

export default photocardReducer;
