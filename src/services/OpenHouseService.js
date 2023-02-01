const OpenHouseHandler = require("../handler/OpenHouseHandler");

class OpenHouseService {
  static async updateOpenHouse(id, userIds) {
    const existingHouse = await OpenHouseHandler.findById(id);

    if (!existingHouse) {
      throw {
        code: 400,
        message: "Open House doesn't exist",
      };
    }

    if (existingHouse.visitor_amount < userIds.length) {
      throw {
        code: 403,
        message: "Visitor amount limit exceeds",
      };
    }

    await OpenHouseHandler.unEnrollUser(id)

    for (const userId of userIds) {
      await OpenHouseHandler.updateOpenHouse(id, userId);
    }

    return;
  }

  static async unEnrollUser(id, userId) {
    const existingHouse = await OpenHouseHandler.findById(id);

    if (!existingHouse.length) {
      throw {
        code: 400,
        message: "Open House doesn't exist",
      };
    }

    const userEnrolled = await OpenHouseHandler.findUserEnrolled(id, userId);

    if (!userEnrolled.length) {
      throw {
        code: 400,
        message: "User isn't enrolled.",
      };
    }

    const updatedProperty = await OpenHouseHandler.unEnrollUser(id, userId);

    return updatedProperty;
  }
}

module.exports = OpenHouseService;
