<script lang="ts" module>
	import { onMount, type Snippet } from 'svelte';
	import Fuse, { type FuseResult } from 'fuse.js';
	import { FuzzyId } from '$lib';

	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	export interface FuzzyFinderProps<T extends {} = {}> {
		/** The unique id of the fuzzy finder modal
		 * used for handling the open status */
		id: FuzzyId;
		/** The open state of the fuzzy finder modal */
		elements: T[];
		/** The keys fuse.js is allowed to perform search */
		keys: (keyof T)[];
		/** The element to be rendered in the list */
		listItem: Snippet<[FuseResult<T>]>;
		/** If defined, enable the preview on the indicated item */
		previewItem?: keyof T;
	}

	export const getEventName = (id: FuzzyId) => `${id}-fuzzy-open`;

	const closeEvent = 'fuzzy-close';

	/** Function that trigger close event on all opened fuzzy finders */
	export const closeFuzzyFinders = () => {
		const event = new CustomEvent(closeEvent, {});
		window.dispatchEvent(event);
	};

	const dataAttribute = 'modal-open';

	export const isAFuzzyModelOpen = (): boolean => {
		return !!document.querySelector(`[${dataAttribute}='true']`);
	};
</script>

<script lang="ts">
	let { id, elements, keys, listItem, previewItem }: FuzzyFinderProps = $props();

	let search = $state('');
	let selected = $state(0);
	let isOpen = $state(false);

	let list = $state<HTMLUListElement>();

	const fuse = new Fuse(elements, { keys, useExtendedSearch: true });

	const result = $derived(fuse.search(search || '!1234567890$'));

	onMount(() => {
		const scrollToIndex = (index: number) => {
			const node = list?.childNodes.item(index) as HTMLAnchorElement | undefined;
			node?.scrollIntoView({
				block: 'nearest'
			});
		};

		const handleNavigation = (event: KeyboardEvent) => {
			if (!isOpen) return;
			if (!result.length) return;
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				let index = Math.min(selected + 1, result.length - 1);
				if (index === selected) void (index = 0);
				selected = index;
				scrollToIndex(index);
			} else if (event.key === 'ArrowUp') {
				event.preventDefault();
				let index = Math.max(selected - 1, 0);
				if (index === selected) void (index = result.length - 1);
				selected = index;
				scrollToIndex(index);
			} else if (event.key === 'Enter') {
				event.preventDefault();
				const element = result.at(selected);
				if (!element) return;
				/* goto(element.item.href); */
			}
		};

		const handleOpenStatus = (event: Event) => {
			if ('detail' in event) {
				search = '';
				isOpen = (event as CustomEvent<{ open: boolean }>).detail.open;
			}
		};

		const handleClose = () => {
			isOpen = false;
			search = '';
		};

		window.addEventListener(getEventName(id), handleOpenStatus);
		window.addEventListener('keydown', handleNavigation);
		window.addEventListener(closeEvent, handleClose);

		return () => {
			window.removeEventListener('keydown', handleNavigation);
			window.removeEventListener(getEventName(id), handleOpenStatus);
			window.removeEventListener(getEventName(id), handleClose);
		};
	});

	$effect(() => {
		if (!search.length) return;

		selected = 0;
	});
</script>

{#if isOpen}
	<div
		data-testid={id}
		{id}
		class="fixed inset-0 flex h-dvh w-full items-center justify-center gap-2"
		{...{ [dataAttribute]: isOpen }}
	>
		<div class="border-text bg-base bg-mantle w-full max-w-md self-center border">
			<div class="relative">
				<input
					bind:value={search}
					class="border-text h-8 w-full cursor-text border-b px-2 py-1 text-sm focus:outline-none"
					autofocus
				/>
				<span class="absolute right-0 text-xs"
					>{result.length ? selected + 1 : 0}/{result.length}</span
				>
			</div>
			<ul
				bind:this={list}
				class="overscroll-scroll relative flex h-[80dvh] flex-col gap-2 overflow-hidden"
			>
				{#each result as item, index}
					<div
						data-selected={index === selected}
						class="data-[selected=true]:bg-text/90 flex flex-col gap-1 px-2 py-1 data-[selected=true]:text-base"
					>
						{@render listItem(item)}
					</div>
				{/each}
			</ul>
		</div>
		{#if previewItem && result[selected]?.item[previewItem]}
			<div class="border-text bg-base bg-mantle hidden w-full max-w-md self-center border md:block">
				<div class="h-8 border-b py-1 text-center">Preview</div>
				<div class="h-[80dvh] overflow-hidden">{result[selected]?.item[previewItem]}</div>
			</div>
		{/if}
	</div>
{/if}
