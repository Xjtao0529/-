import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import tagsview from './modules/tagsview'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    permission,
    tagsview
  },
  getters
})
