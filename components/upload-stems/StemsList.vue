<template>
	<ul class="stems-list" v-if="stems.length">
		<v-stem v-for="stem of stems" :key="stem.name" :stem="stem"></v-stem>
	</ul>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component
	export default class extends Vue {
		get stems(): File[] {
			return this.$store.getters.stems;
		}
	}
</script>

<style scoped lang="scss">

.stems-list {
	margin: 2rem 0;

	max-height: 20vh;
	overflow-y: scroll;
}

</style>