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
    await axios.post('http://localhost:4000/register', data)

    await push('/login')
  }
</script>

<main class="form-signin">
  <form on:submit|preventDefault={submit}>
    <h1 class="h3 mb-3 fw-normal">Register</h1>
  
    <div class="mb-3 form-floating">
      <input bind:value={name} type="text" class="form-control" placeholder="Name">
      <label for="">Name</label>
    </div>

    <div class="mb-3 form-floating">
      <input bind:value={email} type="email" class="form-control" placeholder="Name">
      <label for="">Email</label>
    </div>

    <div class="mb-3 form-floating">
      <input bind:value={password} type="password" class="form-control" placeholder="Name">
      <label for="">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
  </form>

</main>