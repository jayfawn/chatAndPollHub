"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/pollHub").build();
var chartBlock = '\u25A3'; //(U+25A3) is "▣" 

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = ""; //document.getElementById("messageInput").value;
    //var myCaptain = document.getElementById("myCaptain").value;

    if (!user) {
        user = "[anonymous]";
    }

    if ($('input:radio[name=myCaptain]').is(':checked')) {
        var myCaptainId = $('input[name=myCaptain]:checked').attr('id');
        var myCaptainVal = $('input[name=myCaptain]:checked').val();
        connection.invoke("SendMessage", user, message, myCaptainId, myCaptainVal).catch(function (err) {
            return console.error(err.toString());
        });
    } else {
        return console.log("No captain selected.");
    }

    event.preventDefault();
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});