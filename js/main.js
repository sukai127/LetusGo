/**
 * Created by sukai on 14-8-14.
 */
$(document).ready(function(){
    init();
});
function init(){
    var products = loadAllProducts();
    var addProduct = function(type,items){
        for(var i = 0; i < items.length; i++){
            var text ="<div class='row text-center form-group'><div class='col-xs-3 h4'>"+items[i].name+"</div>"+
            "<div class='col-xs-3 h4'>$"+items[i].price.toFixed(2)+"/"+items[i].unit+"</div><div class='col-xs-6'>"+
            "<a class='btn btn-warning'>Add to the Cart</a></div></div>";
            $('#'+type+'_panel').append(text);
        }
       
    };
    for(var i = 0; i < products.length; i++){
        var type = products[i].type;
        var text ="<div class='panel panel-default'><div class='panel-heading'>"+
            "<h3>"+type+"</h3></div><div class='panel-body' id='"+type+"_panel'>"+
        "</div></div>";
        $('#catagory_panel').append(text);
        addProduct(type,products[i].items);
    }
//    location.href = ''
}

//<div class='panel panel-default'>
//    <div class='panel-heading'>
//        <h3>grocery</h3>
//    </div>
//    <div class='panel-body' id='grocery_panel'>
//        <div class='row text-center form-group'>
//            <div class='col-xs-3 h4'>apple</div>
//            <div class='col-xs-3 h4'>$2.5 per</div>
//            <div class='col-xs-6'>
//                <a class='btn btn-warning'>Add to the Cart</a>
//            </div>
//        </div>
//        <div class='row text-center form-group'>
//            <div class='col-xs-3 h4'>coca_cola</div>
//            <div class='col-xs-3 h4'>$0.5 per</div>
//            <div class='col-xs-6'>
//                <a class='btn btn-warning'>Add to the Cart</a>
//            </div>
//        </div>
//    </div>
//</div>