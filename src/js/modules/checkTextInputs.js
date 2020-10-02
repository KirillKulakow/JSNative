const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);
    txtInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = check(e);
        });
    });
    function check(e) {
        if(e.target.value.match(/[^а-яё 0-9]/ig)){
            return ''
        } else {
            return e.target.value
        }
    }
};

export default checkTextInputs;