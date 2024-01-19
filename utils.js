// prevent image cache
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach((img) => {
        img.src = img.src + '?' + Date.now();
    });
});
