//import "regenerator-runtime/runtime";

const tpl = document.querySelector("#tplCharacter");
const target = document.querySelector("#characterList");
const searchInput = document.querySelector("#searchInput");
var characterId


const fectchData = async () => {
    const response = await fetch("https://character-database.becode.xyz/characters" );

    let responseInJson = await response.json();
    //console.log(responseInJson)

    for (let element of responseInJson) {
    
        let cloneTemplate = document.importNode(tpl.content, true);

        let name = cloneTemplate.querySelector(".cardCharacter__Name");
        let shortDescription = cloneTemplate.querySelector(".cardCharacter__shortDescription");
        let photo = cloneTemplate.querySelector("#characterPhoto");
        let btnSeeCharcter = cloneTemplate.querySelector("#see-character");

        btnSeeCharcter.addEventListener("click",()=>{
            localStorage["stored"] = element.id;
        })

        name.textContent = element.name;
        shortDescription.textContent = element.shortDescription;
        photo.src ="data:image/png;base64," + element.image;

        target.appendChild(cloneTemplate);
    }
}

fectchData()


/* searchInput.addEventListener("focusin",()=>{
    const fectchData2 = async () => {
        const response2 = await fetch("https://character-database.becode.xyz/characters" + "da0ac535-1eb5-4b6b-8269-e1832d55f79d" );
        let responseInJson2 = await response2.json();
        console.log(responseInJson2)
    }
    fectchData2()
}) */

const searchStates = async searchtext =>{
    const result = await fetch("https://character-database.becode.xyz/characters" );
    let characters = await result.json();

    
    //Get macthes to current input
    let matches = characters.filter(character=>{
        const regex = new RegExp(`^${searchtext}`,'gi');
        return character.name.match(regex) //|| character.id.match(regex)
    })
    
    //cleaning the list before display the searbar result
    let cardTag=target.children
    if (cardTag){
       
        Array.from(cardTag).forEach(tag => {
            tag.remove()
        });
    }else{alert(error)}

    for (let element of matches) {
    
        let cloneTemplate = document.importNode(tpl.content, true);

        let name = cloneTemplate.querySelector(".cardCharacter__Name");
        let shortDescription = cloneTemplate.querySelector(".cardCharacter__shortDescription");
        let photo = cloneTemplate.querySelector("#characterPhoto");
        let btnSeeCharcter = cloneTemplate.querySelector("#see-character");

        
        btnSeeCharcter.addEventListener("click",()=>{
            localStorage["stored"] = element.id;
        })

        name.textContent = element.name;
        shortDescription.textContent = element.shortDescription;
        photo.src ="data:image/png;base64," + element.image;

        target.appendChild(cloneTemplate);
    }

    //console.log(matches)
}

searchInput.addEventListener("input",()=>searchStates(searchInput.value))

let addBtn = document.querySelector(".characterList__containerAddButton").addEventListener("click",()=>localStorage["stored"] = 0)

