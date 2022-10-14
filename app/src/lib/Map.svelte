<svelte:head>
    <link rel="stylesheet" href="leaflet/leaflet.css">
</svelte:head>

<script lang="js">
    import { onMount } from "svelte";

    import * as leaflet from "leaflet";

    onMount(async () => {
        const map = leaflet.map("map", {
            zoomControl: false
        }).setView([54.549, -67.070], 4.65);

        // mapbox
        // leaflet.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
        //     tileSize: 512,
        // }).addTo(map);

        // open street map
        // leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        //     maxZoom: 19,
        //     attribution: '© OpenStreetMap',
        //     tileSize: 256
        // }).addTo(map);

        // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
        // https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png
        // https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg
        // https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg
        // "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
        leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "attribution",
            tileSize: 256
        }).addTo(map);

        {
            const response = await fetch("file:///./cours-eau.json");
            const data = await response.json();
            const geojson = leaflet.geoJSON(data);
            map.addLayer(geojson);
        }
        {
            const response = await fetch("file:///./vdq-arrondissement.geojson");
            const data = await response.json();
            const geojson = leaflet.geoJSON(data);
            map.addLayer(geojson);
        }

    });

</script>

<div id="map"></div>

<style>

    #map {
        width: 100%;
        height: 100%;
        background-color: #bfd4ec;
    }

</style>
