<script lang="ts">
	import { handleNormalBinding } from '$lib';
	import { onMount } from 'svelte';
	import { closeFuzzyFinders, isAFuzzyModelOpen } from './fuzzy.svelte';

	type Mode = 'INSERT' | 'NORMAL';

	type Palette = { key: string; description: string };

	let mode = $state<Mode>('NORMAL');
	let currentArticle = $state('Blog | Alessio Marchi');
	let buffer = $state('');
	let palette = $state<Palette[]>([]);

	onMount(() => {
		const handleNormalBindings = (event: KeyboardEvent) => {
			if (mode === 'NORMAL' && !isAFuzzyModelOpen()) {
				event.preventDefault();
				if (event.key === 'i' && !buffer) {
					mode = 'INSERT';
					return;
				}

				const handled = handleNormalBinding(buffer, event.key);
				if (typeof handled === 'object') {
					buffer = handled.keys;
					palette = Object.keys(handled.bindings).reduce((prev, key) => {
						prev.push({ key, description: handled.bindings[key].description });
						return prev;
					}, [] as Palette[]);
				} else if (typeof handled === 'string') {
					palette = [];
					buffer = handled;
				}
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				mode = 'NORMAL';
				buffer = '';
				palette = [];
				closeFuzzyFinders();
			}
		};

		window.addEventListener('keypress', handleNormalBindings);
		window.addEventListener('keydown', handleEscape);

		return () => {
			window.removeEventListener('keypress', handleNormalBindings);
			window.removeEventListener('keydown', handleEscape);
		};
	});
</script>

{#if palette.length}
	<section
		class="border-text bg-base fixed right-0 bottom-10 mb-1 flex max-w-[300px] flex-col gap-1 border p-2 text-sm"
	>
		{#each palette as binding}
			<div class="flex items-center gap-4">
				<span>{binding.key}</span>
				<span>{binding.description}</span>
			</div>
		{/each}
	</section>
{/if}
<div class="bg-crust fixed bottom-5 flex h-5 w-full items-center justify-between text-sm">
	<div
		class="text-surface0 px-2 font-mono"
		class:bg-teal={mode === 'INSERT'}
		class:bg-blue={mode === 'NORMAL'}
		data-testid="mode"
	>
		{mode.slice(0, 3)}
	</div>
	<h1 data-testid="current-article">
		{currentArticle}
	</h1>
	<div data-testid="position" class="pr-2">22:5</div>
</div>
<div class="fixed bottom-0 flex h-5 w-full items-center justify-end">
	<span class="pr-2 text-sm">{buffer}</span>
</div>
