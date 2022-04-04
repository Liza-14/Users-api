import axios from "axios";
import { UsersRepository } from "../repositories/users.repository";

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

  create(id, name) {
    return this.repository.addUser(id, name);
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
    return (await this.axios.get(url, { params })).data;
  }

  async addCrimes(id, policestationid, name, date, rate) {
    const params = {
      userid: id, policestationid, name, date, rate,
    };
    const url = "https://tranquil-taiga-07587.herokuapp.com/crimes";
    return (await this.axios.post(url, null, { params })).data;
  }

  async verify(email, password) {
    const user = await this.repository.getOneByEmail(email);
    const verified = user && user.password === password;
    return {
      verified,
      id: verified ? user.id : null,
    };
  }
}

export default new UsersService(UsersRepository);
