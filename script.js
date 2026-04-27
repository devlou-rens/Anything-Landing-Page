document.querySelectorAll('.links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('data-target');
        if (target === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.getElementById(target).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});