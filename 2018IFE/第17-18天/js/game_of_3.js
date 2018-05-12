for (var i = 1; i<=100; i++) {
    var message
    if ((i % 3) === 0 || (i % 10) === 3 ) {
        message = "PA";
    }else {
        message = i;
    }
    console.log(message + ",");
}