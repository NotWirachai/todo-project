import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

interface MyModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

const MyModal: React.FC<MyModalProps> = ({ isOpen, title, children }) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "gray",
      borderRadius: "10px",
      padding: "2em",
      width: "50%",
      maxWidth: "480px",
    },
  };

  return (
    <ReactModal isOpen={isOpen} contentLabel={title} style={customStyles}>
      <h2 className="text-4xl dark: text-gray-100 font-bold text-center">{title}</h2>
      {children}
    </ReactModal>
  );
};

export default MyModal;
