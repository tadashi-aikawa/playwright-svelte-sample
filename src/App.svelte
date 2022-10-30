<script lang="ts">
  interface Member {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar?: string;
  }
  let members: Member[] = [];

  const fetchMembers = async () => {
    const res = await fetch("https://reqres.in/api/users?page=2");
    members = (await res.json()).data;
  };
</script>

<main>
  <h1>Playwright Svelte Sample</h1>

  <h2>Push "Increment/Decrement" button</h2>

  <h2>Click to fetch members</h2>
  <button on:click={fetchMembers}>Fetch members</button>
  <div style="text-align: left">
    <ul data-test-id="member-list">
      {#each members as member}
        <li>{member.first_name} {member.last_name}</li>
      {/each}
    </ul>
    <pre class="json">{JSON.stringify(members, null, 2)}</pre>
  </div>
</main>

<style>
  .json {
    background-color: darkslategray;
    color: whitesmoke;
    padding: 10px;
  }
</style>
