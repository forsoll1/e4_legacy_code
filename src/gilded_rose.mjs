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
  increaseQuality(item, val = 1){
    item.quality += val;
  }
  decreaseQuality(item){
    item.quality -= 1;
  }
  decreaseSellIn(item){
    item.sellIn -= 1
  }
  handleBackstagePass(item){
    let currentQuality = item.quality
    if(item.sellIn > 10){ currentQuality += 1 }
    else if(item.sellIn > 5) { currentQuality += 2 }
    else currentQuality += 3
    if(currentQuality > 50) {currentQuality = 50}
    item.quality = currentQuality
  }
}
