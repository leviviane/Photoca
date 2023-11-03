import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSinglePhotocardThunk, updatePhotocardThunk } from "../../store/photocard";
import "./UpdatePhotocard.css";

function UpdatePhotocard ({ photocardId, submitted }) {
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        const foundErrors = checkErrors(name, price, description);
    };

    const updatedPhotocard = {
        user_id: userId,
        id: photocardId,
        listing_name: name,
        price: price,
        description: description
    };

    if (Object.keys(foundErrors).length === 0) {
        const res = await dispatch(updatePhotocardThunk(updatedPhotocard));

        if (res) {
            submitted();
            history.pushState(`'photocards/${res.id}`)
        }
    }
}

export default UpdatePhotocard;
