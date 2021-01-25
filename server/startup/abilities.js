const defineAbilitiesFor = (role) => {
  switch (role) {
    case "Commander":
      return ["readAll", "update_meeting", "delete_meeting"];
      break;

    case "Admin":
      return ["create_user"];
      break;

    case "Secretary":
      return ["readAll", "update_meeting", "delete_meeting"];
      break;

    case "PoliceArmy":
      return ["readAll"];
      break;

    case "Inquire":
      return ["readAll", "create_meeting", "update_meeting", "delete_meeting"];
      break;

    default:
      break;
  }
};

module.exports.defineAbilitiesFor = defineAbilitiesFor;
