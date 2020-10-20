














"use strict";
const arrOfKeyword= [];
function Image(image) {
    this.image_url = image.image_url;
    this.title = image.title;
    this.description = image.description;
    this.keyword = image.keyword;
    arrOfKeyword.push(this.keyword);
    // this.horns=horns;
}
Image.prototype.render = function () {
    let imageClone = $('#photo-template').clone();
    imageClone.find('h2').text(this.title);
    imageClone.find('img').attr('src', this.image_url);
    imageClone.find('p').text(this.description);
    imageClone.attr('class', this.keyword);
    $('main').append(imageClone);
};
let options = () => {
    for (let i = 0; i < arrOfKeyword.length; i++) {
        let listOption = $(`<option value="${arrOfKeyword[i]}"id="${arrOfKeyword[i]}" >${arrOfKeyword[i]}</option>`);
        $("select").append(listOption);
    }
}
const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};
$('select').on('change', function (event) {
    if (event.target.value !== $('#select').attr('id')) {
        for (let i = 0; i < arrOfKeyword.length; i++) {
            if (event.target.value === arrOfKeyword[i] || event.target.value === 'default') {
                $(`.${arrOfKeyword[i]}`).show();
            }
            else {
                $(`.${arrOfKeyword[i]}`).hide();
            }
        }
    }
});
$.ajax('data/data.json', ajaxSettings).then((data) => {
    console.log(data);
    data.forEach(imageObj => {
        let image = new Image(imageObj);
        console.log(image);
        image.render();
        // image.choices();
    });
    options();
});
































