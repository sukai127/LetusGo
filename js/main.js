/**
 * Created by sukai on 14-8-14.
 */
$(document).ready(function(){

    init();
//    $('#buy').on('click',function(event){
//        event.stopPropagation();
//        initResult();
//    });
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
        var cart = new Cart(null);
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
    initCartNumber();
    initCart();
    initResult();
}

function initResult(){
    var oldCart = JSON.parse(localStorage.getItem('cart'));
    if(oldCart){
        var cart = new Cart(oldCart);
        for(var i = 0; i < cart.cartItems.length; i++){
            var olditem = cart.cartItems[i];
            var item = new CartItem(olditem.product,olditem.count);
            var text = "<h5 class='text-center'>"+item.getProductName()+", price : $"+item.getPrice()
                +", num : "+item.getCount()+", subtotal : $"+item.getSubtotal()+"</h5>";
            $('#result').append(text);
            localStorage.removeItem('cart');
        }
    }else{
        $('#myModal').modal();
    }
}
function initCart(){
    var oldCart = JSON.parse(localStorage.getItem('cart'));
    if(oldCart){
        var cart = new Cart(oldCart);
        for(var i = 0; i < cart.cartItems.length; i++){
            var olditem = cart.cartItems[i];
            var item = new CartItem(olditem.product,olditem.count);
            var text = "<div class='row text-center'><div class='col-md-2'>"+item.getProductName()+
                "</div><div class='col-md-4'><div class='form-inline form-group'>"+
                "<button class='btn btn-warning'><span class='glyphicon glyphicon-minus'></span></button>"+
                "<input type='text' class='form-control' name='number' value='"+item.getCount()+"'><button class='btn btn-success'>"+
                "<span class='glyphicon glyphicon-plus'></span></button></div></div><div class='col-md-2'>"+item.getPrice().toFixed(2)+"</div>"+
                "<div class='col-md-2'>$"+item.getSubtotal().toFixed(2)+"</div><div class='col-md-2'><a href='#'>"+
                "<span class='glyphicon glyphicon-remove text-danger'></span></a></div></div>";
            $('#cart_panel').append(text);
        }
    }
}

function initCartNumber(){
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