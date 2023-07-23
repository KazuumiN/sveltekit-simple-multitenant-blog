<script lang="ts">
	export let data;
</script>

<nav class="bg-gray-50 border-gray-200">
	<div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
		<a href="/" class="flex items-center">
			<span class="self-center text-2xl font-semibold whitespace-nowrap">{data.tenant?.title}</span>
		</a>
		<div class="flex items-center">
			{#if data.user}
				<a href="/new" class="px-3 text-sm text-black hover:underline">新規作成</a>
				<span class="px-3 text-sm">{data.user.name}</span>
			{:else}
				<a href="/login" class="text-sm text-black hover:underline">ログイン</a>
			{/if}
		</div>
	</div>
</nav>

<main class="px-5">
	<slot />
</main>
