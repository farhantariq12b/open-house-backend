const PropertyService = require("../services/PropertyService");

class PropertyController {
  static async getAllProperties(req, res) {
    try {
      const { limit, offset } = req.query;

      const properties = await PropertyService.getProperties(limit, offset);
      res.status(200).send({ properties: properties || [], success: true });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async getPropertyById(req, res) {
    try {
      const { id } = req.params;

      const property = await PropertyService.getPropertyById(id);
      res.status(200).send({ property, success: true });
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }

  static async createNewProperty(req, res) {
    try {
      const property = req.body;

      const createdProperty = await PropertyService.createNewProperty(property);
      res.status(201).send({ property: createdProperty });
    } catch (error) {
      console.log(error)
      res.status(error.code || 500).send({
        success: false,
        msg:
          error.message ||
          error.msg ||
          "Something went wrong. Please try again.",
      });
    }
  }

  static async deleteProperty(req, res) {
    try {
      const { id } = req.params;

      await PropertyService.deleteProperty(id);
      res.status(200).send("Property deleted successfully");
    } catch (error) {
      res.status(error.code || 500).send({ message: error.message });
    }
  }

  static async updateProperty(req, res) {
    try {
      const { id } = req.params;

      const property = req.body;

      await PropertyService.updateProperty(id, property);
      res.status(200).send("Property updated successfully");
    } catch (error) {
      console.log(error)
      res.status(error.code || 500).send({ message: error.message });
    }
  }
}

module.exports = PropertyController;
