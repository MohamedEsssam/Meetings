export const militaryRanksMap = new Map();
export const statusMap = new Map();
export const rolesMap = new Map();

militaryRanksMap.set("Civil", "مدني");
militaryRanksMap.set("Military", "عسكري");

statusMap.set("Pending", " في انتظار الموافقة علي الدخول");
statusMap.set("Accepted", "تم السماح بالدخول");
statusMap.set("Rejected", "تم رفض الدخول");
statusMap.set("Delayed", "تم تأجيل الاجتماع");
statusMap.set("Exit", "تم أنتهاء الاجتماع");

rolesMap.set("ChiefCommander", "قائد الفرع");
rolesMap.set("Commander", "قائد وحدة");
rolesMap.set("Admin", "ادمن");
rolesMap.set("PoliceArmy", "ضباط");
rolesMap.set("Inquiries", "استعلامات");
rolesMap.set("Secretary", "سكرتارية");
