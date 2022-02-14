import Router from "express";

import {
  getAll, addUser, removeById, updateUser, getOne,
} from "../controllers/users.controller";

export const usersRouter = new Router();

/**
 * @swagger
 * components:
 *   schemas:
 *      Users:
 *        type: object
 *        required:
 *            - id
 *            - name
 *        properties:
 *            id:
 *              type: number
 *              description: ID of user
 *            name:
 *              type: string
 *              description: name user
 *        example:
 *            id: 57
 *            name: Ivan
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary:  get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Get all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */

usersRouter.get("/users", getAll);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Adds user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: user created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Server error
 */

usersRouter.post("/users", addUser);

/**
  * @swagger
  * /users/{id}:
  *   get:
  *     summary: get user by id
  *     tags: [Users]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: number
  *         required: true
  *         description: Get user from the system
  *     responses:
  *       200:
  *         description: Get user by id
  *         contens:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Users'
  *       404:
  *         description: Users was not found
  */

usersRouter.get("/users/:id", getOne);

/**
 * @swagger
 * /users/{id}:
 *  patch:
 *    summary: update user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: User to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: user update
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      404:
 *        description: Users was not found
 */

usersRouter.patch("/users/:id", updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: delete user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Deletes user from the system
 *
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User was not found
 */

usersRouter.delete("/users/:id", removeById);
