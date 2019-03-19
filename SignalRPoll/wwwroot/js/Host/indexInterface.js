$( "#create" ).click(function(event) {
    event.preventDefault()
    console.log("Hello Saule")
    localStorage.setItem("q1", $("#q1").val());
    localStorage.setItem("q2", $("#q2").val());
    localStorage.setItem("q3", $("#q3").val());
    localStorage.setItem("q4", $("#q4").val());
    localStorage.setItem("q5", $("#q5").val());
    localStorage.setItem("q6", $("#q6").val());
    localStorage.setItem("q7", $("#q7").val());
    localStorage.setItem("q8", $("#q8").val());
    localStorage.setItem("q9", $("#q9").val());
    localStorage.setItem("q10", $("#q10").val());

    console.log(localStorage.getItem("q1"))
    console.log(localStorage.getItem("q10"))
    $(location).attr('href', '/Host/lobby')
});
