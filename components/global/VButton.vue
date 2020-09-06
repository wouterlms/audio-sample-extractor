<template>
	<component class="button"
		:is="getType"
		:type="type"
		:to="to"
		:disabled="disabled"
		@click="$emit('click')"
	>

		<slot></slot>
	</component>
</template>

<script lang="ts">
	import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

	@Component
	export default class extends Vue {
		@Prop({ required: false }) private to!: string;
		@Prop({ default: 'button', required: false }) private type!: string;
		@Prop({ default: false, required: false }) private disabled!: boolean;

		get getType(): string {
			return this.to ? 'router-link' : 'button';
		}

		@Watch('disabled') onDisabledChanged() {
			console.log(this.disabled);
		}
	}
</script>

<style scoped lang="scss">

.button {
	font-family: 'Poppins', sans-serif;

	position: relative;
	display: inline-block;
	padding: .6rem 1.4rem;

	background: $primary-accent;
	color: $primary-light;

	border: none;
	border-radius: 25px;
	text-align: center;

	transition: .2s;
}

</style>