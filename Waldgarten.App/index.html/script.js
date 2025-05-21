const imageBounds = [[0, 0], [23.7, 30]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1,
});
L.imageOverlay('testkarte.jpg', imageBounds).addTo(map);
map.fitBounds(imageBounds);

// Formular HTML als Popup
function createFormPopup(lat, lng) {
  return `
    <form onsubmit="submitPlantForm(event, ${lat}, ${lng})">
      <label>Lateinischer Name:<br><input name="latinName" required></label><br>
      <label>Pflanzenfamilie:<br><input name="family"></label><br>
      <label>Datum:<br><input name="date" type="date" required></label><br>
      <label>Finder:in:<br><input name="finder"></label><br>
      <label>Bemerkung:<br><textarea name="notes"></textarea></label><br>
      <button type="submit">Eintragen</button>
    </form>
  `;
}

// Beim Klick: Popup mit Formular öffnen
map.on('click', function (e) {
  const { lat, lng } = e.latlng;
  L.popup()
    .setLatLng([lat, lng])
    .setContent(createFormPopup(lat, lng))
    .openOn(map);
});

// Dateneintrag verarbeiten
function submitPlantForm(event, lat, lng) {
  event.preventDefault();
  const form = event.target;
  const data = {
    lat: lat.toFixed(2),
    lng: lng.toFixed(2),
    name: form.latinName.value,
    family: form.family.value,
    date: form.date.value,
    finder: form.finder.value,
    notes: form.notes.value
  };

  // Marker mit Popup setzen
  const popupText = `
    <strong>${data.name}</strong><br>
    Familie: ${data.family}<br>
    Datum: ${data.date}<br>
    Finder:in: ${data.finder}<br>
    Bemerkung: ${data.notes}
  `;
  L.marker([lat, lng]).addTo(map).bindPopup(popupText);

  // Popup schließen
  map.closePopup();

  // Konsolen-Log (später durch Speicherung ersetzen)
  console.log('Eintrag gespeichert:', data);
}