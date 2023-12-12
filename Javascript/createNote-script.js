document.addEventListener("DOMContentLoaded", function () {
    var noteContainer = document.getElementById("noteContainer");
    var saveNoteButton = document.getElementById("saveNoteButton");

    if (noteContainer && saveNoteButton) {
        saveNoteButton.addEventListener("click", function () {
            saveNote();
        });

        // Function to handle slash commands on input
        noteContainer.addEventListener("input", function () {
            handleSlashCommand();
        });

        // Function to handle slash commands
        function handleSlashCommand() {
            var lines = noteContainer.innerText.split('\n');
            var lastLine = lines[lines.length - 1].trim();

            if (lastLine.startsWith("/h1")) {
                setHeadingFormat('h1');
            } else if (lastLine.startsWith("/h2")) {
                setHeadingFormat('h2');
            } else if (lastLine.startsWith("/h3")) {
                setHeadingFormat('h3');
            } else if (lastLine.startsWith("/code")) {
                setCodeFormat();
            }
        }

        // Function to set heading format
        function setHeadingFormat(headingType) {
            document.execCommand('formatBlock', false, headingType);
        }

        // Function to set code format
        function setCodeFormat() {
            document.execCommand('formatBlock', false, 'pre');
        }

        // Function to save the note to local storage
        function saveNote() {
            var noteContent = noteContainer.innerHTML.trim();

            if (noteContent === "") {
                alert("Please enter some content for the note.");
                return;
            }

            // Save the note to local storage
            var savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
            savedNotes.push(noteContent);
            localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

            // Clear the note container
            noteContainer.innerHTML = '';
        }
    } else {
        console.error("Could not find elements with the specified IDs");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    var noteContainer = document.getElementById("noteContainer");
    var saveNoteButton = document.getElementById("saveNoteButton");
    var downloadPDFButton = document.getElementById("downloadPDFButton");
    var downloadDOCXButton = document.getElementById("downloadDOCXButton");

    saveNoteButton.addEventListener("click", function () {
        saveNote();
    });

    downloadPDFButton.addEventListener("click", function () {
        downloadNoteAsPDF();
    });

    downloadDOCXButton.addEventListener("click", function () {
        downloadNoteAsDOCX();
    });

    function saveNote() {
        var noteContent = noteContainer.innerHTML.trim();

        if (noteContent === "") {
            alert("Please enter some content for the note.");
            return;
        }

        // Save the note to local storage
        var savedNotes = getFromLocalStorage("savedNotes");
        savedNotes.push(noteContent);
        saveToLocalStorage("savedNotes", savedNotes);

        // Clear the note container
        noteContainer.innerHTML = '';
    }

    function downloadNoteAsPDF() {
        var noteContent = noteContainer.innerHTML.trim();

        if (noteContent === "") {
            alert("Please enter some content for the note.");
            return;
        }

        // Use html2pdf library to create a PDF
        html2pdf(noteContainer);
    }

    function downloadNoteAsDOCX() {
        var noteContent = noteContainer.innerHTML.trim();

        if (noteContent === "") {
            alert("Please enter some content for the note.");
            return;
        }

        // Use mammoth.js library to create a DOCX
        var blob = new Blob([noteContent], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "note.docx";
        link.click();
    }
});
