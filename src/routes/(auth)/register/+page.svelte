<script lang="ts">
	import { zxcvbn } from '$lib/zxcvbn';
	import { superForm } from 'sveltekit-superforms/client';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { createLabel } from '@melt-ui/svelte';
	const label = createLabel();

	export let data;

	const { form, errors, constraints } = superForm(data.form);

	let hidePassword = true;
	let hidePasswordConfirm = true;
	$: passwordScore = $form.password ? zxcvbn($form.password).score + 1 : 0; // TODO!: ここの値が一定以上でないとパスワード登録できない、などがあってもいいかもしれない
</script>

<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			新規登録する
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<!-- 同じディレクトリのdefault actions -->
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
					<div class="-mx-1 flex">
						{#each Array.from({ length: 5 }, (_, i) => i + 1) as v}
							<div class="w-1/5 px-1">
								<div
									class="h-2 rounded-xl transition-colors"
									class:bg-green-500={passwordScore > 4 && v <= passwordScore}
									class:bg-yellow-400={passwordScore > 2 &&
										passwordScore <= 4 &&
										v <= passwordScore}
									class:bg-red-400={passwordScore <= 2 && v <= passwordScore}
									class:bg-gray-200={v > passwordScore}
								/>
							</div>
						{/each}
					</div>
					{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
				</div>
			</div>

			<!-- パスワードの確認入力欄 -->
			<div>
				<label
					for="passwordConfirm"
					class="block text-sm font-medium leading-6 text-gray-900"
					use:label>パスワードの確認</label
				>
				<div class="mt-2">
					<div class="relative mb-2">
						{#if hidePasswordConfirm}
							<input
								id="passwordConfirm"
								name="passwordConfirm"
								type="password"
								autocomplete="current-password"
								required
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="********"
								data-invalid={$errors.passwordConfirm}
								bind:value={$form.passwordConfirm}
								{...$constraints.passwordConfirm}
							/>
						{:else}
							<input
								id="passwordConfirm"
								name="passwordConfirm"
								type="text"
								autocomplete="current-password"
								required
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="********"
								data-invalid={$errors.passwordConfirm}
								bind:value={$form.passwordConfirm}
								{...$constraints.passwordConfirm}
							/>
						{/if}
						<button
							class="leading-0 absolute right-2 top-1.5 block h-5 w-5 text-center text-xl text-gray-400 transition-colors hover:text-indigo-500 focus:outline-none"
							on:click|preventDefault={() => (hidePasswordConfirm = !hidePasswordConfirm)}
						>
							{#if hidePasswordConfirm}
								<EyeOff />
							{:else}
								<Eye />
							{/if}
						</button>
					</div>
					{#if $errors.passwordConfirm}<span class="invalid">{$errors.passwordConfirm}</span>{/if}
				</div>
			</div>

			<!-- 利用規約類の確認・同意のチェックボックス -->
			<div>
				<div class="relative flex items-start">
					<div class="flex h-6 items-center">
						<!-- <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" /> -->
						<input
							id="terms"
							name="terms"
							type="checkbox"
							class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
							data-invalid={$errors.terms}
							bind:checked={$form.terms}
							{...$constraints.terms}
						/>
					</div>
					<div class="ml-3 text-sm leading-6">
						<label for="terms" class="font-medium text-gray-900 use:label">規約への同意</label>
						<p id="terms-description" class="text-gray-500">
							利用規約・プライバシーポリシー・ガイドラインへ同意する
						</p>
					</div>
				</div>
				{#if $errors.terms}<span class="invalid">{$errors.terms}</span>{/if}
			</div>

			<div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>新規登録</button
				>
			</div>
		</form>

		<p class="mt-10 text-center text-sm text-gray-500">
			アカウントをお持ちですか？
			{' '}
			<a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
				>ログインしてください！</a
			>
		</p>
	</div>
</div>
