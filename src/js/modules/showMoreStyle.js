import {getResource} from '../services/requests';

const showMoreStyle = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);

    btn.addEventListener('click', async function () {
        let arr = [];
        await getResource('styles')
        .then((querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                arr.push(doc.data())
            });
        })
        .catch(e => console.log(e));
        createCards(arr);
        this.remove();
    });

    function createCards(response) {
        response.forEach(item => {
            let card = document.createElement('div');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'animated', 'fadeInUp', 'col-xs-10', 'col-xs-offset-1');
            card.innerHTML = `
                <div class="styles-block">
                    <img src=${item.src} alt=${item.title}>
                    <h4>${item.title}</h4>
                    <a href=${item.link}>Подробнее</a>
				</div>
            `;
            document.querySelector(wrapper).appendChild(card);
        });
    };
};

export default showMoreStyle;