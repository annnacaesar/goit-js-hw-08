import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

let time = localStorage.getItem('videoplayer-current-time');
if(time != null) {
    player.setCurrentTime(time);
}

const onCurrentTime = () => {
    player.getCurrentTime().then(function (seconds) {
        localStorage.setItem('videoplayer-current-time', seconds);

    });
}

player.on('timeupdate', throttle(onCurrentTime, 1000) );

