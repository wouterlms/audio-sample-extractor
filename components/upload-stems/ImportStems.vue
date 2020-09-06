<template>
	<div class="import-stems">

		<section class="import-stems__upload">

			<div class="import-stems__upload__container" :class="{ darken : selectedStem  }">
				<header>
					<h1>Import your stems</h1>
					<h2>Files should be mp3, wav, flac</h2>
				</header>

				<drop-zone></drop-zone>
				<stems-list></stems-list>
				
				<div class="import-stems__upload__container__buttons">
					<analyse-stems></analyse-stems>
					<export-samples></export-samples>
				</div>
			</div>
			
			<transition name="fade">
				<selected-stem-samples v-if="selectedStem"></selected-stem-samples>
			</transition>

		</section>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Vue, Watch } from 'vue-property-decorator';
	import { Sample } from '@/plugins/types';

	@Component
	export default class extends Vue {
		
		get selectedStem(): string | null {
			return this.$store.getters.selectedStem;
		}

	}
</script>

<style scoped lang="scss">

.import-stems {
	@include center;
	height: 100vh;
	
	&__upload {
		position: relative;
		overflow: hidden;
		width: 600px;

		box-shadow: 0 3px 6px rgba(0,0,0,0.02), 0 3px 6px rgba(0,0,0,0.01);
		border-radius: 25px;

		display: flex;
		flex-direction: column;

		&__container {
			padding: 3rem;
			background: $primary-light;
			transition: .8s cubic-bezier(.81,.01,.2,1);

			header {
				margin-bottom: 3rem;
				text-align: center;

				h1 {
					font-weight: 600;
					font-size: 2rem;

					margin-bottom: 1rem;
				}

				h2 {
					color: transparentize($primary-dark, .4);
					font-weight: 500;
				}
			}

			&.darken {
				filter: brightness(50%);
				pointer-events: none;
			}

			&__buttons {
				@include columns(2);
			}
		}
	}
}

.fade {
	&-leave-active,
	&-enter-active {
		transition: .8s cubic-bezier(.81,.01,.2,1);
	}

	&-enter,
	&-leave-to {
		transform: translateY(100%);
		// opacity: 0;
	}
}
</style>