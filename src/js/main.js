(function () {
    const nav = document.querySelector('.main-nav');
    const navToggle = document.querySelector('.main-nav__toggle');

    nav.classList.remove('main-nav--nojs');

    navToggle.addEventListener('click', () => {
        if (nav.classList.contains('main-nav--closed')) {
            nav.classList.remove('main-nav--closed');
            nav.classList.add('main-nav--opened');
        } else {
            nav.classList.remove('main-nav--opened');
            nav.classList.add('main-nav--closed');
        }
    });
})();
