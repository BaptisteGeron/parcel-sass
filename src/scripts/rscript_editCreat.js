//Initialization of the markdown editor and customization of it toolbar
const easyMDE = new EasyMDE({element: document.querySelector('.inputLongDescription'),
toolbar: ["bold", "italic", "heading", "|", "quote", "strikethrough",
    "heading-smaller","heading-bigger", "code","quote","unordered-list","ordered-list","link","|","clean-block","preview"]});

let txtInput = document.querySelector(".inputLongDescription")
let btn = document.querySelector("#btnTest")
let btn2 = document.querySelector("#btnTest2")
let btn3 = document.querySelector("#btnTest3")
let longdescriptHtm;
let txt;

btn.addEventListener("click",()=>{
    
    var converter = new showdown.Converter(),
    text      = easyMDE.value();
    
    longdescriptHtm  = converter.makeHtml(text);
    
    console.log(longdescriptHtm)
    //console.log()
})


btn2.addEventListener("click",()=>{
    let converter2 = new showdown.Converter()

    txt = converter2.makeMarkdown(longdescriptHtm)

    console.log(txt)
    
    
})

btn3.addEventListener("click",()=>{

    easyMDE.value(txt)

    //console.log(txt)
    
    
})


