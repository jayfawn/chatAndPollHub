"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/pollHub").build();
var ctx = document.getElementById("bar-chart-horizontal");
console.log(ctx);
console.log(document.getElementById("responseHimCounter").innerHTML);
console.log(document.getElementById("responseHerCounter").innerHTML);

var myChart = new Chart(ctx, {
  type: "horizontalBar",
  data: {
    labels: ["Him", "Her"],
    datasets: [
      {
        label: "Responses (Audience!)",
        backgroundColor: ["#3e95cd", "#8e5ea2"],
        data: [0, 0]
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Him vs Her",
      scaleStartValue : 0 
    },
    scales: {
        xAxes: [{
            ticks: {
                min: 0, // minimum value
            }
        }]
    }
  }
});

connection.on("ReceiveMessage", function(
  user,
  message,
  myResponseId,
  myResponseVal
) {
  // alert("myResponseId=" + myResponseId + ",myResponseVal=" + myResponseVal);
  var msg = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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

 
  // Increment Counter
  var counter = document.getElementById(myResponseId + "Counter").innerHTML;
  counter++;
  document.getElementById(myResponseId + "Counter").innerHTML = counter;
  addData(myChart);
});

function addData(myChart) {
    console.log("Add Data Called");
  myChart.data.datasets[0].data = [
    document.getElementById("responseHimCounter").innerHTML,
    document.getElementById("responseHerCounter").innerHTML
  ];
  console.log([document.getElementById("responseHimCounter").innerHTML,
  document.getElementById("responseHerCounter").innerHTML])
  myChart.update();
  console.log(localStorage.getItem("q1"))
  console.log(localStorage.getItem("q10"))
}

connection.start().catch(function(err) {
  return console.error(err.toString());
});
