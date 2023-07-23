<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { createLabel } from '@melt-ui/svelte';
	const label = createLabel();

	export let data;

	const { form, errors, constraints } = superForm(data.form);
</script>

<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			新しく部屋を作る
		</h2>
	</div>
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" method="POST">
			<div>
				<label for="title" class="block text-sm font-medium leading-6 text-gray-900" use:label
					>URL</label
				>
				<div class="mt-2">
					<input
						disabled
						id="title"
						name="title"
						type="text"
						required
						class="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						bind:value={data.host}
					/>
				</div>
			</div>
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
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>作成する</button
				>
			</div>
		</form>
	</div>
</div>
