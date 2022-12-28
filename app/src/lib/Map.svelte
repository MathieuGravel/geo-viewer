<svelte:head>
    <link rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""/>
</svelte:head>

<script lang="js">
    export let latitude = 0;
    export let longitude = 0;
    export let zoom = 5;

    import { onMount } from "svelte";

    onMount(async () => {
        const leaflet = (await import("leaflet"));

        const map = leaflet.map("map", {
            zoomControl: false
        }).setView([latitude, longitude], zoom);

        leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
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
