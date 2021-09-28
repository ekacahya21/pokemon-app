import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Icon from 'Components/Icon';
import classes from './style.scss';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const Modal = ({ isOpen, children }) => {
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ReactModal
      isOpen={open}
      overlayClassName={classes.modalOverlay}
      className={classes.modalContent}
      ariaHideApp={false}
    >
      <div className={classes.closeBtn} onClick={handleClose}>
        <Icon name="cancel" className={classes.closeIcon} />
      </div>
      {children}
    </ReactModal>
  );
};

Modal.propTypes = propTypes;

export default Modal;
