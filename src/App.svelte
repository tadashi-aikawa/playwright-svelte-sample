<script lang="ts">
  let count = 0;
</script>

<main>
  <h1>Playwright Svelte Sample</h1>

  <h2>Push "Increment/Decrement" button</h2>

  <div style=" justify-content: center; gap: 10px;">
    <button on:click={() => count++}>Increment</button>
    <button on:click={() => count--}>Decrement</button>
  </div>
  <div data-test-id="counter" style="font-size: 200%; padding: 30px;">
    Count: {count}
  </div>
</main>