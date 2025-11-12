import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const [portalRoot, setPortalRoot] = useState<Element | null>(null);

  useEffect(() => {
    const el = document.getElementById("portal-root");
    setPortalRoot(el);
  }, []);

  if (!portalRoot) return null;

  return createPortal(
    <div
      className={styles.portal}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.portalInside}
        role="document"
      >
        {children}
      </div>
    </div>,
    portalRoot
  );
}
