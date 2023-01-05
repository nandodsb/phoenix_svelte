<script>
	import { onMount } from 'svelte'
	import api from './api'
	import { push } from 'svelte-spa-router'

	let csrfToken = document
		.querySelector("meta[name='csrf-token']")
		.getAttribute('content')

	let message = 'You are not logged in'

	onMount(async () => {
		const data = {
			_csrf_token: csrfToken,
			user: {
				email,
				password,
			},
		}
		const response = await api.get('/session', data)
		console.log(data)
		if (response.status === 200) {
			message = `Hi ${response.data.name}`
		}

		if (response.status === 404) {
			message = `${response}`
		} else {
			await push('/')
		}
	})

	$: handleLogout = async () => {
		const data = {
			_csrf_token: '',
			user: {},
		}
		await api.delete('/session', data)

		await push('/session/new')
		return false
	}
</script>

<main class="container mt-5 text-center">
	<h3>{message}</h3>

	<!-- svelte-ignore a11y-invalid-attribute -->
	<a href="#" class="btn btn-lg btn-primary" on:click={handleLogout}>Logout</a>
</main>
