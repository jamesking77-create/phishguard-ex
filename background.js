chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'start_detection') {
        chrome.storage.local.get(['email', 'password'], function(result) {
            fetch('http://localhost:5000/start_detection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: result.email,
                    password: result.password
                })
            }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    chrome.notifications.create({
                        type: 'basic',
                        iconUrl: 'images/icon-48.png',
                        title: 'Phishing Detection',
                        message: 'Phishing detection started successfully!'
                    });
                } else {
                    chrome.notifications.create({
                        type: 'basic',
                        iconUrl: 'images/icon-48.png',
                        title: 'Phishing Detection',
                        message: 'Failed to start phishing detection.'
                    });
                }
            });
        });
    }
});
