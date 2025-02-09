<script lang="ts">
	import { FuzzyId, normalBinding } from '$lib';
	import type { FuseResult } from 'fuse.js';
	import '../app.css';
	import Fuzzy, { type FuzzyFinderProps } from '../components/fuzzy.svelte';
	import StatusLine from '../components/status-line.svelte';

	let { children, data } = $props();

	const articlePickerProps: Omit<FuzzyFinderProps<(typeof data.articles)[0]>, 'listItem'> = {
		id: FuzzyId.ArticlePicker,
		keys: ['title', 'tags'],
		elements: data.articles,
		previewItem: 'title'
	};

	type CommandPaletteData = { binding: string; description: string };

	const transformBindingsToArray = (bindings: typeof normalBinding): CommandPaletteData[] => {
		const result: { binding: string; description: string }[] = [];

		const traverse = (obj: Record<string, unknown>, prefix = '') => {
			for (const key in obj) {
				const current = obj[key];
				if (typeof current === 'object' && current && 'description' in current) {
					const lastElement = current as { description: string };
					result.push({
						binding: prefix + key,
						description: lastElement.description
					});
				} else {
					traverse(current as Record<string, unknown>, prefix + key);
				}
			}
		};

		traverse(bindings);
		return result;
	};

	const commandPaletteProps: Omit<FuzzyFinderProps<CommandPaletteData>, 'listItem'> = {
		id: FuzzyId.CommandPalette,
		keys: ['description'],
		elements: transformBindingsToArray(normalBinding)
	};
</script>

{@render children()}

{#snippet fuzzyFinderItem(item: FuseResult<(typeof data.articles)[0]>)}
	<div class="flex items-start">
		<span class="text-sm">{item.item.title}</span>
	</div>
	<div class="flex items-center justify-between text-xs font-thin">
		<span>{item.item.createdAt.toLocaleDateString()}</span>
		<span>{item.item.views}</span>
	</div>
{/snippet}

{#snippet commandPaletteItem(item: FuseResult<CommandPaletteData>)}
	<div class="flex items-center justify-between text-xs">
		<span>{item.item.binding}</span>
		<span>{item.item.description}</span>
	</div>
{/snippet}

<Fuzzy {...articlePickerProps} listItem={fuzzyFinderItem as any} />
<Fuzzy {...commandPaletteProps} listItem={commandPaletteItem as any} />
<StatusLine />
