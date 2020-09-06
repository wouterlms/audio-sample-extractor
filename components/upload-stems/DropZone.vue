<template>
	<div class="dropzone"
		@click="browse"
		@dragenter.prevent="onDragEnter"
		@dragover.prevent=""
		@dragleave.prevent="onDragLeave"
		@drop.prevent="onDrop"
	>
		<input type="file" multiple ref="fileInput" @change="onFileInput">
		<v-svg icon="folder"></v-svg>
		<p>{{ dropMessage }}</p>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component
	export default class  extends Vue {

		audioFileFormats: String[] = ['flac', 'mp3', 'wav'];
		isHovered: boolean = false;

		browse(): void {
			(this.$refs.fileInput as HTMLInputElement).click();
		}

		onFileInput(): void {
			const files: any = (this.$refs.fileInput as HTMLInputElement).files;
			this.$store.commit('SET_STEMS', [...files].filter(file => this.isAudio(file)));
		}

		onDragEnter(): void {
			this.isHovered = true;
		}

		onDragLeave(): void {
			this.isHovered = false;
		}

		onDrop(e: DragEvent): void {
			const dataTransfer: DataTransfer | null = e.dataTransfer;

			if (dataTransfer) {
				const files: FileList = dataTransfer.files;
				this.$store.commit('SET_STEMS', [...files].filter(file => this.isAudio(file)));
			}

			this.isHovered = false;
		}

		getExtension(file: File): string {
			return file.name.toString().split('.').pop() || '';
		}

		isAudio(file: File): boolean {
			return this.audioFileFormats.indexOf(this.getExtension(file)) !== -1;
		}

		get dropMessage(): string {
			return this.isHovered ? 'Release to import files' : 'Drag & Drop your stems here';
		}
	}
</script>

<style scoped lang="scss">

.dropzone {
	height: 200px;
	border-radius: 25px;
	background: $secondary-light;
	border: 2px solid transparentize($primary-accent, .8);

	cursor: pointer;

	@include center;
	flex-direction: column;

	input[type=file] {
		display: none;
	}

	p,
	.svg {
		pointer-events: none;
	}

	p {
		color: transparentize($primary-dark, .4);
		font-weight: 500;

		margin-top: .5rem;
	}

	::v-deep svg {
		width: 5rem;
		height: 5rem;
	}
}

</style>