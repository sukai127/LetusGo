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

    var addProduct = function(type,items){
        _.forEach(items,function(item){
            var text ="<div class='row text-center form-group'><div class='col-xs-4 h4'>"+item.name+"</div>"+
                "<div class='col-xs-4 h4'>$"+item.price.toFixed(2)+"/"+item.unit+"</div><div class='col-xs-4'>"+
                "<a class='btn btn-warning' id='"+item.name+"'>Add to the Cart</a></div></div>";
            $('#'+type+'_panel').append(text);
        });
    };

    _.forEach(products,function(product){
        var type = product.type;
        var text ="<div class='panel panel-default'><div class='panel-heading'>"+
            "<h3>"+type+"</h3></div><div class='panel-body' id='"+type+"_panel'>"+
            "</div></div>";
        $('#category_panel').append(text);
        addProduct(type,product.items);
    });
}