import { Request, Response } from 'express';
import { authenticateUser } from '../../services/auth';

/**
 * @openapi
 * /auth:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:   # User Email
 *                 type: string
 *                 format: string
 *                 example: testuser@hotmail.com
 *               password: # User password
 *                 type: string
 *                 format: string
 *                 example: 123
 *             required:
 *               - email
 *               - password
 *     description: Auth handler to login / logout users
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

export const authController = async (req: Request, res: Response) => {
  // receive the request
  if (req.method === 'POST') {
    try {
      const email = req?.body?.email;
      const password = req?.body?.password;
      // do business logic here
      await authenticateUser({
        email,
        password,
      });
      res.status(200);
      res.send('Sucesso');
    } catch (e) {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(405);
  }
};
