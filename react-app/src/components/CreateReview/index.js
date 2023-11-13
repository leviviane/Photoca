import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { getSinglePhotocardThunk } from "../../store/photocard";
import { createReviewThunk } from "../../store/review";
import "./CreateReview.css";

function CreateReview( {photocard} ) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const userId = useSelector((state) => state.session.user.id)
    const sessionUser = useSelector((state) => state.session.user)
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

        const newReview = {
            photocard_id: photocard.id,
            user_id: userId,
            text
         }
        // const formData = new FormData();
        // // formData.append("photocard_id", photocardId);
        // formData.append("user_id", userId);
        // formData.append('text', text)

        if (Object.keys(errorsFound).length === 0) {
            // console.log('HELOOOO', photocard.id)
            const res = await dispatch(createReviewThunk(newReview, photocard.id));

            closeModal();

            // if (res) {
            //     history.push(`/photocards/${res.id}`)
            // }
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


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { getSinglePhotocardThunk } from "../../store/photocard";
// import { createReviewThunk, getAllReviewsThunk } from "../../store/review";
// import "./CreateReview.css";

// const CreateReview = ({ photocardId }) => {
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.session.user);
//     const onePhotocard = useSelector((state) => state.photocard.singlePhotocard)
//     const { closeModal } = useModal();

//     const [text, setText] = useState("");
//     const [validateErrors, setValidateErrors] = useState({});
//     const [submitted, setSubmitted] = useState(false);

//     useEffect (() => {
//         const errors = {};
//         if (text.length < 10) errors.text = 'Review needs to be at least 10 character';
//         setValidateErrors(errors);
//     }, [text]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitted(true);

//         if (!Object.values(validateErrors).length && user.id !== onePhotocard.userId) {
//             const payload = { text: text }
//         };

//         await dispatch(createReviewThunk(payload, photocardId));
//         await dispatch(getSinglePhotocardThunk(photocardId));

//         closeModal();
//     }

//     return (
//         <div className='review-modal-container'>
//             <form className='submit-review-form' onSubmit={handleSubmit}>
//                 <div className='review-container'>
//                     <h2 className='purchase-line'>How was your photocard?</h2>
//                     {validateErrors && <p className='server-error'></p>}
//                     <textarea
//                     className='review-textarea'
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     placeholder='Review'
//                     />
//                 </div>
//                 <button
//                 className='submit-review-button'
//                 type='submit'
//                 disabled={Object.keys(validateErrors).length > 0 || text.length <10}
//                 >
//                     Post your Review
//                 </button>
//             </form>
//         </div>
//     )
// };

// export default CreateReview;
