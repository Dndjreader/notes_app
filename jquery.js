
$(function(){
    let allNotes = []
    const notesFromLocalStorage = JSON.parse( localStorage.getItem("notes") )
    
    if (notesFromLocalStorage) {
        allNotes = notesFromLocalStorage
        createNotes(allNotes)
    }

    function createNotes(notes) {

        let listNotes = ""
        for (let i = 0; i < notes.length; i++) {
            listNotes += `
                <div class='grid-box' id='${notes[i]}'>
                    <div class='text-box'>
                        <p>${notes[i]}</p>
                    </div>
                    <button id='${notes[i]}' class='remove-btn'>Remove</button>
                </div>
            `   
        }
        $("#note-container").empty()
        $("#note-container").append( listNotes )
    }

    $("#input-text").each(function () {
        this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;")
    }).on("input", function () {
        this.style.height = 0
        this.style.height = (this.scrollHeight) + "px"
    })

    $('#note-container').on('click', '.grid-box', function() {
        $(this).toggleClass('expanded');
    });

    $('#note-container').on('click', 'p', function () {
        $(this).toggleClass('expanded');
      });


    $("#save-btn").on("click", function (event) {
        event.preventDefault();
        allNotes.push($("#input-text").val())
        localStorage.setItem('notes', JSON.stringify(allNotes))
        createNotes(allNotes)
        $("#input-text").val('')
    })

    $("#note-container").on("click", '.remove-btn', function () {
        let removeNote = $(this).parent()
        console.log(removeNote)
        let removeId = this.id
        const index = allNotes.indexOf(removeId)
        if (index > -1) {
            allNotes.splice(index, 1)
        }  
        localStorage.setItem("notes", JSON.stringify(allNotes) )
        removeNote.animate({height: 0, opacity: 0}, "slow", function(){ removeNote.remove(); })
     })

     $("#delete-btn").on("click", function () {
        let removeNote = $("#note-container").children()
        removeNote.animate({height: 0, opacity: 0}, "slow", function(){ removeNote.remove(); })
        localStorage.clear()
        allNotes = []
     })

  })