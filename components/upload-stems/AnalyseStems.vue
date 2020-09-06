<template>
	<div class="analyse-stems" v-if="stems.length">
		<v-button @click="analyse">Analyse</v-button>
	</div>
</template>

<script lang="ts">

	import { Component, Vue } from 'vue-property-decorator';
	import { Sample } from '@/plugins/types';

	@Component
	export default class extends Vue {
		
		analyse(): void {
			this.stems.forEach((stem: File) => {
				this.getAudioFileData(stem);
			});
		}

		getAudioFileData(stem: File): void {
			const fr: FileReader = new FileReader();

			fr.onload = () => {
				if (fr.result) {
					this.decodeAudio(fr.result, stem);
				}
			};

			fr.readAsArrayBuffer(stem);
		}

		decodeAudio(buffer: String | ArrayBuffer, file: File): void {
			const audioCtx: AudioContext = new AudioContext();

			audioCtx.decodeAudioData((buffer as ArrayBuffer), async (audioBuffer: AudioBuffer) => {
				
				let leftChannel: Float32Array;
				let rightChannel: Float32Array;

				try {
					leftChannel = audioBuffer.getChannelData(0);
					rightChannel = audioBuffer.getChannelData(1);
				} catch(e) {
					return alert(e);
				}

				const largestChannel: Float32Array = leftChannel.length > rightChannel.length ? leftChannel : rightChannel;
				
				const samples: Sample[] = [];
				const duplicates: Sample[] = [];

				for (let i: number = 0; i < largestChannel.length; i++) {

					// Get channel data
					const leftChannelValue: number = leftChannel[i];
					const rightChannelValue: number = rightChannel[i];
					const volumeThreshold: number = 0.005;

					if (Math.abs(leftChannelValue) > volumeThreshold || Math.abs(rightChannelValue) > volumeThreshold) {

						let left: Float32Array = this.findEnding(leftChannel, i);
						let right: Float32Array = this.findEnding(rightChannel, i);

						// a fix for where either left / right audio cuts out earlier
						// making both tracks equal length prevents this
						if (left.length > right.length) {
							right = rightChannel.slice(i, i + left.length);
						} else {
							left = leftChannel.slice(i, i + right.length);
						}

						const min: number = parseFloat(this.arrayMin(left).toFixed(2));
						const max: number = parseFloat(this.arrayMax(left).toFixed(2));

						const sample: Sample = {
							name: file.name,
							left,
							right,
							min,
							max,
						};

						// Check if the sample is similar to previous samples
						// duplicates = very slow, even with a service worker
						if (!this.isSimilar(sample, [...samples, ...duplicates])) {
							samples.push(sample);
						} else {
							// duplicates.push(sample);
						}

						i += left.length; // left and right are both same size so it doesn't matter which one
					}
				}

				// dit duurt lang
				this.$store.commit('ADD_SAMPLES', {
					stemName: file.name,
					samples: samples,
				});
			});
		}

		isSimilar(sample: Sample, samples: Sample[]): boolean {

			const similarSamples: Sample[] = samples.filter((currentSample: Sample) => {
				let _sample: Sample = {...sample};
				let _currentSample: Sample = {...currentSample};

				// Make length the same
				if (_currentSample.left.length < _sample.left.length)
				{
					_sample.left = _sample.left.slice(0, _currentSample.left.length);
				} else
				{
					_currentSample.left = _currentSample.left.slice(0, _sample.left.length);
				}

				const sampleQ1 = _sample.left[_sample.left.length / 4].toFixed(2);
				const sampleQ2 = _sample.left[_sample.left.length / 2].toFixed(2);
				const sampleQ3 = _sample.left[_sample.left.length * 0.75].toFixed(2);
				const sampleAverage = Math.abs(_sample.left.reduce((a, b) => a + b / _sample.left.length)).toFixed(2);

				const currentSampleQ1 = _currentSample.left[_currentSample.left.length / 4].toFixed(2);
				const currentSampleQ2 = _currentSample.left[_currentSample.left.length / 2].toFixed(2);
				const currentSampleQ3 = _currentSample.left[_currentSample.left.length * 0.75].toFixed(2);
				const currentSampleAverage = Math.abs(_currentSample.left.reduce((a, b) => a + b / _currentSample.left.length)).toFixed(2);

				let count: number = 0;
				
				count += +(_sample.min === _currentSample.min);
				count += +(_sample.max === _currentSample.max);
				count += +(sampleQ1 === currentSampleQ1);
				count += +(sampleQ2 === currentSampleQ2);
				count += +(sampleQ3 === currentSampleQ3);
				count += +(sampleAverage === currentSampleAverage);

				sample.q1 = parseFloat(sampleQ1);
				sample.q2 = parseFloat(sampleQ2);
				sample.q3 = parseFloat(sampleQ3);
				sample.average = parseFloat(sampleAverage);

				return count > 3;
			});

			return !!similarSamples.length;
		}

		findEnding(array: Float32Array, start: number, current: number = start): Float32Array {
			const accuracy: number = 300; // lower is smaller chunks 
			current = current || start;

			const subArr: Float32Array = array.slice(current, current + accuracy);
			const average: number = subArr.reduce(
				(a, b) => Math.abs(a) + Math.abs(b) / subArr.length
			);

			if (average > 0.0001) {
				return this.findEnding(array, start, current + accuracy);
			} else {
				return array.slice(start, current + accuracy);
			}
		}

		arrayMin(arr: Float32Array): number{
			let len = arr.length,
				min = Infinity;
			while (len--) {
				if (arr[len] < min) {
					min = arr[len];
				}
			}
			return min;
		}

		arrayMax(arr: Float32Array): number {
			let len = arr.length,
				max = -Infinity;
			while (len--) {
				if (arr[len] > max) {
					max = arr[len];
				}
			}
			return max;
		}

		get stems(): File[] {
			return this.$store.getters.stems;
		}

		get samples(): any {
			return this.$store.getters.samples;
		}

	}
</script>

<style scoped lang="scss">

.analyse-stems {
	button {
		border: 1px solid $primary-accent;
		color: $primary-accent;
		background: transparent;
	}
}

</style>