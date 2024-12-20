document.querySelectorAll('.spec-blocks img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.filter = 'brightness(1)'; // Увеличение яркости
    });
    img.addEventListener('mouseleave', () => {
        img.style.filter = 'brightness(0.8)'; // Возврат к исходной яркости
    });
});