import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const articles = [
		{
			title: "Exploring ECS: A Beginner's Guide",
			href: '/articles/ecs-guide',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['gamedev', 'ecs']
		},
		{
			title: 'Building a Simple Game Loop in Rust',
			href: '/articles/game-loop-rust',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['rust', 'gamedev']
		},
		{
			title: 'Optimizing Rust Performance with Rayon',
			href: '/articles/rust-rayon',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['rust', 'performance']
		},
		{
			title: 'Understanding WebAssembly for Gamedev',
			href: '/articles/webassembly-gamedev',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['gamedev', 'webassembly']
		},
		{
			title: 'Integrating Bevy with WebAssembly',
			href: '/articles/bevy-webassembly',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['bevy', 'gamedev', 'webassembly']
		},
		{
			title: 'Rust GUI Libraries: Choosing the Right One',
			href: '/articles/rust-gui',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['rust', 'gui']
		},
		{
			title: 'Concurrency in Rust: Async/Await Explained',
			href: '/articles/rust-async',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['rust', 'concurrency']
		},
		{
			title: 'Writing Performant Rust Code for Games',
			href: '/articles/rust-perf-games',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['rust', 'performance', 'gamedev']
		},
		{
			title: 'Getting Started with Godot and Rust',
			href: '/articles/godot-rust',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['gamedev', 'godot', 'rust']
		},
		{
			title: 'Best Practices for Rust Error Handling',
			href: '/articles/rust-error-handling',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['rust', 'best-practices']
		},
		{
			title: 'Entity-Component-System Design in Bevy',
			href: '/articles/bevy-ecs',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['bevy', 'ecs', 'gamedev']
		},
		{
			title: 'Comparing Rust and C++ for Game Development',
			href: '/articles/rust-vs-cpp-gamedev',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['rust', 'cpp', 'gamedev']
		},
		{
			title: 'Bevy Shader Basics: Writing Your First Shader',
			href: '/articles/bevy-shaders',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['bevy', 'shaders', 'gamedev']
		},
		{
			title: 'Cross-Platform Development with Rust',
			href: '/articles/cross-platform-rust',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['rust', 'cross-platform']
		},
		{
			title: 'Introduction to Bevy Plugins',
			href: '/articles/bevy-plugins',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['bevy', 'gamedev']
		},
		{
			title: "Rust for Backend Development: A Beginner's Guide",
			href: '/articles/rust-backend',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['rust', 'backend']
		},
		{
			title: 'Setting Up Bevy on Windows, macOS, and Linux',
			href: '/articles/bevy-setup',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['bevy', 'gamedev', 'setup']
		},
		{
			title: "Bevy vs Unity: A Rust Developer's Perspective",
			href: '/articles/bevy-vs-unity',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['bevy', 'gamedev', 'comparison']
		},
		{
			title: 'Profiling and Debugging in Rust',
			href: '/articles/rust-debugging',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['rust', 'debugging', 'performance']
		},
		{
			title: 'The Future of Game Development with Rust',
			href: '/articles/rust-future-gamedev',
			createdAt: new Date(),
			updatedAt: new Date(),
			views: 0,
			tags: ['rust', 'gamedev', 'future']
		}
	];

	return {
		articles
	};
};
