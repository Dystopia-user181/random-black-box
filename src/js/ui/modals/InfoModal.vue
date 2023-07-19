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
			This game was heavily inspired by
			<a
				href="https://ivark.github.io/AntimatterDimensions/"
				target="_blank"
			>
				Antimatter Dimensions
			</a>.
			<br>
			<br>
			If you want to contribute to this game, you may visit its github page below. Joining
			the discord for more in depth discussion of development work is also recommended.
			<br>
			<br>
			Credits:<br>
			Scarlet / Dystopia181: Main dev<br>
			<br>
			Helpful people:<br>
			Myresa<br>
			QwQe308<br>
			Stefan R<br>
			Mirai<br>
			Crystalflare
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
			href="https://github.com/Dystopia-user181/capped-at-one"
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