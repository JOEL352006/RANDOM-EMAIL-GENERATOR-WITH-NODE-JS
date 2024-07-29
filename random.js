document.getElementById('generateEmail').addEventListener('click', generateEmail);
document.getElementById('sendOtp').addEventListener('click', sendOtp);
document.getElementById('checkInbox').addEventListener('click', checkInbox);

let currentEmail = '';

function generateEmail() {
    toggleLoading(true);
    fetch('/generate-email')
        .then(response => response.json())
        .then(data => {
            currentEmail = data.email;
            document.getElementById('email').innerText = `Generated Email: ${currentEmail}`;
            document.getElementById('sendOtp').disabled = false;
            document.getElementById('checkInbox').disabled = false;
            toggleLoading(false);
        })
        .catch(error => {
            console.error('Error generating email:', error);
            toggleLoading(false);
        });
}

function sendOtp() {
    toggleLoading(true);
    fetch(`/send-otp?email=${currentEmail}`)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            toggleLoading(false);
        })
        .catch(error => {
            console.error('Error sending OTP:', error);
            toggleLoading(false);
        });
}

function checkInbox() {
    toggleLoading(true);
    fetch(`/inbox?email=${currentEmail}`)
        .then(response => response.json())
        .then(data => {
            const inboxDiv = document.getElementById('inbox');
            inboxDiv.innerHTML = '<h2>Inbox:</h2>';
            data.messages.forEach(msg => {
                inboxDiv.innerHTML += `<p>${msg}</p>`;
            });
            toggleLoading(false);
        })
        .catch(error => {
            console.error('Error checking inbox:', error);
            toggleLoading(false);
        });
}

function toggleLoading(show) {
    const loadingDiv = document.getElementById('loading');
    if (show) {
        loadingDiv.classList.remove('hidden');
    } else {
        loadingDiv.classList.add('hidden');
    }
}
