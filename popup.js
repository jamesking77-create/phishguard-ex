document.getElementById('authButton').addEventListener('click', function() {
    const iframe = document.getElementById('authFrame');
    iframe.style.display = 'block';
});

window.addEventListener('message', function(event) {
    if (event.data === 'authenticated') {
        document.getElementById('authFrame').style.display = 'none';
        document.getElementById('status').textContent = 'Phishing detection started.';
        chrome.runtime.sendMessage({ type: 'start_detection' });
    }
});
