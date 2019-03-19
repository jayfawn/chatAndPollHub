﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/pollHub").build();
var chartBlock = '\u25A3'; //(U+25A3) is "▣" 

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = localStorage.getItem("user");
    var message = ""; //document.getElementById("messageInput").value;
    //var myResponse = document.getElementById("myResponse").value;

    if (!user) {
        user = "[anonymous]";
    }

    if ($('input:radio[name=myResponse]').is(':checked')) {
        var myResponseId = $('input[name=myResponse]:checked').attr('id');
        var myResponseVal = $('input[name=myResponse]:checked').val();
        connection.invoke("SendMessage", user, message, myResponseId, myResponseVal).catch(function (err) {
            return console.error(err.toString());
        });
    } else {
        return console.log("No response selected.");
    }
    event.preventDefault();
});

connection.on("ReceiveQuestion", function(question) {
    console.log(question);
    console.log(localStorage.getItem("q1"));
    document.getElementById("question").innerHTML = question;
  });

connection.start().catch(function (err) {
    return console.error(err.toString());
});

