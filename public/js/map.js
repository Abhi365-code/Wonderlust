document.addEventListener("DOMContentLoaded", () => {
  if (!window.mapData) return;

//   console.log("MAP DATA FROM SERVER:", window.mapData);

  const coords = window.mapData;

  const map = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: false
  }).setView([coords[1], coords[0]], 11);

 L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
//   attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


  L.marker([coords[1], coords[0]])
    .addTo(map)
    .bindPopup("Welcome to Wonderlust")
    .openPopup();

  setTimeout(() => {
    map.invalidateSize();
  }, 300);
});
