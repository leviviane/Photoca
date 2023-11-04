import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSinglePhotocardThunk, updatePhotocardThunk } from "../../store/photocard";
import "./UpdatePhotocard.css";

function UpdatePhotocardForm ({ photocardId, submitted }) {
    const dispatch = useDispatch();
    const photocard = useSelector((state) => state.photocards.singlePhotocard);
    const userId = useSelector((state) => state.session.user.id);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getSinglePhotocardThunk(photocardId));
    }, [dispatch, photocardId]);

    useEffect(() => {
        setName(photocard.listing_name || "");
        setPrice(photocard.price || "");
        setDescription(photocard.description || "");
    }, [photocard])

    function checkErrors(name, price, description) {
        const errors = {};
        if (!name) errors.name = "Photocard name is required";
        if(!price) errors.price = "Price is required"
        if (description.length < 10) errors.description = "Description needs 10 or more characters";

        setErrors(errors);

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        const foundErrors = checkErrors(
          name,
          price,
          description
        );

        const updatedPhotocard = {
          user_id: userId,
          id: photocardId,
          name: name,
          price: price,
          description: description,
        };

        if (Object.keys(foundErrors).length === 0) {
          const res = await dispatch(updatePhotocardThunk(updatedPhotocard));

          if (res) {
            submitted();
          }
        }
      };


    // if (Object.keys(foundErrors).length === 0) {
    //     const res = await dispatch(updatePhotocardThunk(updatedPhotocard));

    //     if (res) {
    //         submitted();
    //     }
    // }

    return (
        <div className='update-photocard-container'>
            <div className='update-photocard-box'>
                <h1 className='update-title'>Update your Photocard</h1>
                <div className='update-photocard-form'>
                    <form className='update-photocard-form-box' onSubmit={handleSubmit}>
                        <div className='update-photocard-form-fields'>
                            <label>
                                Photocard Name
                                <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Photocard name'
                                />
                            </label>
                            {hasSubmitted && errors.name && (
                            <p className="errors">{errors.name}</p>)}
                            <label>
                                Change your Pricing
                                <span className='dollar-sign'>$</span>
                                <input
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder='Price (USD)'
                                />
                            </label>
                            {hasSubmitted && errors.price && (
                            <p className="errors">{errors.price}</p>)}
                            <label>
                                Description
                                <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Description'
                                rows='5'
                                ></textarea>
                            </label>
                            {hasSubmitted && errors.description && (
                            <p className="errors">{errors.description}</p>)}
                        </div>
                        <div className='photocard-update-form-button'>
                            <button type='submit'>Update photocard</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdatePhotocardForm;
