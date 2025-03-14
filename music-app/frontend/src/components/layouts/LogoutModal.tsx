import React from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// Modal-komponent för utloggningsbekräftelse
const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  // Visa inte modalen om den inte är öppen
  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-10 flex items-start justify-end z-50">
      <div className="bg-zinc-900 p-4 rounded-lg shadow-lg w-64 border border-zinc-700">
        <h2 className="text-white text-lg mb-2 font-semibold">
          Confirm Logout
        </h2>
        <p className="text-zinc-300 text-sm mb-4">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-700 text-white hover:bg-zinc-600 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 text-sm rounded-md bg-white text-black hover:opacity-80 transition-opacity duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
