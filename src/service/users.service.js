import { UsersRepository } from "../repositories/users.repository";
import axios from "axios";

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

  async getAllCrimesByUserId(id) {
    const params = { userId: id };
    const url = "https://tranquil-taiga-07587.herokuapp.com/crimes";
    return (await axios.get(url, { params })).data;
  }

  async addCrimes(id, policestationid, name, date, rate) {
    const params = { userid: id, policestationid, name, date, rate };
    const url = "https://tranquil-taiga-07587.herokuapp.com/crimes";
    return (await axios.post(url, null,{ params })).data;
  }
} 

export default new UsersService(UsersRepository);
