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

    // Remove active state from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-blue-600', 'text-blue-600', 'dark:text-blue-400', 'dark:border-blue-400');
        btn.classList.add('border-transparent', 'text-gray-500', 'dark:text-gray-400');
    });

    // Show selected tab content
    document.getElementById('content-' + tabName).classList.remove('hidden');

    // Add active state to selected tab button
    const activeTab = document.getElementById('tab-' + tabName);
    if (activeTab) {
        activeTab.classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-400');
        activeTab.classList.add('border-blue-600', 'text-blue-600', 'dark:text-blue-400', 'dark:border-blue-400');
    }

    // Sync dropdown selection
    const tabSelect = document.getElementById('tab-select');
    if (tabSelect) {
        tabSelect.value = tabName;
    }
}