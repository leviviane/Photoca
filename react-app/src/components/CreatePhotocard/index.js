import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPhotoCardThunk, getSinglePhotocardThunk } from "../../store/photocard";
import "./CreatePhotocard.css";

function CreatePhotocardForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);

  const [photocardName, setPhotocardName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  function errorsChecked(photocardName, price, description) {
    const errors = {};
    if (!photocardName) errors.photocardName = "Photocard name is required";
    if (!price) errors.price = 'Price is required'
    if (!image) errors.image = "Photocard is required";
    if (!description) errors.description = "Description is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(
      photocardName,
      price,
      description,
      image
    );

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("listing_name", photocardName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("photocard_image", image);

    if (Object.keys(errorsFound).length === 0) {
      const res = await dispatch(createPhotoCardThunk(formData));
      setImageLoading(true);

      if (res) {
        history.push(`/photocards/${res.id}`);
      }
    }
  };

  return (
    <div className="create-photocard-form-container">
      <div className="create-background">
        <div className="create-drama-header">Post your Photocard Listing</div>
        <div className="create-drama-form-container">
          <form
            className="create-photocard-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="create-photocard-title">
              <label className="create-photocard-label">
                Name your Photocard
              </label>
              <input
                type="text"
                value={photocardName}
                onChange={(e) => setPhotocardName(e.target.value)}
                placeholder="Photocard Name"
              />
              {errors.photocardName && (
                <p className="create-photocard-errors">{errors.photocardName}</p>
              )}
            </div>
            <div className="create-photocard-img">
              {" "}
              <label className="create-photocard-label">
                Upload your Photocard picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {errors.image && (
                <p className="create-photocard-errors">{errors.image}</p>
              )}
              {imageLoading && <p>Loading...</p>}
            </div>
            <div className="create-photocard-price">
              <label className="create-price-label">
                How much is your Photocard?
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price (USD)"
              />
              {errors.price && (
                <p className="create-photocard-errors">{errors.price}</p>
              )}
            </div>
            <div className="create-photocard-description">
              <label className="create-photocard-label">
                Catch the fans attention! Highlight what makes your card different from others.
              </label>
              <textarea
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
              {errors.description && (
                <p className="create-photocard-errors">{errors.description}</p>
              )}
            </div>
            <div className="create-photocard-submit">
              <button
                type="submit"
                className="create-photocard-button"
              >
                Post Photocard!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePhotocardForm;

//!! second try
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { createPhotoCardThunk } from "../../store/photocard";
// import "./CreatePhotocard.css";

// function CreatePhotocardForm() {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const userId = useSelector((state) => state.session.user.id)

//     const [name, setName] = useState("");
//     const [price, setPrice] = useState("");
//     const [description, setDescription] = useState("");

//     const [img, setImg] = useState(null);
//     const [imageUploading, setImageUploading] = useState(false)
//     const [errors, setErrors] = useState({});

//     function checkErrors(name, price, description, img) {
//         const errors = {};
//         if (!name) errors.name = "Photocard name is required";
//         if(!price) errors.price = "Price is required"
//         if (!description) errors.description = 'Description is required'
//         // if (description.length < 10) errors.description = "Description needs 10 or more characters";
//         if (!img) errors.img = "Image is required"

//         setErrors(errors);

//         return errors;
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const foundErrors = checkErrors(name, price, description, img);

//         const formData = new FormData();
//         formData.append('listing_name', name);
//         formData.append('user_id', userId)
//         formData.append('price', price);
//         formData.append('description', description);
//         formData.append('photocard_image', img);

//         if (Object.keys(foundErrors).length === 0) {
//             const res = await dispatch(createPhotoCardThunk(formData));
//             setImageUploading(true);

//             if (res) {
//                 // const newPhotocard = await res.json();
//                 // dispatch(getSinglePhotocardThunk(newPhotocard.id))
//                 history.push(`/photocards/${res.id}`);
//             }
//         }
//     }

//     return (
//         <div className='create-photocard-form-container'>
//             <div className='photocard-form-title'>Post your Photocard Listing</div>
//             <form
//             className='photocard-upload-form'
//             onSubmit={handleSubmit}
//             encType="multipart/form-data"
//             >
//                 <div className='photocard-form-fields'>
//                     <label>
//                         Photocard name
//                         <input
//                         type='text'
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Photocard name"
//                         />
//                     </label>
//                     {errors.name && <p className='errors'>{errors.name}</p>}
//                     <label>
//                         Name your Price!
//                         <span className='dollar-sign'>$</span>
//                         <input
//                         type='number'
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                         placeholder="Price (USD)"
//                         />
//                     </label>
//                     {errors.price && <p className='errors'>{errors.price}</p>}
//                     <label>
//                         Catch the fans attention! Highlight what makes your card different from others.
//                         <textarea
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Description"
//                         rows="5"
//                         ></textarea>
//                     </label>
//                     {errors.description && <p className='errors'>{errors.description}</p>}
//                     <label>
//                         Show Off your Photocard
//                         <input
//                         type='file'
//                         // value={image}
//                         onChange={(e) => setImg(e.target.files[0])}
//                         placeholder="preview Image url"
//                         />
//                     </label>
//                     {errors.img && <p className='errors'>{errors.img}</p>}
//                 </div>
//                 <div className="photocard-form-submit-button">
//                     <button type="submit">Post photocard</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default CreatePhotocardForm;


//!! first try
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { createPhotoCardThunk, getSinglePhotocardThunk } from "../../store/photocard";
// import "./CreatePhotocard.css";

// export const CreatePhotocardForm = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const [name, setName] = useState("");
//     const [price, setPrice] = useState("");
//     const [description, setDescription] = useState("");

//     const [img, setImg] = useState(null);
//     const [imageUploading, setImageUploading] = useState(false)
//     const [errors, setErrors] = useState({});

//     function errorsChecked(
//         name,
//         price,
//         description,
//         img
//     ) {
//         const errors = {};
//         if (!name) errors.name = "Photocard name is required";
//         if(!price) errors.price = "Price is required";
//         if (description.length < 10) errors.description = "Description needs 10 or more characters";
//         if (!img) errors.img = "Image is required";

//         setErrors(errors);

//         return errors;
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const errorsFound = errorsChecked(
//             name,
//             price,
//             description,
//             img
//         );

//         if (Object.keys(errorsFound).length === 0) {
//             const payload = {
//                 name,
//                 price,
//                 description,
//                 img
//             };

//             const newPhotocard = await dispatch(createPhotoCardThunk(payload));

//             if (newPhotocard) {
//                 dispatch(getSinglePhotocardThunk(newPhotocard.id));
//                 history.push(`/photocards/${newPhotocard.id}`)
//             }
//         }
//     };

//     return (
//         <div className='create-photocard-form-container'>
//             <div className='photocard-form-title'>Post your Photocard Listing</div>
//             <form
//             className='photocard-upload-form'
//             onSubmit={handleSubmit}
//             encType="multipart/form-data"
//             >
//                 <div className='photocard-form-fields'>
//                     <label>
//                         Photocard name
//                         <input
//                         type='text'
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Photocard name"
//                         />
//                     </label>
//                     {errors.name && <p className='errors'>{errors.name}</p>}
//                     <label>
//                         Name your Price!
//                         <span className='dollar-sign'>$</span>
//                         <input
//                         type='number'
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                         placeholder="Price (USD)"
//                         />
//                     </label>
//                     {errors.price && <p className='errors'>{errors.price}</p>}
//                     <label>
//                         Catch the fans attention! Highlight what makes your card different from others.
//                         <textarea
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Description"
//                         rows="5"
//                         ></textarea>
//                     </label>
//                     {errors.description && <p className='errors'>{errors.description}</p>}
//                     <label>
//                         Show Off your Photocard
//                         <input
//                         type='file'
//                         // value={image}
//                         onChange={(e) => setImg(e.target.files[0])}
//                         placeholder="preview Image url"
//                         />
//                     </label>
//                     {errors.img && <p className='errors'>{errors.img}</p>}
//                 </div>
//                 <div className="photocard-form-submit-button">
//                     <button type="submit">Post photocard</button>
//                 </div>
//             </form>
//         </div>
//     )
// };

// export default CreatePhotocardForm;
