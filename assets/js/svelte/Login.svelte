<script lang="ts">
  import api from './api'
  import axios from 'axios'
  import {push} from 'svelte-spa-router'


  let  email ="", password="";

  $: submit = async () => {

    const data ={
      email,
      password
    }

    const response = await api.post('login',     
      data
    , {withCredentials: true})

    if(response.status === 200) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

      await push('/')
    }

    
  }
</script>

<main class="mb-3 mt-5 form-signin container">
  <form on:submit|preventDefault={submit}>
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
  

    <div class="mb-3 form-floating">
      <input bind:value={email} type="email" class="form-control" placeholder="Email">
      <label for="">Email</label>
    </div>

    <div class="mb-3 form-floating">
      <input id="exampleCheck1" bind:value={password} type="password" class="form-control" placeholder="Password">
      <label for=""  >Password</label>
      
    </div>

    <div class="mb-3 form-check"> 
     <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>

    </div>
  
    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
  </form>
</main>