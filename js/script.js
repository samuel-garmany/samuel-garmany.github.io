fetch('https://api.github.com/repos/samuel-garmany/samuel-garmany.github.io/commits?per_page=1')
    .then(r => r.json())
    .then(d => document.getElementById('last-updated').textContent = new Date(d[0].commit.committer.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));