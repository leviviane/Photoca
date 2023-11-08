import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updatePhotocardThunk, getSinglePhotocardThunk } from "../../store/photocard";
import "./UpdatePhotocard.css";

function UpdatePhotocard({ reload }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { photocardId } = useParams();
    const userId = useSelector((state) => state.session.user.id)
    const photocardObj = useSelector((state) => state.photocardId.singlePhotocard)

    const [name, setName] = useState(photocardObj.listing_name || "");
    const [price, setPrice] = useState(photocardObj.price || "");
    const [description, setDescription] = useState(photocardObj.description || "");
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getSinglePhotocardThunk(photocardId));
    }, [dispatch, photocardId])

    useEffect(() => {
        setName(photocardObj.listing_name || "");
        setPrice(photocardObj.price || "");
        setDescription(photocardObj.description || "");
    }, photocardObj);

    function checkErrors(name, price, description) {
        const errors = {};
        if (!name) errors.name = "Photocard name is required";
        if (!price) errors.price = "Price is required";
        if (price <= 0) errors.price = "Price must be greater than $0";
        if (!description) errors.description = "Description is required";
        if (description.length < 10) errors.description = "Description must be at least 10 characters";

        setErrors(errors);

        return errors;
    }

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
            listing_name: name,
            price: price,
            description: description
        };

        if (Object.keys(foundErrors).length === 0) {
            const res = await dispatch(updatePhotocardThunk(updatedPhotocard));

            if (res && res.id) {
                reload();
                dispatch(getSinglePhotocardThunk(photocardId));
                history.push(`/photocards/${res.id}`)
            }
        }
    }

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
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Photocard Name"
                      />
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
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price (USD)"
                      />
                    </div>
                  </label>
                  {hasSubmitted && errors.price && (
                    <p className="errors">{errors.price}</p>
                  )}
                </div>
                <div className="update-photocard-fields">
                  <label className="update-photocard-label">
                    Describe the details of your photocard
                    <textarea
                      type="textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                    />
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


}

export default UpdatePhotocard;




// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { updatePhotocardThunk, getSinglePhotocardThunk } from "../../store/photocard";
// import "./UpdatePhotocard.css";

// function UpdatePhotocard({ submitted }) {
//   const dispatch = useDispatch();
//   const { photocardId } = useParams();
//   const photocardObj = useSelector((state) => state.photocards.singlePhotocard);
//   const userId = useSelector((state) => state.session.user.id);

//   const [name, setName] = useState(photocardObj.listing_name || "");
//   const [price, setPrice] = useState(photocardObj.price || "");
//   const [description, setDescription] = useState(photocardObj.description || "");
//   const [errors, setErrors] = useState({});
//   const [hasSubmitted, setHasSubmitted] = useState(false);

//   useEffect(() => {
//     dispatch(getSinglePhotocardThunk(photocardId));
//   }, [dispatch, photocardId]);

//   useEffect(() => {
//     setName(photocardObj.listing_name || "");
//     setPrice(photocardObj.price || "");
//     setDescription(photocardObj.description || "");
//   }, [photocardObj]);

//   function errorsChecked(name, price, description) {
//     const errors = {};
//     if (!name) errors.name = "Photocard name is required";
//     if (!price) errors.price = "Price is required";
//     if (!description) errors.description = "Description is required";

//     setErrors(errors);

//     return errors;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setHasSubmitted(true);
//     const errorsFound = errorsChecked(
//       name,
//       price,
//       description
//     );

//     const updatedPhotocard = {
//       user_id: userId,
//       id: photocardId,
//       listing_name: name,
//       price: price,
//       description: description,
//     };

//     if (Object.keys(errorsFound).length === 0) {
//       const res = await dispatch(updatePhotocardThunk(updatedPhotocard));

//       if (res) {
//         dispatch(getSinglePhotocardThunk(photocardId));
//       }
//     }
//   };

//   return (
//     <div className="main-update-photocard-container">
//       <div className="update-container">
//         <div className="update-photocard-title">Update your Photocard Listing</div>
//         <div className="update-photocard-form-container">
//           <form className="update-photocard-form" onSubmit={handleSubmit}>
//             <div className="update-photocard-fields">
//               <label className="update-photocard-label">
//                 Photocard Name
//                 <div className="update-photocard-name">
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Photocard Name"
//                   />
//                 </div>
//               </label>
//               {hasSubmitted && errors.name && (
//                 <p className="errors">{errors.name}</p>
//               )}
//             </div>
//             <div className="update-photocard-fields">
//               <label className="update-photocard-label">
//                 How much will you list this photocard for?
//                 <div className="update-photocard-price">
//                   <input
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     placeholder="Price (USD)"
//                   />
//                 </div>
//               </label>
//               {hasSubmitted && errors.price && (
//                 <p className="errors">{errors.price}</p>
//               )}
//             </div>
//             <div className="update-photocard-fields">
//               <label className="update-photocard-label">
//                 Describe the details of your photocard
//                 <textarea
//                   type="textarea"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Description"
//                 />
//               </label>
//               {hasSubmitted && errors.description && (
//                 <p className="errors">{errors.description}</p>
//               )}
//             </div>
//             <div className="update-photocard-button-container">
//               <button type="submit" className="update-photocard-button">
//                 Update photocard
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );

// };

// export default UpdatePhotocard;




// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import { getSinglePhotocardThunk, updatePhotocardThunk } from "../../store/photocard";
// import { useModal } from "../../context/Modal";
// import "./UpdatePhotocard.css";

// function UpdatePhotocardForm ({ submitted }) {
//     const dispatch = useDispatch();
//     const photocard = useSelector((state) => state.photocards.singlePhotocard);
//     const userId = useSelector((state) => state.session.user.id);
//     const { photocardId } = useParams();
//     const { closeModal } = useModal();

//     const [name, setName] = useState("");
//     const [price, setPrice] = useState("");
//     const [description, setDescription] = useState("");
//     const [errors, setErrors] = useState({});
//     const [hasSubmitted, setHasSubmitted] = useState(false);

//     useEffect(() => {
//         dispatch(getSinglePhotocardThunk(photocardId));
//     }, [dispatch, photocardId]);

//     useEffect(() => {
//         setName(photocard.listing_name || "");
//         setPrice(photocard.price || "");
//         setDescription(photocard.description || "");
//     }, [photocard])

//     function checkErrors(name, price, description) {
//         const errors = {};
//         if (!name) errors.name = "Photocard name is required";
//         if(!price) errors.price = "Price is required"
//         if (description.length < 10) errors.description = "Description needs 10 or more characters";

//         setErrors(errors);

//         return errors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setHasSubmitted(true);
//         const foundErrors = checkErrors(
//           name,
//           price,
//           description
//         );

//         const updatedPhotocard = {
//           user_id: userId,
//           id: photocardId,
//           name: name,
//           price: price,
//           description: description,
//         };

//         if (Object.keys(foundErrors).length === 0) {
//           const res = await dispatch(updatePhotocardThunk(updatedPhotocard));

//           if (res) {
//             submitted();
//             dispatch(getSinglePhotocardThunk(photocardId)).then(closeModal());
//           }
//         }
//       };

//       const handleClose = () => {
//         closeModal();
//       }


//     // if (Object.keys(foundErrors).length === 0) {
//     //     const res = await dispatch(updatePhotocardThunk(updatedPhotocard));

//     //     if (res) {
//     //         submitted();
//     //     }
//     // }

//     return (
//         <div className='update-photocard-container'>
//             <div className='update-photocard-box'>
//                 <h1 className='update-title'>Update your Photocard</h1>
//                 <div className='update-photocard-form'>
//                     <form className='update-photocard-form-box' onSubmit={handleSubmit}>
//                         <div className='update-photocard-form-fields'>
//                             <label>
//                                 Photocard Name
//                                 <input
//                                 type='text'
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 placeholder='Photocard name'
//                                 />
//                             </label>
//                             {hasSubmitted && errors.name && (
//                             <p className="errors">{errors.name}</p>)}
//                             <label>
//                                 Change your Pricing
//                                 <span className='dollar-sign'>$</span>
//                                 <input
//                                 type='number'
//                                 value={price}
//                                 onChange={(e) => setPrice(e.target.value)}
//                                 placeholder='Price (USD)'
//                                 />
//                             </label>
//                             {hasSubmitted && errors.price && (
//                             <p className="errors">{errors.price}</p>)}
//                             <label>
//                                 Description
//                                 <textarea
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 placeholder='Description'
//                                 rows='5'
//                                 ></textarea>
//                             </label>
//                             {hasSubmitted && errors.description && (
//                             <p className="errors">{errors.description}</p>)}
//                         </div>
//                         <div className='photocard-update-form-button'>
//                             <button type='submit'>Update photocard</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default UpdatePhotocardForm;
