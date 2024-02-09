var map = L.map('map', {
    center: [500, 500],
    zoom: 1,
    minZoom: 1,
    maxZoom: 4,
    crs: L.CRS.Simple,
    smoothWheelZoom: true, // Activer le zoom fluide avec la molette
    dragging: true, // Activer le glissement de la carte
    tap: false, // Désactiver le tap (clic) de la carte
    touchZoom: false, // Désactiver le zoom tactile
    doubleClickZoom: false, // Désactiver le zoom sur double-clic
    boxZoom: false // Désactiver le zoom par zone
});

// Supprimer les contrôles de zoom de Leaflet par défaut
map.removeControl(map.zoomControl);

// Supprimer l'attribution de Leaflet
map.attributionControl.remove();

//activate smooth zoom
map.on('zoom', function(event) {
    map.setZoom(Math.round(map.getZoom()));
});

// Dimensions de votre image
var w = 1024; // Remplacez par la largeur réelle de votre image
var h = 1024; // Remplacez par la hauteur réelle de votre image

// Calcul des coins de votre image pour qu'elle s'adapte à la vue de la carte
var southWest = map.unproject([0, h], map.getMaxZoom() - 1);
var northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
var bounds = new L.LatLngBounds(southWest, northEast);

// Ajout de l'image à la carte comme une couche de superposition
L.imageOverlay('../../assets/map/map.png', bounds).addTo(map);

// Ajuster la vue pour contenir l'image entière
map.fitBounds(bounds);

// Activer le zoom à l'endroit de la souris
map.on('zoomstart', function(event) {
    map.dragging.disable(); // Désactiver le glissement pendant le zoom
});

map.on('zoomend', function(event) {
    map.dragging.enable(); // Réactiver le glissement après le zoom
});

map.on('mousewheel', function(event) {
    var mouse = map.mouseEventToContainerPoint(event.originalEvent);
    var delta = event.originalEvent.deltaY;
    var zoom = map.getZoom();
    var newZoom = delta > 0 ? zoom - 1 : zoom + 1;
    var scale = Math.pow(2, newZoom - zoom);
    var origin = map.unproject(mouse, zoom).subtract(map.unproject(mouse, newZoom));
    var offset = map.getCenter().subtract(origin.multiplyBy(scale));
    map.setView(offset, newZoom, { animate: false });
});
