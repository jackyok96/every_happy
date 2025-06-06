'use strict';
window.onload = () => {

    /* //轉跳頁面 */
    const toggle_btn = document.querySelector('.main__header-toggle-btn');
    toggle_btn.addEventListener("click", () => {
        //縮放側邊欄效果
        // const aside = document.querySelector(".aside");
        // aside.classList.toggle("d-none");
        // const main = document.querySelector(".main");
        // main.classList.toggle("w-100");
        // const switch_img = document.querySelector(".main__header-toggle-btn img");
        // switch_img.classList.toggle("close--active");

        window.location.href = "index.html";
    });

    /* //「切換投注視窗」按鈕 */
    const toggle_switch_btn = document.querySelector('.main__bet-section-content-group-button-switch');
    const section_content = document.querySelector('.main__bet-section-content');
    toggle_switch_btn.addEventListener("click", () => {
        section_content.classList.toggle("show");
    });

    /* //「直播」視窗 */
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

    /* 托曳下注功能 */
    const parent = document.querySelector(".chips > ul"),
        elements = document.querySelectorAll(".chips ul li.chips-bet"),
        newElements = document.querySelectorAll(".chips ul li.chips-bet"),
        thresHold = "50%",
        droppables = document.querySelectorAll(".options div");

    elements.forEach(function (element, index) {
        index = index + 1;
        element.className = 'element' + index;
    });

    newElements.forEach(function (element, index) {
        index = index + 1;
        element.className = 'element' + index;
        createDraggable(element);
        element.originalOffset = getOffset(element);
    });

    function addElement(chip) {
        const newElement = chip.cloneNode(true);
        parent.appendChild(newElement);
        createDraggable(newElement);
        return newElement;
    }

    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    // 建立可拖曳部件
    function createDraggable(element) {
        // 建立可拖曳物件時儲存原始偏移量
        const originalOffset = getOffset(element);

        Draggable.create(element, {
            type: 'x,y',
            bounds: '.main__panel',
            dragClickables: true,

            onDragStart: function () {
                gsap.to(this.target, { duration: 0.2, opacity: 1 });
                if (!this.target.classList.contains("dragged")) {
                    const newElement = addElement(this.target);
                    this.target.classList.add("dragged");
                }
            },

            onDrag: function () {
                droppables.forEach(function (dropzone) {

                    if (this.hitTest(dropzone, thresHold)) {
                        dropzone.classList.add("highlight");
                    } else {
                        dropzone.classList.remove("highlight");
                    }
                }, this);
            },

            onDragEnd: function () {
                const i = droppables.length;
                let snappedEl = false;

                for (let j = 0; j < i; j++) {
                    if (this.hitTest(droppables[j], thresHold)) {
                        const targetOffset = getOffset(droppables[j]);
                        snappedEl = true; // 標記已吸附
                        this.target.classList.add("snapped");

                        gsap.to(this.target, {
                            duration: 0.1,
                            x: targetOffset.left - originalOffset.left,
                            y: targetOffset.top - originalOffset.top
                        });
                    }
                }

                if (!snappedEl) {
                    gsap.to(this.target, {
                        duration: 0.2,
                        x: 0,
                        y: 0
                    });
                }
            }
        });
    }

    /* 下注歷史記錄 */
    //左邊記錄
    (function () {

        for (let i = 0; i < 168; i++) {
            document.querySelector('.box').insertAdjacentHTML('beforeend', '<li></li>');
            let li = document.querySelector('.box').lastChild;
            li.insertAdjacentHTML('beforeend', `<p>${i}</p>`);
            if (i % 2 === 0) {
                li.style.background = '#FFF';
                li.style.color = 'white';
            } else {
                li.style.background = '#FFF';
                li.style.color = 'white';
            }
        }

        let posBlue = document.querySelectorAll('.box li:nth-child(2n+1)');
        let posRed = document.querySelectorAll('.box li:nth-child(2n+2)');
        let posGreen = document.querySelectorAll('.box li:nth-child(3n+3)');
        const blue = '<div class="bet-box bet-blue">閒</div>';
        const red = '<div class="bet-box bet-red">莊</div>';
        const green = '<div class="bet-box bet-green">和</div>';

        for (let i = 0; i <= posBlue.length - 1; i++) {
            setTimeout(() => {
                posBlue[i].insertAdjacentHTML('beforeend', `${blue}`);
                posBlue[i].lastChild.classList.add('infade');
            }, i * 400);
        }

        for (let i = 0; i <= posRed.length - 1; i++) {
            setTimeout(() => {
                posRed[i].insertAdjacentHTML('beforeend', `${red}`);
                posRed[i].lastChild.classList.add('infade');
            }, i * 400);
        }

        for (let i = 0; i <= posGreen.length - 1; i++) {
            setTimeout(() => {
                posGreen[i].insertAdjacentHTML('beforeend', `${green}`);
                posGreen[i].lastChild.classList.add('infade');
            }, i * 800);
        }

    })();

    //右邊記錄
    (function () {

        for (let i = 0; i < 168; i++) {
            document.querySelector('.box2').insertAdjacentHTML('beforeend', '<li></li>');
            let li = document.querySelector('.box2').lastChild;
            li.insertAdjacentHTML('beforeend', `<p>${i}</p>`);
            if (i % 2 === 0) {
                li.style.background = '#FFF';
                li.style.color = 'white';
            } else {
                li.style.background = '#FFF';
                li.style.color = 'white';
            }
        }

        let posBlue = document.querySelectorAll('.box2 li:nth-child(2n+1)');
        let posRed = document.querySelectorAll('.box2 li:nth-child(2n+2)');
        let posGreen = document.querySelectorAll('.box2 li:nth-child(3n+3)');
        const blue = '<div class="bet-box bet-blue">閒</div>';
        const red = '<div class="bet-box bet-red">莊</div>';
        const green = '<div class="bet-box bet-green">和</div>';

        for (let i = 0; i <= posBlue.length - 1; i++) {
            setTimeout(() => {
                posBlue[i].insertAdjacentHTML('beforeend', `${blue}`);
                posBlue[i].lastChild.classList.add('infade');
            }, i * 400);
        }

        for (let i = 0; i <= posRed.length - 1; i++) {
            setTimeout(() => {
                posRed[i].insertAdjacentHTML('beforeend', `${red}`);
                posRed[i].lastChild.classList.add('infade');
            }, i * 400);
        }

        for (let i = 0; i <= posGreen.length - 1; i++) {
            setTimeout(() => {
                posGreen[i].insertAdjacentHTML('beforeend', `${green}`);
                posGreen[i].lastChild.classList.add('infade');
            }, i * 800);
        }

    })();

    // var $modal = $('#reportModalToggle');
    const reportModal = document.querySelector('#reportModalToggle');
    // reportModal.querySelector('.modal-content').style.width= "80vw";
    reportModal.querySelector('.modal-content').style.height = "80vh";

    /* 彩池下拉式清單 */
    // Variables
    const dropdown = document.querySelector('.dropdown');
    const input = document.querySelector('input');
    const listOfOptions = document.querySelectorAll('.option');
    const body = document.body;

    // Functions
    const toggleDropdown = (event) => {
        event.stopPropagation();
        dropdown.classList.toggle('opened');
    };

    const selectOption = (event) => {
        input.value = event.currentTarget.textContent;
    };

    const closeDropdownFromOutside = () => {
        if (dropdown.classList.contains('opened')) {
            dropdown.classList.remove('opened');
        }
    };

    // Event Listeners
    body.addEventListener('click', closeDropdownFromOutside);

    listOfOptions.forEach((option) => {
        option.addEventListener('click', selectOption);
    });

    dropdown.addEventListener('click', toggleDropdown);

    //   按下 start 後 id 為 timer 的 DIV 內容可以開始倒數到到 0。 
    let timer = document.querySelector(".play-numb");
    let number = timer.innerHTML;
    let tmpTimer = Number(number);
    setInterval(function () {
        number--;
        if (number <= 0) {
            number = tmpTimer;
        }
        timer.innerText = number.toString().padStart(2, 0);
    }, 1000);
}


/* 放大螢幕效果 */
function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

/* 顯示下注結果 */
function dispalyResult($playObject) {
    let playResult = document.querySelector($playObject);
    playResult.classList.toggle('fade');
}
