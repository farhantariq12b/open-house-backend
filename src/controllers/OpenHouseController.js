const OpenHouseService = require("../services/OpenHouseService");

class OpenHouseController {
  static async enrollUser(req, res) {
    try {
      const { id } = req.params;

      const { userIds } = req.body;

      await OpenHouseService.updateOpenHouse(id, userIds);
      res.status(200).send("Open house user enrolled successfully.");
    } catch (error) {
      res.status(error.code || 500).send({ message: error.message });
    }
  }

  static async unEnrollUser(req, res) {
    try {
      const { id } = req.params;

      const { userId } = req.body;

      await OpenHouseService.unEnrollUser(id, userId);
      res.status(200).send("Open house user un-enrolled successfully.");
    } catch (error) {
      res.status(error.code || 500).send({ message: error.message });
    }
  }
}

module.exports = OpenHouseController;
