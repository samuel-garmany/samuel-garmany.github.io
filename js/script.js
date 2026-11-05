// This script runs at the end of <body>, so the DOM is already parsed.

// Contact form: submit in the background so the visitor stays on the page.
const form = document.getElementById('contact-form');
const submitButton = form.querySelector('button[type="submit"]');
const result = document.getElementById('form-result');

const GENERIC_ERROR = "Your message didn't send. Check your connection and try again.";

function showResult(message, className) {
    result.textContent = message;
    result.className = className;
}

form.addEventListener('submit', event => {
    event.preventDefault();
    submitButton.disabled = true;

    showResult('Sending…', 'text-muted');

    fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
    })
        .then(async response => {
            const json = await response.json();
            if (!response.ok) {
                showResult(json.message || GENERIC_ERROR, 'text-error');
                return;
            }
            showResult("Message sent. I'll reply by email.", '');
            form.reset();
        })
        // Network failures and non-JSON replies land here; their raw messages
        // ("Failed to fetch", JSON parse errors) aren't meant for visitors.
        .catch(() => showResult(GENERIC_ERROR, 'text-error'))
        .finally(() => { submitButton.disabled = false; });
});
