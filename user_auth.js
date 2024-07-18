document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const appPassword = document.getElementById('appPassword').value;
    const feedback = document.getElementById('feedback');

    console.log("Submit button clicked");  // Debugging line
    console.log("Email:", email);  // Debugging line
    console.log("App Password:", appPassword);  // Debugging line

    fetch('http://127.0.0.1:5000/start_detection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: appPassword })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response received:", data);  // Debugging line
        if (data.success) {
            feedback.textContent = 'Authentication successful. Phishing detection started.';
            feedback.style.color = '#ccffcc'; // Light green for success messages
            window.parent.postMessage('authenticated', '*');
        } else {
            feedback.textContent = `Authentication failed: ${data.error}`;
            feedback.style.color = 'red'; // Red for error messages
        }
    })
    .catch(error => {
        console.error("Error occurred:", error);  // Debugging line
        feedback.textContent = `Error: ${error.message}`;
        feedback.style.color = 'red'; // Red for error messages
    });
});
