<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import TextAlign from '@tiptap/extension-text-align';

	import {
		Bold,
		Italic,
		Strikethrough,
		AlignLeft,
		AlignCenter,
		AlignRight,
		Heading1,
		Heading2,
		Heading3
	} from 'lucide-svelte';

	import { createToolbar } from '@melt-ui/svelte';

	const { root, separator, createToolbarGroup } = createToolbar();
	const { root: headerGroup, item: headerItem } = createToolbarGroup();
	const { root: fontGroup, item: fontItem } = createToolbarGroup({
		type: 'multiple'
	});
	const { root: alignGroup, item: alignItem } = createToolbarGroup();

	let element: HTMLDivElement;
	let editor: Editor;

	export let content = '';

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				TextAlign.configure({
					types: ['heading', 'paragraph']
				})
			],
			editorProps: {
				attributes: {
					class: 'max-w-full prose m-5 focus:outline-none'
				}
			},
			content: '',
			onTransaction: () => {
				editor = editor;
				content = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<div
		melt={$root}
		class="flex min-w-max items-center gap-4 rounded-md bg-white px-3 py-3 text-neutral-700 shadow-sm"
	>
		<div class="group" melt={$headerGroup}>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class:active={editor.isActive('heading', { level: 1 })}
				class="item"
				melt={$headerItem('h1')}
			>
				<Heading1 />
			</button>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={editor.isActive('heading', { level: 2 })}
				class="item"
				melt={$headerItem('h2')}
			>
				<Heading2 />
			</button>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class:active={editor.isActive('heading', { level: 3 })}
				class="item"
				melt={$headerItem('h3')}
			>
				<Heading3 />
			</button>
		</div>
		<div class="separator" melt={$separator} />
		<div class="group" melt={$fontGroup}>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleBold().run()}
				class:active={editor.isActive('bold')}
				class="item"
				melt={$fontItem('bold')}
			>
				<Bold />
			</button>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleItalic().run()}
				class:active={editor.isActive('italic')}
				class="item"
				melt={$fontItem('italic')}
			>
				<Italic />
			</button>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleStrike().run()}
				class:active={editor.isActive('strike')}
				class="item"
				melt={$fontItem('strikethrough')}
			>
				<Strikethrough />
			</button>
		</div>
		<div class="separator" melt={$separator} />
		<div class="group" melt={$alignGroup}>
			<button
				type="button"
				on:click={() => editor.chain().focus().setTextAlign('left').run()}
				class:active={editor.isActive({ textAlign: 'left' })}
				class="item"
				melt={$alignItem('left')}
			>
				<AlignLeft />
			</button>
			<button
				type="button"
				on:click={() => editor.chain().focus().setTextAlign('center').run()}
				class:active={editor.isActive({ textAlign: 'center' })}
				class="item"
				melt={$alignItem('center')}
			>
				<AlignCenter />
			</button>
			<button
				type="button"
				on:click={() => editor.chain().focus().setTextAlign('right').run()}
				class:active={editor.isActive({ textAlign: 'right' })}
				class="item"
				melt={$alignItem('right')}
			>
				<AlignRight />
			</button>
		</div>
	</div>
{/if}

<div
	class="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
	bind:this={element}
/>

<style>
	button.active {
		background: black;
		color: white;
	}
</style>
