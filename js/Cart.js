/**
 * Created by sukai on 14-8-14.
 */
function Cart(){
    this.cartItems = [];
    this.len = 0;
}

Cart.prototype.getCount = function(){
    return this.cartItems.len;
};

Cart.prototype.getTotalMoney = function(){
    var sum = 0;
    for(var i = 0; i < this.cartItems.length; i++){
        sum += this.cartItems[i].count * this.cartItems[i].getPrice();
    }
    return sum;
};