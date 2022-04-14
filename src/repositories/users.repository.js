import casandra from "cassandra-driver";
import createConection from "../../connect-database";

const { TimeUuid } = casandra.types;

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

  static async addUser(user) {
    const userWithId = { id: TimeUuid.now().toString(), ...user };
    const client = createConection();
    await client.connect();
    await client.execute(`INSERT INTO ${USERS_TABLE} (id, name) VALUES (?, ?)`, userWithId, { prepare: true });
    await client.shutdown();
    return userWithId;
  }

  static async updateUser(name, id) {
    const client = createConection();
    client.connect();
    await client.execute(`UPDATE ${USERS_TABLE} SET name = ? WHERE id = ?`, [name, id], { prepare: true });
    client.shutdown();
    return (await this.getOne(id)).rows[0];
  }

  static deleteUser(id) {
    const client = createConection();
    client.connect();
    const users = client.execute(`DELETE FROM ${USERS_TABLE} WHERE id = ?`, [id], { prepare: true });
    client.shutdown();
    return users;
  }
}
