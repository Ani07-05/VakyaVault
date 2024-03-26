// imageHandler.js

// Function to handle image selection and movement
function handleImageSelection() {
    // Get the imageOption element
    const imageOption = document.getElementById('imageOption');

    // Add event listener to imageOption
    imageOption.addEventListener('click', function() {
        // Create an input element of type file
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // Allow only image files
        
        // Trigger click event on the input element
        input.click();

        // Handle file selection
        input.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                // Read the file as a data URL
                reader.readAsDataURL(file);

                // When the file is loaded as data URL
                reader.onload = function() {
                    // Create an img element
                    const img = document.createElement('img');
                    img.src = reader.result;

                    // Set position to absolute for easy movement
                    img.style.position = 'absolute';

                    // Set initial position
                    img.style.top = '50px';
                    img.style.left = '50px';

                    // Append the img element to the noteContainer
                    const noteContainer = document.getElementById('noteContainer');
                    noteContainer.appendChild(img);

                    // Display the scaler icon
                    const scaler = document.getElementById('scaler');
                    scaler.style.display = 'block';

                    // Add event listener to the image for resizing
                    img.addEventListener('mousedown', function(event) {
                        if (!isResizing) {
                            startResizing(event);
                        }
                    });
                };
            }
        });
    });
}

// Variables to track resizing status and initial dimensions
let isResizing = false;
let originalWidth;
let originalHeight;
let initialX;
let initialY;

// Function to start resizing
function startResizing(event) {
    isResizing = true;
    originalWidth = event.target.offsetWidth;
    originalHeight = event.target.offsetHeight;
    initialX = event.clientX;
    initialY = event.clientY;
    document.addEventListener('mousemove', handleResizing);
    document.addEventListener('mouseup', stopResizing);
    event.preventDefault(); // Prevent default behavior to avoid text selection during resize
}

// Function to handle resizing
function handleResizing(event) {
    if (isResizing) {
        const img = event.target;
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const diffX = mouseX - initialX;
        const diffY = mouseY - initialY;

        // Calculate the new dimensions maintaining aspect ratio
        let newWidth, newHeight;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            newWidth = originalWidth + diffX;
            newHeight = (originalHeight / originalWidth) * newWidth;
        } else {
            newHeight = originalHeight + diffY;
            newWidth = (originalWidth / originalHeight) * newHeight;
        }

        // Ensure minimum size
        if (newWidth > 50 && newHeight > 50) {
            img.style.width = newWidth + 'px';
            img.style.height = newHeight + 'px';
        }
    }
}

// Function to stop resizing
function stopResizing() {
    isResizing = false;
    document.removeEventListener('mousemove', handleResizing);
    document.removeEventListener('mouseup', stopResizing);
}

// Call the function to handle image selection
handleImageSelection();
