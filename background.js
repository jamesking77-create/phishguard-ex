// background.js
chrome.runtime.onInstalled.addListener(function() {
    console.log('PhishGuard Installed');
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'checkEmails') {
        checkAllEmails();
        sendResponse({ status: 'success' });
    }
    return true;
});

function checkAllEmails() {
    chrome.tabs.query({ url: "*://mail.google.com/*" }, function(tabs) {
        tabs.forEach(tab => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });
        });
    });
}

function checkEmailForPhishing(emailContent) {
    fetch('http://127.0.0.1:5000/check_emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_content: emailContent })
    })
    .then(response => response.json())
    .then(data => {
        if (data.malicious) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon48.png',
                title: 'Malicious Email Detected',
                message: 'A potentially harmful email was detected and moved to trash.',
                buttons: [{ title: 'View' }]
            });

            moveToTrash(emailContent);
        }
    });
}

function moveToTrash(emailContent) {
    // Logic to identify the email in the DOM and move it to trash
    document.querySelectorAll('.zA').forEach(email => {
        if (email.querySelector('.y2').innerText === emailContent) {
            email.querySelector('.y2').click();

            setTimeout(() => {
                document.querySelector('[aria-label="Delete"]').click();
            }, 1000);
        }
    });
}
