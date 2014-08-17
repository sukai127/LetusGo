/**
 * Created by sukai on 14-8-15.
 */
var Util = Util || {};
Util.storage = {
    getStorageItem : function (key){
       return JSON.parse(localStorage.getItem(key));
    },
    add2Storage : function(key,Obj){
        localStorage.setItem(key,JSON.stringify(Obj));
    },
    removeStorageItem : function(key){
        localStorage.removeItem(key);
    }
}