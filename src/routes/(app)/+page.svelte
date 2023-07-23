<script lang="ts">
	import Card from './Card.svelte';
	export let data;
</script>

<div
	class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
>
	{#each data.articles as article}
		<Card
			title={article.title}
			subtitle={article.subtitle}
			author={article.author}
			id={article.id}
		/>
	{/each}
</div>
