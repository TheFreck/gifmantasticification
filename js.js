

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
    var trending = $("<button>");
    trending.addClass("button");
    trending.attr("id","trending");
    trending.text("trending");
    $("#buttons").append(trending);

    var random = $("<button>");
    random.addClass("button");
    random.attr("id", "random");
    random.text("random");
    $("#buttons").append(random);

    for(i=0; i<localStorage.length+100; i++){
        if(localStorage[i]){
            var button = $("<button>");
            button.addClass("button userButtons");
            button.attr("data-topic",localStorage[i]);
            button.text(localStorage[i]);
            $("#buttons").append(button);
        }

    }
}

createButtons();

// **************************************************************************
// clicking on a button and getting gifs
// **************************************************************************

var thisButton;
var searchTerm;

$("#buttons").on("click", ".userButtons", function(event){
    searchTerm = $(this).attr("data-topic");
    event.preventDefault();
    go("v1/gifs/search?q=");
})
$("#buttons").on("click", "#trending", function(event){
    searchTerm = "";
    event.preventDefault();
    go("v1/gifs/trending?q=");
})
$("#buttons").on("click", "#random", function(event){
    searchTerm = "";
    event.preventDefault();
    go("v1/gifs/random?q=",true);
})

function go(path,rand){
    console.log("go rand",rand);
    thisButton = $(this);

    var URL = "https://api.giphy.com/";
    var APIkey = "&api_key=uyL6KKujqXKkkziBvq8M6CXzL17CbQTh";
    queryURL = URL + path + searchTerm + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("response",response);

        if(!rand){
            console.log("input 10");
            makeCards(10);
        }else{
            console.log("input 1");
            makeCards(1, true);
        }
        
        var still;
        var moving;
        var rating
        function makeCards(counter, isRand){
            console.log("makeCards");
            console.log("isRand",isRand);
            for(i=0; i<counter; i++){
                var thisRating;
                if(!isRand){
                    thisRating = response.data[i].rating;
                    console.log("not random");
                    still = response.data[i].images.original_still.url;
                    moving = response.data[i].images.original.url;
                }else{
                    console.log("random");
                    still = response.data.images.original_still.url;
                    moving = response.data.images.original.url;
                    thisRating = "not rated";
                }
                    
    
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
        }
        
    })  
}


// **************************************************************************
// clicking on a gif
// **************************************************************************



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






