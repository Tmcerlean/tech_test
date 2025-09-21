import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// GET /api/games - get all game results
export const getGameResults = async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch game results' });
  }
};

// POST /api/games - set/create a new game result
export const setGameResult = async (req: Request, res: Response) => {
  try {
    const { winner } = req.body;

    if (!winner) {
      return res.status(400).json({ error: 'Winner is required' });
    }

    const game = await prisma.game.create({
      data: { winner }
    });

    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to set game result' });
  }
};