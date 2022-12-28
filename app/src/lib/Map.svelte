<svelte:head>
    <link rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""/>
</svelte:head>

<script lang="js">
    import { onMount } from "svelte";

    onMount(async () => {
        const leaflet = (await import("leaflet"));

        const map = leaflet.map("map", {
            zoomControl: false
        }).setView([54.549, -67.070], 4.65);

        leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "Open Street Map",
            tileSize: 256
        }).addTo(map);
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
