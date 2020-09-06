// https://typescript.nuxtjs.org/cookbook/store.html#class-based

import { GetterTree, ActionTree, MutationTree } from 'vuex';
import Vue from 'vue';

import { Sample } from '@/plugins/types';

export const state = () => ({
	stems: [] as File[],
	samples: {} as any,
	selectedStem: null as (null | string),
	exportSamples: [] as Sample[],
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
	stems: state => state.stems,
	samples: state => state.samples,
	selectedStem: state => state.selectedStem,
	exportSamples: state => state.exportSamples,
};

export const mutations: MutationTree<RootState> = {
	SET_STEMS: (state, files: File[]) => (state.stems = files),
	REMOVE_STEM: (state, file: File) => (state.stems.splice(state.stems.indexOf(file), 1)),

	SET_SAMPLES: (state, samples) => (state.samples = samples),
	ADD_SAMPLES: (state, data) => (Vue.set(state.samples, data.stemName, data.samples)),

	SET_SELECTED_STEM: (state, stem: string) => (state.selectedStem = stem),

	ADD_EXPORT_SAMPLE: (state, sample: Sample) => (state.exportSamples.push(sample)),
	REMOVE_EXPORT_SAMPLE: (state, sample: Sample) => (state.exportSamples.splice(state.exportSamples.indexOf(sample), 1)),
	REMOVE_EXPORT_SAMPLES_BY_NAME: (state, sampleName: string) => {
		state.exportSamples = state.exportSamples.filter((sample: Sample) => sample.name !== sampleName);
	},
};