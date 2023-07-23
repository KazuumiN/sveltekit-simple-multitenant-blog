<script lang="ts">
	import { getLocaleString } from '$lib';
	export let data;
</script>

<div class="bg-white px-6 py-32 lg:px-8">
	<div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
		<h1 class="mt-2 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
			{data.article.title}
		</h1>
		<h2 class="text-3xl font-semibold leading-7 text-gray-600">{data.article.subtitle}</h2>
		<div class="mt-8 flex items-center gap-x-4 text-xs">
			<time datetime={data.article.id} class="text-gray-500"
				>{getLocaleString(data.article.id)}</time
			>
		</div>
		<div class="mt-8 text-sm leading-7 text-gray-700">
			<div class="prose max-w-none">
				{@html data.article.body}
			</div>
		</div>
	</div>
</div>
