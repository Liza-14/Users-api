import Router from "express";
import { allowAnyUser, allowOnlyPolice } from "../middlewares/auth";
import { verifyToken } from "../middlewares/authService";

import {
  getAll, addUser, removeById, updateUser, getOne, getAllCrimesByUserId, addCrimes,
} from "../controllers/users.controller";

export const usersRouter = new Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *       bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 *   schemas:
 *      Users:
 *        type: object
 *        required:
 *            - id
 *            - name
 *        properties:
 *            id:
 *              type: string
 *              description: ID of user
 *            name:
 *              type: string
 *              description: name user
 *        example:
 *            name: Kate
 *      addCrimes:
 *        type: object
 *        required:
 *            - id
 *        properties:
 *            id:
 *              type: string
 *              description: ID of user
 *        example:
 *            policestationid: 163a800c-90ae-11ec-b909-0242ac120002
 *            name: Murder
 *            date: 30.03.2022
 *            rate: 10
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
 *     summary:  Get all users
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *       401:
 *         description: User not authorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Unexpected error
 */
usersRouter.get("/users", allowOnlyPolice, verifyToken, getAll);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Adds user
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       400:
 *         description: Bad request
 *       401:
 *         description: User not authorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Unexpected error
 */
usersRouter.post("/users", addUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     security:
 *      - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Get user from the system
 *     responses:
 *       200:
 *         description: Get user by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       401:
 *         description: User not authorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Unexpected error
 */
usersRouter.get("/users/:id", allowAnyUser, verifyToken, getOne);

/**
 * @swagger
 * /users/{id}:
 *  patch:
 *    summary: Update user by id
 *    security:
 *     - bearerAuth: []
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
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
 *        description: User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      404:
 *        description: Users was not found
 */
usersRouter.patch("/users/:id", allowAnyUser, verifyToken, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     security:
 *      - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Deletes user from the system
 *
 *     responses:
 *       200:
 *         description: User deleted
 *       401:
 *         description: User not authorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Unexpected error
 */
usersRouter.delete("/users/:id", allowAnyUser, verifyToken, removeById);

/**
 * @swagger
 * /users/{id}/crimes:
 *   get:
 *     summary: Get all user crimes by id
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user sees which crimes he has already added
 *     responses:
 *       200:
 *         description: Crimes by user id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       401:
 *         description: User not authorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Unexpected error
 */
usersRouter.get("/users/:id/crimes", allowAnyUser, verifyToken, getAllCrimesByUserId);

/**
 * @swagger
 * /users/{id}/crimes:
 *   post:
 *     summary: Post user crime item
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: users id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *               $ref: '#/components/schemas/addCrimes'
 *     responses:
 *       200:
 *         description: Add new crime
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       401:
 *         description: User not authorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Unexpected error
 */
usersRouter.post("/users/:id/crimes", allowAnyUser, verifyToken, addCrimes);
