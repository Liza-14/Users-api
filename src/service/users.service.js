import { UsersRepository } from "../repositories/users.repository";

class UsersService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return (await this.repository.getAll()).rows;
  }

  async getOne(id) {
    return (await this.repository.getOne(id)).rows;
  }

  create(id, name) {
    this.repository.addUser(id, name);
  }

  update(name, id) {
    return this.repository.updateUser(name, id);
  }

  delete(id) {
    return this.repository.deleteUser(id);
  }
}

export default new UsersService(UsersRepository);
