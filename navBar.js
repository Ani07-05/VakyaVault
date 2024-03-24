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

    // Function to handle dropdown options
   // Function to handle dropdown options
function handleDropdownOption(option) {
    switch(option) {
        case "Headings":
            var selectedHeading = prompt("Select heading level:\n1. Heading 1\n2. Heading 2\n3. Heading 3");
            switch(selectedHeading) {
                case "1":
                    setHeadingFormat('h1');
                    break;
                case "2":
                    setHeadingFormat('h2');
                    break;
                case "3":
                    setHeadingFormat('h3');
                    break;
                default:
                    alert("Invalid option selected.");
            }
            break;
        case "lists":
            // Implement functionality for lists
            break;
        case "code":
            setCodeFormat();
            break;
        case "image":
            // Implement functionality for inserting image
            break;
        case "video":
            // Implement functionality for inserting video
            break;
        default:
            break;
    }
}


    // Function to save the note to local storage
    function saveNote() {
        var noteContent = noteContainer.innerHTML.trim();
        if (!noteContent || /^\s*$/.test(noteContent)) {
            alert("Note is empty!");
            return;
        }
        var savedNotes = getFromLocalStorage("savedNotes");
        savedNotes.push(noteContent);
        saveToLocalStorage("savedNotes", savedNotes);
        noteContainer.innerHTML = '';
    }

    // Function to download note as PDF
    function downloadNoteAsPDF() {
        var noteContent = noteContainer.innerHTML.trim();
        html2pdf(noteContainer);
    }

    // Function to download note as DOCX
    function downloadNoteAsDOCX() {
        var noteContent = noteContainer.innerHTML.trim();
        var blob = new Blob([noteContent], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "note.docx";
        link.click();
    }

    // Helper function to get data from local storage
    function getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    // Helper function to save data to local storage
    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Function to set heading format
    function setHeadingFormat(headingType) {
        document.execCommand('formatBlock', false, headingType);
    }

    // Function to set code format
    function setCodeFormat() {
        document.execCommand('formatBlock', false, 'pre');
    }

    // Add event listeners for dropdown options
    document.getElementById("headingOption").addEventListener("click", function() {
        handleDropdownOption("headings");
    });

    document.getElementById("listsOption").addEventListener("click", function() {
        handleDropdownOption("lists");
    });

    document.getElementById("codeOption").addEventListener("click", function() {
        handleDropdownOption("code");
    });

    document.getElementById("imageOption").addEventListener("click", function() {
        handleDropdownOption("image");
    });

    document.getElementById("videoOption").addEventListener("click", function() {
        handleDropdownOption("video");
    });
});
