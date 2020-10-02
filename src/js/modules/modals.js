const modals = () => {
    let btnPressed = false;
    function bindModal (trigeerSelector, modalSelector, closeSelector, destroy = false) {
        const trigeer = document.querySelectorAll(trigeerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scrollWidth = calcScroll();


        trigeer.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault();
                };
                btnPressed = true;
                if(destroy){
                    item.remove();
                };
                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn')
                });
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.paddingRight = `${scrollWidth}px`;
            });
        });

        close.addEventListener('click', () => {
            modal.style.display = "none";
            windows.forEach(item => {
                item.style.display = 'none';
            });
            document.body.style.overflow = "";
            document.body.style.paddingRight = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                document.body.style.overflow = "";
                document.body.style.paddingRight = '';
            };
        });
    };

    function showModalTime (selector, time) {
        const scrollWidth = calcScroll();
        setTimeout(function() {
            let display;
            document.querySelectorAll('[data-modal]').forEach(item => {
                if(getComputedStyle(item).display !== 'none'){
                    display = 'block';
                };
            });
            if(!display){
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = `${scrollWidth}px`;
            };
            document.querySelector(selector).style.display = "block";
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollWidth}px`;
        }, time);
    };

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    };

    function openedByScroll (selector) {
        window.addEventListener('scroll', ()=> {
            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= 
                document.documentElement.scrollHeight)) {
                    document.querySelector(selector).click();
            };
        });
    };

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openedByScroll('.fixed-gift');
    // showModalTime('.popup-consultation', 5000);
};

export default modals;