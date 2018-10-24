import { Cookies } from 'quasar'
import API from 'src/plugins/api'
import { btoa } from 'b2a'

export const me = async (context) => {
  const payload = await API.call({
    context,
    method: 'get',
    url: '/me'
  })
  if (!payload.statusCode) {
    context.commit('setUser', payload)
  }
}

export const logout = ({ dispatch, commit }) => {
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
  commit('clear')
}

export const startGithubLogin = () => {
  const stateParameter = btoa(`githublogin::${window.location.href}`)
  window.location = `https://github.com/login/oauth/authorize?scope=read:user,repo&client_id=${process.env.GITHUB_CLIENT_ID}&state=${stateParameter}`
}

export const startSteemConnectLogin = () => {
  let callbackURL = ''
  if (typeof window !== 'undefined') {
    callbackURL = `${window.location.protocol}//${window.location.host}`
  }
  window.location = `https://steemconnect.com/oauth2/authorize?client_id=${process.env.STEEMCONNECT_CLIENT_ID}&redirect_uri=${callbackURL}&response_type=code&scope=offline,comment,vote,comment_options,custom_json&state=steemconnectlogin`
}