/**
 * Created by sukai on 14-8-14.
 */

function initCartNumber(){
    var cart = Util.storage.getStorageItem('cart');
    if(cart){
        $('#cart').text('Cart(' + cart.len + ')');
    }else{
        $('#cart').text('Cart');
    }

}

function loadAllProducts(){
    return [
        {
            type : 'grocery',
            items : [
                new Product('Instant_noodles','bag','grocery',1.00),
                new Product('apple','kg','grocery',2.50),
                new Product('coca_cola','bottle','grocery',0.50)
            ]
        },
        {
            type : 'device',
            items : [
                new Product('kettle','piece','device',43.5),
                new Product('fan','piece','device',30.0)
            ]
        }
    ];
};
