<script lang="ts">
	import api from './api'
	import { push } from 'svelte-spa-router'
	import { accessToken, renewalToken } from './store'

	// interface ITokens {
	// 	tokens: [
	// 		{
	// 			access_token: string
	// 			renewal_token: string
	// 		},
	// 	]
	// }

	let email = ''
	let password = ''
	let tokens = []

	let setAccessToken, setRenewalToken

	accessToken.subscribe((value) => {
		setAccessToken = value
	})

	renewalToken.subscribe((value) => {
		setRenewalToken = value
	})

	let csrfToken = document
		.querySelector("meta[name='csrf-token']")
		.getAttribute('content')

	async function handleLogin() {
		console.log(csrfToken)

		const user = {
			_csrf_token: csrfToken,
			user: { email, password },
		}

		let response = await api.post('/api/session', user)

		if (response.status === 200) {
			let tokensData = response.data.data
			tokens.push(tokensData)
			setAccessToken = tokens[0].access_token
			setRenewalToken = tokens[0].renewal_token
			push('/api')
		}

		if (response.status !== 200) {
			console.log(response.data)
		}
	}
</script>

<main class="mb-3 mt-5 form-signin container">
	<form on:submit|preventDefault={handleLogin}>
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

		<button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
	</form>
</main>
