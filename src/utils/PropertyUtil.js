class PropertyUtil {
  static validateNewProperty(property) {
    this.validatePropertyAddress(property);

    if (!(Array.isArray(property.open_houses) && property.open_houses.length)) {
      throw {
        code: 400,
        message: {
          open_houses: "Atleast provide one open_house deatil for a property.",
        },
      };
    }
  }

  static validatePropertyAddress(property) {
    if (!property) {
      throw {
        code: 400,
        message: "Property Object is malformed.",
      };
    }

    if (!property.address) {
      throw {
        code: 400,
        message: {
          address: "This field is mandatory. Please provide address detail.",
        },
      };
    }
  }
}

module.exports = PropertyUtil;
