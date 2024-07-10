document.getElementById('credentials-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    chrome.storage.local.set({email: email, password: password}, function() {
        document.getElementById('status').textContent = 'Phishing detection started.';
        chrome.runtime.sendMessage({type: 'start_detection'});
    });
});
