import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
/*
RULES: 
- Quality always between 0 and 50
- Random items go down in quality with each update
- Aged Brie goes up in quality with each update
- Backstage pass goes up in quality by one if sellIn >= 11
- Backstage pass goes up in quality by two if 5 <= sellIn < 11
- Backstage pass goes up in quality by three if sellIn < 5
- Backstage pass quality == 0 if sellIn < 0
- Sulfuras sellIn value does not decrease
- Sulfuras quality does not decrease
- All other items sellIn value decreases by -1 with update
*/

  test("Random item quality decreases", () => {
    const gildedRose = new Shop([new Item("TestItem", 2, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(49);
  });

  test("Random item quality decreases but not below 0", () => {
    const gildedRose = new Shop([new Item("TestItem", 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("Random item sellIn decreases", () => {
    const gildedRose = new Shop([new Item("TestItem", 10, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
  });

});
