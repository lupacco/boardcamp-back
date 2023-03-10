import { Router } from "express";
import {
  createGame,
  getGames,
} from "../controllers/games/games.controllers.js";
import { checkGameExistence } from "../middlewares/gameValidations.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/gameSchema.js";

const gamesRouter = Router();

gamesRouter.post(
  "/games",
  validateSchema(gameSchema),
  checkGameExistence,
  createGame
);
gamesRouter.get("/games", getGames);

export default gamesRouter;
