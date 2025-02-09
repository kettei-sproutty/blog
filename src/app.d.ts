// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface FuzzyOpenEvent {
	open: boolean;
}

interface CustomEventMap {
	[`${string}-fuzzy-open`]: CustomEvent<FuzzyOpenEvent>;
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Document {
		addEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Document, ev: CustomEventMap[K]) => void
		): void;
		dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
	}

	interface Window {
		addEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Window, ev: CustomEventMap[K]) => void
		): void;
		dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
	}
}

export {};
