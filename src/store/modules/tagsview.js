export default {
  namespaced: true,
  state: () => ({
    tags: [
      {
        title: '控制台',
        path: '/system'
      }
    ],
    isCollspac: false
  }),
  mutations: {
    setisCollspac(state) {
      state.isCollspac = !state.isCollspac
      console.log(state.isCollspac, 'vuex')
    },
    setTags(state, tags) {
      if (!tags.title || tags.path === '/system') return
      const f = state.tags.find((item) => item.path === tags.path)
      if (!f) {
        state.tags.push(tags)
      }
    },
    deleteTags(state, i) {
      state.tags.splice(i, 1)
    },
    deleteAll(state) {
      state.tags = [
        {
          title: '控制台',
          path: '/system'
        }
      ]
    }
  }
}
