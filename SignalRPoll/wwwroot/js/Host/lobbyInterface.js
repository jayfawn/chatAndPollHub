"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/pollHub").build();

connection.on("ReceiveUser", function(user) {
    var ulUsers = document.getElementById("joinedUsers");
    var liUser = document.createElement("li");
    liUser.textContent = user;
  
    // append to top
    ulUsers.insertBefore(liUser, ulUsers.childNodes[0]);
  });

$( "#start" ).click(function(event) {
  event.preventDefault()
  $(location).attr('href', '/Host/Results')

  var question = localStorage.getItem("q1");
  console.log(question)
  connection.invoke("SendQuestion", question).catch(function (err) {
    return console.error(err.toString());
});
})

connection.start().catch(function(err) {
  return console.error(err.toString());
});

