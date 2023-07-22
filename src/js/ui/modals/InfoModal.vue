<script setup>
import ModalWrapper from "./ModalWrapper.vue";
</script>

<template>
	<ModalWrapper class="c-info">
		<template #header>
			Info
		</template>
		<br>
		<span class="c-info__body">
			This game was joke intended for IGJ 2023 summer due to a lack of time.<br>
			There is completely 0 adherence to the theme other than the energy part.<br>
			Regardless, I hope you enjoy it.
		</span>
		<br>
		<br>
		<a
			href="https://discord.gg/DVy4XjB"
			target="_blank"
			class="fa-brands fa-discord"
			title="Discord"
		/>
		<a
			href="https://github.com/Dystopia-user181/random-black-box"
			target="_blank"
			class="fa-brands fa-github"
			title="Contribute"
		/>
	</ModalWrapper>
</template>

<style scoped>
.c-info {
	width: 600px;
}

.c-info__body {
	font-size: 16px;
}

.fa-brands {
	font-size: 60px;
	margin: 3px 20px;
}
</style>