<script lang="ts">
    import undoIcon from "$lib/images/undo-icon.svg"
    import redoIcon from "$lib/images/redo-icon.svg"
    import deleteIcon from "$lib/images/delete-icon.svg"
    import importIcon from "$lib/images/import-icon.svg"
    import exportIcon from "$lib/images/export-icon.svg"

    export let onUndo: (() => void) | undefined;
    export let onRedo: (() => void) | undefined;
    export let onDelete: (() => void) | undefined;
    export let onImport: (() => void) | undefined;
    export let onExport: (() => void) | undefined;

</script>

<div id="top_menu">
    <img src="{undoIcon}" alt="Undo" on:click={() => onUndo?.call(undefined)} />
    <img src="{redoIcon}" alt="Redo" on:click={() => onRedo?.call(undefined)} />
    <img src="{deleteIcon}" alt="Delete" on:click={() => onDelete?.call(undefined)} />
    <img src="{importIcon}" alt="Import" on:click={() => onImport?.call(undefined)} />
    <img src="{exportIcon}" alt="Import" on:click={() => onExport?.call(undefined)} />
</div>

<style lang="scss">
    #top_menu {
        display: flex;
        position: absolute;
        background-color: white;
        border-radius: 10px;
        top: 10px;
        left: 50%;
        z-index: 1000;
        height: 42px;
        gap: 3px;
        transform: translateX(-50%);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

        img {
            &:hover {
                border-radius: 10px;
                background-color: rgba(0, 0, 0, 0.075);
            }
        }
    }

</style>