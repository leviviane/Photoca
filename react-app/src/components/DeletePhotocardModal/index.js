import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePhotocardThunk } from "../../store/photocard";
import "./DeletePhotocardModal.css";

function DeletePhotocardModal( { photocardId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [exist, setExist] = useState(true);
    const { closeModal } = useModal();

    const confirmDelete = (e) => {
        e.preventDefault();
        dispatch(deletePhotocardThunk(photocardId));
        closeModal();
        setExist(false);

        history.push('/photocards/current')
    }

    const cancelDelete = (e) => {
        e.preventDefault();
        closeModal();
    };

    const handleClose = () => {
        closeModal();
      };

    return (
        <>
        {exist && (
            <>
            <div className='delete-photocard-modal'>
                <button className='close-modal' onClick={handleClose}>
                    X
                </button>
                <h2 className='confirm-delete-title'>Confirm Delete</h2>
                <div className='ask-delete-box'>
                    Are you sure you want to delete this photocard listing?
                </div>
                <div className='delete-buttons'>
                    <button className='yes-delete-photocard' onClick={confirmDelete}>
                        Yes (Delete Photocard)
                    </button>
                    <button className='no-delete-photocard' onClick={cancelDelete}>
                        No (Keep Photocard)
                    </button>
                </div>
            </div>
            </>
        )}
        </>
    )
}

export default DeletePhotocardModal;
