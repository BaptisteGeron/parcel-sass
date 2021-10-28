//Look for the id of the character to display
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