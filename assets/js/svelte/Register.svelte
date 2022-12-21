<script>
  import api from './api'
  import axios from 'axios'
  import {push} from 'svelte-spa-router'

  let name ="", email ="", password="";

  const data = {
      name,
      email,
      password
    }

  $: submit = async () => {
    await api.post('register', data)

    await push('/login')
  }
</script>

<main class="mb-3 mt-5 form-signin container">
  <form on:submit|preventDefault={submit}>
    <h1 class="h3 mb-3 fw-normal">Please register</h1>
  
    <div class="mb-3 form-floating">
      <input bind:value={name} type="text" class="form-control" placeholder="Name">
      <label for="">Name</label>
    </div>

    <div class="mb-3 form-floating">
      <input bind:value={email} type="email" class="form-control" placeholder="Email">
      <label for="">Email</label>
    </div>

    <div class="mb-3 form-floating">
      <input bind:value={password} type="password" class="form-control" placeholder="Password">
      <label for="">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
  </form>

</main>