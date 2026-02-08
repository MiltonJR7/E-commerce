const themeToggle = document.getElementById('theme-checkbox');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

if (themeToggle.tagName === 'INPUT') {
    themeToggle.checked = savedTheme === 'dark';
}

themeToggle.addEventListener('click', function () {
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (this.tagName === 'INPUT') this.checked = false;
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (this.tagName === 'INPUT') this.checked = true;
    }
});
