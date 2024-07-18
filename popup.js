document.getElementById('authButton').addEventListener('click', function() {
    console.log('Auth button clicked');
    const iframe = document.getElementById('authFrame');
    iframe.style.display = 'block';
    console.log('Auth iframe displayed');
});

window.addEventListener('message', function(event) {
    console.log('Message received:', event.data);
    if (event.data === 'authenticated') {
        document.getElementById('authFrame').style.display = 'none';
        document.getElementById('status').textContent = 'Phishing detection started.';
        console.log('User authenticated, sending start_detection message');
        chrome.runtime.sendMessage({ type: 'start_detection' });
    }
});
