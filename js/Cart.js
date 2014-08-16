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
    var sum =0;
    _.forEach(this.cartItems,function(cartitem){
        sum += cartitem.count;
    });
    return sum;
};

Cart.prototype.getTotalMoney = function(){
    var sum = 0;
    _.forEach(this.cartItems,function(cartitem){
        var item = new CartItem(cartitem.product,cartitem.count);
        sum += item.getCount() * item.getPrice();
    });
    return sum;
};