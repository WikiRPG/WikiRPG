// map-zoom.js
const zoomInButton = document.getElementById('zoom-in');
const zoomOutButton = document.getElementById('zoom-out');
const mapContainer = document.querySelector('.map-container');
const images = document.querySelectorAll('.map-image');

let scale = 1; // Échelle de départ
let startX, startY, initX, initY;
let dragging = false;

const zoomIn = () => {
    scale *= 1.1; // Augmenter l'échelle de 10%
    updateMapSize();
};

const zoomOut = () => {
    scale /= 1.1; // Diminuer l'échelle de 10%
    updateMapSize();
};

const updateMapSize = () => {
    // Mettre à jour la taille du conteneur
    mapContainer.style.width = `${800 * scale}px`;
    mapContainer.style.height = `${600 * scale}px`;

    // Mettre à jour la taille de chaque image
    images.forEach(image => {
        image.style.width = `50%`;
        image.style.height = `50%`;
    });
};

const dragStart = (e) => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initX = mapContainer.offsetLeft;
    initY = mapContainer.offsetTop;
    mapContainer.style.cursor = 'grabbing';
};

const draggingMap = (e) => {
    if (dragging) {
        let moveX = e.clientX - startX;
        let moveY = e.clientY - startY;
        mapContainer.style.left = `${initX + moveX}px`;
        mapContainer.style.top = `${initY + moveY}px`;
    }
};

const dragEnd = () => {
    dragging = false;
    mapContainer.style.cursor = 'grab';
};

zoomInButton.addEventListener('click', zoomIn);
zoomOutButton.addEventListener('click', zoomOut);

mapContainer.addEventListener('mousedown', dragStart);
window.addEventListener('mousemove', draggingMap);
window.addEventListener('mouseup', dragEnd);
