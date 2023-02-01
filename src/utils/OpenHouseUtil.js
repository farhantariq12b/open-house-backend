class OpenHouseUtil {
  static validateNewOpenHouse(house, index) {
    if (!house.visitor_amount) {
      throw {
        code: 400,
        message: `Visitor Amount is not provided at ${index}th index`,
      };
    }
  }
}

module.exports = OpenHouseUtil;
