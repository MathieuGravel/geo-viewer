<script lang="js">
    import { onMount } from "svelte";

    onMount(() => {});

    const style = {
        panel: {
            display: "none",
        },
        "open-panel-btn": {
            display: "block",
        },
    };

    function onOpenPanel() {
        style["panel"]["display"] = "block";
        style["open-panel-btn"]["display"] = "none";
    }
    
    function onClosePanel() {
        style["panel"]["display"] = "none";
        style["open-panel-btn"]["display"] = "block";
    }
</script>

<div class="toggle-panel">
    <div style="display: {style['panel']['display']}" class="panel">
        <div class="content">
            <slot />
        </div>
        <div class="close-panel-btn" on:click={onClosePanel}>close</div>
    </div>
    <div
        style="display: {style['open-panel-btn']['display']}"
        class="open-panel-btn"
        on:click={onOpenPanel}>
    </div>
</div>

<style lang="scss">
    .toggle-panel {
        position: absolute;
        height: 100%;
        width: 300px;
        z-index: 1000;

        .panel {
            display: flex;

            height: calc(100% - 20px);
            transform: translateY(10px);
            border-radius: 0 10px 10px 0;
            background-color: white;
            color: black;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

            .content {
                position: relative;
                height: calc(100% - 30px);
                width: 100%;
                box-sizing: border-box;
            }
            .close-panel-btn {
                position: relative;
                padding: 5px;
                width: 100%;
                height: 30px;
                box-sizing: border-box;
                border-top: 1px solid black;
                display: flex;
                justify-content: center;
            }

            transition: display 2s;
        }

        .open-panel-btn {
            position: absolute;
            top: 50%;
            background-color: white;
            height: 50px;
            width: 25px;
            border-radius: 0 10px 10px 0;

            transition-property: opacity, transform;
            transition-duration: 0.5s;
            opacity: 0.9;
            transform: translateY(-50%) translateX(-5px);
            &:hover {
                opacity: 1;
                transform: translateY(-50%) translateX(0px);
            }
        }
    }
</style>
