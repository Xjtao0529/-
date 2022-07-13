<template>
  <el-table :data='data' border stripe>
    <el-table-column
      v-for='(item,i) in cols'
      :key='i'
      :align='item.align'
      :label='item.title'
      :prop='item.prop'
      :type='item.type'
      :width='item.width'
    >
      <template v-if='item.slot' v-slot='{column,row,$index}'>
        <slot :column='column' :index='$index' :name='item.slot' :row='row'></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'myTable',
  props: {
    cols: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}
</style>
