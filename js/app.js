"use strict";
let temp= document.getElementById('photo-template');
const arrOfKeyword = [];
let allImages = [];
function Image(image) {
    this.image_url = image.image_url;
    this.title = image.title;
    this.description = image.description;
    this.keyword = image.keyword;
    arrOfKeyword.push(this.keyword);
    this.horns = image.horns;
    allImages.push(this);
}

Image.prototype.render = function () {
    let templet = $('<section></section>');
    templet.html(` <div class="{{keyword}}">
    <h2>{{title}}</h2>
    <img  src="{{image_url}}" alt="">
    <p>{{description}}</p>
    <p>{{horns}}</p>
  </div>`);
  
  let convert = $(templet).html();
 let html = Mustache.render(convert,this);
 templet.html(html);
 $('main').append(templet);

};

const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};

$('select').change(showon=> {
let selectOption =showon.target.value
$('div').hide();
$(`.${selectOption}`).show();

});

$('#page1').click(firstPage) 
    // $.Mustache.clear();
    // if (event.target.id === 'page1') {
        function firstPage (){

            allImages=[];
        $('section').empty();
        // temp.innerHTML='';
        $.ajax('data/data.json', ajaxSettings).then((data) => {
            data.forEach(imageObj => {
                let image = new Image(imageObj);
                image.render();
                console.log(allImages);
                let listOption = $(`<option value="${imageObj.keyword}"id="${imageObj.keyword}" >${imageObj.keyword}</option>`);
                        $("select").append(listOption);
            });
           
        });
    }
   
       
 $('#page2').click(secondPage) 
        function secondPage(){
            allImages=[];
            $('section').empty();
            // temp.innerHTML='';
       
        $.ajax('data/page.json', ajaxSettings).then((data) => {
            data.forEach(imageObj => {
                let image = new Image(imageObj);
                image.render();
                console.log(allImages);
                let listOption = $(`<option value="${imageObj.keyword}"id="${imageObj.keyword}" >${imageObj.keyword}</option>`);
                $("select").append(listOption);
            });
        });
    }

$('#hornes').click(sortByHornes)
function sortByHornes(){
    $('section').empty();
    allImages.sort((a,b)=>
        a.horns-b.horns
       
        ) 
        allImages.forEach(num=>{
            let sortedImages= new Image(num);
            sortedImages.render();

    });
   
}

$('#alpha').click(sortByTitle)
function sortByTitle(){
    $('section').empty();
    allImages.sort((a,b)=>{
        if (a.title>b.title ){
            return  1;
        }else if (a.title<b.title){
            return  -1;
        }else {
            return 0
        }
    }  ) 
        allImages.forEach(num=>{
            let sortedImages= new Image(num);
            sortedImages.render();

    });
   
}








