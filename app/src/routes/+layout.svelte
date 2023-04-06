<script>
    import "./style.scss";
</script>

<main>
    <slot></slot>
</main>

<style lang="scss">
    main {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        margin: 0;
        padding: 0;
    }
</style>