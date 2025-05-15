window.onload = () => {
    const toggle_btn = document.querySelector('.main__header-toggle-btn');
    toggle_btn.addEventListener("click", () => {
        //縮放側邊欄效果
        // const aside = document.querySelector(".aside");
        // aside.classList.toggle("d-none");
        // const main = document.querySelector(".main");
        // main.classList.toggle("w-100");
        // const switch_img = document.querySelector(".main__header-toggle-btn img");
        // switch_img.classList.toggle("close--active");

        window.location.href = "lobby.html";
    });

    const toggle_switch_btn = document.querySelector('.main__bet-section-content-group-button-switch');
    const section_content = document.querySelector('.main__bet-section-content');
    toggle_switch_btn.addEventListener("click", () => {
        section_content.classList.toggle("show");
    });

    if (flvjs.isSupported()) {
        const videoElement = document.getElementById('videoPlayer');
        const flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'https://live.crazyball.net/app/testaa.flv',
            isLive: true,
            hasAudio: true,
            hasVideo: true,
            cors: true
        });

        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();

        flvPlayer.on(flvjs.Events.ERROR, (errorType, errorDetail) => {
            console.error('播放器錯誤:', errorType, errorDetail);
        });

        window.addEventListener('beforeunload', () => {
            flvPlayer.destroy();
        });
    } else {
        console.error('您的瀏覽器不支援 FLV 播放');
    }
}