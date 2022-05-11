const myWorker = new Worker('worker.js');
const updateText = () => {
    // start worker process
    myWorker.postMessage(['🐈', '🐕']);

    // get cat
    document.querySelector(".result").innerHTML = "Cat was successfully beamed in from universe";
    document.querySelector(".catpic").src = 'http://placekitten.com/200/300'
}

myWorker.onchange = () => {
    console.log('Message posted to worker');
}


myWorker.onmessage = (e) => {
    console.log('Message received from worker', e.data);
    document.querySelector('.webWorkerRes').innerHTML = 'Message received from worker' + e.data
}