const defineAbilitiesFor = (role) => {
  switch (role) {
    case "ChiefCommander":
      return {
        abilities: [
          "read_all",
          "read_specific",
          "read_only_mine",
          "delete_meeting",
        ],
      };

    case "Commander":
      return {
        abilities: ["read_specific", "read_only_mine", "delete_meeting"],
      };

    case "Admin":
      return { abilities: ["create_user"] };

    case "Secretary":
      return {
        abilities: ["read_specific", "update_meeting", "delete_meeting"],
      };

    case "PoliceArmy":
      return { abilities: ["read_only_mine"] };

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
