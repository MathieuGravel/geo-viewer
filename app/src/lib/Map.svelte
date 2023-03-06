<svelte:head>
    <link rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""/>
</svelte:head>

<script lang="js">
    import {onMount} from "svelte";

    export let latitude = 0;
    export let longitude = 0;
    export let zoom = 5;

    let leaflet;
    let map;
    let polylinePath;
    let redoCmdHistory = [];

    onMount(async () => {
        leaflet = await import("leaflet");

        map = leaflet.map("map", {
            zoomControl: false
        }).setView([latitude, longitude], zoom);

        leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "Open Street Map",
            tileSize: 256
        }).addTo(map);

        polylinePath = leaflet.polyline([], { color: "red" });
        polylinePath.addTo(map);

        map.on("contextmenu", e => addPoint(e.latlng));
    });

    export function addPoint(latlng) {
        polylinePath.addLatLng(latlng);
        redoCmdHistory = [];
    }

    export function clear() {
        const latlngs = polylinePath.getLatLngs();
        redoCmdHistory.push(() => polylinePath.setLatLngs(latlngs))
        polylinePath.setLatLngs([]);
    }

    export function undo() {
        let latlngs = polylinePath.getLatLngs();
        if (latlngs.length === 0) return;
        let latlng = latlngs.pop();
        redoCmdHistory.push(() => polylinePath.addLatLng(latlng))
        polylinePath.setLatLngs(latlngs);
    }

    export function redo() {
        redoCmdHistory.pop()?.call();
    }

</script>

<div id="map"></div>

<style lang="scss">

    #map {
        width: 100%;
        height: 100%;
        background-color: #bfd4ec;
    }

</style>
