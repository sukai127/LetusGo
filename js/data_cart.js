/**
 * Created by sukai on 14-8-17.
 */
$(document).ready(function(){
    initCartNumber();
    initCart();
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