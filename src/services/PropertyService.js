const OpenHouseHandler = require("../handler/OpenHouseHandler");
const PropertyHandler = require("../handler/PropertyHandler");
const OpenHouseUtil = require("../utils/OpenHouseUtil");
const PropertyUtil = require("../utils/PropertyUtil");

class PropertyService {
  static async getProperties(limit, offset) {
    const properties = await PropertyHandler.fetchAllProperties(limit, offset);

    return properties || [];
  }

  static async getPropertyById(id) {
    const properties = await PropertyHandler.fetchById(id);

    return properties.rows.find(property => property) || {};
  }

  static async createNewProperty(property) {
    PropertyUtil.validateNewProperty(property);

    const { address, open_houses } = property;

    open_houses.forEach((house, index) => {
      OpenHouseUtil.validateNewOpenHouse(house, index);
    });

    const createdProperty = await PropertyHandler.addNewProperty(address);

    const propertyId = createdProperty.find((property) => property);

    open_houses.forEach((_, index) => {
      open_houses[index].property_id = propertyId;
    });

    const openHouses = await OpenHouseHandler.bulkInsertHouses(open_houses);

    return {
      id: propertyId,
      address,
      openHouses: openHouses || [],
    };
  }

  static async deleteProperty(id) {
    const property = await PropertyHandler.findById(id);

    if (!property.length) {
      throw {
        code: 400,
        message: "Property doesn't exist",
      };
    }

    await PropertyHandler.deleteProperty(id);
    return;
  }

  static async updateProperty(id, property) {
    PropertyUtil.validatePropertyAddress(property);

    const existingProperty = await PropertyHandler.findById(id);

    if (!existingProperty.length) {
      throw {
        code: 400,
        message: "Property doesn't exist",
      };
    }

    const updatedProperty = await PropertyHandler.updateProperty(
      id,
      property.address
    );

    const open_houses = property.open_houses.map(async ({ user_names, ...open_house }, index) => {
      OpenHouseUtil.validateNewOpenHouse(open_house, index);
      if (open_house.id) {
        await OpenHouseHandler.update({ ...open_house, property_id: id })
      } else {
        await OpenHouseHandler.insert({ ...open_house, property_id: id })
      }

      return open_house
    })

    await Promise.all(open_houses);

    return updatedProperty;
  }
}

module.exports = PropertyService;
