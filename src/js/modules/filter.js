const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          wrapper =  document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          no = document.querySelector('.portfolio-no'),
          arr = [
            'all',
            'girl',
            'lovers',
            'chef',
            'guy'
          ];

    const typeFilter = (markSelector) => {
        const markType = wrapper.querySelectorAll(markSelector);
        markAll.forEach( mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if(markType.length >= 1){
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        } else {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    };

    items.forEach(item => {
        const itemClass = item.classList[0];
        if (arr.includes(itemClass)) {
            item.addEventListener('click', () => {
                typeFilter('.' + itemClass);
            });
        } else {
            item.addEventListener('click', () => {
                typeFilter();
            })
        }
    });

    menu.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.tagName == "LI"){
            items.forEach(btn => {
                btn.classList.remove('active');
                target.classList.add('active');
            })
        }
    })
};

export default filter;