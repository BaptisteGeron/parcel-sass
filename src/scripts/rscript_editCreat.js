const easyMDE = new EasyMDE({element: document.querySelector('.inputLongDescription')});

let txt = document.querySelector("#txtarea")
let btn = document.querySelector("#saveModifications")

btn.addEventListener("click",()=>{
    
    var converter = new showdown.Converter(),
    text      = easyMDE.value(),
    html      = converter.makeHtml(text);
    console.log(html)
    //console.log()
})