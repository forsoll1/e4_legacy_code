export class Item {
  constructor(name, sellIn, quality, conjured = false) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.conjured = conjured;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  
  updateQuality() {
    for (const item of this.items) {
      if(item.name === "Sulfuras, Hand of Ragnaros") { continue }
      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        this.handleBackstagePass(item)
        continue
      }
      if (item.name === "Aged Brie") {
        this.handleAgedBrie(item)
        continue
      }
      this.handleRandomItem(item)
    }
    return this.items;
  }

  increaseQuality(item){
    if(item.quality < 50) { item.quality += 1 };
  }
  decreaseQuality(item){
    let decreaseVal = item.conjured? 2 : 1;
    if(item.quality > 0){ item.quality -= decreaseVal };
  }
  decreaseSellIn(item){
    item.sellIn -= 1
  }
  handleRandomItem(item){
    this.decreaseQuality(item);
    this.decreaseSellIn(item)
    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

  handleAgedBrie(item){
    this.increaseQuality(item)
    this.decreaseSellIn(item)
    if(item.sellIn < 0){
      this.increaseQuality(item)
    }
  }

  handleBackstagePass(item){
    this.backstagePassQuality(item)
    this.decreaseSellIn(item);
    if(item.sellIn < 0){item.quality = 0}
  }

  backstagePassQuality(item){
    this.increaseQuality(item)
    if(item.sellIn < 11) { this.increaseQuality(item)}
    if(item.sellIn < 6) { this.increaseQuality(item) }
  }
}
