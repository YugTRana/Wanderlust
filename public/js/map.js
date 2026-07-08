// let key = process.env.DEFAULT_KEY;
maptilersdk.config.apiKey = key;

const map = new maptilersdk.Map({
    container: "map",
    style: maptilersdk.MapStyle.STREETS,
    center: cordinates,
    zoom: 10
});
new maptilersdk.Marker()    
    //lat/long
    .setLngLat(cordinates)
    .addTo(map);