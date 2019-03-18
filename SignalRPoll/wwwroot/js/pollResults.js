"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/pollHub").build();
var chartBlock = '\u25A3'; //(U+25A3) is "▣" 

connection.on("ReceiveMessage", function (user, message, myResponseId, myResponseVal) {
    // alert("myResponseId=" + myResponseId + ",myResponseVal=" + myResponseVal);
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // var encodedMsg = user + " says " + msg;
    var pollResultMsg = user + " voted for '" + myResponseVal + "'.";

    // var liMessage = document.createElement("li");
    // liMessage.textContent = encodedMsg;
    // document.getElementById("messagesList").appendChild(liMessage);

    var ulPoll = document.getElementById("messagesList");
    var liPollResult = document.createElement("li");
    liPollResult.textContent = pollResultMsg;

    // append to top
    ulPoll.insertBefore(liPollResult, ulPoll.childNodes[0]);

    // append to end
    // document.getElementById("messagesList").appendChild(liPollResult);

    // append to chart block
    document.getElementById(myResponseId + 'Block').innerHTML += chartBlock;
    // Increment Counter
    var counter = document.getElementById(myResponseId + 'Counter').innerHTML;
    counter++
    document.getElementById(myResponseId + 'Counter').innerHTML = counter;
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});