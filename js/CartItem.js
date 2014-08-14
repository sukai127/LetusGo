/**
 * Created by sukai on 14-8-14.
 */
function CartItem(product,count){
    this.product = product;
    this.count = count;
}
CartItem.prototype.getPrice = function(){
    return this.product.price;
}
CartItem.prototype.getName = function(){
    return this.product.name;
}
CartItem.prototype.getUnit = function(){
    return this.product.unit;
}