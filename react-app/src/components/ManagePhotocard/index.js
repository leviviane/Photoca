import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import UpdatePhotocardForm from "../UpdatePhotocard";
import DeletePhotocardModal from "../DeletePhotocardModal";
import { getAllPhotocardThunk, getPhotocardsByUserThunk } from "../../store/photocard";
import "./ManagePhotocard.css"

function ManagePhotocard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userPhotocards = useSelector((state) => state.photocards.allPhotocards);
    const photocardObj = Object.values(userPhotocards);
    const { userId } = useParams();
    console.log('HELLOOOOOO', userId)

    useEffect(() => {
        dispatch(getPhotocardsByUserThunk(userId));
    }, [dispatch, userId]);

    const newPhotocard = () => {
        history.push('/photocards/create')
    };

    return (
        <div className="manage-photocards-container">
          <h1 className='manage-title'>Your Photocards</h1>
          <div className="manage-create-container">
            <button className="manage-create-button" onClick={newPhotocard}>
              Create a Photocard Listing
            </button>
            <div className="manage-photocard-list">
              {photocardObj.length > 0 ? (
                photocardObj.map((photocard) => (
                  <div className="photocard-manage" key={photocard.id}>
                    <NavLink to={`/photocard/${photocard.id}`}>
                      <img
                        src={photocard.photocard_image}
                        className="image-box"
                        alt={photocard.listing_name}
                        name={photocard.listing_name}
                      />
                    </NavLink>
                    <div className="update-button-container">
                        <div style={{ display: 'inline-block' }}>
                            <NavLink to={`/photocards/${photocard.id}/update`}>
                                <button className="manage-update-button">Update</button>
                                </NavLink>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={
                                    <DeletePhotocardModal photocardId={photocard.id} userId={photocard.userId} />
                                } />
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
