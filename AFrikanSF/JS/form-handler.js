// Initialize EmailJS with your public key
emailjs.init("jqJE1ffervnm4dJ-z");

// Function to validate form inputs
function validateForm(formData) {
    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
        alert("Please fill in all required fields.");
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}

// Function to show feedback messages
function showFeedbackMessage(success) {
    if (success) {
        document.getElementById('submitSuccessMessage').classList.remove('d-none');
        document.getElementById('submitErrorMessage').classList.add('d-none');
    } else {
        document.getElementById('submitSuccessMessage').classList.add('d-none');
        document.getElementById('submitErrorMessage').classList.remove('d-none');
    }
}

// Add event listener to the submit button
document.getElementById('submitButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        institution: document.getElementById('institution').value.trim(),
        location: document.getElementById('location').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim(),
    };

    // Log form data for debugging (remove in production)
    console.log("Form Data Collected:", formData);

    // Validate form data
    if (!validateForm(formData)) {
        return;
    }

    // Send data via EmailJS
    emailjs.send("service_6vfh60m", "template_amm1rca", formData)
        .then((response) => {
            console.log("Email sent successfully:", response); // Log success response
            showFeedbackMessage(true); // Show success message
        })
        .catch((error) => {
            console.error("Error sending email:", error); // Log error response
            showFeedbackMessage(false); // Show error message
        });
});
