<script lang="ts">
	import api from './api'
	import { push } from 'svelte-spa-router'

	let email = ''
	let password = ''

	let csrfToken = document
		.querySelector("meta[name='csrf-token']")
		.getAttribute('content')

	$: submit = async () => {
		console.log(csrfToken)
		const data = {
			_csrf_token: csrfToken,
			user: { email, password },
		}

		const response = await api.post('/session', data)

		if (response.status === 200) {
			await push('/')
		}
	}
</script>

<main class="mb-3 mt-5 form-signin container">
	<form on:submit|preventDefault={submit}>
		<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

		<div class="mb-3 form-floating">
			<input
				id="exampleCheck3"
				bind:value={email}
				type="email"
				class="form-control"
				placeholder="Email"
			/>
			<label for="exampleCheck3">Email</label>
		</div>

		<div class="mb-3 form-floating">
			<input
				id="exampleCheck2"
				bind:value={password}
				type="password"
				class="form-control"
				placeholder="Password"
			/>
			<label for="exampleCheck2">Password</label>
		</div>

		<div class="mb-3 form-check">
			<input type="checkbox" class="form-check-input" id="exampleCheck1" />
			<label class="form-check-label" for="exampleCheck1">Check me out</label>
		</div>

		<button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
	</form>
</main>
