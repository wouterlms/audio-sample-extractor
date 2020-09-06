<template>
	<div class="svg" v-html="svg"></div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';

	@Component
	export default class  extends Vue {
		@Prop() private icon!: string;

		get svg(): SVGElement {
			return require(`!html-loader!@/assets/svg/${this.icon}.svg`);
		}
	}
</script>

<style scoped>

.svg {
	line-height: 0 !important;
}

</style>