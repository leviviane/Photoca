import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import UpdatePhotocardForm from "../UpdatePhotocard";
import DeletePhotocardModal from "../DeletePhotocardModal";
import { getAllPhotocardThunk } from "../../store/photocard";
import "./ManagePhotocard.css";

function ManagePhotocard() {
  const dispatch = useDispatch();
  const photocards = useSelector((state) => state.photocards.allPhotocards);
  const photocardArr = Object.values(photocards);
  const user = useSelector((state) => state.session.user);

  const [submitted, setSubmitted] = useState(false);

  const userPhotocardArr = user
    ? photocardArr.filter((photocard) => photocard.user_id === user.id)
    : [];

  useEffect(() => {
    dispatch(getAllPhotocardThunk());
  }, [dispatch]);

  if (!photocardArr) {
    dispatch(getAllPhotocardThunk());
    return null;
  }

  if (submitted) {
    dispatch(getAllPhotocardThunk());
    setSubmitted(false);
  }

  return (
    <div className="manage-photocards-container">
      <h1 className="manage-title">Your Photocards</h1>
      <div className="manage-create-container">
        <NavLink to="/photocards/create" className="manage-create-link">
          Create a Photocard Listing
        </NavLink>
        <div className="manage-photocard-list">
          {userPhotocardArr.length > 0 ? (
            userPhotocardArr.map((photocard) => (
              <div className="photocard-manage" key={photocard.id}>
                <NavLink to={`/photocards/${photocard.id}`}>
                  <img
                    src={photocard.photocard_image}
                    className="image-box"
                    alt={photocard.listing_name}
                    name={photocard.listing_name}
                    title={photocard.listing_name}
                  />
                </NavLink>
                <p></p>
                <div className="update-button-container">
                  <div style={{ display: 'inline-block' }}>
                    <NavLink to={`/photocards/${photocard.id}/update`}>
                      <button className="manage-update-button">Update</button>
                    </NavLink>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <OpenModalButton
                      buttonText="Delete"
                      styling='delete-photocard-pop-up'
                      modalComponent={
                        <DeletePhotocardModal
                          submitted={() => setSubmitted(true)}
                          photocard={photocard}
                          userId={photocard.user_id}
                        />
                      }
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>You don't have any photocard listings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagePhotocard;
