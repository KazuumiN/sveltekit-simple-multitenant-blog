<script lang="ts">
	import { getLocaleString } from '$lib';
	export let title: string;
	export let subtitle: string;
	// export let body: string;
	export let author: string;
	export let id: string; // YYYYMMDDHH24MISSMS
</script>

<a href={'/' + id}>
	<article class="flex flex-col items-start justify-between p-2 rounded-md hover:bg-gray-200">
		<div class="max-w-xl">
			<div class="mt-8 flex items-center gap-x-4 text-xs">
				<time datetime={id} class="text-gray-500">{getLocaleString(id)}</time>
			</div>
			<div class="group relative">
				<h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
					<span class="absolute inset-0" />
					{title}
				</h3>
				<p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{subtitle}</p>
			</div>
			<div class="relative mt-8 flex items-center gap-x-4">
				<div class="text-sm leading-6">
					<p class="font-semibold text-gray-900">
						<span class="absolute inset-0" />
						{author}
					</p>
				</div>
			</div>
		</div>
	</article>
</a>
