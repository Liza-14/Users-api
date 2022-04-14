import UsersService from "../service/users.service";
import { config } from "../config/index";

export const getAll = async (req, res, next) => {
  UsersService.getAll()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getOne = async (req, res, next) => {
  UsersService.getOne(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const addUser = async (req, res, next) => {
  if (req.body.secretUserKey !== config.auth.secretUserKey) {
    return res.status(403).send("Does not have enough permissions");
  }
  const { name } = req.body;
  if (!name || name === "") {
    return res.status(400).send("Invalid request body");
  }
  UsersService.create({ ...req.body, secretUserKey: undefined })
    .then((userWithId) => res.status(200).json(userWithId))
    .catch((err) => next(err));
};

export const updateUser = async (req, res, next) => {
  UsersService.update(req.body.name, req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};

export const removeById = async (req, res, next) => {
  UsersService.delete(req.params.id)
    .then(() => res.status(200).send("Success!"))
    .catch((err) => next(err));
};

export const getAllCrimesByUserId = async (req, res, next) => {
  UsersService.getAllCrimesByUserId(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};

export const addCrimes = async (req, res, next) => {
  UsersService.addCrimes(
    req.params.id,
    req.body.policestationid,
    req.body.name,
    req.body.date,
    req.body.rate,
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};
