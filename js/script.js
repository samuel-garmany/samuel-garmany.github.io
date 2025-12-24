fetch('https://api.github.com/repos/samuel-garmany/samuel-garmany.github.io/commits?per_page=1')
    .then(r => r.json())
    .then(d => document.getElementById('last-updated').textContent = new Date(d[0].commit.committer.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
    .catch(() => document.getElementById('last-updated').textContent = 'Unknown');

// Tab switching
function switchTab(tabName) {
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