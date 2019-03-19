"use strict";

let connection = new signalR.HubConnectionBuilder().withUrl("/pollHub").build();

document.getElementById("joinGame").addEventListener("click", function (event) {
    event.preventDefault();
    console.log(document.getElementById("username").value);
    let username = document.getElementById("username").value;

    if (!username) {
        username = "[anonymous]";
    }

    connection.invoke("SendUser", username).catch(function (err) {
        return console.error(err.toString());
    });
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

