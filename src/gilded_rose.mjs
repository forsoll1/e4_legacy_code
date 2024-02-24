export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  
  updateQuality() {
    for (const item of this.items) {
      if(item.name === "Sulfuras, Hand of Ragnaros") {continue}
      if (item.name != "Aged Brie" && item.name != "Backstage passes to a TAFKAL80ETC concert") {
        if (item.quality > 0) {
          this.decreaseQuality(item);
        }
      } 
      if (item.name === "Aged Brie" && item.quality < 50) {this.increaseQuality(item)}
      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        if(item.quality < 50) {this.increaseQuality(item)}
        this.handleBackstagePass(item)
      }
      this.decreaseSellIn(item);
      
      if (item.sellIn < 0) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            if (item.quality > 0) {
              this.decreaseQuality(item);
            }
          } else {
            item.quality = 0;
          }
        } else {
          if (item.quality < 50) {
            this.increaseQuality(item);
          }
        }
      }
    }
    return this.items;
  }
  increaseQuality(item){
    item.quality += 1;
  }
  decreaseQuality(item){
    item.quality -= 1;
  }
  decreaseSellIn(item){
    item.sellIn -= 1
  }
  handleBackstagePass(item){
    if (item.sellIn < 11 && item.quality < 50) {
      this.increaseQuality(item);
    }
    if (item.sellIn < 6 && item.quality < 50) {
      this.increaseQuality(item);
    }
  }
}
