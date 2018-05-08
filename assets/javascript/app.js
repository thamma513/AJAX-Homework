$(document).ready(function () {

    var topics = ["Skateboarding", "Snowboarding", "Wakeboarding", "Wakeskating", "Mountain Biking", "Parkour", "Skateboarding Tricks", "Wakesurfing", "Kitesurfing", "Skiing"];

    function renderButtons() {
        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button class='answer-button btn btn-info' btn-lg >");
            a.addClass("topic");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons").append(a);
        }
    }

    $("#addAspGif").on("click", function (event) {
        event.preventDefault();
        var topic = $("#asp-input").val().trim();
        topics.push(topic);
        renderButtons();
    });

    $(document).on("click", ".topic", function () {
    $("#actionSports").empty();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?apikey=&api_key=Hn8l18xANORyuAtYGhRPSD9b2p9ppwLW&q="
    + topic + "&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        var results = response.data;
        console.log(results[0]);
        for (var i = 0; i < 10; i++) {
        var topicDiv = $("<div class='actionSports'>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("data-state", "still");
            topicDiv.append(p);
            topicDiv.append(topicImage);

            $("#actionSports").prepend(topicDiv);
            }
        });
    });
    $(document).on("click", "img", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    renderButtons();

});