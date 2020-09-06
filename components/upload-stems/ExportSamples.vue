<template>
	<div class="export-samples">
		<v-button v-if="exportSamples.length" @click="createZip">Export {{ exportSamples.length }} sample{{ exportSamples.length !== 1 ? 's' : '' }}</v-button>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Sample } from '@/plugins/types';
	import SampleMixin from '@/mixins/SampleMixin';
	import { mixins } from 'vue-class-component';
	import JsZip from 'jszip' 

	const audioBufferToWav = require("audiobuffer-to-wav");

	@Component
	export default class extends mixins(SampleMixin) {

		createZip(): void {
			const files: object[] = [];

			this.exportSamples.forEach((sample: Sample) => {
				files.push(this.createBlob(sample));
			});

			const zip = new JsZip();

			this.exportSamples.forEach((sample: Sample, i) => {

				const blob = this.createBlob(sample);

				zip.file(`${i}#${sample.name}`, blob);

				if (i === files.length - 1) {
					zip.generateAsync({
						type: 'blob'
					}).then((content: Blob) => {
						this.download(content);
					});
				}
			});
		}

		download(blob: Blob): void {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");

			a.href = url;
			a.download = 'samples.zip';

			a.click();
			a.remove();
		}

		createBlob(sample: Sample): Blob {
			const blob = new Blob([audioBufferToWav(this.toAudioBuffer(sample))], {
				type: "audio/wav"
			});

			return blob;
		}
		
		get exportSamples(): Sample[] {
			return this.$store.getters.exportSamples;
		}

	}
</script>

<style scoped lang="scss">

.export-samples {
	display: flex;
	justify-content: flex-end;
}

</style>