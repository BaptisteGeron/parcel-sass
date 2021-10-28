let btnDelete = document.querySelector("#delete-Charcter")
let btnNext = document.querySelector("#next-Charcter")
let btnPrevious = document.querySelector("#previous-Charcter")
let singleImg = document.querySelector(".singleImg")

let characterslist
var actualCharacter=0;
let lastCharacter=0;
let firstCharacter=0;

let charactId = localStorage["stored"];

let catchCurrentIndex = async() => { //Catch index of the current character when the page is loaded or reloaded

    let res = await fetch("https://character-database.becode.xyz/characters");
    let charact = await res.json();

    charact.forEach(el => {
        if (el.id === charactId){
            actualCharacter = charact.indexOf(el)
        }
    });
}
catchCurrentIndex()

let functLastCharacter = async() => { //function to get the index of last character
    try {
        let response = await fetch("https://character-database.becode.xyz/characters");
        characterslist = await response.json();
        lastCharacter = characterslist.length-1
        
    } catch (error) {
        Swal.showValidationMessage(
            `Request failed: ${error}`
          )
    }


}
functLastCharacter()

//Next and previous character----------------------------------------------------------------


const funcNextCharact = ()=>{ // Next character function------------------------------------------
    actualCharacter += 1

    if (actualCharacter > lastCharacter){
        actualCharacter=lastCharacter
        Swal.fire("This is the last character","","info")
    }else{
        charactId = characterslist[actualCharacter].id;
        localStorage["stored"] = characterslist[actualCharacter].id; //Updating the value of local storage

        document.querySelector('.singleImg').src = "data:image/png;base64," + characterslist[actualCharacter].image;
        document.querySelector('.singleCharacterName').innerHTML = characterslist[actualCharacter].name;
        document.querySelector('.singleShortDescription').innerHTML = characterslist[actualCharacter].shortDescription;
        document.querySelector('.singleLongDescription').innerHTML = characterslist[actualCharacter].description;

    }
}

btnNext.addEventListener("click",()=>{ //On click go to the Next character------------------
    funcNextCharact()
})

btnPrevious.addEventListener("click",()=>{ //Go to the Previous character------------------

    actualCharacter -= 1

    if (actualCharacter < 0){
        actualCharacter=0
        Swal.fire("This is the first character","","info")
    }else{
        charactId = characterslist[actualCharacter].id;
        localStorage["stored"] = characterslist[actualCharacter].id; //Updating the value of local storage

        document.querySelector('.singleImg').src = "data:image/png;base64," + characterslist[actualCharacter].image;
        document.querySelector('.singleCharacterName').innerHTML = characterslist[actualCharacter].name;
        document.querySelector('.singleShortDescription').innerHTML = characterslist[actualCharacter].shortDescription;
        document.querySelector('.singleLongDescription').innerHTML = characterslist[actualCharacter].description;

    }
})



//Delete character-------------------------------------------------------

btnDelete.addEventListener("click",async()=>{

    Swal.fire({
        icon: 'question',
        title: 'Deleting a character',
        text: 'Do you really want to delete this character ?',
        footer: 'Warning : This action is irreversible',
        backdrop: true,
        showDenyButton: true,
        confirmButtonText: 'Yes, I want to delete',
        denyButtonText: `No, Don't delete`,
        imageUrl: singleImg.src,

        preConfirm: async () => {
            
            return response = await fetch(`https://character-database.becode.xyz/characters/${charactId}`,
                {
                    method : "DELETE",
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                }
            )
              .then(response => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                }
                return response.json()
              })
              .catch(error => {
                Swal.showValidationMessage(
                  `Request failed: ${error}`
                )
              })
          },
          allowOutsideClick: () => !Swal.isLoading()

      })
      .then((result)=>{
        if (result.isConfirmed) {
            Swal.fire('The character has been deleted!', '', 'success')
            functLastCharacter()
            funcNextCharact()

          } else if (result.isDenied) {
            Swal.fire('The character is not deleted', '', 'info')
          }
      })
})

