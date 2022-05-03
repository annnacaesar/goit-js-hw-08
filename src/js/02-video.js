import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);


let time = localStorage.getItem('videoplayer-current-time');
if(time != null) {
    player.setCurrentTime(time);
}

player.on('timeupdate', function() {
    player.getCurrentTime().then(function(seconds) {
        localStorage.setItem('videoplayer-current-time', seconds);
    });
});