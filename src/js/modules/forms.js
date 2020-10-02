import {postData, uploadFile} from '../services/requests';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');
    // checkNumInputs ('input[name="user_phone"]');

    const message = {
        loading : 'Загрузка...',
        success: 'Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'designer',
        question: 'question'
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots;
            const arrName = item.files[0] ? item.files[0].name.split('.') : '';
            arrName[0].length > 5 ? dots = '...' : dots = ".";
            const name = arrName[0].substring(0,6) + dots + arrName[1];
            item.previousElementSibling.textContent = name;
            if(!!item.id || item.id === 'onlyImg'){
                uploadFile(item.files[0].name, item.files[0])
                item.previousSibling.innerHTML = "Загружено."
                setTimeout(() => {item.previousSibling.innerHTML = "Файл не выбран"}, 1500)
            };
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            let files = item.querySelector('[name="upload"]').files;

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);
            item.classList.add('animated', 'fadeOutUp');
            setTimeout(()=>{
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            if(item.classList.contains('calc_form')){
                const getFormSelect = (id) => {
                    const text = document.getElementById(id).options[document.getElementById(id).selectedIndex].text;
                    const value = document.getElementById(id).value;
                    const arr = new Array (text, value);
                    return arr;
                };
                formData.append('size', `${getFormSelect('size')[0]}, ${getFormSelect('size')[1]}`);
                formData.append('material', `${getFormSelect('material')[0]}, ${getFormSelect('material')[1]}`);
                formData.append('options', `${getFormSelect('options')[0]}, ${getFormSelect('options')[1]}`);
                formData.append('promo', document.querySelector('.promocode').value === 'IWANTPOPART' ? true : false);
            };

            formData.append('Date', new Date().toUTCString());
            if(!!files[0]){
                formData.append('image', files[0].name);
                formData.delete('upload');
                uploadFile(files[0].name, files[0]);
            };
            var object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            
            let collection;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? collection = path.designer : collection = path.question;
            console.log(object);
            postData(collection, object)
            .catch((e) => {
                statusImg.setAttribute('src', message.fail);
                textMessage.textContent = message.failure;
            })
            .finally(() => {
                statusImg.setAttribute('src', message.ok);
                textMessage.textContent = message.success;
                setTimeout(()=> {
                    statusMessage.remove(); 
                    item.style.display = 'block';
                    document.querySelectorAll('[data-modal]').forEach(item => {
                        item.style.display = 'none';
                        document.body.style.overflow = "";
                        document.body.style.paddingRight = '';
                    });
                }, 3000);
                item.classList.remove('fadeOutUp');
                item.classList.add('fadeInUp');
                file = '';
            });
        });
    });
};

export default forms;