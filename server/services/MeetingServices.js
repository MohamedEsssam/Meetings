const sql = require("../startup/connectDB");
const UserServices = require("./UserServices.js");
const UserServicesInstance = new UserServices();

class MeetingService {
  async create(
    personName,
    personType,
    job,
    militaryRank,
    unit,
    army,
    administrator,
    departmentId
  ) {
    const meetingId = await this.generateId();

    sql.query(
      "INSERT INTO meeting (meetingId, status, comeAt, personName, personType, job, militaryRank, unit, army, administrator, departmentId)  VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        meetingId,
        "Pending",
        personName,
        personType,
        job,
        militaryRank,
        unit,
        army,
        administrator,
        departmentId,
      ],
      (err, results, field) => {
        if (err) throw err;
      }
    );

    return this.getMeetingById(meetingId);
  }

  async update({
    status = "Pending",
    enteredAt = null,
    exitAt = null,
    personName,
    personType,
    army,
    unit,
    job,
    militaryRank,
    administrator,
    departmentId,
    meetingId,
    userId,
  }) {
    if (!this.validId(meetingId)) return;
    // if (!this.validId(userId)) return;

    const meeting = await this.getMeetingById(meetingId);
    if (!meeting) return;

    //TODO check user ability

    sql.query(
      "UPDATE meeting SET status=?, enteredAt=?, exitAt=?, personName=?, personType=?, army=?, unit=?, job=?, militaryRank=?, administrator=?, departmentId=? WHERE meetingId = ?",
      [
        status,
        enteredAt,
        exitAt,
        personName,
        personType,
        army,
        unit,
        job,
        militaryRank,
        administrator,
        departmentId,
        meetingId,
      ],
      (err, result, field) => {
        if (err) throw err;
      }
    );

    return this.getMeetingById(meetingId);
  }

  async delete(meetingId, userId) {
    if (!this.validId(meetingId)) return;
    // if (!this.validId(userId)) return;

    //TODO check user ability

    const meeting = await this.getMeetingById(meetingId);
    if (!meeting) return;

    sql.query(
      "DELETE FROM meeting WHERE meetingId=?;",
      [meetingId],
      (err, result) => {
        if (err) throw err;
      }
    );

    return meeting;
  }

  getMeetings(departmentId) {
    if (departmentId)
      return new Promise((resolve, reject) => {
        sql.query(
          "SELECT meetingId, status, comeAt, enteredAt, exitAt, personName, personType, army, unit, job, militaryRank, administrator, departmentId, departmentName FROM meeting JOIN department d USING(departmentId) WHERE departmentId=?;",
          [departmentId],
          (err, result, field) => {
            if (err) reject(err);

            resolve(result);
          }
        );
      });
    else
      return new Promise((resolve, reject) => {
        sql.query(
          "SELECT meetingId, status, comeAt, enteredAt, exitAt, personName, personType, army, unit, job, militaryRank, administrator, departmentId, departmentName FROM meeting JOIN department d USING(departmentId);",
          (err, result, field) => {
            if (err) reject(err);

            resolve(result);
          }
        );
      });
  }

  getMeeting(meetingId) {
    if (!this.validId(meetingId)) return;

    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT meetingId, status, comeAt, enteredAt, exitAt, personName, personType, army, unit, job, militaryRank, administrator, departmentId, departmentName FROM meeting JOIN department d USING(departmentId) WHERE meetingId= ?;",
        [meetingId],
        (err, result, field) => {
          if (err) reject(err);

          if (!result) return;

          resolve(result[0]);
        }
      );
    });
  }

  getMeetingById(meetingId) {
    let query =
      "SELECT meetingId, status, comeAt, enteredAt, exitAt, personName, personType, army, unit, job, militaryRank, administrator, departmentId, departmentName FROM meeting JOIN department d USING(departmentId) WHERE meetingId= ?;";

    return new Promise((resolve, reject) => {
      sql.query(query, [meetingId], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  generateId() {
    return new Promise((resolve, reject) => {
      sql.query("SELECT UUID() AS meetingId", (err, result, field) => {
        if (err) reject(err);

        resolve(result[0].meetingId);
      });
    });
  }

  validId(id) {
    const uuidRegex = /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/;

    return uuidRegex.test(id);
  }
}

module.exports = MeetingService;
