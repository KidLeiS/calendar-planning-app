dayjs.extend(window.dayjs_plugin_advancedFormat);

$(function() {

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
    
    // var hourNow = parseInt(dayjs().format("H"));

    var hourNow = 13;

    var init = function(){
        $("#currentDay").text("Today's date is: " + dayjs().format('dddd[, ]MMMM [ ] Do'));
        fetchLocal();
        setColor();
    };

    var saveLocal = function(){
        localStorage.setItem("toDos", JSON.stringify(toDos));
    };

    var fetchLocal = function(){
        if (localStorage.getItem("toDos") != null) {
            toDos = JSON.parse(localStorage.getItem("toDos"));
            var timeKeys = Object.keys(toDos);

            for (var i=0; i < timeKeys.length; i++) {
                $("#" + timeKeys[i]).children("input").val(toDos[timeKeys[i]]);
            };
        };
    };

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


    $(".container").on("click",".saveBtn",function(event){
        var timeID = $(event.target).parent().attr("id");
        var inputEl = $(event.target).parent().children("input");

        toDos[timeID] = inputEl.val();
        
        saveLocal();
    })

    init();

    

});