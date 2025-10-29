import { useSelector } from "react-redux";
import { selectModals, createModal } from "./modalSlice";
import { useEffect } from "react";
import './Modals.css';
import Modal from "./Modal";

export default function ModalManager() {
    const modals = useSelector(selectModals);

    useEffect(() => {
        //console.log(modals);
    }, [modals])

    return (
        <div className="modal-manager">
            {modals.map(modal => {
                return (
                    <Modal
                        id={modal.id}
                        label={modal.label}
                        children={modal.children}
                        persistent={modal.persistent}
                        key={modal.id}
                    />
                )
            })}
        </div>
    );
}