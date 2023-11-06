//ACTION TYPE
const GET_ALL_PHOTOCARDS = 'photocards/GET_ALL_PHOTOCARDS';
const GET_SINGLE_PHOTOCARD = 'photocards/GET_SINGLE_PHOTOCARD';
const CREATE_PHOTOCARD = 'photocards/CREATE_PHOTOCARD';
const UPDATED_PHOTOCARD = 'photocards/UPDATED_PHOTOCARD';
const DELETE_PHOTOCARD = 'photocards/DELETE_PHOTOCARD';


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

const updatePhotocard = (photocard) => ({
    type: UPDATED_PHOTOCARD,
    photocard
})

const deletePhotocard = (photocardId) => ({
    type: DELETE_PHOTOCARD,
    photocardId
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

export const getSinglePhotocardThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/photocards/${id}`);

    if (res.ok) {
        const photocard = await res.json();
        dispatch(getSinglePhotocard(photocard));
        return photocard;
    } else {
        const errors = await res.json()
        return errors;
    }
};

export const createPhotoCardThunk = (photocard) => async (dispatch) => {
    const res = await fetch(`/api/photocards/create`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(photocard),
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

  export const updatePhotocardThunk = (photocard) => async (dispatch) => {
    const res = await fetch(`/api/photocards/update/${photocard.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(photocard),
    });

    if (res.ok) {
      const updatedPhotocard = await res.json();
      dispatch(updatePhotocard(updatedPhotocard));
      return updatedPhotocard;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

  export const deletePhotocardThunk = (photocardId) => async (dispatch) => {
    const res = await fetch (`/api/photocards/${photocardId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(deletePhotocard(photocardId));
    } else {
        const errors = await res.json();
        return errors;
    }
  }


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
        case UPDATED_PHOTOCARD:
            newState = { ...state };
            newState.singlePhotocard = action.photocard;
            return newState;
        case DELETE_PHOTOCARD:
            newState = { ...state };
            delete newState.allPhotocards[action.photocardId];
            delete newState.singlePhotocard;
            return newState;
        default:
            return state;
    }
}

export default photocardReducer;
