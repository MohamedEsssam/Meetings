const sql = require("../startup/connectDB");
const UserServices = require("./UserServices.js");
const UserServicesInstance = new UserServices();
const Logger = require("../services/LoggerService");
const logger = new Logger("app");

class MeetingService {
  constructor(DepartmentService) {
    this.DepartmentService = DepartmentService;
  }
  async create(
    personName,
    personType,
    job,
    militaryRank,
    unit,
    army,
    administrator,
    departmentName
  ) {
    const meetingId = await this.generateId();
    const department = await this.DepartmentService.getDepartmentByName(
      departmentName
    );

    sql.query(
      "INSERT INTO meeting (meetingId, status, comeAt, personName, personType, job, militaryRank, unit, army, administrator, hidden, departmentId)  VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?);",
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
        0,
        department.departmentId,
      ],
      (err, results, field) => {
        if (err) logger.error(err);
      }
    );

    logger.setLogData({
      personName: personName,
      personType: personType,
      job: job,
      militaryRank: militaryRank,
      unit: unit,
      army: army,
      administrator: administrator,
      departmentName: departmentName,
    });

    logger.info("Create meeting done", {
      personName: personName,
      personType: personType,
      job: job,
      militaryRank: militaryRank,
      unit: unit,
      army: army,
      administrator: administrator,
      departmentName: departmentName,
    });
    return this.getMeetingById(meetingId);
  }

  async update({
    status = "Pending",
    enteredAt = null,
    exitAt = null,
    delayDate = null,
    personName,
    personType,
    army,
    unit,
    job,
    militaryRank,
    administrator,
    departmentName,
    meetingId,
  }) {
    if (!this.validId(meetingId)) return;

    const meeting = await this.getMeetingById(meetingId);
    if (!meeting) return;

    const department = await this.DepartmentService.getDepartmentByName(
      departmentName
    );

    sql.query(
      "UPDATE meeting SET status=?, enteredAt=?, exitAt=?, delayDate=?, personName=?, personType=?, army=?, unit=?, job=?, militaryRank=?, administrator=?, departmentId=? WHERE meetingId = ?",
      [
        status,
        enteredAt ? enteredAt.split(".")[0] : null,
        exitAt,
        delayDate,
        personName,
        personType,
        army,
        unit,
        job,
        militaryRank,
        administrator,
        department.departmentId,
        meetingId,
      ],
      (err, result, field) => {
        if (err) logger.error(err);
      }
    );

    logger.setLogData({
      status: status,
      enteredAt: enteredAt,
      exitAt: exitAt,
      delayDate: delayDate,
      personName: personName,
      personType: personType,
      army: army,
      unit: unit,
      job: job,
      militaryRank: militaryRank,
      administrator: administrator,
      department: department["departmentId"],
      meetingId: meetingId,
    });

    logger.info("Update meeting done", {
      status: status,
      enteredAt: enteredAt,
      exitAt: exitAt,
      delayDate: delayDate,
      personName: personName,
      personType: personType,
      army: army,
      unit: unit,
      job: job,
      militaryRank: militaryRank,
      administrator: administrator,
      department: department["departmentId"],
      meetingId: meetingId,
    });

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
        if (err) logger.error(err);
      }
    );

    logger.info("Delete meeting done");

    return meeting;
  }

  async deleteAll() {
    const meetings = await this.getMeetings();
    const query = "DELETE FROM meeting";

    sql.query(query, (err, result) => {
      if (err) logger.error(err);
    });

    logger.info("Delete all meeting done");

    return meetings;
  }

  async hideAll() {
    const meetings = await this.getMeetings();
    const query = "UPDATE meeting SET hidden=?";

    sql.query(query, [true], (err, result) => {
      if (err) logger.error(err);
    });

    logger.info("hide all meeting done");

    return meetings;
  }

  getMeetings(departmentId) {
    if (departmentId)
      return new Promise((resolve, reject) => {
        sql.query(
          "SELECT meetingId, status, comeAt, enteredAt, exitAt, delayDate, personName, personType, army, unit, job, militaryRank, administrator, IF(hidden, 'true', 'false') hidden, departmentId, departmentName FROM meeting JOIN department d USING(departmentId) WHERE departmentId=?;",
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
          "SELECT meetingId, status, comeAt, enteredAt, exitAt, delayDate, personName, personType, army, unit, job, militaryRank, administrator, IF(hidden, 'true', 'false') hidden, departmentId, departmentName FROM meeting JOIN department d USING(departmentId);",
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
        "SELECT meetingId, status, comeAt, enteredAt, exitAt, delayDate, personName, personType, army, unit, job, militaryRank, administrator, IF(hidden, 'true', 'false') hidden, departmentId, departmentName FROM meeting JOIN department d USING(departmentId) WHERE meetingId= ?;",
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
      "SELECT meetingId, status, comeAt, enteredAt, exitAt, delayDate, personName, personType, army, unit, job, militaryRank, administrator, IF(hidden, 'true', 'false') hidden, departmentId, departmentName FROM meeting JOIN department d USING(departmentId) WHERE meetingId= ?;";

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
