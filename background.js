chrome.runtime.onInstalled.addListener(function() {
    chrome.alarms.create("checkEmails", { periodInMinutes: 3 });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === "checkEmails") {
        fetch('http://localhost:5000/scan-emails')
            .then(response => response.json())
            .then(data => {
                if (data.malicious_emails && data.malicious_emails.length > 0) {
                    console.log('Malicious emails found:', data.malicious_emails);
                    // You can add logic to notify the user or handle the malicious emails
                } else {
                    console.log('No malicious emails found.');
                }
            })
            .catch(error => console.error('Error scanning emails:', error));
    }
});
