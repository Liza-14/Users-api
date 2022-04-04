import createConection from "../../connect-database";

const USERS_TABLE = "users.Users";

export class UsersRepository {
  static async getAll() {
    const client = createConection();
    await client.connect();
    const users = await client.execute(`SELECT * FROM ${USERS_TABLE}`);
    await client.shutdown();
    return users;
  }

  static async getOne(id) {
    const client = createConection();
    await client.connect();
    const user = await client.execute(`SELECT * FROM ${USERS_TABLE} WHERE id = ?`, [id], { prepare: true });
    await client.shutdown();
    return user;
  }

  static async addUser(id, name) {
    const client = createConection();
    await client.connect();
    await client.execute(`INSERT INTO ${USERS_TABLE} (id, name) VALUES ( ?, ?)`, [id, name], { prepare: true });
    await client.shutdown();
  }

  static updateUser(name, id) {
    const client = createConection();
    client.connect();
    const users = client.execute(`UPDATE ${USERS_TABLE} SET name = ? WHERE id = ?`, [name, id], { prepare: true });
    client.shutdown();
    return users;
  }

  static deleteUser(id) {
    const client = createConection();
    client.connect();
    const users = client.execute(`DELETE FROM ${USERS_TABLE} WHERE id = ?`, [id], { prepare: true });
    client.shutdown();
    return users;
  }

  static async getOneByEmail(email) {
    const client = createConection();
    client.connect();
    const user = (await client.execute(
      `SELECT * FROM ${USERS_TABLE} WHERE email = ? ALLOW FILTERING`,
      [email],
      { prepare: true },
    ))
      .rows[0];
    client.shutdown();
    return user;
  }
}
