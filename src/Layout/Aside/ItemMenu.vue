<template>
  <div>
    <template v-if="!menu.children">
      <el-menu-item :index="menu.path">
        <i :class="'el-icon-' + menu.icon"></i>
        <span slot="title">{{ menu.label }}</span>
      </el-menu-item>
    </template>
    <template v-else-if="menu.children && menu.children.length > 0">
      <el-submenu :index="menu.id + ''">
        <template slot="title">
          <i :class="'el-icon-' + menu.icon"></i>
          <span>{{ menu.label }}</span>
        </template>
        <item-menu
          v-for="child in menu.children"
          :key="child.path"
          :menu="child"
        ></item-menu>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: 'item-menu',
  props: {
    menu: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>

<style lang="sass" scoped></style>
