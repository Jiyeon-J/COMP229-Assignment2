// IIFE -- Immediately Invoked Function Expression
/*
Filename: Assignment1
Student name: Jiyeon Jeon
Student ID: 301103064
Date: 2020.10.08
*/



"use strict";
(function(){

    function Start()
    {
        console.log("App Started...");


        if(document.title === "Contact Me")
        {
            let sendButton = document.getElementById("sendButton");
            let cancelButton = document.getElementById("cancelButton");

            let fullName = document.getElementById("fullName");
            let emailAddress = document.getElementById("emailAddress");
            let contactNumber = document.getElementById("contactNumber");
            let message = document.getElementById("message");

            sendButton.addEventListener('click', (event) => {
                event.preventDefault();
                console.info(
                    `Full Name      : ${fullName}
                     Email Address  : ${emailAddress}
                     Contact Number : ${contactNumber}
                     Your Message   : ${message}
                    `
                );
            });

            cancelButton.addEventListener('click', (event) => {
                event.preventDefault();
                if(confirm("Are you sure?"))
                {
                    location.href = "/home";
                }
                
            });
        }

        
    }

    window.addEventListener("load",Start);
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

    window.addEventListener("load",goto);
})();





