// popup.js
document.addEventListener('DOMContentLoaded', function() {
    const checkEmailsBtn = document.getElementById('checkEmailsBtn');
    const statusDiv = document.getElementById('status');

    checkEmailsBtn.addEventListener('click', function() {
        statusDiv.textContent = 'Checking emails for phishing...';

        // Send a message to the background script to check emails
        chrome.runtime.sendMessage({ action: 'checkEmails' }, function(response) {
            if (response && response.status === 'success') {
                statusDiv.textContent = 'Emails checked successfully!';
            } else {
                statusDiv.textContent = 'Failed to check emails.';
            }
        });
    });
});
