'use strict'

const fibonacci = () => {
    var fibArray = [0,1];
    while (fibArray[fibArray.length-1]<350) {
        let i = fibArray.length;
        fibArray.push(fibArray[i-1]+fibArray[i-2]);
    }
    return fibArray;
};

const isFibonnaci = (num) => {
    return fibonacci().includes(num);
}

module.exports = {
    fibonacci,
    isFibonnaci
}
