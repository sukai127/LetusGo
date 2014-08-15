/**
 * Created by sukai on 14-8-14.
 */
function Cart(cart){
    if(cart){
        this.cartItems = cart.cartItems;
        this.len = cart.len;
    }else{
        this.cartItems = [];
        this.len = 0;
    }

}
Cart.prototype.getCount = function(){
    return this.cartItems.len;
};

Cart.prototype.getTotalMoney = function(){
    var sum = 0;
    for(var i = 0; i < this.cartItems.length; i++){
        var item = new CartItem(this.cartItems[i].product,this.cartItems[i].count);
        sum += item.getCount() * item.getPrice();
    }
    return sum;
};