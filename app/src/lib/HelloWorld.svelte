<script lang="ts">
    export let name: string = "world";

    let count = 0;

    function handleClick() {
        count += 1;
    }
</script>

<div class="lol">
    <h1 >Hello {name}!</h1>
</div>

<button on:click={handleClick}>
    Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<style lang="scss">
    .lol {
        h1 {
            color: chartreuse;
        }

    }
</style>