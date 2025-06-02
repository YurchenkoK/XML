function erase(array) {
    return array.filter(item => Boolean(item));
}

const data = [0, 1, false, 2, 7,  undefined, '', 3, null];
console.log(erase(data));