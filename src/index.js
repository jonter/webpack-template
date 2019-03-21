import './css/main.css';   // import style file

import add from './js/common'; //importing one of our js modules

console.log(add(3,15) + ' from index.js '); // check how the import working

const dateContainers = Array.from(document.querySelectorAll("h1"));

for (let container of dateContainers){
    container.style.backgroundColor = 'red';
}
