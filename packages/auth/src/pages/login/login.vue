<script>
export default {
  preFetch ({ store, redirect }) {
    if (store.state.auth.user) {
      redirect('/')
    }
  },
  name: 'u-page-login',
  methods: {
    startGithubLogin () {
      const state = window.btoa(`githublogin::${process.env.UTOPIAN_DOMAIN}`)
      window.location = `https://github.com/login/oauth/authorize?scope=read:user,repo&client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.AUTH_DOMAIN}&state=${state}`
    }
  }
}
</script>

<template src="./login.pug" lang="pug"></template>

<style src="./login.styl" lang="stylus"></style>
