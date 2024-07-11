document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const appPassword = document.getElementById('appPassword').value;

    fetch('http://localhost:5000/start_detection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: appPassword })
    })
    .then(response => response.json())
    .then(data => {
        const feedbackElement = document.getElementById('feedback');
        if (data.success) {
            window.parent.postMessage('authenticated', '*');
            feedbackElement.style.color = 'green';
            feedbackElement.textContent = 'Authentication successful!';
        } else {
            feedbackElement.style.color = 'red';
            feedbackElement.textContent = `Authentication failed: ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('feedback').textContent = 'An error occurred. Please try again.';
    });
});