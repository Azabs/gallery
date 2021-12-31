/** 
 * The only 2 things that have to update are the image shown and the description.
*/
var imgList;
var index = 0;

document.getElementById("filetoRead").addEventListener("change", function () {
    imgList = this.files;
    index = 0;
    showImage();
}, false);

function showImage() {

    if (!imgList) {
        alert('Insert an image');
        return;
    }

    let reader = new FileReader();

    reader.onload = function (evt) {
        let imgTag = '<img src="' + evt.target.result + '" alt="my image" />';
        document.getElementById("image-container").innerHTML = imgTag;
    };

    reader.onerror = function (evt) {
        console.error("An error ocurred reading the file", evt);
    };

    reader.readAsDataURL(imgList[index]);
    updateIndexInDoc();
}

function updateIndexInDoc() {
    document.getElementById("index").innerHTML = index + 1 + '/' + imgList.length;
}
function firstImage() {
    index = 0;

    showImage();
}
function prevImage() {
    if (index > 0)
        --index;

    showImage();
}
function nextImage() {
    if (imgList && index < imgList.length - 1)
        ++index;

    showImage();
}
function lastImage() {
    if (imgList)
        index = imgList.length - 1;

    console.log(index);
    showImage();
}

let intervImg;

function autoPlay(length) {
    if (length && length > 0 && imgList) {
        intervImg = setInterval(function () {
            if (index < imgList.length - 1)
                nextImage();
            else
                firstImage();
            console.log('here');
        }, length);
    }
    else {
        clearInterval(intervImg);
    }

}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            scroll(0, 0);
            prevImage();
            break;
        case 'ArrowRight':
            e.preventDefault();
            scroll(0, 0);
            nextImage();
            break;
    }
});