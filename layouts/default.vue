<template>
	<div>
		<Nuxt />
	</div>
</template>

<script lang="ts">

	import Vue from 'vue'

	export default Vue.extend({

		mounted() {

		}
	});
</script>

<style lang="scss">

body {
	background: $secondary-light;

	overflow-x: hidden;
	width: 100%;
}

body,
button {
	font-family: 'Poppins', sans-serif;
}

::-webkit-scrollbar {
	display: none;
}

*,
*::before,
*::after {
	box-sizing: border-box;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
}

p {
    line-height: 1.7;
}

img {
    width: 100%;
	height: 100%;
	
    object-fit: cover;
}

h1 {
    line-height: 1.3;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
li,
a,
span,
button,
input {
	color: $primary-dark;
}

.default {

	&-enter-active,
	&-leave-active {
		
	}

	&-enter-active {
		
	}

	&-leave-active {
		
	}

	&-leave-to {
		
	}

	&-enter-to {
		
	}
}

</style>
