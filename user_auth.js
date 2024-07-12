document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const appPassword = document.getElementById('appPassword').value;
    const feedback = document.getElementById('feedback');


    fetch('http://localhost:5000/start_detection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: appPassword })
    })
     .then(response => response.json())
    .then(data => {
        if (data.success) {
            feedback.textContent = 'Authentication successful. Phishing detection started.';
            feedback.style.color = '#ccffcc'; // Light green for success messages
            window.parent.postMessage('authenticated', '*');
        } else {
            feedback.textContent = `Authentication failed: ${data.error}`;
        }
    })
    .catch(error => {
        feedback.textContent = `Error: ${error.message}`;
    });
});