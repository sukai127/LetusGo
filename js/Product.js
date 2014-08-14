/**
 * Created by sukai on 14-8-14.
 */
function Product(name,unit,catagory,price){
    this.name = name;
    this.unit = unit;
    this.catagory = catagory;
    this.price = price;
}

function loadAllProducts(){
    return [
            {
               type : 'frocery',
               items : [
                   new Product('apple','pound','grocery',2.50),
                   new Product('coca_cola','bottle','grocery',0.50),
                   new Product('Instant noodles','bag','grocery',1.00)
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
}
