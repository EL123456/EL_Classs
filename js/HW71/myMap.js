function myMap(array, callback) {
    console.log(array);
    let newArray = []
    for (let i = 0; i < array.length; i++) {
        const newValue = callback(array[i]);
        newArray.push(newValue);
    }
    console.log(newArray)
    return newArray;
}

const newArray1 = myMap([2,4,6],function(num) {
    return num * 2;
});
