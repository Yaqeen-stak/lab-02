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
    let imageClone= $('.photo-template').clone();
    let listOption=$('#list').clone();
    $('header').append(listOption);
    listOption.find('option').text(this.keyword); 

    $('main').append(imageClone);

    imageClone.find('img').attr('src',this.image_url);
    imageClone.find('h2').text(this.title);
    imageClone.find('p').text(this.description);
    // imageClone.find('option').text(this.keyword); 
    
    imageClone.attr('class',this.title);
    
};

const ajaxSettings={
    method: 'get',
    dataType: 'json'
};


// $('document').ready(function (){
//     $('#list').on('click', function(){
//         $(this).sibling('option').toggleClass('on');
//     });
// });

$.ajax ('data/data.json',ajaxSettings).then((data) => {
data.forEach(imageObj => {
    let image =new Image(imageObj);
    image.render();
});
});
