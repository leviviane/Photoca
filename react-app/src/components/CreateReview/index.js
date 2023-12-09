import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { getSinglePhotocardThunk } from "../../store/photocard";
import { createReviewThunk } from "../../store/review";
import "./CreateReview.css";

function CreateReview({ photocard }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const userId = useSelector((state) => state.session.user.id);
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();

  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function errorsCheck(text) {
    const errors = {};
    if (!text || text.length < 10)
      errors.text = "Review must be at least 10 characters";

    setErrors(errors);
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsFound = errorsCheck(text);

    const newReview = {
      photocard_id: photocard.id,
      user_id: userId,
      text,
    };

    if (Object.keys(errorsFound).length === 0) {
      const res = await dispatch(createReviewThunk(newReview, photocard.id));

      closeModal();
    }
  };

  return (
    <div className="review-modal-container">
      <form className="submit-review-form" onSubmit={handleSubmit}>
        <div className="review-container">
          <h2 className="purchase-line">How was your photocard?</h2>
          {errors && <p className="server-error"></p>}
          <textarea
            className="review-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Review must be at least 10 characters"
          />
        </div>
        {hasSubmitted && errors.text && (
          <p className="create-review-errors">{errors.text}</p>
        )}
        <button
          className="submit-review-button"
          type="submit"
        >
          Post your Review
        </button>
      </form>
    </div>
  );
}

export default CreateReview;
