const sql = require("../startup/connectDB");
const Logger = require("../services/LoggerService")
const logger = new Logger('app')

class PermissionServices {
  async create(
    representative,
    unit,
    destination,
    notes
  ) {
    const permissionId = await this.generateId();

    sql.query(
      "INSERT INTO permission (permissionId, representative, unit, destination, notes)  VALUES (?, ?, ?, ?, ?);",
      [
        permissionId,
        representative,
        unit,
        destination,
        notes,
      ],
      (err, results, field) => {
        if (err) throw err;
      }
    );

    logger.info("Create permission done.")

    return this.getPermissionById(permissionId);
  }

  async update({
    representative,
    unit,
    destination,
    notes,
    permissionId,
  }) {
    if (!this.validId(permissionId)) return;

    const permission = await this.getPermissionById(permissionId);
    if (!permission) return;

    sql.query(
      "UPDATE permission SET representative=?, unit=?, destination=?, notes=? WHERE permissionId = ?",
      [
        representative,
        unit,
        destination,
        notes,
        permissionId,
      ],
      (err, result, field) => {
        if (err) throw err;
      }
    );

    logger.info("Update permission done.")

    return this.getPermissionById(permissionId);
  }

  async delete(permissionId, userId) {
    if (!this.validId(permissionId)) return;
    // if (!this.validId(userId)) return;

    //TODO check user ability

    const permission = await this.getPermissionById(permissionId);
    if (!permission) return;

    sql.query(
      "DELETE FROM permission WHERE permissionId=?;",
      [permissionId],
      (err, result) => {
        if (err) throw err;
      }
    );

    logger.info("Delete permission done.")

    return permission;
  }

  async deleteAll() {
    const permissions = await this.getPermissions();
    const query = "DELETE FROM permission";

    sql.query(query, (err, result) => {
      if (err) throw err;
    });

    logger.info("Delete all permission done.")

    return permissions;
  }

  getPermissions() {
      return new Promise((resolve, reject) => {
        sql.query(
          "SELECT * FROM permission",
          (err, result, field) => {
            if (err) reject(err);

            resolve(result);
          }
        );
      });
  }

  getPermission(permissionId) {
    if (!this.validId(permissionId)) return;

    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM permission WHERE permissionId= ?;",
        [permissionId],
        (err, result, field) => {
          if (err) reject(err);

          if (!result) return;

          resolve(result[0]);
        }
      );
    });
  }

  getPermissionById(permissionId) {
    let query =
      "SELECT * FROM permission WHERE permissionId= ?;";

    return new Promise((resolve, reject) => {
      sql.query(query, [permissionId], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  generateId() {
    return new Promise((resolve, reject) => {
      sql.query("SELECT UUID() AS permissionId", (err, result, field) => {
        if (err) reject(err);

        resolve(result[0].permissionId);
      });
    });
  }

  validId(id) {
    const uuidRegex = /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/;

    return uuidRegex.test(id);
  }
}

module.exports = PermissionServices;
