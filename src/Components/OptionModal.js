import React from "react";
import Modal from "react-modal";

const OptionModal = (props) => (
  <Modal
    isOpen={!!props.selectedOption} //to open the modal or not
    contentLabel="selected Option" //for people using accessibility
    ariaHideApp={false} //error
    closeTimeoutMS={200} //closing protal timing
    className="modal" //custom css for modal
    onRequestClose={props.clearOptionModal} //to close the modal when pressing esc or clicking around the modal
  >
    <h3 className="modal__title">Selected Option</h3>
    {props.selectedOption && (
      <p className="modal__body">{props.selectedOption}</p>
    )}
    <button className="button" onClick={props.clearOptionModal}>
      Okay
    </button>
  </Modal>
);

export default OptionModal;
