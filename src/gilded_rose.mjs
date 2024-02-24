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
      if(item.name === "Sulfuras, Hand of Ragnaros") { continue }
      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        this.handleBackstagePass(item)
        continue
      }
      if (item.name === "Aged Brie" && item.quality < 50) {
        this.handleAgedBrie(item)
        continue
      }

      if (item.name != "Aged Brie" && item.name != "Backstage passes to a TAFKAL80ETC concert") {
        if (item.quality > 0) {
          this.decreaseQuality(item);
        }
      } 


      this.decreaseSellIn(item);
      
      if (item.sellIn < 0) {
        if (item.name != "Aged Brie") {
          if (item.quality > 0) {
            this.decreaseQuality(item);
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
    if(item.sellIn <= 0){item.quality = 0; return}
  }
  backstagePassQuality(item){
    let currentQuality = item.quality
    if(item.sellIn > 10){ currentQuality += 1 }
    else if(item.sellIn > 5) { currentQuality += 2 }
    else currentQuality += 3
    if(currentQuality > 50) {currentQuality = 50}
    item.quality = currentQuality
  }
}
