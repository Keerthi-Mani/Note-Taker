var newNoteList = $(".list-group");

// Gets all newNote from the database, renders the newNote list
var getAndRendernewNote = function () {
    $.ajax({
        url: "/api/newNote",
        method: "GET"
    }).then(function (data) {
        var listItems = [];
        // Loop through and build a list item for each newNote returned from the db
        for (var i = 0; i < data.length; i++) {
            var newNote = data[i];

            // Using the jQuery `data` method, we can attach data to an element for later use
            var li = $("<li class='list-group-item'>");
            var row = $("<div class='row'>");
            var textRow = $("<div class='titleRow'>");
            var titleP = $("<h4 class='mt-2 col 3'>").text(newNote.title);
            var newNoteP = $("<p>").text(newNote.body);
            var delButton = $(`<i class="delete fas fa-trash-alt text-danger"></i>`).attr("data-id", newNote.id);
            var clearFix = $("<div class = clearfix>");
            row.append(titleP, delButton, clearFix);
            textRow.append(newNoteP);
            li.append(row, textRow);
            listItems.push(li);
        }
        newNoteList.empty();
        newNoteList.append(listItems);
    });
};

//onclick function to delete the existing notes 
$(document).on("click", ".delete", function (event) {

    var id = $(this).attr("data-id");

    $.ajax({
        url: "/api/note/" + id,
        method: "DELETE"
    }).then(function (res) {
        //console.log(res);
        getAndRendernewNote();
    })
})

// Submits the newNote from the form to the db
$(".save-note").on("click", function (event) {
    event.preventDefault();
    //receives the users input from the html page
    var newNote = {
        title: $(".note-title").val().trim(),
        body: $(".note-textarea").val().trim()
    };
    if (!newNote.title || !newNote.body) {
        alert("Please fill out the required fields");
        return;
    }

    console.log(newNote)
    // post the users input in the browser and empties the input field
    $.post("/api/newNote", newNote, function (data) {
        $(".note-title").val("");
        $(".note-textarea").val("");
        getAndRendernewNote();
    });

});

getAndRendernewNote();