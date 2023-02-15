<script>
	import { onMount } from 'svelte'
	import api from './api'
	import { push, link } from 'svelte-spa-router'
	import {
		accessToken,
		renewalToken,
		userLoggedName,
		loginSuccess,
	} from './store'

	let message = 'You are not logged in'

	onMount(async () => {
		const data = {
			accessToken,
			renewalToken,
		}
		const response = await api.get('/', data)

		if (response.status === 200) {
			loginSuccess
			message = `Hi `
			await push('/api')
		}

		if (response.status === 404) {
			message = `${response}`
		} else {
			await push('/api')
		}
	})

	async function handleLogout() {
		const data = {}
		await api.delete('/api/session', data)
		console.log('LOGOUT SUCCESS')
		return
	}
</script>

<main class="container mt-5 text-center">
	<h3>{message}</h3>

	{#if loginSuccess === true}
		<a
			href="/api/session/new"
			use:link
			class="btn btn-lg btn-primary"
			on:click={handleLogout}>Logout</a
		>
	{:else}
		<a href="/api/session/new" use:link class="btn btn-lg btn-secondary"
			>Login</a
		>
	{/if}
</main>
