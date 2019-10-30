var newNotesList = $(".list-group");
var newNote = $("#num-newNotes");

var getAndRendernewNotes = function () {
    $.ajax({ method: "GET", url: "/api/newNote" }).then(function (data) {
        var newNotesListItems = [];

        for (var i = 0; i < data.length; i++) {
            var newNotes = data[i];

            var li = $("<li class='list-group-item'>");
            var title = $("<p>").text("Title: " + newNotes.title);
            var body = $("<p>").text("Body: " + newNotes.body);

            // create button to delete note
            // give button an attribute of data-id set to newNotes.id value and class of "delete"
            // .attr("data-id", newnotes.id)

            li.append(title, body);

            newNotesListItems.push(li);
        }

        newNotesList.append(newNotesListItems);
        newNote.text(newNotesListItems.length);
    });
};

getAndRendernewNotes();

$(document).on("click", ".delete", function () {
    // get id out of $(this).attr("data-id");

    // use that id to make a DELETE request to your db 
})