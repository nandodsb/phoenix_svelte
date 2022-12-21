<script>
  import {onMount} from 'svelte';
  import axios from 'axios'
  import api from './api'
  import {push} from "svelte-spa-router";

  
  let message = 'You are not logged in';
  onMount(async () => {
      const response = await axios.get('user');
      if (response.status === 200) {
          message = `Hi ${response.data.name}`;
      } 

      if (response.status === 404) {
          message = `${response}`;
      } else {
          await push('/login');
      }
  });
  $: logout = async () => {
      await api.post('logout', {}, {withCredentials: true});
      axios.defaults.headers.common['Authorization'] = '';
      await push('/login');
      return false;
  }
</script>


<main class="container mt-5 text-center">
  <h3>{message}</h3>

  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="#" class="btn btn-lg btn-primary"
     on:click|preventDefault={logout}
  >Logout</a>
</main>