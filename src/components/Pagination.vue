<template>
  <div>
    <el-pagination
      :current-page="pagination.current"
      :page-size="pagination.size"
      @size-change="(val) => change('size', val)"
      @current-change="(num) => change('current', num)"
      :page-sizes="[5, 10, 15, 20]"
      layout="jumper,  prev, pager,next,sizes,  total"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    total: {
      type: Number
    }
  },
  computed: {
    pagination() {
      return this.value || {}
    }
  },
  created() {
    console.log(this.value, 22)
  },
  methods: {
    change(type, value) {
      const obj = { ...this.value, [type]: value }
      console.log(obj, 'obj')
      this.$emit('input', obj)
      this.$emit('change', obj)
    }
  }
}
</script>

<style lang="scss" scoped></style>
