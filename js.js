
var topics = [
    "hiking",
    "camping",
    "banjo music",
    "psychedelic music",
    "hypnotic patterns",
    "geek humor",
    "travel"
]

var ID = 0;

// *******************************************************************
// get local storage
// *******************************************************************

var local = localStorage;

// *******************************************************************
// if there is no local storage it will populate the default topics
// *******************************************************************

if(localStorage.length === 0){
    for(i=0; i<topics.length; i++){
        localStorage.setItem(ID,topics[i]);
        ID++;
    }
}

// ****************************************************************************
// adding a new topic
// ****************************************************************************

$("#submit").on("click", function(event){
    event.preventDefault();
    localStorage.setItem(ID,$("#searchTerm").val().trim());
    ID++;
    createButtons();
    local = localStorage;
    $("#searchTerm").val('');
})

// *************************************************************************
// clearing the last topic clicked
// *************************************************************************

$("#clear").on("click", function(event){
    event.preventDefault();
    // delete the last button to have been clicked
    var index = 0;
    for(i=0; i<localStorage.length+100; i++){
        if(localStorage[i]===thisButton[0].textContent){
            localStorage.removeItem(index) 
            createButtons();
        }
        index++;
    }
})



// ***********************************************************************************
// create buttons
// ***********************************************************************************

function createButtons(){
    $("#buttons").empty();
    for(i=0; i<localStorage.length+100; i++){
        if(localStorage[i]){
            var button = $("<button>");
            button.addClass("button");
            button.attr("data-topic",localStorage[i]);
            button.text(localStorage[i]);
            $("#buttons").append(button);
        }

    }
}

createButtons();

// **************************************************************************
// clicking on a button
// **************************************************************************

var thisButton;

$("#buttons").on("click", ".button", function(event){
    event.preventDefault();
    thisButton = $(this);

    var searchTerm = $(this).attr("data-topic");
    var URL = "https://api.giphy.com/v1/gifs/search?q=";
    var APIkey = "&api_key=uyL6KKujqXKkkziBvq8M6CXzL17CbQTh";
    queryURL = URL + searchTerm + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("response",response);
        
        for(i=0; i<10; i++){
            still = response.data[i].images.original_still.url;
            moving = response.data[i].images.original.url;
            var thisRating = response.data[i].rating;
            //console.log("thisRating",thisRating);

            var card = $("<div>");
            card.addClass("card");

            var img = $("<img>");
            img.addClass("gifs");
            img.attr("data-still",still);
            img.attr("data-moving",moving);
            img.attr("src",still);
            img.attr("moving",false);
            img.attr("rating",thisRating);
            card.append(img);
            
            var banner = $("<div>");
            banner. addClass("rating");
            banner.attr("rating",thisRating);
            banner.text("Rating: " + thisRating);
            card.append(banner);

            $("#gifs").prepend(card);   
        }
    })  
    
})

// **************************************************************************
// clicking on a gif
// **************************************************************************

var still;
var moving;
var rating

$("#gifs").on("click", ".gifs", function(event){
    event.preventDefault();
    var $this = $(this);
    
    // if the item clicked is moving
    if($(this).attr("moving")==="false"){
        
        // change state to 'moving'
        $this.attr("src", $this.attr("data-moving"));
        $this.attr("moving","true");
    }else{
        // otherwise change state to 'still'
        $this.attr("src", $this.attr("data-still"));
        $this.attr("moving","false");
    }

})

