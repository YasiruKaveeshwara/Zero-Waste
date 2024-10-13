const CollectionCenterFactory = require("../factories/CollectionCenterFactory");

describe("CollectionCenterFactory", () => {
  it("should throw an error if name is not provided", () => {
    const centerData = {
      location: "Test Location",
      capacity: 10,
      operatingHours: "9 AM - 6 PM",
      trucks: 5,
      staff: 10
    };

    expect(() => CollectionCenterFactory.createCenter(centerData)).toThrow(
      Error
    );
    expect(() => CollectionCenterFactory.createCenter(centerData)).toThrow(
      "Collection center requires a name."
    );
  });

  it("should throw an error for invalid capacity (negative)", () => {
    const centerData = {
      name: "Center 1",
      location: "Test Location",
      capacity: -5,
      operatingHours: "9 AM - 6 PM",
      trucks: 5,
      staff: 10
    };

    expect(() => CollectionCenterFactory.createCenter(centerData)).toThrow(
      Error
    );
    expect(() => CollectionCenterFactory.createCenter(centerData)).toThrow(
      "Capacity must be a positive number."
    );
  });

  it("should throw an error if trucks is a negative number", () => {
    const centerData = {
      name: "Center 1",
      location: "Test Location",
      capacity: 10,
      operatingHours: "9 AM - 6 PM",
      trucks: -3,
      staff: 10
    };

    expect(() => CollectionCenterFactory.createCenter(centerData)).toThrow(
      Error
    );
    expect(() => CollectionCenterFactory.createCenter(centerData)).toThrow(
      "Number of trucks must be a positive number."
    );
  });
});
