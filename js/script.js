// Update "Last Updated" date from GitHub API
fetch('https://api.github.com/repos/samuel-garmany/samuel-garmany.github.io/commits?per_page=1')
    .then(r => r.json())
    .then(d => document.getElementById('last-updated').textContent = new Date(d[0].commit.committer.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
    .catch(() => document.getElementById('last-updated').textContent = 'Unknown');

// Handle URL hash on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check for hash-based tab navigation (e.g., #contact, #about, #working)
    if (window.location.hash) {
        const tabName = window.location.hash.substring(1); // Remove the #
        const validTabs = ['about', 'working', 'contact'];
        if (validTabs.includes(tabName)) {
            switchTab(tabName);
        }
    }

    // Contact form submission
    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-result');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            result.innerHTML = 'Sending...';
            result.className = 'mt-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
            result.classList.remove('hidden');

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        result.innerHTML = '<p class="font-medium">Thank you!</p><p>I\'ll get back to you as soon as I can.</p>';
                        result.className = 'mt-4 p-4 rounded-lg bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300';
                    } else {
                        console.log(response);
                        result.innerHTML = json.message || 'Something went wrong!';
                        result.className = 'mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300';
                    }
                })
                .catch(error => {
                    console.log(error);
                    result.innerHTML = 'Something went wrong!';
                    result.className = 'mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300';
                })
                .then(function () {
                    form.reset();
                });
        });
    }
});

// Update hash when switching tabs
function switchTab(tabName) {
    // Update URL hash without scrolling
    history.replaceState(null, null, '#' + tabName);

    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });

    // Remove active state from all tab buttons and add hover styles back
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-green-700', 'text-green-700', 'dark:text-green-500', 'dark:border-green-500');
        btn.classList.add('border-transparent', 'text-gray-500', 'dark:text-gray-400', 'hover:text-gray-700', 'dark:hover:text-gray-300');
    });

    // Show selected tab content
    document.getElementById('content-' + tabName).classList.remove('hidden');

    // Add active state to selected tab button and remove hover styles
    const activeTab = document.getElementById('tab-' + tabName);
    if (activeTab) {
        activeTab.classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-400', 'hover:text-gray-700', 'dark:hover:text-gray-300');
        activeTab.classList.add('border-green-700', 'text-green-700', 'dark:text-green-500', 'dark:border-green-500');
    }

    // Sync dropdown selection
    const tabSelect = document.getElementById('tab-select');
    if (tabSelect) {
        tabSelect.value = tabName;
    }
}