const about = document.getElementById('project-about');
const updates = document.getElementById('project-updates');
const credits = document.getElementById('project-credits');

const aboutBtn = document.getElementById('project-aboutBtn');
const updatesBtn = document.getElementById('project-updatesBtn');
const creditsBtn = document.getElementById('project-creditsBtn');

var tabSelected = 0;

function clickAbout() {
    tabSelected = 0;
    about.style.display = 'block';
    credits.style.display = 'none';
}

function clickCredits() {
    tabSelected = 2;
    credits.style.display = 'block';
    about.style.display = 'none';
}

aboutBtn.addEventListener('click', clickAbout);
updatesBtn.addEventListener('click', updates);
creditsBtn.addEventListener('click', clickCredits);
