export interface Sample {
	name: string,
	left: Float32Array,
	right: Float32Array,
	min: number,
	max: number,
	q1?: number,
	q2?: number,
	q3?: number,
	average?: number,
	export?: boolean,
};