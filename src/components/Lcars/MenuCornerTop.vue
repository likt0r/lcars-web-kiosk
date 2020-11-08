<template>
	<div class="container" :style="cssVars">
		<div class="container--inner">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2.6in"
				height="1.11111in"
				class="shadow"
				
				viewBox="-0.6 0 237 100"
			>
				<path
					id="path4"
					:fill="bgColor"
					stroke="rgba(112, 117, 121, 0.2)"
					stroke-width="3"
					class="shadow"
					d="M 55.29,3.39
           C 34.07,10.18 17.48,24.82 6.96,46.25
             1.61,57.14 1.25,59.46 0.54,78.93
             0.54,78.93 0.00,100.00 0.00,100.00
             0.00,100.00 89.36,100.00 89.36,100.00
             89.36,100.00 178.71,100.00 178.71,100.00
             178.71,100.00 178.71,88.75 178.71,88.75
             178.71,71.96 182.99,61.61 194.58,49.82
             205.11,39.46 216.52,33.93 228.11,33.93
             228.11,33.93 234.00,33.93 234.00,33.93
             234.00,33.93 234.00,16.96 234.00,16.96
             234.00,16.96 234.00,0.00 234.00,0.00
             234.00,0.00 149.82,0.18 149.82,0.18
             73.12,0.18 64.56,0.54 55.29,3.39 Z"
				/>
			</svg>
			<div class="bottom-ending" />
		</div>
		<div class="left-ending" />
	</div>
</template>
<script lang="ts">
import { ref, computed } from 'vue';
import { defineComponent } from 'vue';
import { useStore, ActionTypes } from '@/store';
import { colors } from '@/utils/enums';
export default defineComponent({
	props: {
		bgColor: {
			type: String,
			default: colors.red,
		},
	},
	setup(props) {
		const cssVars = computed(() => ({
			'--bg-color': props.bgColor,
		}));
		return {
			cssVars,
		};
	},
});
</script>

<style scoped>
.container {
	height: 65px;
	display: flex;
	flex-flow: row;
	padding-left: 4px;
}
.container--inner {
	height: 80px;
	display: flex;
	flex-flow: column;
}
img {
	width: 115px;
}
svg {
	width: 122px;
	height: 52px;
	margin-left: -0.12px;
	z-index: -1;
}
.bottom-ending {
	width: 92px;
	height: 23px;
	background-color: var(--bg-color);
	z-index: 10;
	border: 1px;
	margin-top: -10px;
	margin-left: 0.1px;
	border-width: 0 1px 1px 1px;
	border-style: solid;
	border-radius: 0 0 1px 1px;
	border-color: rgba(112, 117, 121, 0.2);
	box-shadow:  4px 4px 0px 0px #000000, -4px 4px 0px 0px #000000;
}
.left-ending {
	width: 150px;
	height: 18.3px;
	margin-left: -8px;
	background-color: var(--bg-color);
	border: 1px;
	border-width: 1px 1px 1px 0;
	border-style: solid;
	border-radius: 1px 1px 1px 0;
	border-color: rgba(112, 117, 121, 0.2);
	box-shadow: 4px 4px 0px 0px #000000 
}

.shadow { 
filter: drop-shadow( 4px 4px 0px #000000 ) 
drop-shadow( -4px -4px 0px #000000 );
}	
</style>
