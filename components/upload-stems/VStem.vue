<template>
	<li class="stem">
		<div>
			<v-svg v-if="isMp3" icon="mp3"></v-svg>
			<v-svg v-if="isWav" icon="wav"></v-svg>
			<v-svg v-if="isFlac" icon="flac"></v-svg>

			<span>{{ stem.name }}</span>
			<v-button v-if="samples" @click="setSelectedStem()">{{ samples.length}} samples</v-button>
		</div>
		
		<v-button class="stem__remove" @click="removeStem()">Remove</v-button>
	</li>
</template>

<script lang="ts">
	import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
	import { Sample } from '@/plugins/types';

	@Component
	export default class  extends Vue {

		@Prop() stem!: File;

		setSelectedStem(): void {
			this.$store.commit('SET_SELECTED_STEM', this.stem.name);
		}

		removeStem(): void {
			this.$store.commit('REMOVE_STEM', this.stem);
			this.$store.commit('REMOVE_EXPORT_SAMPLES_BY_NAME', this.stem.name);
		}

		getExtension(file: File): string {
			return file.name.toString().split('.').pop() || '';
		}

		get isMp3(): boolean {
			return this.getExtension(this.stem) === 'mp3';
		}

		get isWav(): boolean {
			return this.getExtension(this.stem) === 'wav';
		}

		get isFlac(): boolean {
			return this.getExtension(this.stem) === 'flac';
		}

		get samples(): Sample[] {
			return this.$store.getters.samples[this.stem.name];
		}

		get exportSamples(): Sample[] {
			return this.$store.getters.exportSamples;
		}
	}
</script>

<style scoped lang="scss">

.stem {
	display: flex;
	align-items: center;
	justify-content: space-between;

	font-weight: 500;
	font-size: .9rem;

	border-radius: 5px;

	padding: 1rem .5rem;
	transition: .2s;

	&:hover {
		background: $secondary-light;

		button {
			opacity: 1;
		}
	}

	button {
		padding: .4rem .6rem !important;
		font-size: .8rem;
	}

	&>div {
		display: flex;
		align-items: center;

		::v-deep svg {
			width: 3rem;
			height: 3rem;
		}

		span {
			margin-left: 1rem;
			color: transparentize($primary-dark, .2);

			display: inline-block;
			
			max-width: 170px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			line-height: 1.3;
		}

		button {
			margin-left: .5rem;
		}
	}

	&__remove {
		background: transparentize(rgb(230, 10, 10), .3) !important;
		opacity: 0;
		transition: .2s;
	}
}

</style>