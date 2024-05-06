import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware function to handle input errors.
 * Validates the request using `validationResult` and returns a 400 response with the validation errors if any.
 * Otherwise, calls the next middleware function.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
