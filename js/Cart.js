/**
 * Created by sukai on 14-8-14.
 */
function Cart(inputs){
    this.inputs = inputs;
    this.cartItems = [];
}

Cart.prototype.getLength = function(){
    return this.cartItems.length;
}

Cart.prototype.getTotalMoney = function(){
    var sum = 0;
    for(var i = 0; i < this.getLength(); i++){
        sum += this.cartItems[i].count * this.cartItems[i].getPrice();
    }
    return sum;
}