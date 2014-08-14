/**
 * Created by sukai on 14-8-14.
 */
function Product(name,unit,catagory,price){
    this.name = name;
    this.unit = unit;
    this.catagory = catagory;
    this.price = price;
}

function getProductByName(name){
    var products = loadAllProducts();
    var result;
    _.forEach(products,function(product){
        _.forEach(product.items,function(item){
            if(item.name === name){
                result = item;
            }
        });
    });
    return result;
};
function loadAllProducts(){
    return [
            {
               type : 'grocery',
               items : [
                   new Product('apple','pound','grocery',2.50),
                   new Product('coca_cola','bottle','grocery',0.50),
                   new Product('Instant_noodles','bag','grocery',1.00)
               ]
            },
            {
                type : 'device',
                items : [
                    new Product('kettle','piece','device',43.5),
                    new Product('fan','piece','device',30.0),
                ]
            }
    ];
};
