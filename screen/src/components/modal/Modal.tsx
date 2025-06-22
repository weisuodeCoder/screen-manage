import React from "react";
import "./style.less";
import closeIcon from "../../assets/icon/close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function Modal(props: ModalProps) {
  const { isOpen, onClose, children, title } = props;
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">{title}</div>
        <div className="modal-close" onClick={onClose}>
          <img src={closeIcon} alt="关闭" />
        </div>
        {children}
      </div>
    </div>
  );
}
