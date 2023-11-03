import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPhotCardThunk } from "../../store/photocard";
import "./CreatePhotocard.css";

function CreatePhotocardForm({ reload }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id)

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [image, setImage] = useState(null);
    const [imageUploading, setImageUploading] = useState(false)
    const [errors, setErrors] = useState({});

    function checkErrors(name, price, description, img) {
        const errors = {};
        if (!name) errors.name = "Photocard name is required";
        if(!price) errors.price = "Price is required"
        if (description.length < 10) errors.description = "Description needs 10 or more characters";
        if (!image) errors.img = "Image is required"

        setErrors(errors);

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const foundErrors = checkErrors(name, price, description, image);

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('listing_name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('photocard_image', image);

        if (Object.keys(foundErrors).length === 0) {
            const res = await dispatch(createPhotCardThunk(formData));
            setImageUploading(true);

            if (res) {
                reload();
                history.push(`photocards/${res.id}`);
            }
        }
    }

    return (
        <div className='create-photocard-form-container'>
            <div className='photocard-form-title'>Post your Photocard Listing</div>
            <form onSubmit={handleSubmit}>
                <div className='photocard-form-fields'>
                    <label>
                        Photocard name
                        <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Photocard name"
                        />
                    </label>
                    {errors.name && <p className='errors'>{errors.name}</p>}
                    <label>
                        Name your Price!
                        <span className='dollar-sign'>$</span>
                        <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price (USD)"
                        />
                    </label>
                    {errors.price && <p className='errors'>{errors.price}</p>}
                    <label>
                        Catch the fans attention! Highlight what makes your card different from others.
                        <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        rows="5"
                        ></textarea>
                    </label>
                    {errors.description && <p className='errors'>{errors.description}</p>}
                    <label>
                        Show Off your Photocard
                        <input
                        type='url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="preview Image url"
                        />
                    </label>
                    {errors.image && <p className='errors'>{errors.image}</p>}
                </div>
                <div className="photocard-form-submit-button">
                    <button type="submit">Post photocard</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePhotocardForm;
