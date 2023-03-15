var sourceImage = document.getElementById("player-albumPortrait");
var sourceBg = document.getElementById("player-container");


function changeBgColor() {
    if (sourceImage.complete) {
        var colorThief = new ColorThief();
        console.log(sourceBg.style.background = 'linear-gradient(0deg, rgba(42,42,42,1) 0%, rgba(' + colorThief.getColor(sourceImage) + ',1) 100%)');
    } else {
        console.log("Error loading bg");
    }
}

function checkImagesLoaded() {
    window.addEventListener("load", function() {
        changeBgColor();
    });
    
}

checkImagesLoaded();