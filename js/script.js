// This script runs at the end of <body>, so the DOM is already parsed.

const TAB_NAMES = ['about', 'working', 'contact'];

// Defined once here so the accent color only has to be changed in one place.
const ACTIVE_TAB_CLASSES = ['border-cyan-700', 'text-cyan-700', 'dark:border-cyan-400', 'dark:text-cyan-400'];
const INACTIVE_TAB_CLASSES = ['border-transparent', 'text-gray-500', 'dark:text-gray-400', 'hover:text-gray-700', 'dark:hover:text-gray-300'];

let activeTab = 'about';

function switchTab(tabName, updateHash = true) {
    if (!TAB_NAMES.includes(tabName)) return;
    activeTab = tabName;

    // replaceState instead of pushState so the back button leaves the site
    // rather than walking back through every tab that was opened.
    if (updateHash) history.replaceState(null, '', '#' + tabName);

    TAB_NAMES.forEach(name => {
        const isActive = name === tabName;
        const button = document.getElementById('tab-' + name);

        document.getElementById('content-' + name).classList.toggle('hidden', !isActive);

        button.classList.remove(...(isActive ? INACTIVE_TAB_CLASSES : ACTIVE_TAB_CLASSES));
        button.classList.add(...(isActive ? ACTIVE_TAB_CLASSES : INACTIVE_TAB_CLASSES));
        button.setAttribute('aria-selected', isActive);
        // Roving tabindex: the tab strip is a single stop, arrow keys move within it.
        button.tabIndex = isActive ? 0 : -1;
    });

    document.getElementById('tab-select').value = tabName;
}

// Left/right arrows move between tabs, as expected of an ARIA tablist.
document.getElementById('tablist').addEventListener('keydown', event => {
    const offset = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (offset === undefined) return;

    event.preventDefault();
    const next = TAB_NAMES[(TAB_NAMES.indexOf(activeTab) + offset + TAB_NAMES.length) % TAB_NAMES.length];
    switchTab(next);
    document.getElementById('tab-' + next).focus();
});

// Open the tab named in the URL hash, defaulting to About. The hash is left
// alone here so a plain visit to the site doesn't gain a "#about" suffix.
const requestedTab = window.location.hash.substring(1);
switchTab(TAB_NAMES.includes(requestedTab) ? requestedTab : 'about', false);

// Contact form: submit in the background so the visitor stays on the page.
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

form.addEventListener('submit', event => {
    event.preventDefault();

    result.innerHTML = 'Sending...';
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
            if (response.ok) {
                result.innerHTML = '<p class="font-medium">Thank you!</p><p>I\'ll get back to you as soon as I can.</p>';
                result.className = 'mt-4 p-4 rounded-lg bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300';
                form.reset();
            } else {
                throw new Error(json.message);
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = error.message || 'Something went wrong!';
            result.className = 'mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300';
        });
});
