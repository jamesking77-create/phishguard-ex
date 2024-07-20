document.addEventListener('DOMContentLoaded', function () {
    const scanButton = document.getElementById('scan-emails');
    const scanResult = document.getElementById('scan-result');

    scanButton.addEventListener('click', function () {
        scanResult.innerHTML = 'Scanning...';

        fetch('http://localhost:5000/scan-emails')
            .then(response => {
                if (response.status === 401) {
                    window.open('http://localhost:5000/authorize', '_blank');
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    if (data.malicious_emails && data.malicious_emails.length > 0) {
                        const emailCount = data.malicious_emails.length;
                        scanResult.innerHTML = `
                            <h3>You have ${emailCount} malicious email(s) in your inbox.</h3>
                            <button id="open-gmail">Open Gmail</button>
                            <button id="view-more">View More</button>
                            <button id="ignore">Ignore</button>
                        `;

                        document.getElementById('open-gmail').addEventListener('click', function () {
                            window.open('https://mail.google.com', '_blank');
                        });

                        document.getElementById('view-more').addEventListener('click', function () {
                            const emailList = data.malicious_emails.map(email => `
                                <div class="email">
                                    <strong>Subject:</strong> ${email.subject}<br>
                                    <strong>Sender:</strong> ${email.sender}<br>
                                    <span class="email-snippet">${email.snippet}</span>
                                </div>
                            `).join('');
                            scanResult.innerHTML = `<h3>Malicious Emails:</h3>${emailList}`;
                        });

                        document.getElementById('ignore').addEventListener('click', function () {
                            scanResult.innerHTML = '';
                        });
                    } else {
                        scanResult.innerHTML = 'No malicious emails found.';
                    }
                }
            })
            .catch(error => {
                console.error('Error scanning emails:', error);
                scanResult.innerHTML = 'Error scanning emails.';
            });
    });
});
