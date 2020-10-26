// IIFE -- Immediately Invoked Function Expression
/*
Filename: Assignment1
Student name: Jiyeon Jeon
Student ID: 301103064
Date: 2020.10.08
*/

(function(){

    function Start()
    {
        console.log("App Started...");

        let dangerButtons = document.getElementsByClassName("btn-danger");

        for (const button of dangerButtons) {
            button.addEventListener('click', (event) => {
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    location.href = '/movie-list';
                }
            });
        }
    }

    window.addEventListener('load', Start);
})();

(function(){

    function goto()
    {
       
        if(document.title === "Home")
        {
            let moveButton = document.getElementById("moveButton");
            
            moveButton.addEventListener('click', (event) => {
                event.preventDefault();
                
                    location.href = "/about";
            });
        }

        
    }

    window.addEventListener("load", goto);
})();





