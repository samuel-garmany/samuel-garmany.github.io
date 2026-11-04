// This script runs at the end of <body>, so the DOM is already parsed.

// Contact form: submit in the background so the visitor stays on the page.
const form = document.getElementById('contact-form');
const submitButton = form.querySelector('button[type="submit"]');
const result = document.getElementById('form-result');

function showError(message) {
    result.textContent = message;
    result.className = 'mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300';
}

form.addEventListener('submit', event => {
    event.preventDefault();
    submitButton.disabled = true;

    result.textContent = 'Sending...';
    result.className = 'mt-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';

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
                showError(json.message || 'Something went wrong. Please try again later.');
                return;
            }
            result.innerHTML = '<p class="font-medium">Thank you!</p><p>I\'ll get back to you as soon as I can.</p>';
            result.className = 'mt-4 p-4 rounded-lg bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300';
            form.reset();
        })
        // Network failures and non-JSON replies land here; their raw messages
        // ("Failed to fetch", JSON parse errors) aren't meant for visitors.
        .catch(() => showError('Something went wrong. Please try again later.'))
        .finally(() => { submitButton.disabled = false; });
});
