/**
 * Created by sukai on 14-8-17.
 */
$(document).ready(function(){
    initCartNumber();
    initProductList();
    $('#category_panel').on('click','.btn',function(){
        addProduct2Cart($(this)[0].id);
    });
});

function addProduct2Cart(name){

    var insert2Cart = function(cart,currentCartitem){
        var cartitem = null;
        cartitem = _.find(cart.cartItems,function(item){
            return item.product.name === currentCartitem.getProductName();
        });
        if(cartitem){
            cartitem.count++;
        }else{
            cart.cartItems.push(currentCartitem);
        }
    };

    var cart = Util.storage.getStorageItem('cart');
    var currentProduct = getProductByName(name);
    var cartitem = new CartItem(currentProduct,1);
    if(cart){
        insert2Cart(cart,cartitem);
    }else{
        var cart = new Cart(null);
        cart.cartItems.push(cartitem);
    }
    cart.len++;
    Util.storage.add2Storage('cart',cart);
    $('#cart').text('Cart(' + cart.len + ')');
}

function initProductList(){
    var products = loadAllProducts();
    _.forEach(products,function(item){
        var text ="<div class='row text-center form-group'><div class='col-xs-3 h4'>"+item.category+"</div>"+
            "<div class='col-xs-3 h4'>"+item.name+"</div>"+
            "<div class='col-xs-3 h4'>$"+item.price.toFixed(2)+"/"+item.unit+"</div><div class='col-xs-3'>"+
            "<a class='btn btn-warning' id='"+item.name+"'>Add to the Cart</a></div></div>";
        $('#list').append(text);
    });

}