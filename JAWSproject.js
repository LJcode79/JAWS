class Table {
    constructor(tableNo){
        this.tableNo = tableNo;
    }
}

function makeStruct(keys) {
    if (!keys) {
        return null;
    }
    const k = keys.split(', ');
    const count = k.length;

    function constructor(){
        for (let i = 0; i < count; i++){
            this[k[i]] = arguments[i];
        }
    }
    return constructor;
}
//console.log("Hello, world!");
//constructor(int tableNo, )