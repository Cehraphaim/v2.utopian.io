// import vue and vuex.
import Vue from 'vue'
import Vuex from 'vuex'

// import store modules.
import auth from './auth'

// join modules.
const modules = {
  auth
}

// enable vuex.
Vue.use(Vuex)

export default function () {
  const store = new Vuex.Store({
    modules
  })

  return store
}
