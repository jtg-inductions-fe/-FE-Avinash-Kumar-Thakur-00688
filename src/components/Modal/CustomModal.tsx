import { Modal } from '@mui/material';

import { ModalContainer } from './CustomModal.styles';
import { CustomModalProps } from './Modal.types';

/**
 * This component display the modal component
 * @param open - State to toggle mode of modal
 * @param onClose - Function to close modal
 * @param children - Content to be render inside modal
 */
export const CustomModal = ({ open, onClose, children }: CustomModalProps) => (
    <Modal open={open} onClose={onClose}>
        <ModalContainer>{children}</ModalContainer>
    </Modal>
);
