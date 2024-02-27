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
- At negative sellIn value random item quality decreases by 2
- At negative sellIn value Brie quality increases by 2
*/
  test("Shop initialized without argument has an empty array", () => {
    const gildedRose = new Shop();
    expect(gildedRose.items).to.deep.equal([])
  });

  test("Random item quality decreases", () => {
    const gildedRose = new Shop([new Item("TestItem", 1, 50)]);
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

  test("Random item sellIn decreases below zero", () => {
    const gildedRose = new Shop([new Item("TestItem", 0, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
  });
  
  test("Random item zero & negative sellIn value decreases quality by 2", () => {
    const gildedRose = new Shop([new Item("TestItem", 0, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(46);
  });

  test("Random item zero & negative sellIn value decreases quality by 2 but not below 0", () => {
    const gildedRose = new Shop([new Item("TestItem", -1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("Aged Brie quality increases by 2 if sellIn = 0", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(42);
  });

  test("Aged Brie quality increases by 2 if sellIn < 0", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(42);
  });

  test("Aged Brie quality increases by 1 if sellIn > 0", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).to.deep.include({sellIn:0,quality:31});
  });

  test("Aged Brie quality doesn't increase past 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  test("Aged Brie quality doesn't increase past 50 ver 2", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });


  test("Aged Brie sellIn decreases", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
  });

  test("Backstage Pass sellIn decreases", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
  });

  test("Backstage Pass quality zero if sellIn = 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
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

  test("Backstage Pass quality increases by two if 5 < sellIn < 11", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(42);
  });

  test("Backstage Pass quality increases by three if sellIn < 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 40)]);
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

    test("Sulfuras sellIn will not decrease or increase", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(1);
  });

    test("Items have 'conjured' property (bool)", () => {
      const newItem = new Item("TestItem", 10, 10, true)
      expect(newItem.conjured).to.equal(true)
    })

});
