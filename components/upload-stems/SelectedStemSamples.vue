<template>
	<section class="selected-stem-samples">
		
		<header>
			<h1>{{ selectedStem }} ({{ samples.length }} samples)</h1>
			<v-button @click="close()">close</v-button>
		</header>
		
		<ul>
			<li v-for="(sample, i) of samples" :key="i" @click="play(sample)" :class="{ export: isInExport(sample) }">
				<span>Sample {{ i + 1 }}</span>
				<button @click="exportSample($event, sample)">{{ isInExport(sample) ? 'cancel export' : 'export' }}</button>
			</li>
		</ul>
	</section>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Sample } from '@/plugins/types';
	import { mixins } from 'vue-class-component';
	import SampleMixin from '@/mixins/SampleMixin';

	@Component
	export default class extends mixins(SampleMixin) {

		source!: AudioBufferSourceNode;
		audioCtx!: AudioContext;

		mounted() {
			this.audioCtx = new AudioContext();
		}

		beforeDestroy() {
			this.stopPlaying();
		}
		
		close(): void {
			this.$store.commit('SET_SELECTED_STEM', null);
		}

		play(sample: Sample): void {
			this.playSample(sample);
		}

		exportSample(e: Event, sample: Sample): void {
			e.stopPropagation();
			
			if (this.isInExport(sample)) {
				this.$store.commit('REMOVE_EXPORT_SAMPLE', sample);
			} else {
				this.$store.commit('ADD_EXPORT_SAMPLE', sample);
			}
		}

		isInExport(sample: Sample): boolean {
			return !!this.exportSamples.filter(_sample => _sample === sample)[0];
		}

		get selectedStem(): string {
			return this.$store.getters.selectedStem;
		}

		get samples(): Sample[] {
			return this.$store.getters.samples[this.selectedStem];
		}

		get exportSamples(): Sample[] {
			return this.$store.getters.exportSamples;
		}
	}
</script>

<style scoped lang="scss">

.selected-stem-samples {
	position: absolute;
	bottom: 0;
	left: 0;

	width: 100%;
	height: 50%;

	background: $primary-light;
	z-index: 1;

	padding: 2rem;

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		h1 {
			font-weight: 600;
			color: transparentize($primary-dark, .3);
		}

		button {
			margin-left: auto;
			display: block;

			font-size: .8rem;
		}
	}

	ul {
		padding: 1rem 0;
		overflow-y: scroll;
		max-height: 100%;

		li {
			display: flex;
			align-items: center;
			justify-content: space-between;

			font-weight: 500;
			font-size: .9rem;

			border-radius: 5px;

			padding: 1rem .5rem;
			transition: .2s;

			cursor: pointer;

			&:hover {
				background: $secondary-light;

				button {
					opacity: 1 !important;
				}
			}

			button {
				opacity: 0;
				padding: .4rem .6rem !important;
				font-size: .8rem;

				border: none;
				border: 1px solid transparent;
				background: $primary-accent;
				color: $primary-light;
				border-radius: 15px;
			}

			&.export button {
				opacity: 1;
				border: 1px solid $primary-accent;
				background: transparent;
				color: $primary-accent;
			}
		}
	}
}

</style>