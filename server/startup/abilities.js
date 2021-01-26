const defineAbilitiesFor = (role) => {
  switch (role) {
    case "ChiefCommander" || "Commander":
      return { abilities: ["readAll", "update_meeting", "delete_meeting"] };

    case "Admin":
      return { abilities: ["create_user"] };

    case "Secretary":
      return { abilities: ["readAll", "update_meeting", "delete_meeting"] };

    case "PoliceArmy":
      return { abilities: ["readAll"] };

    case "Inquiries":
      return {
        abilities: [
          "readAll",
          "create_meeting",
          "update_meeting",
          "delete_meeting",
        ],
      };

    default:
      break;
  }
};

module.exports.defineAbilitiesFor = defineAbilitiesFor;
