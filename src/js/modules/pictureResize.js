const pictureResize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    function showIMG(block){
        const img = block.querySelector('img');
        img.src = img.src.slice(0,-4) + '-1.png';
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
    };

    function hideIMG(block){
        const img = block.querySelector('img');
        img.src = img.src.slice(0,-6) + '.png';
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'block';
        });
    };

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showIMG(block);
        });
    });
    blocks.forEach(block => {
        block.addEventListener('mouseout', () => {
            hideIMG(block);
        });
    });
};

export default pictureResize;