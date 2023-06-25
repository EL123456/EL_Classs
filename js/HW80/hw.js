(function () {
    'use strict';

    const videoList = $('#sidebar ul');
    const embedVideoPlayer = $('#videoPlayer');

    async function fetchVideos() {
        try {
            const response = await fetch('videos.json');
            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const videos = await response.json();
            return videos;
        } catch(e) {
            console.error(e);
        }
    }

    async function displayVideoList() {
        const videos = await fetchVideos();
        videos.forEach(video => {
            $(`
                <li>
                    
                    <iframe src='${video.picture}' alt='${video.name}'></iframe>
                    <span>${video.name}</span>
                </li>
            `).appendTo(videoList)
                .on('click', () => {
                    embedVideoPlayer.attr('src', video.url);
                })
        });
    }

    displayVideoList();
}());