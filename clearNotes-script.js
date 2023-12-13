// clearNotes-script.js
document.addEventListener("DOMContentLoaded", function () {
    var clearNotesButton = document.getElementById("clearNotesButton");

    // Attach event listener to Clear Notes button
    clearNotesButton.addEventListener("click", function () {
        clearNotes();
    });

    // Function to clear saved notes
    function clearNotes() {
        // Clear the saved notes from local storage
        localStorage.removeItem("savedNotes");

        // Reload the page to update the displayed notes
        location.reload();
    }
});
