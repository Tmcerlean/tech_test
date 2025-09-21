export type ModalConfig = {
    buttonText?: string;
    isOpen: boolean;
    message: string;
    title: string;
    type: "error" | "success" | "info";
    onClose: () => void;
};

export const createErrorModal = (message: string, onClose: () => void): ModalConfig => ({
    isOpen: true,
    message,
    title: "Invalid Move",
    type: "error",
    onClose
});

export const createWinnerModal = (winner: string, onClose: () => void): ModalConfig => ({
    buttonText: "New Game",
    isOpen: true,
    message: `Winner: ${winner}!`,
    title: "Game Over!",
    type: "success",
    onClose
});

export const createDrawModal = (onClose: () => void): ModalConfig => ({
    buttonText: "New Game",
    isOpen: true,
    message: "It's a draw! No one wins this time.",
    title: "Game Over!",
    type: "info",
    onClose
});