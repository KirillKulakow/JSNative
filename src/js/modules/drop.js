import {uploadFile} from '../services/requests';

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach( eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        })
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    function highLight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0,0.7)';
    };

    function unHighLight(item) {
        item.closest('.file_upload').style.border = 'none';
        item.closest('.file_upload').style.backgroundColor = 'transparent';

    };

    ['dragenter', 'dragover'].forEach( eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach( eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unHighLight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arrName = input.files[0] ? input.files[0].name.split('.') : '';
            arrName[0].length > 5 ? dots = '...' : dots = ".";
            const name = arrName[0].substring(0,6) + dots + arrName[1];
            input.previousElementSibling.textContent = name;
            if(!!input.id || input.id === 'onlyImg'){
                uploadFile(input.files[0].name, input.files[0]);
                input.previousElementSibling.textContent  = "Загружено.";
                setTimeout(() => {input.previousElementSibling.textContent  = "Файл не выбран"}, 3000)
            };
        });
    });
};

export default drop;