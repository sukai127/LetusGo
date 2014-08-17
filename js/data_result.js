/**
 * Created by sukai on 14-8-17.
 */
$(document).ready(function(){
    initCartNumber();
    initResult();
    $('.confirm').on('click',function(event){
        event.stopPropagation();
        Util.removeStorageItem('cart');
    });
});

function initResult(){
    var oldCart = Util.getStorageItem('cart');
    if(oldCart){
        var cart = new Cart(oldCart);
        _.forEach(cart.cartItems,function(olditem){
            var item = new CartItem(olditem.product,olditem.count);
            var text = "<h5 class='text-center'>"+item.getProductName()+", price : $"+item.getPrice()
                +", num : "+item.getCount()+", subtotal : $"+item.getSubtotal()+"</h5>";
            $('#result').append(text);
        });
    }else{
        $('#myModal').modal();
    }
}