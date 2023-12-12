document.addEventListener("DOMContentLoaded", function () {
    var savedNotesContainer = document.getElementById("savedNotesContainer");

    // Retrieve saved notes from local storage
    var savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];

    // Display saved notes
    savedNotes.forEach(function (note, index) {
        var noteElement = document.createElement("div");
        noteElement.innerHTML = "<h3>Note " + (index + 1) + "</h3>" + note;
        savedNotesContainer.appendChild(noteElement);
    });
});
