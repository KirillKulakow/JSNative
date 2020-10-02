const collapse = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);
        //   blocks = document.querySelectorAll(itemsSelector);

    // blocks.forEach(block => {
    //     block.classList.add('animated', 'fadeInDown');
    // });

    // btns.forEach(btn => {
    //     btn.addEventListener('click', function(){
    //         if(!this.classList.contains('active')){
    //             btns.forEach(btn => {
    //                 btn.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         };
    //     });
    // });

    btns.forEach(btn => {
        btn.addEventListener('click', function(){
            let toggle = this.classList.contains('active-style');
            btns.forEach(btn => {
                console.log([btn, '1']);
                btn.classList.remove('active-style');
                btn.nextElementSibling.classList.remove('active-content');
                btn.nextElementSibling.style.maxHeight = '0px';
            });
            if(!toggle) {
                this.classList.add('active-style');
                this.nextElementSibling.classList.add('active-content');
            };

            if(this.classList.contains('active-style')){
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            };
        });
    })
};

export default collapse;