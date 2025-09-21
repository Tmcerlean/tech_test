import express from 'express';
import { getGameResults, setGameResult } from '../controllers/gameController';

const router = express.Router();

// GET /api/games - get all game results
router.get('/', getGameResults);

// POST /api/games - set/create a new game result
router.post('/', setGameResult);

export default router;