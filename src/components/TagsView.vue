<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tags"
      :key="index"
      :closable="item.path !== '/system'"
      :type="$route.path === item.path ? '' : 'success'"
      @click="addTags(item)"
      @close="delTags(item, index)"
    >
      {{ item.title }}
    </el-tag>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['tags'])
  },
  methods: {
    ...mapMutations({
      setTags: 'tagsview/setTags',
      deleteTags: 'tagsview/deleteTags'
    }),
    addTags(item) {
      console.log(item)
      console.log(this.$route)
      if (item.path === this.$route.path) return
      this.$router.push(item.path)
    },
    delTags(item, index) {
      const tags = this.tags
      if (item.path === this.$router.path) {
        this.$router.push(tags[index - 1].path)
      }
      this.deleteTags(index)
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(val) {
        const {
          path,
          meta: { title }
        } = val
        this.setTags({
          path,
          title
        })
      }
    }
  }
}
</script>

<style scoped>
.tags {
  display: flex;
  align-items: center;
}
.el-tag {
  margin-left: 10px;
  cursor: pointer;
}
</style>
