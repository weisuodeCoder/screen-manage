import React from 'react';
import './style.less';
import closeIcon from '../../assets/icon/close.svg';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal(props: ModalProps) {
    const { isOpen, onClose, children } = props;
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-close" onClick={onClose}>
                    <img src={closeIcon} alt="关闭" />
                </div>
                {children}
            </div>
        </div>
    );
}
