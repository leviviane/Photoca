import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getSinglePhotocardThunk } from "../../store/photocard";
import { createReviewThunk } from "../../store/review";
import "./CreateReview.css";

function CreateReview() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id)
    // const photocardId = useSelector((state) => state.singlePhotocard.photocard.id)
    const { closeModal } = useModal();

    const [text, setText] = useState("");
    const [errors, setErrors] = useState({});

    function errorsCheck(text) {
        const errors = {};
        if (!text || text.length < 10) errors.text = "Review is required"

        setErrors(errors);
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsFound = errorsCheck(
            text
        );

        const formData = new FormData();
        // formData.append("photocard_id", photocardId);
        formData.append("user_id", userId);
        formData.append('text', text)

        if (Object.keys(errorsFound).length === 0) {
            const res = await dispatch(createReviewThunk(formData));

            if (res) {
                history.push(`/reviews/${res.id}`)
            }
        }
    }

    const cancelReview = (e) => {
        e.preventDefault();
        closeModal();
    };


    return (
        <div className='review-modal-container'>
            <form className='submit-review-form' onSubmit={handleSubmit}>
                <div className='review-container'>
                    <h2 className='purchase-line'>How was your photocard?</h2>
                    {errors && <p className='server-error'></p>}
                    <textarea
                    className='review-textarea'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Review'
                    />
                </div>
                <button
                className='submit-review-button'
                type='submit'
                disabled={Object.keys(errors).length > 0 || text.length <10}
                >
                    Post your Review
                </button>
            </form>
        </div>
    )
};

export default CreateReview;
