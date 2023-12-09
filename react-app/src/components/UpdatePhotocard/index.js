import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { updatePhotocardThunk, getSinglePhotocardThunk } from "../../store/photocard";
import "./UpdatePhotocard.css";

function UpdatePhotocard({ submitted }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photocardId } = useParams();
  const photocardObj = useSelector((state) => state.photocards.singlePhotocard);
  const userId = useSelector((state) => state.session.user.id);

  const [name, setName] = useState(photocardObj.listing_name || "");
  const [price, setPrice] = useState(photocardObj.price);
  const [description, setDescription] = useState(photocardObj.description || "");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getSinglePhotocardThunk(photocardId));
  }, [dispatch, photocardId]);

  useEffect(() => {
    setName(photocardObj.listing_name || "");
    setPrice(photocardObj.price || 0);
    setDescription(photocardObj.description || "");
  }, [photocardObj]);



  function errorsChecked(name, price, description) {
    const errors = {};
    if (!name) errors.name = "Photocard name is required";
    if (!price) errors.price = "Price is required";
    if (!description) errors.description = "Description is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsFound = errorsChecked(
      name,
      price,
      description
    );

    const updatedPhotocard = {
      user_id: userId,
      id: photocardId,
      listing_name: name,
      price,
      description: description,
    };

    if (Object.keys(errorsFound).length === 0) {
      const res = await dispatch(updatePhotocardThunk(updatedPhotocard));

      if (res) {
        dispatch(getSinglePhotocardThunk(photocardId));
        // history.push(`/photocards/${photocardId}`);
        history.push(`/photocards/current`);
      }
    }
  };

  return (
    <div className="main-update-photocard-container">
      <div className="update-container">
        <div className="update-photocard-title">Update your Photocard Listing</div>
        <div className="update-photocard-form-container">
          <form className="update-photocard-form" onSubmit={handleSubmit}>
            <div className="update-photocard-fields">
              <label className="update-photocard-label">
                Photocard Name
                <div className="update-photocard-name">
                  <div className='update-name-input'>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Photocard Name"
                  />
                  </div>
                </div>
              </label>
              {hasSubmitted && errors.name && (
                <p className="errors">{errors.name}</p>
              )}
            </div>
            <div className="update-photocard-fields">
              <label className="update-photocard-label">
                How much will you list this photocard for?
                <div className="update-photocard-price">
                  <div className='update-price-input'>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price (USD)"
                  />
                  </div>
                </div>
              </label>
              {hasSubmitted && errors.price && (
                <p className="errors">{errors.price}</p>
              )}
            </div>
            <div className="update-photocard-fields">
              <label className="update-photocard-label">
                Describe the details of your photocard
                <div className='update-text-area'>
                  <div className='update-text-area-input'>
                <textarea
                  type="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
                  </div>
                </div>
              </label>
              {hasSubmitted && errors.description && (
                <p className="errors">{errors.description}</p>
              )}
            </div>
            <div className="update-photocard-button-container">
              <button type="submit" className="update-photocard-button">
                Update photocard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default UpdatePhotocard;
