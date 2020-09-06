import { Component, Vue } from 'vue-property-decorator';
import { Sample } from '@/plugins/types';

@Component
export default class SampleMixin extends Vue {

	audioCtx!: AudioContext;
	source!: AudioBufferSourceNode;

	mounted() {
		this.audioCtx = new AudioContext();
	}

	public toAudioBuffer(sample: Sample): AudioBuffer {

		const audioBuffer: AudioBuffer = this.audioCtx.createBuffer(
			2,
			sample.left.length,
			this.audioCtx.sampleRate
		);
		const channelBuffer1: Float32Array = audioBuffer.getChannelData(0);
		const channelBuffer2: Float32Array = audioBuffer.getChannelData(1);

		for (let i = 0; i < sample.left.length; i++) {
			channelBuffer1[i] = sample.left[i];
		}

		for (let i = 0; i < sample.right.length; i++) {
			channelBuffer2[i] = sample.right[i];
		}

		return audioBuffer;
	}

	public playSample(sample: Sample): void {
		if (this.source) {
			this.source.stop();
		}

		this.source = this.audioCtx.createBufferSource();
		this.source.buffer = this.toAudioBuffer(sample);
		this.source.connect(this.audioCtx.destination);
		this.source.start();
	}

	public stopPlaying(): void {
		if (this.source) {
			this.source.stop();
		}
	}
}