<script lang="js">
    import Map from "$lib/Map.svelte";
    import TopMenu from "$lib/TopMenu.svelte";
    import {onMount} from "svelte";

    let redoCmdHistory = [];
    let undoCmdHistory = [];

    let map;
    let leaflet;
    let editLayerIdx;
    let layers = [];
    let distance = 0;

    let mapMounted;
    onMount(async () => {
        await mapMounted;
        const l = leaflet.polyline([], { color: "red" });
        layers.push(l);
        editLayerIdx = 0;
        l.addTo(map)
    });

    function addNewPoint(latlng) {
        addPoint(latlng);
        redoCmdHistory = [];
    }

    function addPoint(latlng) {
        const l = layers[editLayerIdx];
        if (l instanceof leaflet.Polyline) {
            l.addLatLng(latlng);
            distance = calculate_distance();
            undoCmdHistory.push(() => {
                const lls = l.getLatLngs();
                const removedLL = lls.pop();
                l.setLatLngs(lls);
                distance = calculate_distance();
                return () => addPoint(removedLL);
            });
        }
    }

    function clear() {
        const l = layers[editLayerIdx];
        if (l instanceof leaflet.Polyline) {
            const lls = l.getLatLngs();
            l.setLatLngs([]);
            distance = calculate_distance()
            undoCmdHistory.push(() => {
                l.setLatLngs(lls)
                distance = calculate_distance()
                return clear;
            });
        }
    }

    function calculate_distance() {
        const l = layers[editLayerIdx];
        let distance = 0;
        if (leaflet && l instanceof leaflet.Polyline) {
            const lls = l.getLatLngs();
            if (lls.length >= 2) {
                let latlng = lls[0]
                for (let i = 1; i < lls.length; i++) {
                    const other = lls[i];
                    distance += latlng.distanceTo(other);
                    latlng = other;
                }
            }
        }
        return distance;
    }

    function undo() {
        const redoCmd = undoCmdHistory.pop()?.call();
        redoCmdHistory.push(redoCmd);
    }

    function redo() {
        redoCmdHistory.pop()?.call();
    }

    async function exportCurrentLayer() {
        const l = layers[editLayerIdx];
        let distance = 0;
        if (leaflet && l instanceof leaflet.Polyline) {
            const lls = l.getLatLngs();
            await window.ipcApi.exportFile({
                "type": "LineString",
                "coordinates": lls.map(({lat, lng}) => [lng, lat])
            });
        }
    }

    $: distanceValue = distance;
    $: distanceUnit = "m";
    $: if (distanceValue > 10000) {
        distanceValue /= 1000;
        distanceUnit = "km";
    }
    $: distanceValue = Math.round(distanceValue);



    let map_;


    async function onExport() {
        const points = map_?.getPoints();
        const geojson = {
            "type": "LineString",
            "coordinates": points.map(({lat, lng}) => [lng, lat])
        }
        await window.ipcApi.exportFile(geojson);
    }

    async function onImport() {
        const geojson = await window.ipcApi.importFile();
        map_?.addGeoJsonLayer(geojson);
    }

</script>

<TopMenu class="top-menu"
         onUndo={undo}
         onRedo={redo}
         onDelete={clear}
         onImport={onImport}
         onExport={exportCurrentLayer}/>

<Map bind:this={map_}
     bind:mounted={mapMounted}
     bind:map={map}
     bind:leaflet={leaflet}
     onRightClick={e => addNewPoint(e.latlng)}
     latitude="54.549"
     longitude="-67.070"
     zoom="4.65"/>

<div class="distance">
    <label class="distance-value">{distanceValue}</label>
    <label class="distance-unit">{distanceUnit}</label>
</div>

<style lang="scss">
    a#setting {
        position: absolute;
        bottom: 5px;
        left: 5px;
        z-index: 1000;

        img {
            height: 42px;
        }
    }
    .distance {
        border-radius: 5px;
        background-color: white;
        height: 25px;
        z-index: 1000;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        padding: 0 15px;
        font-family: monospace;
        align-items: center;
        gap: 5px
    }
</style>
