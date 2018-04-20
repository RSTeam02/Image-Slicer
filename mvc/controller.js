import {Shuffle} from "./shuffle.js";



/**
 * @author sakaijun
 * 
 * + every image will be displayed by 640xH
 * + (re)calculate height with ratio of width
 * + slice from 2x2 to 10x10 with slider
 * + add borders
 * + shuffle positions of sliced image
 *  
 */

export class Controller{

    constructor(){
        this.listener(); 
    }
    
    listener(){

        $(".MxM").on("click", (e) =>{     
            $(".tile").remove();         
            this.sliceImg(e.currentTarget.value, false);
        });

        $("#undo").on("click", () =>{     
            $(".tile").remove();
            this.sliceImg($(".MxM").val(), false);
        });

        $("#rnd").on("click", () =>{
            $(".tile").remove();            
            this.sliceImg($(".MxM").val(), true);
        });

        $("#readFile").on('change', () => {             
            this.previewFile((res)=>{ 
                $("#fullIMG").remove();
                var e = $("<img id=\"fullIMG\" alt=\"\" />");
                $('.puzzle').append(e);                
                $(".tile").remove();    
                $('#fullIMG').attr("src", res);
                setTimeout(() => {            
                    this.sliceImg($(".MxM").val(), false);
                }, 1000);              
            });
        });   
    }   

    previewFile(cb) {
        var file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();      

        try {
            if (file.type !== 'image/jpeg') {
                throw "not a jpeg image";
            } else {
                reader.onload = function() {
                    cb(reader.result);
                }
            }
            if(file){
                reader.readAsDataURL(file);
            }
        } catch (error) {
            console.log(error);
        }
    }

    sliceImg(div, rnd){
        $('#fullIMG').css({ "display": "inline" });                          
        let shuffle = new Shuffle();
        let shuffled = shuffle.randPos(div*div, rnd);
      
        var img = document.getElementById('fullIMG');       
        $("#dimInfo").html(`Format: ${div}x${div}`); 
        var width = 640;        
        var tNo =0;
        var tWidth =0;
        var tHeight = 0;
        var ratio = img.clientWidth/width;
        var height = img.clientHeight/ratio;
        
        $('#fullIMG').css({ "display": "none", "width" : `${width}px`, "height" : `${height}px` });
        $('.puzzle').css({          
            "position": "relative",
            "width":`${width}px`,
            "height":`${height}px`    
        });

       

        for (var i = 0; i < (div*div); i++){
            $(".puzzle").append(`<div class="tile t${shuffled[i]}"></div>`)
        }

        $('.tile').css({
            "width": `${(width/div)-2}px`,
            "height": `${(height/div)-2}px`,
            "float": "left",            
            "border": "1px solid black",
            "background-image":`url(${img.src})`,
            "background-size": "640px auto"
        });

        
        for (var i =0; i<div; i++){
            tWidth =0;
            for (var j =0; j<div; j++){
                $(`.tile.t${tNo}`).css({ 
                    "background-position": `${tWidth}px ${tHeight}px` 
                });   
                tWidth -= (width/div);
                tNo++;
            }
            tHeight -= (height/div);
        }        

    }



}