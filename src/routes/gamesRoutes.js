import { Router } from "express";
import { createGame, getGames } from "../controllers/games.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/gameSchema.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateSchema(gameSchema), createGame);
gamesRouter.get('/games', getGames)

export default gamesRouter;
