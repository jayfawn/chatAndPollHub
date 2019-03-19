"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/pollHub").build();

connection.on("ReceiveUser", function(user) {
    var ulUsers = document.getElementById("joinedUsers");
    var liUser = document.createElement("li");
    liUser.textContent = user;
  
    // append to top
    ulUsers.insertBefore(liUser, ulUsers.childNodes[0]);
  });


connection.start().catch(function(err) {
  return console.error(err.toString());
});
  