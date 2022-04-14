import axios from "axios";
import { UsersRepository } from "../repositories/users.repository";
import { config } from "../config/index";

class UsersService {
  constructor(repository) {
    this.repository = repository;
    this.axios = axios;
  }

  async getAll() {
    return (await this.repository.getAll()).rows;
  }

  async getOne(id) {
    return (await this.repository.getOne(id)).rows;
  }

  async create(user) {
    return await this.repository.addUser(user);
  }

  update(name, id) {
    return this.repository.updateUser(name, id);
  }

  delete(id) {
    return this.repository.deleteUser(id);
  }

  async getAllCrimesByUserId(id) {
    const params = { userId: id };
    return (await this.axios.get(config.crimes.url, { params })).data;
  }

  async addCrimes(id, policestationid, name, date, rate) {
    const body = {
      userid: id, policestationid, name, date, rate,
    };
    return (await this.axios.post(config.crimes.url, body)).data;
  }
}

export default new UsersService(UsersRepository);
