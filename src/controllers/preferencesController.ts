import type { Request, Response } from "express";
import { AppError } from "../errors.ts";
import { preferencesService } from "../services/preferencesService.ts";

function sendError(res: Response, error: unknown): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: error.message,
      details: error.details
    });
    return;
  }

  res.status(500).json({ error: "Unexpected error" });
}

export const preferencesController = {
  get(req: Request, res: Response): void {
    try {
      const record = preferencesService.get(req.params.userId);
      res.status(200).json(record);
    } catch (error) {
      sendError(res, error);
    }
  },

  replace(req: Request, res: Response): void {
    try {
      const record = preferencesService.replace(req.params.userId, req.body);
      res.status(200).json(record);
    } catch (error) {
      sendError(res, error);
    }
  },

  patch(req: Request, res: Response): void {
    try {
      const record = preferencesService.patch(req.params.userId, req.body);
      res.status(200).json(record);
    } catch (error) {
      sendError(res, error);
    }
  }
};
