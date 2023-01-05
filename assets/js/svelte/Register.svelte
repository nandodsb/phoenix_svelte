<script lang="ts">
	import api from './api'
	import { push } from 'svelte-spa-router'

	let email = ''
	let password = ''
	let confirm_password = ''

	let csrfToken = document
		.querySelector("meta[name='csrf-token']")
		.getAttribute('content')

	$: submit = async () => {
		let data = {
			_csrf_token: csrfToken,
			user: {
				email,
				password,
				confirm_password,
			},
		}

		const response = await api.post('/registration', data)
		console.log(response)
		console.log(data)
		if (response.status === 200) {
			await push('/session/new')
		}
	}
</script>

<main class="mb-3 mt-5 form-signin container">
	<form on:submit|preventDefault={submit}>
		<h1 class="h3 mb-3 fw-normal">Please register</h1>

		<!-- <div class="mb-3 form-floating">
      <input bind:value={name} type="text" class="form-control" placeholder="Name">
      <label for="">Name</label>
    </div> -->

		<div class="mb-3 form-floating">
			<input
				bind:value={email}
				type="email"
				class="form-control"
				placeholder="Email"
			/>
			<label for="email">Email</label>
		</div>

		<div class="mb-3 form-floating">
			<input
				bind:value={password}
				type="password"
				class="form-control"
				placeholder="Password"
			/>
			<label for="password">Password</label>
		</div>

		<div class="mb-3 form-floating">
			<input
				bind:value={confirm_password}
				type="password"
				class="form-control"
				placeholder="Password"
			/>
			<label for="confirm_password">Confirm Password</label>
		</div>

		<button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
	</form>
</main>
