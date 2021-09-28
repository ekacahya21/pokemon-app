import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Icon from 'Components/Icon';
import classes from './style.scss';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const Modal = ({ isOpen, children, handleClose }) => (
  <ReactModal
    isOpen={isOpen}
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

Modal.propTypes = propTypes;

export default Modal;
