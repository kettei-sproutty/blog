<svelte:head>
	<title>Blog | Alessio Marchi</title>
</svelte:head>

<script lang="ts">
	const help = `Welcome to my blog

Available commands:
  <space>f : Open fuzzy finder
  <space>? : Show command palette
  :q       : Return to homepage

In fuzzy finder:
  ↑ / ↓    : Navigate through search results
  Escape   : Close fuzzy finder

Press <space>f to start browsing articles.`;
</script>

<main>
	<pre class="text-sm">{help}</pre>
</main>
