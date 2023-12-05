import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePhotocardThunk, getAllPhotocardThunk } from "../../store/photocard";
import "./DeletePhotocardModal.css";

function DeletePhotocardModal( { photocard, submitted }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [exist, setExist] = useState(true);
    const { closeModal } = useModal();

    useEffect(() => {
        if (!exist) {
            dispatch((getAllPhotocardThunk()))
        }
    }, [dispatch, exist])

    const confirmDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePhotocardThunk(photocard.id));
        submitted();
        closeModal();
        setExist(false);

        // history.push('/photocards/current')
    };

    const cancelDelete = (e) => {
        e.preventDefault();
        closeModal();
    };

    // const handleClose = () => {
    //     closeModal();
    //   };

    return (
        <>
        {exist && (
            <>
            <div className='delete-photocard-modal'>
                {/* <button className='close-photocard-modal' onClick={handleClose}>
                    X
                </button> */}
                <h2 className='confirm-photocard-delete-title'>Confirm Delete</h2>
                <div className='photocard-ask-delete-box'>
                    <p className='confirmation-message'>Are you sure you want to delete this photocard listing?</p>
                </div>
                <div className='photocard-delete-buttons'>
                    <button className='yes-delete-photocard' onClick={confirmDelete}>
                        Yes (Delete Photocard)
                    </button>
                    <button className='no-delete-photocard' onClick={cancelDelete}>
                        No (Keep Photocard)
                    </button>
                </div>
            </div>
            </>
        )}
        </>
    )
}

export default DeletePhotocardModal;
