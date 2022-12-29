<svelte:head>
    <link rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""/>
</svelte:head>

<script lang="ts">
    import { onMount } from "svelte";

    export let latitude = 0;
    export let longitude = 0;
    export let zoom = 5;

    onMount(async () => {
        const leaflet = (await import("leaflet"));

        const map = leaflet.map("map", {
            zoomControl: false
        }).setView([latitude, longitude], zoom);

        leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "Open Street Map",
            tileSize: 256
        }).addTo(map);

        map.on("contextmenu", e => {
            const {lat, lng} = e.latlng;
            const marker = new leaflet.Marker([lat, lng]);
            marker.addTo(map);
            console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
        })
    });
</script>

<div id="map"></div>

<style lang="scss">

    #map {
        width: 100%;
        height: 100%;
        background-color: #bfd4ec;
    }

</style>
