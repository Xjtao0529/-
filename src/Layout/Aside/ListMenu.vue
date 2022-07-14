<template>
  <div>
    <el-menu
      default-active="2"
      :style="{ width: $store.getters.isCollspac ? '64px' : '200px' }"
      class="el-menu-vertical-demo"
      background-color="#222d32"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="$store.getters.isCollspac"
      :collapse-transition="true"
      router
    >
      <item-menu
        v-for="(item, index) in menuList"
        :key="index"
        :menu="item"
      ></item-menu>
    </el-menu>
  </div>
</template>

<script>
import { rmeoveChildren, filterMenus } from '../../utils/removeChil'
import ItemMenu from './ItemMenu.vue'
export default {
  components: { ItemMenu },
  data() {
    return {
      menuLists: this.$store.getters.menuList
    }
  },
  created() {},
  computed: {
    menuList() {
      const data = rmeoveChildren(this.menuLists)
      return filterMenus(data)
    }
  }
}
</script>

<style scoped>
.el-menu {
  border-right: none;
}
</style>
