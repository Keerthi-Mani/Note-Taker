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
            var titleP = $("<p class='mt-2'>").text(newNote.title);
            var newNoteP = $("<p>").text(newNote.body);
            var clearFix = $("<div class='float-right'>");
            var delButton = $(`<i class="delete fas fa-trash-alt float-right text-danger delete-note"></i>`).attr("data-id", newNote.id);
            var col11 = $("<div>");

            li.prepend(
                row.append(
                    col11.append(titleP, newNoteP, delButton, clearFix),
                )
            );

            listItems.push(li);
        }

        newNoteList.empty();

        newNoteList.prepend(listItems);
    });
};

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

    var newNote = {
        title: $(".note-title").val().trim(),
        body: $(".note-textarea").val().trim()
    };
    if (!newNote.title || !newNote.body) {
        alert("Please fill out the required fields");
        return;
    }

    console.log(newNote)

    $.post("/api/newNote", newNote, function (data) {
        $(".note-title").val("");
        $(".note-textarea").val("");
        getAndRendernewNote();
    });

});

getAndRendernewNote();