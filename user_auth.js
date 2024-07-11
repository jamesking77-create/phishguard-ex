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
        if (data.success) {
            window.parent.postMessage('authenticated', '*');
        } else {
            alert('Authentication failed. Please check your credentials.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});