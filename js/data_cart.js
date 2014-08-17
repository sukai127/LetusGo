/**
 * Created by sukai on 14-8-17.
 */
$(document).ready(function(){
    initCartNumber();
    initCart();
    $('.increase').on('click',function(event){
        event.preventDefault();
        plus($(this));
    });
    $('.decrease').on('click',function(event){
        event.preventDefault();
        minus($(this));
    });
    $('.delete').on('click',function(event){
        event.preventDefault();
        deleteItem($(this));
    });
    $('.number').on('change',function(){
        updateItem($(this));
    });
});

function updateItem(element){
    var number = element.val();
    console.log(number);
    var name = element.data('name');
    changeCount(element,name,parseInt(number));
}

function deleteItem(element){
    var input = element.parent().find('.number');
    var name = element.data('name');
    changeCount(input,name,0);
    element.closest('.item').remove();
}

function minus(element){
    var input = element.parent().find('.number');
    input.val(parseInt(input.val())-1);
    var name = element.data('name');
    changeCount(input,name,parseInt(input.val()));
}

function plus(element){
    var input = element.parent().find('.number');
    input.val(parseInt(input.val())+1);
    var name = element.data('name');
    changeCount(input,name,parseInt(input.val()));
}

function changeCount(element,name,number){

    var cart = Util.storage.getStorageItem('cart');
    _.forEach(cart.cartItems,function(item){
        if(item.product.name === name){
            cart.len = cart.len - item.count + number;
            item.count = number;
            item = new CartItem(item.product,item.count);
            $('#'+name).text(item.getSubtotal());
        }
    });
    cart = new Cart(cart);
    element.val(number);
    $('#buy').text('Total : $' +cart.getTotalMoney()+", And Pay it Now >>>");
    $('#cart').text('Cart(' + cart.getCount() + ')');
    Util.storage.add2Storage('cart',cart);
}

function initCart(){

    var buildCartContent = function(olditem){
        var item = new CartItem(olditem.product,olditem.count);
        if(item.count <= 0){
            return ;
        }
        var text = "<div class='row text-center item'><div class='col-md-2'>"+item.getProductName()+
            "</div><div class='col-md-4'><div class='form-inline form-group'>"+
            "<button class='btn btn-warning decrease' data-name="+item.getProductName()+
            "><span class='glyphicon glyphicon-minus'></span></button>"+
            "<input type='number' class='form-control number' name='number' data-name='"+item.getProductName()+"' value='"+item.getCount()+"'>" +
            "<button data-name="+item.getProductName()+" class='btn btn-success increase'>"+
            "<span class='glyphicon glyphicon-plus'></span></button></div></div><div class='col-md-2'>$"+
            item.getPrice().toFixed(2)+"</div>"+
            "<div class='col-md-2'>$<span id='"+item.getProductName()+"'>"+item.getSubtotal().toFixed(2)+"</span></div><div class='col-md-2'><a href='#'>"+
            "<span class='glyphicon glyphicon-remove text-danger delete' data-name='"+item.getProductName()+"'></span></a></div></div>";
        $('#cart_panel').append(text);
    };

    var oldCart = Util.storage.getStorageItem('cart');
    if(oldCart){
        var cart = new Cart(oldCart);
        _.forEach(cart.cartItems,function(olditem){
            buildCartContent(olditem);
        });
        $('#list').hide();
        $('#buy').text('Total : $' +cart.getTotalMoney()+", And Pay it Now >>>").show();
    }else{
        $('#buy').hide();
        $('#list').show();
    }
}