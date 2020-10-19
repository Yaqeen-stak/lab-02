"use strict";
function Image (image)
 {
    this.image_url=image.image_url;
    this.title=image.title;
    this.description=image.description;
    this.keyword=image.keyword;
    // this.horns=horns;
}
Image.prototype.render =function(){
   
    let imageClone= $('#photo-template').clone();
    imageClone.find('h2').text(this.title);
    imageClone.find('img').attr('src',this.image_url);
    imageClone.find('p').text(this.description);
    imageClone.attr('class',this.title);
    $('main').append(imageClone);
};
const ajaxSettings={
    method: 'get',
    dataType: 'json'
};

    $('select').on('change', function(){
      let choicen =this.value;
      $('section').hide();
      $(`.${choicen}`).show();

    });

$.ajax ('data/data.json',ajaxSettings).then((data) => {
    console.log(data);
data.forEach(imageObj => {
    let image =new Image(imageObj);
    console.log(image);
    image.render();
    let listOption=$(`<option value="${imageObj.keyword}">${imageObj.keyword}</option>`);
    $("select").append(listOption);
});
});




















































