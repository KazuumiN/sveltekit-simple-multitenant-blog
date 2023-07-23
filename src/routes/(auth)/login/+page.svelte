<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { createLabel } from '@melt-ui/svelte';
	const label = createLabel();

	export let data;

	let hidePassword = true;
	const { form, errors, constraints } = superForm(data.form);
</script>

<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			ログインする
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" method="POST">
			<div>
				<label for="name" class="block text-sm font-medium leading-6 text-gray-900" use:label
					>ユーザー名</label
				>
				<div class="mt-2">
					<input
						id="name"
						name="name"
						type="text"
						autocomplete="name"
						required
						class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						data-invalid={$errors.name}
						bind:value={$form.name}
						{...$constraints.name}
					/>
					{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label for="password" class="block text-sm font-medium leading-6 text-gray-900" use:label
						>パスワード</label
					>
					<div class="text-sm">
						<a href="/password-reset" class="font-semibold text-indigo-600 hover:text-indigo-500"
							>パスワードをお忘れですか？</a
						>
					</div>
				</div>
				<div class="mt-2">
					<div class="relative mb-2">
						{#if hidePassword}
							<input
								id="password"
								name="password"
								type="password"
								autocomplete="current-password"
								required
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="********"
								data-invalid={$errors.password}
								bind:value={$form.password}
								{...$constraints.password}
							/>
						{:else}
							<input
								id="password"
								name="password"
								type="text"
								autocomplete="current-password"
								required
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="********"
								data-invalid={$errors.password}
								bind:value={$form.password}
								{...$constraints.password}
							/>
						{/if}
						<button
							class="leading-0 absolute right-2 top-1.5 block h-5 w-5 text-center text-xl text-gray-400 transition-colors hover:text-indigo-500 focus:outline-none"
							on:click|preventDefault={() => (hidePassword = !hidePassword)}
						>
							{#if hidePassword}
								<EyeOff />
							{:else}
								<Eye />
							{/if}
						</button>
					</div>
					{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>ログイン</button
				>
			</div>
		</form>

		<p class="mt-10 text-center text-sm text-gray-500">
			アカウントをお持ちでないですか？
			{' '}
			<a href="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
				>新規登録してください！</a
			>
		</p>
	</div>
</div>
