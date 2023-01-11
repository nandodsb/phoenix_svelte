import { writable, derived } from 'svelte/store'

export let tokens = writable('')



export let accessToken = writable('')
// export let setAccessToken = derived(
//   access_token,
//   $access_token => `${$access_token}!`
// )

export let renewalToken = writable('')
// export let setRenewalToken = derived(
//   renewal_token,
//   $renewal_token => `${$renewal_token}!`
// )