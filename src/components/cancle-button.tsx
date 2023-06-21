import React from "react";

interface CancelButtonProps {
  onRequestClose: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onRequestClose }) => {
  return (
    <button
      className="w-full my-5 py-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      style={{ marginRight: 12 }}
      onClick={onRequestClose}
    >
      Cancel
    </button>
  );
};

export default CancelButton;
