import { goto } from '$app/navigation';

export enum FuzzyId {
	ArticlePicker = 'article-picker',
	CommandPalette = 'command-palette',
	GlobalSearch = 'global-search'
}

export const getEventName = (id: FuzzyId) => `${id}-fuzzy-open`;

const createOpenEvent = (id: FuzzyId) => {
	return new CustomEvent(getEventName(id), { detail: { open: true } });
};

export const normalBinding = {
	'<space>': {
		f: {
			description: 'Open article picker',
			exec: () => window.dispatchEvent(createOpenEvent(FuzzyId.ArticlePicker))
		},
		'/': {
			description: 'Global search',
			exec: () => window.dispatchEvent(createOpenEvent(FuzzyId.GlobalSearch))
		},
		'?': {
			description: 'Open command palette',
			exec: () => window.dispatchEvent(createOpenEvent(FuzzyId.CommandPalette))
		}
	},
	':': {
		q: {
			description: 'Quit (homepage)',
			exec: () => goto('/')
		}
	},
	g: {
		g: {
			description: 'Go to start',
			exec: () => null
		},
		e: {
			description: 'Go to end',
			exec: () => null
		}
	}
};

type Binding =
	| ''
	| { bindings: Record<string, { description: string; exec: () => null }>; keys: string }
	| (() => null);

export const handleNormalBinding = (buffer: string, key: string): Binding => {
	const keys = buffer.split(' ').filter(Boolean);
	const pressed = key === ' ' ? '<space>' : key;
	keys.push(pressed);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const analyzeBinding = (bindings: Record<string, any>, keys: string[], index: number) => {
		const key = keys[index];
		if (!key) return { bindings, keys: keys.join(' ') };

		const follow = bindings[key];
		if (!follow) return '';
		if (typeof follow === 'object' && 'exec' in follow) {
			return follow.exec;
		} else if (typeof follow === 'object') {
			return analyzeBinding(follow, keys, index + 1);
		}
	};

	const binding: Binding = analyzeBinding(normalBinding, keys, 0);

	if (!binding) return '';

	if (typeof binding === 'function') {
		binding();
		return '';
	}

	return binding;
};
