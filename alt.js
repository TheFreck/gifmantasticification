$("#gifs").on("click", ".gifs", function(event){

    event.preventDefault();
    console.log("pre if moving",$(this).attr("moving"));
    console.log("not pre if moving",!($(this).attr("moving")));
    
    // if the item clicked is moving
    if($(this).attr("moving")===false){
        // then log its pre change state
        console.log("pre moving",$(this).attr("moving"));
        //  change state to 'moving'
        $(this).attr("moving",true);
        // log its post change state
        console.log("post moving",$(this).attr("moving"));
    }
    // if the item clicked is not moving
    if($(this).attr("moving")){
        // then log its pre change state
        console.log("pre moving",$(this).attr("moving"));
        // change state to 'still'
        $(this).attr("moving",false);
        // log post change state
        console.log("post moving",$(this).attr("moving"));
    }

})