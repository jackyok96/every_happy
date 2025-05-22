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


    //下注托曳功能
        // 拖曳相關變數
    const parent = document.querySelector(".chips > ul"), // 拖曳元素的父容器
        elements = document.querySelectorAll(".chips ul li.chips-bet"), // 現有可拖曳元素
        newElements = document.querySelectorAll(".chips ul li.chips-bet"), // 新增的可拖曳元素
        thresHold = "50%", // 命中測試閾值
        droppables = document.querySelectorAll(".options div"); // 可放置區

    // 設定現有元素的 id
    elements.forEach(function (element, index) { // 針對每個現有元素
        index = index + 1; // 設定索引從 1 開始
        element.className = 'element' + index; // 設定 id
    });

    // 設定新元素的 id 並建立可拖曳功能
    newElements.forEach(function (element, index) { // 針對每個新元素
        index = index + 1; // 設定索引從 1 開始
        element.className = 'element' + index; // 設定 id
        createDraggable(element); // 建立可拖曳實例
        element.originalOffset = getOffset(element); // 記錄元素的初始位置
    });

    // 新增一個可拖曳元素
    function addElement(chip) { // 定義新增元素的函式
        const newElement = chip.cloneNode(true);
        parent.appendChild(newElement); // 加到父容器
        createDraggable(newElement); // 建立可拖曳實例
    }

    // 取得元素的 offset（相對於頁面左上角的位置）
    function getOffset(el) { // 定義取得 offset 的函式
        const rect = el.getBoundingClientRect(); // 取得元素的 bounding box
        return {
            left: rect.left + window.scrollX, // 計算左側距離
            top: rect.top + window.scrollY // 計算頂部距離
        };
    }

    // 建立可拖曳功能
    function createDraggable(element) { // 定義建立拖曳功能的函式
        Draggable.create(element, { // 使用 Draggable 建立拖曳
            type: 'x,y', // 可在 X、Y 軸拖曳
            bounds: '.main__panel', // 拖曳範圍限制
            dragClickables: true, // 可點擊拖曳

            // 拖曳開始時觸發
            onDragStart: function () { // 拖曳開始事件
                gsap.to(this.target, { duration: 0.2, opacity: 1 }); // 動畫：透明度變為 1
                if (!this.target.classList.contains("dragged")) { // 如果還沒被拖曳過
                    addElement(this.target); // 新增一個新的可拖曳元素
                    this.target.classList.add("dragged"); // 標記已拖曳過
                }
            },

            // 拖曳時觸發
            onDrag: function () { // 拖曳中事件
                droppables.forEach(function (dropzone) { // 針對每個可放置區
                    // 命中測試，若有碰到 dropzone 則加上 highlight 樣式
                    if (this.hitTest(dropzone, thresHold)) { // 命中測試
                        dropzone.classList.add("highlight"); // 加上 highlight
                    } else {
                        dropzone.classList.remove("highlight"); // 移除 highlight
                    }
                }, this);
            },

            // 拖曳結束時觸發
            onDragEnd: function () { // 拖曳結束事件
                const i = droppables.length, // 可放置區數量
                    originalOffset = this.target.originalOffset; // 原始位置
                let snappedEl = false; // 是否有吸附到 dropzone

                // 檢查是否有吸附到任一 dropzone
                for (let j = 0; j < i; j++) { // 逐一檢查
                    if (this.hitTest(droppables[j], thresHold)) { // 命中測試
                        const targetOffset = getOffset(droppables[j]); // 取得 dropzone 位置
                        snappedEl = true; // 標記已吸附
                        this.target.classList.add("snapped"); // 標記已吸附
                        // 動畫移動到 dropzone 位置
                        gsap.to(this.target, {
                            duration: 0.1, // 動畫時間
                            x: targetOffset.left - originalOffset.left, // X 軸移動
                            y: targetOffset.top - originalOffset.top // Y 軸移動
                        });
                    }
                }

                // 若未吸附到 dropzone，回到原位
                if (!snappedEl) {
                    gsap.to(this.target, {
                        duration: 0.2, // 動畫時間
                        x: 0, // 回到原始 X
                        y: 0 // 回到原始 Y
                    });
                }
            }
        }); //draggable instance end
    }

}