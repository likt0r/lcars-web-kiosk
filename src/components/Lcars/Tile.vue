<template>
<li v-if="li"
		:style="cssVars"
		class="lcars-element"
	>
	</li>
	<div v-else 
		:style="cssVars"
		class="lcars-element"
	>
	</div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { defineComponent } from 'vue';
import { useStore, ActionTypes } from '@/store';
import addAudio from '@/compositions/addAudio';
export default defineComponent({
	props: {
		bgColor: {
			type: String,
		},
		minHeight: {
			type: Number,
			default: 50,
		},
		minWidth: {
			type: Number,
			default: 50,
        },
        li: {
            type: Boolean,
            default: false,
        },
        grow: {
            type:Boolean,
            default: false,
        }
	},
	setup(props) {
		const cssVars = computed(() => ({
			'--bg-color': props.bgColor,
			'--min-height': props.minHeight + 'px',
            '--min-width': props.minWidth + 'px',
            flex: "1 1 25%"
		}));

		

		return {
			cssVars,
		};
	},
});
</script>

<style scoped>
.lcars-element {
	height: var(--min-height);
	min-width: var(--min-width);
    background-color: var(--bg-color);
    box-shadow: 0px 0px 0px 4px #000000;
    margin-right: 4px;
}

</style>
