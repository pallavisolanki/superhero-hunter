const navA = document.querySelector(".nav-a");

navA.addEventListener("click", function (e) {
    document.location.href = 'index.html';
});

//importing modules from script.js
import { renderSuperheroes, abcd } from './script.js';

renderSuperheroes([])
setTimeout(function () {
    if (abcd != []) {
       
        const favHead = document.querySelector('.fav-heading');
        favHead.innerHTML = "Favourite Heroes:"
        renderSuperheroes(abcd);
     
        
        
    }
    else {
        renderSuperheroes([])
    }

}, 2500);