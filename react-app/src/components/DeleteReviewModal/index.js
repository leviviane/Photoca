import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/review";
import "./DeleteReviewModal.css";


function DeleteReviewModal ({ review, photocard }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [exist, setExist] = useState(true);

    const confirmDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(review, photocard));
        setExist(false);
        closeModal();
    };

    const cancelDelete = (e) => {
        e.preventDefault();
        closeModal();
    };

    const handleClose = () => {
        closeModal();
    }

    return (
        <>
        {exist && (
            <>
            <div className='delete-review-modal'>
                <button className='close-review-modal' onClick={handleClose}>
                    X
                </button>
                <h2 className='confirm-review-delete-title'>Confirm Delete</h2>
                <div className='review-ask-delete-box'>
                    Are you sure you want to delete this review?
                </div>
                <div className='review-delete-buttons'>
                    <button className='yes-delete-review' onClick={confirmDelete}>
                        Yes (Delete Review)
                    </button>
                    <button className='no-delete-review' onClick={cancelDelete}>
                        No (Keep Review)
                    </button>
                </div>
            </div>
            </>
        )}
        </>
    )
};

export default DeleteReviewModal;
