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

  test("Aged Brie quality increases if below 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  test("Aged Brie quality doesn't increase past 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  test("Aged Brie sellIn decreases", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 11, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
  });

  test("Backstage Pass sellIn decreases", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
  });

  test("Backstage Pass quality zero if sellIn < 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("Backstage Pass quality increases by one if sellIn > 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(41);
  });

  test("Backstage Pass quality increases by two if 4 < sellIn < 11", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(42);
  });

  test("Backstage Pass quality increases by three if sellIn < 5", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(43);
  });

  test("Backstage Pass quality will not increase past 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  test("Sulfuras quality will not decrease or increase", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 4, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(49);
  });

  test("Sulfuras sellIn will not decrease or increase", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 4, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
  });

});
