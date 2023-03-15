function checkTitleLenght() {
    var sourceTitle = document.getElementById("song-title");
    var sourceMarquee = document.querySelector(".marquee span");
    
    if (sourceTitle.innerHTML.length < 30) {
        sourceMarquee.style.animation = 'paused';
    }
    
}

checkTitleLenght();