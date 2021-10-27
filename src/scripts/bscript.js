//import 'regenerator-runtime/runtime'

//make difference between edit and create
let submitMethod;
let prefixId;
let characterId = localStorage["stored"];

if (characterId == 0) {
    submitMethod = "POST"
    prefixId = ""
}
else {
    submitMethod = "PUT"
    prefixId = "/" + characterId
}

//display a character (script for singleCharacter.html)
let characters = async() => {
    if (characterId != 0) {
    let response = await fetch("https://character-database.becode.xyz/characters"+prefixId);
    let character = await response.json();

    let singleImgField = document.querySelector('.singleImg').src = "data:image/png;base64," + character.image;
    let singleCharacterNameField = document.querySelector('.singleCharacterName').innerHTML = character.name;
    let singleShortDescriptionField = document.querySelector('.singleShortDescription').innerHTML = character.shortDescription;
   let singleLongDescriptionField = document.querySelector('.singleLongDescription').innerHTML = character.description;
    }
    else {}
}
characters()

//load img and return url to send
const inputFile = document.getElementById('inputfile')
const displayImgb = document.querySelector('#displayImg')
let fileURL;
let fileURLtoSend;

inputFile.addEventListener('change', () => {
    let reader = new FileReader() 
  reader.readAsDataURL(inputFile.files[0])
  reader.onload = () => {      
    fileURLtoSend = reader.result.split(',')[1];
    fileURL = reader.result
    console.log(fileURL)
    let imgTag = `<img scr=${fileURL} alt="">`
    displayImgb.src = fileURL
    return fileURLtoSend
}
})

//display the Markdown editor
//Initialization of the markdown editor and customization of it toolbar
const easyMDE = new EasyMDE({element: document.querySelector('.inputLongDescription'),
toolbar: ["bold", "italic", "heading", "|", "quote", "strikethrough",
    "heading-smaller","heading-bigger", "code","quote","unordered-list","ordered-list","link","|","clean-block","preview"]});
    easyMDE.value('coucou');

    document.getElementById('testButton').addEventListener('click', ()=>{
        let value = easyMDE.value();
        console.log(value)
    })


//script to display content to edit a character (for characterEditorCreator)
let editCharacters = async() => {
    let response = await fetch("https://character-database.becode.xyz/characters"+prefixId);
    let character = await response.json();

    //display content when editing and nothing for creating new character
    if (characterId==0) {
    //let singleImgField = document.querySelector('.singleImg').src = null;
    let inputNameField = document.querySelector('.inputName').value = null;
    let inputShortDescriptionField = document.querySelector('.inputShortDescription').value = null;
    let inputLongDescriptionField = document.querySelector('.inputLongDescription').value = null;
    }
    else {
    let singleImgField = document.querySelector('#displayImg').src = "data:image/png;base64," + character.image;
    let inputNameField = document.querySelector('.inputName').value = character.name;
    let inputShortDescriptionField = document.querySelector('.inputShortDescription').value = character.shortDescription;
    let inputLongDescriptionField = document.querySelector('.inputLongDescription').value = character.description;
    let htmlToMkd = new showdown.Converter()
    let mkdDescription = htmlToMkd.makeMarkdown(character.description)
    easyMDE.value(mkdDescription)
    localStorage["img"] = character.image
    }
}
editCharacters()



//send edited character to api
const saveCharacters = async () => {
    console.log("saving")
    let mkdDescription = easyMDE.value()
    let mkdToHtml = new showdown.Converter()
    let htmlDescription = mkdToHtml.makeHtml(mkdDescription)
    console.log(htmlDescription)
    let characterToPut = new Object
    if (fileURLtoSend==undefined) {
        characterToPut.image= localStorage["img"]
    }
    else {
    characterToPut.image = fileURLtoSend
    }
    characterToPut.name = document.querySelector('.inputName').value
    characterToPut.description = htmlDescription
    characterToPut.shortDescription = document.querySelector('.inputShortDescription').value
    console.log(characterToPut);

    await fetch("https://character-database.becode.xyz/characters"+ prefixId,
    {
        method : submitMethod,
        body : JSON.stringify(characterToPut),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
}
const submitButton = document.querySelector('#saveModifications');
submitButton.addEventListener('click',saveCharacters);




