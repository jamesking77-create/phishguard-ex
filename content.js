// content.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('PhishGuard Content Script Loaded');

    // Function to extract email content from the Gmail page
    function extractEmailContent() {
        let emails = [];

        // Example of selecting email elements from the Gmail page
        // This selector might need to be adjusted based on Gmail's DOM structure
        document.querySelectorAll('.zA').forEach(email => {
          // background.js
chrome.runtime.onInstalled.addListener(function() {
    console.log('PhishGuard Installed');
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.emails) {
        request.emails.forEach(email => {
            checkEmailForPhishing(email);
        });
        sendResponse({ status: 'Emails received' });
    }
    return true;
});

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
                iconUrl: 'icons/icon64.png',
                title: 'Malicious Email Detected',
                message: 'A potentially harmful email was detected and moved to trash.',
                buttons: [{ title: 'View' }]
            });

            // Code to move the email to trash
            moveToTrash(emailContent);
        }
    });
}

function moveToTrash(emailContent) {
    // Logic to identify the email in the DOM and move it to trash
    // This logic might require more specific selectors and interactions

    // Example code (needs to be adjusted based on actual DOM structure):
    document.querySelectorAll('.zA').forEach(email => {
        if (email.querySelector('.y2').innerText === emailContent) {
            // Simulate a click on the email to open it
            email.querySelector('.y2').click();

            // Wait for the email to open, then click the trash button
            setTimeout(() => {
                document.querySelector('[aria-label="Delete"]').click();
            }, 1000); // Adjust the delay as needed
        }
    });
}
  let emailContent = email.querySelector('.y2').innerText; // Adjust this as needed
            emails.push(emailContent);
        });

        return emails;
    }

    // Send extracted email content to the background script
    function sendEmailsToBackground() {
        let emails = extractEmailContent();
        chrome.runtime.sendMessage({ emails: emails }, function(response) {
            console.log('Background script response:', response);
        });
    }

    // Check for new emails periodically
    setInterval(sendEmailsToBackground, 1000); // Check every second
});
