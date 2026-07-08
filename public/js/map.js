// let key = process.env.DEFAULT_KEY;
maptilersdk.config.apiKey = key;

const map = new maptilersdk.Map({
    container: "map",
    style: maptilersdk.MapStyle.STREETS,
    center: [73.1812,22.3072],
    zoom: 10
});
new maptilersdk.Marker()    
    //lat/long
    .setLngLat([73.1812,22.3072])
    .addTo(map);