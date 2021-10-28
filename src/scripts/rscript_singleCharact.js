let btnDelete = document.querySelector("#delete-Charcter")
let btnNext = document.querySelector("#next-Charcter")
let btnPrevious = document.querySelector("#previous-Charcter")
let singleImg = document.querySelector(".singleImg")

let charactId = localStorage["stored"];

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
          } else if (result.isDenied) {
            Swal.fire('The character is not deleted', '', 'info')
          }
      })
})

//Next and previous character---------------------------
let characterslist
let actualCharacter=0;
let lastCharacter=0;
let firstCharacter=0;

let functCharacters = async() => {
    if (characterId != 0) {
    let response = await fetch("https://character-database.becode.xyz/characters");
    characterslist = await response.json();
    lastCharacter = characterslist.length-1

}
else {}
}
functCharacters()

btnNext.addEventListener("click",()=>{ //Go to the Next character------------------

    actualCharacter++

    if (actualCharacter > lastCharacter){
        actualCharacter=lastCharacter
        Swal.fire("This is the last character","","info")
    }else{
        document.querySelector('.singleImg').src = "data:image/png;base64," + characterslist[actualCharacter].image;
        document.querySelector('.singleCharacterName').innerHTML = characterslist[actualCharacter].name;
        document.querySelector('.singleShortDescription').innerHTML = characterslist[actualCharacter].shortDescription;
        document.querySelector('.singleLongDescription').innerHTML = characterslist[actualCharacter].description;

    }
})

btnPrevious.addEventListener("click",()=>{ //Go to the Previous character------------------

    actualCharacter--

    if (actualCharacter < 0){
        actualCharacter=0
        Swal.fire("This is the first character","","info")
    }else{
        document.querySelector('.singleImg').src = "data:image/png;base64," + characterslist[actualCharacter].image;
        document.querySelector('.singleCharacterName').innerHTML = characterslist[actualCharacter].name;
        document.querySelector('.singleShortDescription').innerHTML = characterslist[actualCharacter].shortDescription;
        document.querySelector('.singleLongDescription').innerHTML = characterslist[actualCharacter].description;

    }
})
