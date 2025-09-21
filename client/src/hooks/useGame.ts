import { useState } from "react";

import { GameStatus, XorO } from "../types";
import { checkWinCondition } from "../utils/gameUtils";
import { createEmptyBoard, isBoardFull, placePiece } from "../utils/boardUtils";
import { createErrorModal, createWinnerModal, createDrawModal } from "../utils/modalUtils";


const useGame = () => {
    const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
    const [winningPlayer, setWinningPlayer] = useState<XorO | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<XorO>("X");
    const [boardSize, setBoardSize] = useState<number>(3);
    const [board, setBoard] = useState(createEmptyBoard(boardSize));
    const [modal, setModal] = useState<{
        buttonText?: string;
        isOpen: boolean;
        message: string;
        title: string;
        type: "error" | "success" | "info";
        onClose: () => void;
    } | null>(null);

    const switchPlayer = () => {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    };

    const endGame = (winner: XorO) => {
        setGameStatus("winner");
        setWinningPlayer(winner);
    };

    const setDraw = () => {
        setGameStatus("draw");
    };

    const resetGame = () => {
        setCurrentPlayer("X");
        setGameStatus("playing");
        setWinningPlayer(null);
        setBoard(createEmptyBoard(boardSize));
        setModal(null);
    };

    const showErrorModal = (message: string) => {
        setModal(createErrorModal(message, () => setModal(null)));
    };

    const showWinnerModal = (winner: XorO) => {
        setModal(createWinnerModal(winner, resetGame));
    };

    const showDrawModal = () => {
        setModal(createDrawModal(resetGame));
    };

    const playMove = (rowIndex: number, columnIndex: number) => {
        if (board[rowIndex][columnIndex] !== null) {
            showErrorModal("This cell is already occupied. Please choose an empty cell.");
            return;
        }

        const newBoard = placePiece(board, rowIndex, columnIndex, currentPlayer);
        setBoard(newBoard);

        if (checkWinCondition(rowIndex, columnIndex, newBoard)) {
            endGame(currentPlayer);
            showWinnerModal(currentPlayer);
            return;
        }

        if (isBoardFull(newBoard)) {
            setDraw();
            showDrawModal();
            return;
        }

        switchPlayer();
    };

    const changeBoardSize = (newSize: number) => {
        if (newSize >= 3 && newSize <= 15) {
            setBoardSize(newSize);
            setBoard(createEmptyBoard(newSize));
            setCurrentPlayer("X");
            setGameStatus("playing");
            setWinningPlayer(null);
            setModal(null);
        }
    };

    return {
        board,
        currentPlayer,
        gameStatus,
        modal,
        winningPlayer,
        changeBoardSize,
        playMove,
        resetGame,
        showErrorModal,
        showWinnerModal
    }
};

export default useGame;