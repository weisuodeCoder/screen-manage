<template>
  <el-color-picker v-model="color" @change="backValue" @active-change="backValue" :show-alpha="showAlpha" :color-format="colorFormat" />
</template>

<script lang="ts">
  import { defineComponent, ref, unref, watch, computed } from 'vue';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { propTypes } from '/@/utils/propTypes';
  import { omit } from 'lodash-es';

  export default defineComponent({
    name: 'JColorPicker',
    inheritAttrs: false,
    props: {
      value: propTypes.string.def(''),
      placeholder: propTypes.string.def(''),
      trim: propTypes.bool.def(false),
      colorFormat: propTypes.string.def('hex'),
      showAlpha: propTypes.bool.def(true),
    },
    emits: ['change', 'update:value'],
    setup(props, { emit }) {
      const attrs = useAttrs();
      //表单值
      const color = ref('');
      //绑定属性
      const getBindValue = computed(() => {
        return omit(Object.assign({}, unref(props), unref(attrs)), ['value']);
      });
      //监听value变化
      watch(
        () => props.value,
        () => {
          initVal();
        },
        { immediate: true }
      );

      /**
       * 初始化数值
       */
      function initVal() {
        if (!props.value) {
          color.value = '000';
        } else {
          color.value = props.value;
        }
      }

      function backValue(text) {
        color.value = text;
        emit('change', text);
        emit('update:value', text);
      }

      return { color, attrs, getBindValue, backValue };
    },
  });
</script>

<style scoped></style>
