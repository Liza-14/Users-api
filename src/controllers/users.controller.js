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
