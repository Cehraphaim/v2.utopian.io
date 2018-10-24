<script>
export default {
  preFetch ({ store, redirect }) {
    if (store.state.auth.user) {
      window.location = process.env.UTOPIAN_DOMAIN
    }
  },
  name: 'u-page-redirect',
  mounted () {
    if (this.$route.query.redirectUrl) {
      window.location = this.$route.query.redirectUrl
    } else {
      this.$router.push('login')
    }
  }
}
</script>

<template src="./redirect.pug" lang="pug"></template>

<style src="./redirect.styl" lang="stylus"></style>
