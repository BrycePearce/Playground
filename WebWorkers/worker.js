onmessage = function (e) {
    const result = `${e.data[0]} ${e.data[1]}`;

    // for (let i = 0; i < 9999; i++) {
    //     console.log('do work')
    // }

    new Promise(r => setTimeout(r, 2000)).then(() => {
        const workerResult = 'Result: ' + result;
        postMessage(workerResult);
    });
}