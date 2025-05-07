window.onload = () => {
    const toggle_btn = document.querySelector('.main__header-toggle-btn');
    toggle_btn.addEventListener("click",() => {
        const aside = document.querySelector(".aside");
        aside.classList.toggle("d-none");
        const main = document.querySelector(".main");
        main.classList.toggle("w-100");
        const switch_img = document.querySelector(".main__header-toggle-btn img");
        switch_img.classList.toggle("close--active");
    });
}