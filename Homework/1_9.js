import readline from 'readline';

function fill(arraySize, data) {
    return new Array(arraySize).fill(data);
}

readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

    const arraySize = parseInt(sizeInput);
    const data = dataInput;
    console.log('Результат:', fill(arraySize, data));