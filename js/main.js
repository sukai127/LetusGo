/**
 * Created by sukai on 14-8-14.
 */
$(document).ready(function(){

    init();
    $('.confirm').on('click',function(event){
        event.stopPropagation();
        Util.removeStorageItem('cart');
    });
    $('#category_panel').on('click','.btn',function(){
        addProduct2Cart($(this)[0].id);
    });
    $('.increase').on('click',function(){
        countOperate($(this),'+');
    });
    $('.decrease').on('click',function(){
        countOperate($(this),'-');
    });
    $('.delete').on('click',function(){
        deleteItem($(this));
    });

});

function deleteItem(element){
    console.log(element.closest('.item').remove());
}
function countOperate(element,op){
    var input = element.parent().find('.number');
    var name = element.data('name');
    eval('input.val(parseInt(input.val())'+op+'1)');
    var cart = Util.getStorageItem('cart');
    _.forEach(cart.cartItems,function(item){
        if(item.product.name === name){
            eval('item.count'+op+op);
            eval('cart.len'+op+op);
            item = new CartItem(item.product,item.count);
            $('#'+name).text(item.getSubtotal());
        }
    });
    cart = new Cart(cart);
    $('#buy').text('Total : $' +cart.getTotalMoney()+", And Pay it Now >>>");
    $('#cart').text('Cart(' + cart.getCount() + ')');
    Util.add2Storage('cart',cart);
}

function addProduct2Cart(name){
    var cart = Util.getStorageItem('cart');
    var currentProduct = getProductByName(name);
    var cartitem = new CartItem(currentProduct,1);
    if(cart){
        updateCount(cart,cartitem);
    }else{
        var cart = new Cart(null);
        cart.cartItems.push(cartitem);
    }
    cart.len++;
    Util.add2Storage('cart',cart);
    $('#cart').text('Cart(' + cart.len + ')');
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
function initCart(){
    var oldCart = Util.getStorageItem('cart');
    if(oldCart){
        var cart = new Cart(oldCart);
        _.forEach(cart.cartItems,function(olditem){
            var item = new CartItem(olditem.product,olditem.count);
            var text = "<div class='row text-center item'><div class='col-md-2'>"+item.getProductName()+
                "</div><div class='col-md-4'><div class='form-inline form-group'>"+
                "<button class='btn btn-warning decrease' data-name="+item.getProductName()+
                "><span class='glyphicon glyphicon-minus'></span></button>"+
                "<input type='text' class='form-control number' name='number' value='"+item.getCount()+"'>" +
                "<button data-name="+item.getProductName()+" class='btn btn-success increase'>"+
                "<span class='glyphicon glyphicon-plus'></span></button></div></div><div class='col-md-2'>$"+
                item.getPrice().toFixed(2)+"</div>"+
                "<div class='col-md-2'>$<span id='"+item.getProductName()+"'>"+item.getSubtotal().toFixed(2)+"</span></div><div class='col-md-2'><a href='#'>"+
                "<span class='glyphicon glyphicon-remove text-danger delete'></span></a></div></div>";
            $('#cart_panel').append(text);
        });
        $('#list').hide();
        $('#buy').text('Total : $' +cart.getTotalMoney()+", And Pay it Now >>>").show();
    }else{
        $('#buy').hide();
        $('#list').show();
    }
}

function initCartNumber(){
    var cart = Util.getStorageItem('cart');
    if(cart){
        $('#cart').text('Cart(' + cart.len + ')');
    }else{
        $('#cart').text('Cart');
    }

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