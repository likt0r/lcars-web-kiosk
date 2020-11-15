<template>
	<transition name="slide">
		<div class="login" :style="cssVarColors" v-if="screenLocked">
			<div class="upperBar" />
			<div class="logo" @click="login()">
				<img src="@/assets/logo.svg" />
			</div>
			United Federation Multimedia Network
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import addLcarsStyling from '@/compositions/addLcarsStyling';
import { useStore, ActionTypes } from '../store';

export default defineComponent({
	setup() {
		const { cssVarColors } = addLcarsStyling();
		const store = useStore();
		const screenLocked = computed(() => store.state.screenLocked);
		function login() {
			store.dispatch(ActionTypes.SET_SCREEN_LOCK, false);
		}
		return {
			cssVarColors,
			screenLocked,
			login,
		};
	},
});
</script>

<style scoped>
.login {
	background: black;
	position: fixed;
	z-index: 10000;
	width: 100vw;
	height: 100vh;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-content: center;
	flex-direction: column;
	color: white;
	font-size: 3rem;
}
.logo {
	pointer-events: all;
	cursor: pointer;
}
.slide-enter-active {
	transition: all 0.8s ease;
	z-index: 1;
}
.slide-leave-active {
	transition: all 0.8s ease;
	z-index: 0;
}

.slide-enter-from {
	opacity: 0;
	filter: grayscale(100%);
}
.slide-leave-to {
	opacity: 0;
	filter: grayscale(100%);
}
</style>
