<script lang="ts">
    import settingIcon from "$lib/images/setting-icon.svg"
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

<div id="menu">
   <a href="setting" ><img src="{settingIcon}" alt="Setting"/></a>
   <img src="{undoIcon}" alt="Undo" on:click={() => onUndo?.call(undefined)} />
   <img src="{redoIcon}" alt="Redo" on:click={() => onRedo?.call(undefined)} />
   <img src="{deleteIcon}" alt="Delete" on:click={() => onDelete?.call(undefined)} />
   <img src="{importIcon}" alt="Import" on:click={() => onImport?.call(undefined)} />
   <img src="{exportIcon}" alt="Import" onclick={() => onExport?.call(undefined)} />
</div>

<style lang="scss">
    #menu {
       display: flex;
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       z-index: 1000;
    }
</style>