import UsersService from "../service/users.service";

export const getAll = async (req, res) => {
  try {
    const users = await UsersService.getAll();
    return res.json(users);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getOne = async (req, res) => {
  try {
    const user = await UsersService.getOne(req.params.id);
    return res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const addUser = async (req, res) => {
  try {
    await UsersService.create(req.body.id, req.body.name);
    res.status(200).send("Success!");
  } catch (e) {
    res.status(500).json(e);
  }
};

export const updateUser = async (req, res) => {
  try {
    await UsersService.update(req.body.name, req.params.id);
    return res.status(200).send("Success!");
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const removeById = async (req, res) => {
  try {
    await UsersService.delete(req.params.id);
    return res.status(200).send("Success!");
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getAllCrimesByUserId = async (req, res) => {
  try {
    const crimes = await UsersService.getAllCrimesByUserId(req.params.id);
    return res.status(200).json(crimes);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const addCrimes = async (req, res) => {
  try {
    const crime = await UsersService.addCrimes(req.params.id, req.body.policestationid, req.body.name, req.body.date, req.body.rate);
    return res.status(200).json(crime);
  } catch (e) {
    res.status(500).json(e);
  }
};