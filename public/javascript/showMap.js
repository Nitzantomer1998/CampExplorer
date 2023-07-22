mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: campground.geometry.coordinates,
  zoom: 10,
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
    .setHTML(
      "<p><strong><a href='/campgrounds/" + campground._id + "'>" + campground.title + "</a></strong><p>" + 
            "<p>" + campground.location + "</p>" +
            "<p>" + campground.description.substring(0, 20) + "...</p>" +
            "<img src='" + campground.images[0].url + "' width='175px' height='100' />" 
    )
  )
  .addTo(map);
