// Adding Dayjs advanced format plugin
dayjs.extend(window.dayjs_plugin_advancedFormat);

//JQuery .ready() notation
$(function() {

    // Setting a object for the todos
    var toDos = {
        NineAM: "",
        TenAM: "",
        ElevenAM: "",
        Noon: "",
        OnePM: "",
        TwoPM: "",
        ThreePM: "",
        FourPM: "",
        FivePM: "",
    };
    
    // Retrieving the current time as an int
    var hourNow = parseInt(dayjs().format("H"));

    // Testing for different times
    // var hourNow = 13;

    // Initialisation function to fetch LocalStorage and render the calendar
    var init = function(){
        $("#currentDay").text("Today's date is: " + dayjs().format('dddd[, ]MMMM [ ] Do'));
        fetchLocal();
        setColor();
    };

    // Function for saving todos into localStorage
    var saveLocal = function(){
        localStorage.setItem("toDos", JSON.stringify(toDos));
    };

    // Function to fetch and render calendar todos from Local Storage
    var fetchLocal = function(){
        if (localStorage.getItem("toDos") != null) {
            toDos = JSON.parse(localStorage.getItem("toDos"));
            var timeKeys = Object.keys(toDos);

            for (var i=0; i < timeKeys.length; i++) {
                $("#" + timeKeys[i]).children("input").val(toDos[timeKeys[i]]);
            };
        };
    };

    // Function to set color of the calendar
    var setColor = function(){
        var timeKeys = Object.keys(toDos);

        for (var i = 9; i < timeKeys.length+9; i++) {
            if (i == hourNow) {
                $("#" + timeKeys[i-9]).children("input").css("background-color", "rgb(255, 204, 203)");
            } else if (i > hourNow) {
                $("#" + timeKeys[i-9]).children("input").css("background-color", "rgb(144, 238, 144)");
            } else {
                $("#" + timeKeys[i-9]).children("input").css("background-color", "rgb(211, 211, 211)");
            }
        };
    };

    // Onclick button listener to save inputs from the current time-block
    $(".container").on("click",".saveBtn",function(event){
        var timeID = $(event.target).parent().attr("id");
        var inputEl = $(event.target).parent().children("input");

        toDos[timeID] = inputEl.val();
        
        saveLocal();
    })

    // Initialise the application
    init();

    

});