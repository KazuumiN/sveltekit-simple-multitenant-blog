<script lang="ts">
	import Editor from './Editor.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { createLabel } from '@melt-ui/svelte';
	const label = createLabel();
	export let data;
	const { form, errors, constraints } = superForm(data.form);
</script>

<form class="space-y-6" method="POST">
	<div>
		<label for="title" class="block text-sm font-medium leading-6 text-gray-900" use:label
			>タイトル</label
		>
		<div class="mt-2">
			<input
				id="title"
				name="title"
				type="text"
				required
				class="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				data-invalid={$errors.title}
				bind:value={$form.title}
				{...$constraints.title}
			/>
			{#if $errors.title}<span class="invalid">{$errors.title}</span>{/if}
		</div>
	</div>
	<div>
		<label for="subtitle" class="block text-sm font-medium leading-6 text-gray-900" use:label
			>サブタイトル</label
		>
		<div class="mt-2">
			<input
				id="subtitle"
				name="subtitle"
				type="text"
				required
				class="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				data-invalid={$errors.subtitle}
				bind:value={$form.subtitle}
				{...$constraints.subtitle}
			/>
			{#if $errors.subtitle}<span class="invalid">{$errors.subtitle}</span>{/if}
		</div>
	</div>
	<div>
		<label for="body" class="block text-sm font-medium leading-6 text-gray-900" use:label
			>本文</label
		>
		<div class="mt-2">
			<Editor bind:content={$form.body} />
			<input
				type="hidden"
				id="body"
				name="body"
				required
				data-invalid={$errors.body}
				bind:value={$form.body}
			/>
			{#if $errors.body}<span class="invalid">{$errors.body}</span>{/if}
		</div>
	</div>
	<div>
		<button
			type="submit"
			class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>作成する</button
		>
	</div>
</form>
