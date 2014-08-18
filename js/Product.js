/**
 * Created by sukai on 14-8-14.
 */
function Product(name,unit,category,price){
    this.name = name;
    this.unit = unit;
    this.category = category;
    this.price = price;
}

function getProductByName(name){
    var products = loadAllProducts();
    var result = null;
    _.forEach(products,function(product){
        if(product.name === name) {
            result = product;
        }
    });
    return result;
}
