import React from "react";


interface ModalProps {
    buttonText?: string;
    isOpen: boolean;
    message: string;
    title: string;
    type: "error" | "success" | "info";
    onClose: () => void;
}


const Modal = ({ 
    buttonText = "Close",
    isOpen, 
    message, 
    title, 
    type,
    onClose, 
}: ModalProps) => {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case "error":
                return "border-red-500 bg-red-50";
            case "success":
                return "border-green-500 bg-green-50";
            case "info":
                return "border-blue-500 bg-blue-50";
            default:
                return "border-gray-500 bg-gray-50";
            }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`bg-white rounded-lg p-6 max-w-sm w-full mx-4 border-2 ${getTypeStyles()}`}>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                
                <div className="flex justify-end">
                    <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={onClose}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Modal;