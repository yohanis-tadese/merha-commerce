import Modal from "react-modal";

Modal.setAppElement("#root");

const CustomModal = ({ isOpen, onRequestClose, title, message, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      style={{
        content: {
          top: "30%",
          left: "60%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          border: "2px solid #ccc",
          padding: "20px",
          width: "400px",
          background: "#f8f8f8",
        },
      }}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="mb-6">{message}</p>
      <div className="flex justify-end">
        <button
          onClick={onRequestClose}
          className="px-4 py-2 mr-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition duration-200"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-200"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
