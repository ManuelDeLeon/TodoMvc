import { Enum } from './Enumerations';

describe("Enumerations", () => {
  describe(`Good enum with strings`, () =>{
    const Day = new Enum("Monday", "Tuesday", "Wednesday");
    it(`Doesn't throw error with valid key`, ()=>{
      expect(() => Day.Monday).not.toThrow();
    })
    it(`throws error with invalid key`, () => {
      expect(() => Day.Friday).toThrow();
    })
  })
  describe(`Good enum with objects`, () => {
    const Num = new Enum({ name: "One", value: 1 }, { name: "Two", value: 2 });
    it(`doesn't throw error with valid key`, () => {
      expect(() => Num.One).not.toThrow();
    })
    it(`throws error with invalid key`, () => {
      expect(() => Num.Three).toThrow();
    })
    it(`returns value for given key`, () => {
      expect(Num.One).toBe(1);
      expect(Num.Two).toBe(2);
    })
  })
  describe(`Bad enums`, () => {
    it(`throws error with duplicate string`, () => {
      expect(() => new Enum("Monday", "Monday")).toThrow();
    })
    it(`throws error with duplicate name`, () => {
      expect(() => new Enum(
        { name: "One", value: 1 },
        { name: "One", value: 2 }
      )).toThrow();
    })
    it(`throws error with duplicate value`, () => {
      expect(() => new Enum(
        { name: "One", value: 1 },
        { name: "Two", value: 1 }
      )).toThrow();
    })
  })
})