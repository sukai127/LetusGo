/**
 * Created by sukai on 14-8-14.
 */
$(document).ready(function(){

    init();
    $('#buy').on('click',function(event){
        event.stopPropagation();
        localStorage.removeItem('cart');
        console.log('remove the cart localStorage');
    });
    $('#category_panel').on('click','.btn',function(){
        addProduct2Cart($(this)[0].id);
    });

});

function addProduct2Cart(name){
    var cart = JSON.parse(localStorage.getItem('cart'));
    var currentProduct = getProductByName(name);
    var cartitem = new CartItem(currentProduct,1);
    if(cart){
        updateCount(cart,cartitem);
    }else{
        var cart = new Cart();
        cart.cartItems.push(cartitem);
    }
    cart.len++;
    localStorage.setItem('cart',JSON.stringify(cart));
    $('#cart').text('Cart('+cart.len+')');
}

function updateCount(cart,currentCartitem){
    var cartitem = null;
    _.forEach(cart.cartItems,function(item){
        if(item.product.name=== currentCartitem.getProductName()){
            cartitem = item;
        }
    });
    if(cartitem){
        cartitem.count++;
    }else{
        cart.cartItems.push(currentCartitem);
    }
}
function init(){
    initProductList();
    initCart();
}
function initCart(){
    var cart = JSON.parse(localStorage.getItem('cart'));
    if(cart){
        $('#cart').text('Cart(' + cart.len + ')');
    }else{
        $('#cart').text('Cart');
    }

}
function initProductList(){
    var products = loadAllProducts();
    var addProduct = function(type,items){
        for(var i = 0; i < items.length; i++){
            var text ="<div class='row text-center form-group'><div class='col-xs-3 h4'>"+items[i].name+"</div>"+
                "<div class='col-xs-3 h4'>$"+items[i].price.toFixed(2)+"/"+items[i].unit+"</div><div class='col-xs-6'>"+
                "<a class='btn btn-warning' id='"+items[i].name+"'>Add to the Cart</a></div></div>";
            $('#'+type+'_panel').append(text);
        }

    };
    for(var i = 0; i < products.length; i++){
        var type = products[i].type;
        var text ="<div class='panel panel-default'><div class='panel-heading'>"+
            "<h3>"+type+"</h3></div><div class='panel-body' id='"+type+"_panel'>"+
            "</div></div>";
        $('#category_panel').append(text);
        addProduct(type,products[i].items);
    }
}